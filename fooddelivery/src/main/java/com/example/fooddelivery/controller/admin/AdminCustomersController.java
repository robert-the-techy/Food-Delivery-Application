package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.dto.admin.CustomerDetailsResponse;
import com.example.fooddelivery.service.admin.AdminCustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer-details")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminCustomersController
{
    @Autowired
    AdminCustomersService adminCustomersService;

    @GetMapping()
    public CustomerDetailsResponse customerDetails()
    {
        return adminCustomersService.getCustomerDetails();
    }
}
