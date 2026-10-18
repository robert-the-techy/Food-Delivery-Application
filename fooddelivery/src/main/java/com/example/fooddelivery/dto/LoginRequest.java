package com.example.fooddelivery.dto;

public class LoginRequest
{
    private String userCode;
    private String userPassword;
    private boolean userRememberMe;

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public boolean isUserRememberMe() {
        return userRememberMe;
    }

    public void setUserRememberMe(boolean userRememberMe) {
        this.userRememberMe = userRememberMe;
    }
}
