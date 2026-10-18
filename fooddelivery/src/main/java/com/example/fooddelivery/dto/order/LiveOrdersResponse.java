package com.example.fooddelivery.dto.order;

import java.util.List;

public record LiveOrdersResponse(LiveOrderStats stats, List<LiveOrderRow> orders) {}
