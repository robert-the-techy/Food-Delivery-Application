package com.example.fooddelivery.repository;

import com.example.fooddelivery.model.VerificationCodeData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCodeData,Long>
{
    void deleteByVerificationCodeEmail(String verificationCodeEmail);
    Optional<VerificationCodeData> findByVerificationCodeEmail(String verificationCodeEmail);
}
