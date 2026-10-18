package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.dto.order.RestaurantStatsResponse;
import com.example.fooddelivery.service.admin.AdminRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/restaurant-details")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminRestaurantController
{
    @Autowired
    AdminRestaurantService adminRestaurantService;

    @GetMapping()
    public RestaurantStatsResponse restaurantDetails()
    {
        return adminRestaurantService.getRestaurantStats();
    }
}
