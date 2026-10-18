package com.example.fooddelivery.controller;

import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserCheckingController
{
    @Autowired
    UserRepository userRepository;

    @PostMapping("/user-check")
    public ResponseEntity<?> userCheck(@RequestBody UserModel userModel)
    {
        Optional<UserModel> userModel1 = userRepository.findByUserEmail(userModel.getUserEmail());
        if (userModel1.isEmpty())
        {
            return ResponseEntity.status(200).build();
        }
        else
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","* email already exists, try another!"));
        }
    }
}
