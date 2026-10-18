package com.example.fooddelivery.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class VerificationCodeData
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long verificationCodeId;

    @Column(nullable = false)
    String verificationCodeEmail;

    @Column(nullable = false,length = 6)
    String verificationCode;

    @Column(nullable = false)
    LocalDateTime verificationCodeExpiry;

    public VerificationCodeData()
    {
        super();
    }

    public VerificationCodeData(String verificationCodeEmail, String verificationCode, LocalDateTime verificationCodeExpiry) {
        this.verificationCodeEmail = verificationCodeEmail;
        this.verificationCode = verificationCode;
        this.verificationCodeExpiry = verificationCodeExpiry;
    }

    public long getVerificationCodeId() {
        return verificationCodeId;
    }

    public void setVerificationCodeId(long verificationCodeId) {
        this.verificationCodeId = verificationCodeId;
    }

    public String getVerificationCodeEmail() {
        return verificationCodeEmail;
    }

    public void setVerificationCodeEmail(String verificationCodeEmail) {
        this.verificationCodeEmail = verificationCodeEmail;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public LocalDateTime getVerificationCodeExpiry() {
        return verificationCodeExpiry;
    }

    public void setVerificationCodeExpiry(LocalDateTime verificationCodeExpiry) {
        this.verificationCodeExpiry = verificationCodeExpiry;
    }
}
