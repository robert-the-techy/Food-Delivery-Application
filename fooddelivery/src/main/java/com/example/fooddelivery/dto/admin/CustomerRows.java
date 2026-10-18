package com.example.fooddelivery.dto.admin;

import com.example.fooddelivery.enumvalues.CustomerLevel;
import com.example.fooddelivery.enumvalues.CustomerStatus;
import com.example.fooddelivery.model.user.AddressModel;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CustomerRows(
        String customerCode,
        String customerName,
        String customerEmail,
        String customerPhone,
        CustomerLevel customerLevel,
        CustomerStatus customerStatus,
        LocalDateTime customerJoinedDate,
        long customerOrdersCount,
        BigDecimal customerSpentAmount,
        AddressModel customerAddress
){}
