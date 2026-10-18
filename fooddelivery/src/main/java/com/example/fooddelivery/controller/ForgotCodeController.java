package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.ForgotCodeRequest;
import com.example.fooddelivery.dto.ForgotCodeResponse;
import com.example.fooddelivery.service.ForgotCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class ForgotCodeController
{
    @Autowired
    ForgotCodeService forgotCodeService;

    @PostMapping("/send-forgot-code")
    public ResponseEntity<?> generateForgotCode(@RequestBody ForgotCodeRequest forgotCodeRequest)
    {
        forgotCodeService.sendForgotCode(forgotCodeRequest.getUserEmpCode(),forgotCodeRequest.getUserEmail());
        return ResponseEntity.ok("Reset code sent successfully!");
    }

    @PostMapping("/verify-forgot-code")
    public ResponseEntity<?> checkForgotCode(@RequestBody ForgotCodeResponse forgotCodeResponse)
    {
        boolean valid = forgotCodeService.verifyForgotCode(forgotCodeResponse.getUserEmpCode(),forgotCodeResponse.getUserEmail(),forgotCodeResponse.getUserForgotCode());
        if (!valid)
        {
            return ResponseEntity.status(401).body("* Invalid reset code!");
        }

        return ResponseEntity.ok("Reset code verified successfully!");
    }
}
