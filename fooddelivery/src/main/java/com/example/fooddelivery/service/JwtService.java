package com.example.fooddelivery.service;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtService
{
    private final SecretKey key;

//    Generate Secret Key
    public  JwtService(@Value("${jwt.secret}") String secretKey)
    {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

//    Generate Access Token
    public String generateAccessToken(UserDetails userDetails)
    {
        return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 15)).signWith(key).compact();
    }

//    Generate Refresh Token
    public String generateRefreshToken(UserDetails userDetails)
    {
        return Jwts.builder().subject(userDetails.getUsername()).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30)).signWith(key).compact();
    }

//    Extract Email from Token
    public String extractCode(String token)
    {
        return Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(token).getPayload().getSubject();
    }

//    Validate Token
    public boolean isTokenValid(String token,UserDetails userDetails)
    {
        return extractCode(token).equals(userDetails.getUsername());
    }
}
