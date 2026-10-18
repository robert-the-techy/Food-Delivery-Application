package com.example.fooddelivery.model.user;

import com.example.fooddelivery.model.UserModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class AdminDetails
{
    @Id
    private String employeeCode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "employee_code")
    private UserModel user;

    private LocalDateTime detailsUpdatedDate;
    private LocalDateTime passwordUpdatedDate;
    private LocalDateTime loggedInDate;
    private LocalDateTime loggedOutDate;

    public AdminDetails()
    {
        super();
    }

    public AdminDetails(UserModel user, LocalDateTime detailsUpdatedDate, LocalDateTime passwordUpdatedDate, LocalDateTime loggedInDate, LocalDateTime loggedOutDate) {
        this.user = user;
        this.detailsUpdatedDate = detailsUpdatedDate;
        this.passwordUpdatedDate = passwordUpdatedDate;
        this.loggedInDate = loggedInDate;
        this.loggedOutDate = loggedOutDate;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public LocalDateTime getDetailsUpdatedDate() {
        return detailsUpdatedDate;
    }

    public void setDetailsUpdatedDate(LocalDateTime detailsUpdatedDate) {
        this.detailsUpdatedDate = detailsUpdatedDate;
    }

    public LocalDateTime getPasswordUpdatedDate() {
        return passwordUpdatedDate;
    }

    public void setPasswordUpdatedDate(LocalDateTime passwordUpdatedDate) {
        this.passwordUpdatedDate = passwordUpdatedDate;
    }

    public LocalDateTime getLoggedInDate() {
        return loggedInDate;
    }

    public void setLoggedInDate(LocalDateTime loggedInDate) {
        this.loggedInDate = loggedInDate;
    }

    public LocalDateTime getLoggedOutDate() {
        return loggedOutDate;
    }

    public void setLoggedOutDate(LocalDateTime loggedOutDate) {
        this.loggedOutDate = loggedOutDate;
    }
}
