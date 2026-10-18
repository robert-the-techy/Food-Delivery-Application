package com.example.fooddelivery.service;

import com.example.fooddelivery.model.OTPData;
import com.example.fooddelivery.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OTPService
{
    @Autowired
    OTPRepository otpRepository;

    @Autowired
    EmailService emailService;

    @Transactional
    public void sendLoginOTP(String email)
    {
        String otp = String.valueOf(1000+new Random().nextInt(9000));

        otpRepository.deleteByOTPEmail(email);

        OTPData otpData = new OTPData();
        otpData.setOTPEmail(email);
        otpData.setOTPDigits(otp);
        otpData.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpData);

        emailService.logInMail(email,otp);
    }

    @Transactional
    public void sendPasswordChangeOTP(String email)
    {
        String otp = String.valueOf(1000+new Random().nextInt(9000));

        otpRepository.deleteByOTPEmail(email);

        OTPData otpData = new OTPData();
        otpData.setOTPEmail(email);
        otpData.setOTPDigits(otp);
        otpData.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpData);

        emailService.changePasswordMail(email,otp);
    }

    @Transactional
    public boolean verifyOTP(String email,String otp)
    {
        Optional<OTPData> otpData = otpRepository.findByOTPEmail(email);

        if (otpData.isEmpty())
        {
            return false;
        }

        OTPData otpData1 = otpData.get();

        if (LocalDateTime.now().isAfter(otpData1.getExpiryTime()))
        {
            otpRepository.delete(otpData1);
            return false;
        }

        if (otpData1.getOTPDigits().equals(otp))
        {
            otpRepository.delete(otpData1);
            return true;
        }

        return false;
    }
}
