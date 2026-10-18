package com.example.fooddelivery.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.errorsandexceptions.BadRequest;
import com.example.fooddelivery.errorsandexceptions.UserNotFound;
import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.model.FoodsModel;
import com.example.fooddelivery.model.RestaurantModel;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.repository.FoodOrderRepository;
import com.example.fooddelivery.repository.FoodsRepository;
import com.example.fooddelivery.repository.RestaurantRepository;
import com.example.fooddelivery.repository.UserRepository;

@Service
public class AdminInteractionService 
{
	@Autowired
	UserRepository user_for_admin;
	
	@Autowired
	RestaurantRepository restaurant_for_admin;
	
	@Autowired
	FoodOrderRepository foodorder_for_admin;
	
	@Autowired
	FoodsRepository foods_for_admin;
	
//	Restaurant Adding
	public RestaurantModel add_restaurant(RestaurantModel restaurant)
	{
		return restaurant_for_admin.save(restaurant);
	}
	
//	All Restaurants Adding
	public List<RestaurantModel> add_restaurants(List<RestaurantModel> restaurants)
	{
		return restaurant_for_admin.saveAll(restaurants);
	}
	
//	View Restaurant
//	public RestaurantModel view_restaurant(int restaurant_id)
//	{
//		return restaurant_for_admin.findById(restaurant_id).orElseThrow(()-> new UserNotFound("Restaurant not found!"));
//	}
	
//	View All Restaurants
	public List<RestaurantModel> view_restaurants()
	{
		return restaurant_for_admin.findAll();
	}
	
//	Edit Restaurant Details
//	public RestaurantModel edit_restaurant(RestaurantModel new_restaurant_details,int restaurant_id)
//	{
//		RestaurantModel updated_restaurant = restaurant_for_admin.findById(restaurant_id).orElseThrow(()-> new UserNotFound("Restaurant not found!"));
//		updated_restaurant.setRestaurantName(new_restaurant_details.getRestaurantName());
//		updated_restaurant.setRestaurantLocation(new_restaurant_details.getRestaurantLocation());
//
//		return restaurant_for_admin.save(updated_restaurant);
//	}
	
//	Remove Restaurant
//	public String remove_restaurant(int restaurant_id)
//	{
//		restaurant_for_admin.deleteById(restaurant_id);
//		return "";
//	}
	
//	Food Adding
	public FoodsModel add_food(FoodsModel food)
	{
		return foods_for_admin.save(food);
	}
	
//	Foods Adding
	public List<FoodsModel> add_foods(List<FoodsModel> foods)
	{
		return foods_for_admin.saveAll(foods);
	}
	
//	View Food
	public FoodsModel view_food(int food_id)
	{
		return foods_for_admin.findById(food_id).orElseThrow(()-> new UserNotFound("Food not found!"));
	}
	
//	View Foods
	public List<FoodsModel> view_foods()
	{
		return foods_for_admin.findAll();
	}
	
//	Edit Food
	public FoodsModel edit_food(FoodsModel food,int food_id)
	{
		FoodsModel updated_food = foods_for_admin.findById(food_id).orElseThrow(()-> new UserNotFound("Food not found!"));
		updated_food.setFoodName(food.getFoodName());
		updated_food.setFoodPrice(food.getFoodPrice());
		updated_food.setRestaurantOfFood(food.getRestaurantOfFood());
		
		return foods_for_admin.save(updated_food);
	}
	
//	Remove Food
	public String remove_food(int food_id)
	{
		foods_for_admin.deleteById(food_id);
		return "";
	}
	
//	View Customer
	public UserModel view_customer(String customer_code)
	{
		UserModel customer = user_for_admin.findByUserCode(customer_code).orElseThrow(()-> new RuntimeException("Customer not found!"));
		if(customer.getUserRole()==User_Roles.CUSTOMER)
		{
			return customer;
		}
		else
		{
			throw new BadRequest("Bad Request!");
		}
	}
	
//	View Customers
	public List<UserModel> view_customers()
	{
		return user_for_admin.findAllByUserRole(User_Roles.CUSTOMER);
	}
	
//	View Delivery Partner
	public UserModel view_delivery_partner(String delivery_partner_code)
	{
		UserModel delivery_partner = user_for_admin.findByUserCode(delivery_partner_code).orElseThrow(()-> new RuntimeException("Delivery partner not found!"));
		if(delivery_partner.getUserRole()==User_Roles.DELIVERY_PARTNER)
		{
			return delivery_partner;
		}
		else
		{
			throw new BadRequest("Bad Request!");
		}
	}
	
//	View Delivery Partners
	public List<UserModel> view_delivery_partners()
	{
		return user_for_admin.findAllByUserRole(User_Roles.DELIVERY_PARTNER);
	}
	
//	View Orders
	public List<FoodOrderModel> view_orders()
	{
		return foodorder_for_admin.findAll();
	}
}
