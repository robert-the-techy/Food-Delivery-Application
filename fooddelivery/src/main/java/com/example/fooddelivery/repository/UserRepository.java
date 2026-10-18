package com.example.fooddelivery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel,String>{

	public List<UserModel> findAllByUserRole(User_Roles userRole);

	Optional<UserModel> findByUserEmail(String userEmail);
	
	Optional<UserModel> findByUserCode(String userCode);

	Optional<UserModel> findByUserCodeAndUserEmail(String userCode,String userEmail);
}
