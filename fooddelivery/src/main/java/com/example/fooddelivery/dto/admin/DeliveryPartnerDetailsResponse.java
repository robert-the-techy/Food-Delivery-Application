package com.example.fooddelivery.dto.admin;

import java.util.List;

public record DeliveryPartnerDetailsResponse(DeliveryPartnerStats stats, List<DeliveryPartnerRows> rows){}