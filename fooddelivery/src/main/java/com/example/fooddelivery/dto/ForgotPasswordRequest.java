package com.example.fooddelivery.dto;

public class ForgotPasswordRequest
{
    String userEmpCode;
    String userEmail;
    String userPassword;

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

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
