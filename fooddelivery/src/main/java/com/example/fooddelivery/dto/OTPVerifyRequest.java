package com.example.fooddelivery.dto;

public class OTPVerifyRequest
{
    String userCode;
    String userOTP;

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getUserOTP() {
        return userOTP;
    }

    public void setUserOTP(String userOTP) {
        this.userOTP = userOTP;
    }
}
