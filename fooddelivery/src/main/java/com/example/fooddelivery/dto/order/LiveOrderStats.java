package com.example.fooddelivery.dto.order;

public record LiveOrderStats(
        long activeOrders,
        long todayOrders,
        long yesterdayOrders,
        long ordersDiff,                 // today - yesterday (+ or -)
        long placedCount,
        long unassignedCount,
        long preparingCount,
        long preparingRestaurantCount,   // distinct restaurants
        long outForDeliveryCount,
        Long avgOutForDeliveryMinutes) {}
