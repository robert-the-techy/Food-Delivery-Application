package com.example.fooddelivery.controller.order;

import com.example.fooddelivery.dto.order.WeeklyRevenueRequest;
import com.example.fooddelivery.service.order.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RevenueController
{
    @Autowired
    RevenueService revenueService;

    @PostMapping("/weekly-revenue")
    public List<WeeklyRevenueRequest> getWeeklyRevenue()
    {
        return revenueService.getCurrentWeekRevenue();
    }
}
