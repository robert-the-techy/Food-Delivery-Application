package com.example.fooddelivery.repository;

import com.example.fooddelivery.model.ForgotCodeData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotCodeRepository extends JpaRepository<ForgotCodeData,Long>
{
    void deleteByForgotCodeEmpCodeAndForgotCodeEmail(String forgotCodeEmpCode,String forgotCodeEmail);
    Optional<ForgotCodeData> findByForgotCodeEmpCodeAndForgotCodeEmail(String forgotCodeEmpCode, String forgotCodeEmail);
}
