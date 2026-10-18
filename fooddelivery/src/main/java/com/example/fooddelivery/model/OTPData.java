package com.example.fooddelivery.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_data")
public class OTPData
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long OTPId;

    @Column(nullable = false)
    String OTPEmail;

    @Column(nullable = false,length = 4)
    String OTPDigits;

    @Column(nullable = false)
    LocalDateTime expiryTime;

    public OTPData()
    {
        super();
    }

    public OTPData(String OTPEmail, String OTPDigits, LocalDateTime expiryTime) {
        this.OTPEmail = OTPEmail;
        this.OTPDigits = OTPDigits;
        this.expiryTime = expiryTime;
    }

    public long getOTPId() {
        return OTPId;
    }

    public void setOTPId(long OTPId) {
        this.OTPId = OTPId;
    }

    public String getOTPEmail() {
        return OTPEmail;
    }

    public void setOTPEmail(String OTPEmail) {
        this.OTPEmail = OTPEmail;
    }

    public String getOTPDigits() {
        return OTPDigits;
    }

    public void setOTPDigits(String OTPDigits) {
        this.OTPDigits = OTPDigits;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }
}
