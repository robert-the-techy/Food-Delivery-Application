package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.UserCodeRequest;
import com.example.fooddelivery.dto.VerifyVerificationCodeRequest;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class VerificationCodeController
{
    @Autowired
    VerificationCodeService verificationCodeService;

    @PostMapping("/send-verification-code")
    public ResponseEntity<?> generateVerificationCode(@RequestBody UserModel userModel)
    {
        verificationCodeService.sendVerificationCode(userModel.getUserEmail());
        return ResponseEntity.ok("Verification code sent successfully!");
    }

    @PostMapping("/verify-verification-code")
    public ResponseEntity<?> checkVerificationCode(@RequestBody VerifyVerificationCodeRequest verifyVerificationCodeRequest)
    {
        boolean valid = verificationCodeService.verifyVerificationCode(verifyVerificationCodeRequest.getUserEmail(),verifyVerificationCodeRequest.getUserVerificationCode());
        if(!valid)
        {
            return ResponseEntity.status(401).body("* Invalid verification code!");
        }

        return ResponseEntity.ok("Verification code verified successfully!");
    }
}
