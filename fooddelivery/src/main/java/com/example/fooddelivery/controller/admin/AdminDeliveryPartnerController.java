package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.dto.admin.DeliveryPartnerDetailsResponse;
import com.example.fooddelivery.service.admin.AdminDeliveryPartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/delivery-partner-details")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDeliveryPartnerController
{
    @Autowired
    AdminDeliveryPartnerService adminDeliveryPartnerService;

    @GetMapping()
    public DeliveryPartnerDetailsResponse deliveryPartnerDetails()
    {
        return adminDeliveryPartnerService.getDeliveryPartnerDetails();
    }
}
