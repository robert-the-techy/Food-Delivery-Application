package com.example.fooddelivery.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ForgotCodeData
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long forgotCodeId;

    @Column(nullable = false)
    String forgotCodeEmpCode;

    @Column(nullable = false)
    String forgotCodeEmail;

    @Column(nullable = false,length = 5)
    String forgotCode;

    @Column(nullable = false)
    LocalDateTime forgotCodeExpiry;

    public ForgotCodeData()
    {
        super();
    }

    public ForgotCodeData(String forgotCodeEmpCode, String forgotCodeEmail, String forgotCode, LocalDateTime forgotCodeExpiry) {
        this.forgotCodeEmpCode = forgotCodeEmpCode;
        this.forgotCodeEmail = forgotCodeEmail;
        this.forgotCode = forgotCode;
        this.forgotCodeExpiry = forgotCodeExpiry;
    }

    public long getForgotCodeId() {
        return forgotCodeId;
    }

    public void setForgotCodeId(long forgotCodeId) {
        this.forgotCodeId = forgotCodeId;
    }

    public String getForgotCodeEmpCode() {
        return forgotCodeEmpCode;
    }

    public void setForgotCodeEmpCode(String forgotCodeEmpCode) {
        this.forgotCodeEmpCode = forgotCodeEmpCode;
    }

    public String getForgotCodeEmail() {
        return forgotCodeEmail;
    }

    public void setForgotCodeEmail(String forgotCodeEmail) {
        this.forgotCodeEmail = forgotCodeEmail;
    }

    public String getForgotCode() {
        return forgotCode;
    }

    public void setForgotCode(String forgotCode) {
        this.forgotCode = forgotCode;
    }

    public LocalDateTime getForgotCodeExpiry() {
        return forgotCodeExpiry;
    }

    public void setForgotCodeExpiry(LocalDateTime forgotCodeExpiry) {
        this.forgotCodeExpiry = forgotCodeExpiry;
    }
}
