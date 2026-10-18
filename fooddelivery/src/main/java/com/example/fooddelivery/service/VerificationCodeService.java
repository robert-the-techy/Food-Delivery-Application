package com.example.fooddelivery.service;

import com.example.fooddelivery.model.VerificationCodeData;
import com.example.fooddelivery.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VerificationCodeService
{
    @Autowired
    VerificationCodeRepository verificationCodeRepository;

    @Autowired
    EmailService emailService;

    @Transactional
    public void sendVerificationCode(String email)
    {
        verificationCodeRepository.deleteByVerificationCodeEmail(email);

        final String Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        final SecureRandom random = new SecureRandom();
        final StringBuilder verificationCode = new StringBuilder();
        VerificationCodeData verificationCodeData = new VerificationCodeData();

        for (int i=0;i<6;i++)
        {
            verificationCode.append(Characters.charAt(random.nextInt(Characters.length())));
        }

        verificationCodeData.setVerificationCodeEmail(email);
        verificationCodeData.setVerificationCode(verificationCode.toString());
        verificationCodeData.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(5));

        verificationCodeRepository.save(verificationCodeData);

        emailService.signUpMail(email,verificationCode.toString());
    }

    @Transactional
    public boolean verifyVerificationCode(String email,String verificationCode)
    {
        Optional<VerificationCodeData> verificationCodeData = verificationCodeRepository.findByVerificationCodeEmail(email);
        if (verificationCodeData.isEmpty())
        {
            return false;
        }

        VerificationCodeData verificationCodeData1 = verificationCodeData.get();

        if (LocalDateTime.now().isAfter(verificationCodeData1.getVerificationCodeExpiry()))
        {
            verificationCodeRepository.delete(verificationCodeData1);
            return false;
        }

        if (verificationCodeData1.getVerificationCode().equals(verificationCode))
        {
            verificationCodeRepository.delete(verificationCodeData1);
            return true;
        }

        return false;
    }
}
