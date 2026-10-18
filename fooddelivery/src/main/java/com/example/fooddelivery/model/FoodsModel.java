package com.example.fooddelivery.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class FoodsModel 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int foodId;
	
	String foodName;
	int foodPrice;
	
	@ManyToOne
	@JoinColumn(name="restaurant_name")
	RestaurantModel foodRestaurant;

	public FoodsModel()
	{
		super();
	}

	public FoodsModel(String foodName, int foodPrice, RestaurantModel foodRestaurant) {
		super();
		this.foodName = foodName;
		this.foodPrice = foodPrice;
		this.foodRestaurant = foodRestaurant;
	}

	public int getFoodId() {
		return foodId;
	}

	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public int getFoodPrice() {
		return foodPrice;
	}

	public void setFoodPrice(int foodPrice) {
		this.foodPrice = foodPrice;
	}

	public RestaurantModel getFoodRestaurant() {
		return foodRestaurant;
	}

	public void setFoodRestaurant(RestaurantModel foodRestaurant) {
		this.foodRestaurant = foodRestaurant;
	}
}
