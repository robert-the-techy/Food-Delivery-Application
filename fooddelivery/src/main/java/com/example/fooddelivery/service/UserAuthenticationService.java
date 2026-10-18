package com.example.fooddelivery.service;

import com.example.fooddelivery.dto.LoginRequest;
import com.example.fooddelivery.dto.TokenResponse;
import com.example.fooddelivery.model.user.AddressModel;
import com.example.fooddelivery.model.user.AdminDetails;
import com.example.fooddelivery.model.user.DateConverter;
import com.example.fooddelivery.repository.admin.AdminDetailsRepository;
import com.example.fooddelivery.repository.user.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class UserAuthenticationService {
	
	@Autowired
	UserRepository user_check;
	
	@Autowired
	PasswordEncoder password_encryption;

	@Autowired
	UserVerificationService userVerificationService;

	@Autowired
	JwtService jwtService;

	@Autowired
	AdminDetailsRepository adminDetailsRepository;

	@Autowired
	AddressRepository addressRepository;

	@Autowired
	EmailService emailService;
	
	public String generateUserCode(User_Roles role)
	{
		String roleCode = switch (role)
		{
            case ADMIN -> "AD";
			case CUSTOMER -> "CU";
			case DELIVERY_PARTNER -> "DE";
		};

		int year = java.time.Year.now().getValue()%100;
		String generatedCode;

		do {
            int random = ThreadLocalRandom.current().nextInt(100,1000);
			generatedCode = String.format("FD%d%s%02d",random,roleCode,year);
        }while (user_check.existsById(generatedCode));
		
		return generatedCode;
	}
	
	
//	Admin Authentication (Register)
	public TokenResponse admin_register(UserModel admin)
	{
		String rawPassword = admin.getUserPassword();
		admin.setUserPassword(password_encryption.encode(admin.getUserPassword()));
//		User Code Generating
		String userCode = generateUserCode(admin.getUserRole());
		admin.setUserCode(userCode);
		admin.setUserDateOfBirth(DateConverter.dateConversion(admin.getUserDateOfBirth()));
		user_check.save(admin);

		emailService.sendRegistrationMail(admin.getUserEmail(),admin.getUserName(),admin.getUserCode(),rawPassword);

//		Tokens Generating
		UserDetails userDetails = userVerificationService.loadUserByUsername(admin.getUserCode());
		String accessToken = jwtService.generateAccessToken(userDetails);
		String refreshToken = admin.isUserRememberMe() ? jwtService.generateRefreshToken(userDetails) : null;

		return new TokenResponse(accessToken,refreshToken,admin.getUserCode());
	}

//	Admin Authentication (Login)
	public TokenResponse admin_login(LoginRequest request)
	{
		UserDetails userDetails = userVerificationService.loadUserByUsername(request.getUserCode());
		String accessToken = jwtService.generateAccessToken(userDetails);
		String refreshToken = null;
		if(request.isUserRememberMe())
		{
			refreshToken = jwtService.generateRefreshToken(userDetails);
		}

		UserModel userModel = user_check.findByUserCode(request.getUserCode()).orElseThrow(()-> new RuntimeException("Admin not found!"));

		return new TokenResponse(accessToken,refreshToken,userModel.getUserCode());
	}

//  Admin Authentication (Logout)
	public void admin_logout(String adminCode)
	{
		UserModel userModel = user_check.findByUserCode(adminCode).orElseThrow(()-> new RuntimeException("Admin not found!"));
		AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(userModel.getUserCode());
		adminDetails.setLoggedOutDate(LocalDateTime.now());
		adminDetailsRepository.save(adminDetails);
	}

//	Admin Authentication (Delete)
	@Transactional
	public void admin_delete(String adminCode)
	{
		UserModel userModel = user_check.findByUserCode(adminCode).orElseThrow(()-> new RuntimeException("Admin not found!"));
		AddressModel addressModel = addressRepository.findByUserCode(userModel);
		AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(userModel.getUserCode());

		if(addressModel != null)
		{
			addressRepository.delete(addressModel);
		}
		if (adminDetails != null)
		{
			adminDetailsRepository.delete(adminDetails);
		}
		user_check.delete(userModel);
	}
	
//	Customer Authentication (Register)
	public UserModel customer_register(UserModel customer)
	{
		customer.setUserPassword(password_encryption.encode(customer.getUserPassword()));
//		User Code Generating
		String userCode = generateUserCode(customer.getUserRole());
		customer.setUserCode(userCode);
		return user_check.save(customer);
	}
//	Customer Authentication (Login)
	
//	Delivery Partner Authentication (Register)
	public UserModel delivery_partner_register(UserModel delivery_partner)
	{
		delivery_partner.setUserPassword(password_encryption.encode(delivery_partner.getUserPassword()));
//		User Code Generating
		String userCode = generateUserCode(delivery_partner.getUserRole());
		delivery_partner.setUserCode(userCode);
		return user_check.save(delivery_partner);
	}
//	Delivery Partner Authentication (Login)
}