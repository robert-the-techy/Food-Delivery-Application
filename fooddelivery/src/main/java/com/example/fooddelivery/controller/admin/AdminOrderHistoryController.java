package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.service.admin.AdminOrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order-history")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminOrderHistoryController
{
    @Autowired
    AdminOrderHistoryService adminOrderHistoryService;

    @GetMapping("/stats")
    public Map<String,Long> stats()
    {
        return adminOrderHistoryService.getStats();
    }

    @GetMapping("/rows")
    public List<Map<String, Object>> rows(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date)
    {
        return adminOrderHistoryService.getRows(date);
    }
}
