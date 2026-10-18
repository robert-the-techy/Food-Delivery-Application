package com.example.fooddelivery.controller;

import com.example.fooddelivery.dto.LoginRequest;
import com.example.fooddelivery.dto.TokenResponse;
import com.example.fooddelivery.model.user.AdminDetails;
import com.example.fooddelivery.repository.UserRepository;
import com.example.fooddelivery.repository.admin.AdminDetailsRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.service.UserAuthenticationService;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserAuthenticationController 
{
	@Autowired
	UserAuthenticationService user_service;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AdminDetailsRepository adminDetailsRepository;
	
//	Admin Register
	@PostMapping("/admin/register")
	public ResponseEntity<TokenResponse> admin_add(@RequestBody UserModel admin, HttpServletResponse response)
	{
		TokenResponse tokenResponse = user_service.admin_register(admin);
		if(tokenResponse.getRefreshToken()!=null)
		{
			Cookie cookie = new Cookie(
					"refreshToken",
					tokenResponse.getRefreshToken()
			);

			cookie.setHttpOnly(true);
			cookie.setSecure(false);
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60 * 24 * 30);
			response.addCookie(cookie);
		}

		UserModel userModel = userRepository.findByUserCode(tokenResponse.getAdminCode()).orElseThrow(()-> new RuntimeException("Admin not found!"));
		AdminDetails adminDetails = new AdminDetails();
		adminDetails.setUser(userModel);
		adminDetails.setLoggedInDate(LocalDateTime.now());

		adminDetailsRepository.save(adminDetails);

		return ResponseEntity.ok(
				new TokenResponse(tokenResponse.getAccessToken(),null,tokenResponse.getAdminCode())
		);
	}
	
//	Admin Login
	@PostMapping("/admin/login")
	public ResponseEntity<?> admin_check(@RequestBody LoginRequest request,HttpServletResponse response)
	{
		try
		{
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUserCode(),request.getUserPassword()));
		}
		catch (AuthenticationException exception)
		{
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","* invalid email or password!"));
		}

		TokenResponse tokenResponse = user_service.admin_login(request);
		if(tokenResponse.getRefreshToken()!=null)
		{
			Cookie cookie = new Cookie("refreshToken", tokenResponse.getRefreshToken());
			cookie.setHttpOnly(true);
			cookie.setSecure(false);
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60 * 24 * 30);

			response.addCookie(cookie);
		}

		AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(tokenResponse.getAdminCode());
		adminDetails.setLoggedInDate(LocalDateTime.now());
		adminDetailsRepository.save(adminDetails);

		return ResponseEntity.ok(new TokenResponse(tokenResponse.getAccessToken(),null,tokenResponse.getAdminCode()));
	}

//  Admin Logout
	@PostMapping("/admin/logout/{adminCode}")
	public ResponseEntity<?> logoutWithAdminCode(@PathVariable String adminCode)
	{
		ResponseCookie deleteRefreshToken = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(Duration.ZERO).build();
		user_service.admin_logout(adminCode);

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, deleteRefreshToken.toString()).build();
	}

	@PostMapping("/admin/logout")
	public ResponseEntity<?> logout()
	{
		ResponseCookie deleteRefreshToken = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(Duration.ZERO).build();

		return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, deleteRefreshToken.toString()).build();
	}

//	Admin Delete Account
	@PostMapping("/admin/delete/{adminCode}")
	public ResponseEntity<?> deleteAdmin(@PathVariable String adminCode)
	{
		ResponseCookie deleteRefreshToken = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(Duration.ZERO).build();
		user_service.admin_delete(adminCode);

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, deleteRefreshToken.toString()).build();
	}
	
//	Customer Register
	@PostMapping("/customer/register")
	public UserModel customer_add(@RequestBody UserModel customer)
	{
		return user_service.customer_register(customer);
	}
	
//	Customer Login
//	Customer Forgot Password
//	Customer Delete Account
	
//	Delivery Partner Register
	@PostMapping("/delivery_partner/register")
	public UserModel delivery_partner_add(@RequestBody UserModel delivery_partner)
	{
		return user_service.delivery_partner_register(delivery_partner);
	}
	
//	Delivery Partner Login
//	Delivery Partner Forgot Password
//	Delivery Partner Delete Account
}
