package com.example.fooddelivery.repository;

import com.example.fooddelivery.enumvalues.Restaurant_Status;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fooddelivery.model.RestaurantModel;

public interface RestaurantRepository extends JpaRepository<RestaurantModel,String>
{
    long countByRestaurantStatus(Restaurant_Status status);


}
