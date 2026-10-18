package com.example.fooddelivery.dto.order;

import com.example.fooddelivery.enumvalues.CuisineType;

import java.util.List;
import java.util.Set;

public record RestaurantStatsResponse(
        long total,
        long open,
        long closed,
        long inactive,
        TopRated topRated,
        List<RestaurantCardResponse> restaurants) {

    public record TopRated(String restaurantCode,
                           String restaurantName,
                           Double restaurantRating,
                           long menuItems,
                           long ordersToday) {}

    public record RestaurantCardResponse(
            String restaurantCode,
            String restaurantName,
            String restaurantImage,
            Double restaurantRating,
            Set<CuisineType> cuisineTypes,
            String areaName,
            String cityName,
            long menuItems,
            String availability) {}
}