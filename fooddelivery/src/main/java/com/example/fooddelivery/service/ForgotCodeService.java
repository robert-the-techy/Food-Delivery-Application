package com.example.fooddelivery.service;

import com.example.fooddelivery.model.ForgotCodeData;
import com.example.fooddelivery.repository.ForgotCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ForgotCodeService
{
    @Autowired
    ForgotCodeRepository forgotCodeRepository;

    @Autowired
    EmailService emailService;

    @Transactional
    public void sendForgotCode(String userEmpCode,String userEmail)
    {
        forgotCodeRepository.deleteByForgotCodeEmpCodeAndForgotCodeEmail(userEmpCode,userEmail);

        final String textSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz";
        SecureRandom random = new SecureRandom();
        StringBuilder forgotCode = new StringBuilder();
        ForgotCodeData forgotCodeData = new ForgotCodeData();

        for (int i=0;i<5;i++)
        {
            forgotCode.append(textSet.charAt(random.nextInt(textSet.length())));
        }

        forgotCodeData.setForgotCodeEmpCode(userEmpCode);
        forgotCodeData.setForgotCodeEmail(userEmail);
        forgotCodeData.setForgotCode(forgotCode.toString());
        forgotCodeData.setForgotCodeExpiry(LocalDateTime.now().plusMinutes(5));

        forgotCodeRepository.save(forgotCodeData);

        emailService.resetPasswordMail(userEmail,forgotCode.toString());
    }

    @Transactional
    public boolean verifyForgotCode(String userEmpCode,String userEmail,String userForgotCode)
    {
        Optional<ForgotCodeData> forgotCodeData = forgotCodeRepository.findByForgotCodeEmpCodeAndForgotCodeEmail(userEmpCode,userEmail);

        if (forgotCodeData.isEmpty())
        {
            return false;
        }

        ForgotCodeData forgotCodeData1 = forgotCodeData.get();

        if (LocalDateTime.now().isAfter(forgotCodeData1.getForgotCodeExpiry()))
        {
            forgotCodeRepository.deleteByForgotCodeEmpCodeAndForgotCodeEmail(userEmpCode,userEmail);
            return false;
        }

        if (forgotCodeData1.getForgotCode().equals(userForgotCode))
        {
            forgotCodeRepository.deleteByForgotCodeEmpCodeAndForgotCodeEmail(userEmpCode,userEmail);
            return true;
        }

        return false;
    }
}
