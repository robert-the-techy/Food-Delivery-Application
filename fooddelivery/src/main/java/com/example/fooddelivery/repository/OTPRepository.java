package com.example.fooddelivery.repository;

import com.example.fooddelivery.model.OTPData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OTPRepository  extends JpaRepository<OTPData,Long>
{
    void deleteByOTPEmail(String OTPEmail);

    Optional<OTPData> findByOTPEmail(String OTPEmail);
}
