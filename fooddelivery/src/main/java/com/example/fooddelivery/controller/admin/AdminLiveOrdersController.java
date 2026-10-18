package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.dto.order.LiveOrdersResponse;
import com.example.fooddelivery.service.admin.AdminLiveOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/live-orders")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminLiveOrdersController
{
    @Autowired
    AdminLiveOrdersService adminLiveOrdersService;

    @GetMapping()
    public LiveOrdersResponse liveOrders()
    {
        return adminLiveOrdersService.getLiveOrders();
    }
}
