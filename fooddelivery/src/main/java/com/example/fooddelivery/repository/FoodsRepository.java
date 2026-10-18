package com.example.fooddelivery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fooddelivery.model.FoodsModel;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FoodsRepository extends JpaRepository<FoodsModel,Integer>
{
    long countByFoodRestaurant_RestaurantCode(String restaurantCode);

    @Query("select f.foodRestaurant.restaurantCode, count(f) from FoodsModel f group by f.foodRestaurant.restaurantCode")
    List<Object[]> countMenuItemsPerRestaurant();
}
