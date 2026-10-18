package com.example.fooddelivery.model;

import com.example.fooddelivery.enumvalues.User_Roles;

import com.example.fooddelivery.model.user.AddressModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class UserModel
{
	@Id
	@Column(name = "user_code", nullable = false, updatable = false,unique = true)
	private String userCode;
	
	String userName;


	private String userDateOfBirth;

	@Column(unique=true,nullable=false)
	String userEmail;
	String userPhone;

	@Enumerated(EnumType.STRING)
	User_Roles userRole;

	String userPassword;
	boolean userRememberMe;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_address")
	private AddressModel userAddress;

	public UserModel() {
		super();
	}

	public UserModel(String userName, String userDateOfBirth, String userEmail, String userPhone, User_Roles userRole, String userPassword, boolean userRememberMe, AddressModel userAddress) {
		this.userName = userName;
		this.userDateOfBirth = userDateOfBirth;
		this.userEmail = userEmail;
		this.userPhone = userPhone;
		this.userRole = userRole;
		this.userPassword = userPassword;
		this.userRememberMe = userRememberMe;
		this.userAddress = userAddress;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserDateOfBirth() {
		return userDateOfBirth;
	}

	public void setUserDateOfBirth(String userDateOfBirth) {
		this.userDateOfBirth = userDateOfBirth;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public User_Roles getUserRole() {
		return userRole;
	}

	public void setUserRole(User_Roles userRole) {
		this.userRole = userRole;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public boolean isUserRememberMe() {
		return userRememberMe;
	}

	public void setUserRememberMe(boolean userRememberMe) {
		this.userRememberMe = userRememberMe;
	}

	public AddressModel getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(AddressModel userAddress) {
		this.userAddress = userAddress;
	}
}
