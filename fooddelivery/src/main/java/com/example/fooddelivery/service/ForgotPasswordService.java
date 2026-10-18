package com.example.fooddelivery.service;

import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.AdminDetails;
import com.example.fooddelivery.repository.UserRepository;
import com.example.fooddelivery.repository.admin.AdminDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ForgotPasswordService
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    public void resetPassword(String userEmpCode,String userEmail,String userPassword)
    {
        UserModel userModel = userRepository.findByUserCodeAndUserEmail(userEmpCode,userEmail).orElseThrow(()-> new RuntimeException("User not found!"));
        userModel.setUserPassword(passwordEncoder.encode(userPassword));
        AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(userModel.getUserCode());
        adminDetails.setPasswordUpdatedDate(LocalDateTime.now());

        userRepository.save(userModel);
    }
}
