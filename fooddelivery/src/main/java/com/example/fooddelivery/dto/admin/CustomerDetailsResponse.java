package com.example.fooddelivery.dto.admin;

import java.util.List;

public record CustomerDetailsResponse(CustomerStats stats, List<CustomerRows> rows) {}
