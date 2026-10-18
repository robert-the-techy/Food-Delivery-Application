package com.example.fooddelivery.dto.admin;

import com.example.fooddelivery.enumvalues.DeliveryPartnerRatings;
import com.example.fooddelivery.enumvalues.DeliveryPartnerStatus;
import com.example.fooddelivery.enumvalues.DeliveryPartnerVehicleType;
import com.example.fooddelivery.model.user.AddressModel;

import java.time.LocalDateTime;

public record DeliveryPartnerRows(
        String partnerCode,
        String partnerName,
        String partnerEmail,
        String partnerPhone,
        DeliveryPartnerRatings partnerRatings,
        DeliveryPartnerStatus partnerStatus,
        LocalDateTime partnerJoinedDate,
        long partnerDeliveries,
        DeliveryPartnerVehicleType partnerVehicleType,
        AddressModel partnerAddress
){}
