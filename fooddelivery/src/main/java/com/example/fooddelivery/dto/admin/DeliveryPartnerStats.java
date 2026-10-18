package com.example.fooddelivery.dto.admin;

public record DeliveryPartnerStats(
        long totalPartners,
        long onlinePartners,
        long offlinePartners,
        long blockedPartners
){}
