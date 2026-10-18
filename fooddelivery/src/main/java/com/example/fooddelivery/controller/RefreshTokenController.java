package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.TokenResponse;
import com.example.fooddelivery.service.JwtService;
import com.example.fooddelivery.service.UserVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class RefreshTokenController
{
    @Autowired
    JwtService jwtService;

    @Autowired
    UserVerificationService userVerificationService;

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@CookieValue(value = "refreshToken",required = false) String refreshToken)
    {
        if(refreshToken == null)
        {
            return ResponseEntity.status(401).build();
        }

        String email = jwtService.extractCode(refreshToken);

        UserDetails userDetails = userVerificationService.loadUserByUsername(email);

        if(!jwtService.isTokenValid(refreshToken,userDetails))
        {
            return ResponseEntity.status(401).build();
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);

        return ResponseEntity.ok(new TokenResponse(newAccessToken,null,null));
    }
}