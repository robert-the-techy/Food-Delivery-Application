package com.example.fooddelivery.dto;

import com.example.fooddelivery.dto.admin.AdminDetailsResponse;

public class TokenResponse
{
    private final String accessToken;
    private final String refreshToken;
    private String adminCode;

    public TokenResponse(String accessToken, String refreshToken, String adminCode) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.adminCode = adminCode;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getAdminCode() {
        return adminCode;
    }

    public void setAdminCode(String adminCode) {
        this.adminCode = adminCode;
    }
}
