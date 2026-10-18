package com.example.fooddelivery.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fooddelivery.errorsandexceptions.UserNotFound;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.repository.UserRepository;

@Service
public class UserVerificationService implements UserDetailsService
{
	@Autowired
	UserRepository user_for_security;

	@Override
	public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException
	{
		UserModel arrived_user = user_for_security.findByUserCode(userCode).orElseThrow(()-> new UserNotFound("Email not found!"));
		UserBuilder builder = org.springframework.security.core.userdetails.User.builder();
		
		builder.username(arrived_user.getUserCode());
		builder.password(arrived_user.getUserPassword());
		builder.roles(arrived_user.getUserRole().name());
		
		return builder.build();
	}
	
}
