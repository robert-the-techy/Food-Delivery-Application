package com.example.fooddelivery.dto.admin;

public record CustomerStats(
        long totalCustomers,
        long activeCustomers,
        long inactiveCustomers,
        long blockedCustomers
) {}
