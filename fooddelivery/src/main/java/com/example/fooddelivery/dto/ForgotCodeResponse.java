package com.example.fooddelivery.dto;

public class ForgotCodeResponse
{
    String userEmpCode;
    String userEmail;
    String userForgotCode;

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

    public String getUserForgotCode() {
        return userForgotCode;
    }

    public void setUserForgotCode(String userForgotCode) {
        this.userForgotCode = userForgotCode;
    }
}
