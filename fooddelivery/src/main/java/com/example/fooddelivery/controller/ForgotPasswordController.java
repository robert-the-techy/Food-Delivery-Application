package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.ForgotPasswordRequest;
import com.example.fooddelivery.service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class ForgotPasswordController
{
    @Autowired
    ForgotPasswordService forgotPasswordService;

    @PostMapping("/reset-password")
    public ResponseEntity<?> changePassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest)
    {
        forgotPasswordService.resetPassword(forgotPasswordRequest.getUserEmpCode(),forgotPasswordRequest.getUserEmail(),forgotPasswordRequest.getUserPassword());
        return ResponseEntity.ok("Password reset successfully!");
    }
}
