package com.example.fooddelivery.model.user;

import com.example.fooddelivery.enumvalues.CustomerLevel;
import com.example.fooddelivery.enumvalues.CustomerStatus;
import com.example.fooddelivery.model.UserModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CustomerDetails
{
    @Id
    private String employeeCode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "employee_code")
    private UserModel user;

    @Enumerated(EnumType.STRING)
    private CustomerLevel customerLevel;

    @Enumerated(EnumType.STRING)
    private CustomerStatus customerStatus;

    private LocalDateTime joinedDate;

    public CustomerDetails()
    {
        super();
    }

    public CustomerDetails(UserModel user, CustomerLevel customerLevel, CustomerStatus customerStatus, LocalDateTime joinedDate) {
        this.user = user;
        this.customerLevel = customerLevel;
        this.customerStatus = customerStatus;
        this.joinedDate = joinedDate;
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

    public CustomerLevel getCustomerLevel() {
        return customerLevel;
    }

    public void setCustomerLevel(CustomerLevel customerLevel) {
        this.customerLevel = customerLevel;
    }

    public CustomerStatus getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(CustomerStatus customerStatus) {
        this.customerStatus = customerStatus;
    }

    public LocalDateTime getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(LocalDateTime joinedDate) {
        this.joinedDate = joinedDate;
    }
}
