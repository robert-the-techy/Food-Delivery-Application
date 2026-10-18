package com.example.fooddelivery.dto;

public class ForgotCodeRequest
{
    String userEmpCode;
    String userEmail;

    public String getUserEmpCode() {
        return userEmpCode;
    }

    public void setUserEmpCode(String userEmpCode) {
        this.userEmpCode = userEmpCode;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
