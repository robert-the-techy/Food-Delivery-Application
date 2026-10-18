package com.example.fooddelivery.dto.order;

import com.example.fooddelivery.enumvalues.Order_Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LiveOrderRow(
        String orderId,
        String customerName,
        String customerPhone,
        String restaurantName,
        String restaurantArea,
        String deliveryPartnerName,      // null when not assigned
        int itemCount,
        BigDecimal totalAmount,
        LocalDateTime placedAt,
        Order_Status status) {}
