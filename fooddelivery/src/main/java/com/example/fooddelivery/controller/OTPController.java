package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.OTPVerifyRequest;
import com.example.fooddelivery.dto.UserCodeRequest;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.repository.UserRepository;
import com.example.fooddelivery.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class OTPController
{
    @Autowired
    OTPService otpService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/send-login-otp")
    public ResponseEntity<?> generateLoginOTP(@RequestBody UserCodeRequest userCodeRequest)
    {
        UserModel userModel = userRepository.findByUserCode(userCodeRequest.getUserCode()).orElseThrow(()-> new RuntimeException("Admin not found!"));
        otpService.sendLoginOTP(userModel.getUserEmail());
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/send-password-change-otp")
    public ResponseEntity<?> generatePasswordChangeOTP(@RequestBody UserCodeRequest userCodeRequest)
    {
        UserModel userModel = userRepository.findByUserCode(userCodeRequest.getUserCode()).orElseThrow(()-> new RuntimeException("Admin not found!"));
        otpService.sendPasswordChangeOTP(userModel.getUserEmail());
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> checkOTP(@RequestBody OTPVerifyRequest otpVerifyRequest)
    {
        UserModel userModel = userRepository.findByUserCode(otpVerifyRequest.getUserCode()).orElseThrow(()-> new RuntimeException("Admin not found!"));
        boolean valid = otpService.verifyOTP(userModel.getUserEmail(),otpVerifyRequest.getUserOTP());

        if (!valid)
        {
            return ResponseEntity.status(401).body("* Invalid OTP");
        }

        return ResponseEntity.ok("OTP verified successfully");
    }
}
