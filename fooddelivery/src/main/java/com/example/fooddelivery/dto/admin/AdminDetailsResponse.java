package com.example.fooddelivery.dto.admin;

import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.model.user.AddressModel;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class AdminDetailsResponse
{
    String userCode;
    String userName;
    String userDateOfBirth;
    String userEmail;
    String userPhone;

    @Enumerated(EnumType.STRING)
    User_Roles userRole;

    AddressResponse userAddress;
    String userCurrentWebsiteArrivedDate;
    String userDetailsUpdatedDate;
    String userPasswordUpdatedDate;
    String userLoggedInDate;
    String userLoggedOutDate;

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

    public AddressResponse getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(AddressResponse userAddress) {
        this.userAddress = userAddress;
    }

    public String getUserCurrentWebsiteArrivedDate() {
        return userCurrentWebsiteArrivedDate;
    }

    public void setUserCurrentWebsiteArrivedDate(String userCurrentWebsiteArrivedDate) {
        this.userCurrentWebsiteArrivedDate = userCurrentWebsiteArrivedDate;
    }

    public String getUserDetailsUpdatedDate() {
        return userDetailsUpdatedDate;
    }

    public void setUserDetailsUpdatedDate(String userDetailsUpdatedDate) {
        this.userDetailsUpdatedDate = userDetailsUpdatedDate;
    }

    public String getUserPasswordUpdatedDate() {
        return userPasswordUpdatedDate;
    }

    public void setUserPasswordUpdatedDate(String userPasswordUpdatedDate) {
        this.userPasswordUpdatedDate = userPasswordUpdatedDate;
    }

    public String getUserLoggedInDate() {
        return userLoggedInDate;
    }

    public void setUserLoggedInDate(String userLoggedInDate) {
        this.userLoggedInDate = userLoggedInDate;
    }

    public String getUserLoggedOutDate() {
        return userLoggedOutDate;
    }

    public void setUserLoggedOutDate(String userLoggedOutDate) {
        this.userLoggedOutDate = userLoggedOutDate;
    }
}
