package com.example.fooddelivery.controller;

import java.util.List;

import com.example.fooddelivery.model.FoodOrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.model.FoodsModel;
import com.example.fooddelivery.model.RestaurantModel;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.service.AdminInteractionService;

@RestController
@RequestMapping("/admin")
public class AdminInteractionController {

	@Autowired
	AdminInteractionService admin_service;
	
//	Restaurant Adding
	@PostMapping("/add/restaurant")
	public RestaurantModel insert_restaurant(@RequestBody RestaurantModel restaurant)
	{
		return admin_service.add_restaurant(restaurant);
	}
	
//	All Restaurants Adding
	@PostMapping("/add/restaurants")
	public List<RestaurantModel> insert_restaurants(@RequestBody List<RestaurantModel> restaurants)
	{
		return admin_service.add_restaurants(restaurants);
	}
	
//	View Restaurant
//	@GetMapping("/view/restaurant/{restaurant_id}")
//	public RestaurantModel select_restaurant(@PathVariable int restaurant_id)
//	{
//		return admin_service.view_restaurant(restaurant_id);
//	}
	
//	View All Restaurants
	@GetMapping("/view/restaurants")
	public List<RestaurantModel> select_restaurants()
	{
		return admin_service.view_restaurants();
	}
	
//	Edit Restaurant
//	@PutMapping("/edit/restaurant/{restaurant_id}")
//	public RestaurantModel update_restaurant(@RequestBody RestaurantModel restaurant,@PathVariable int restaurant_id)
//	{
//		return admin_service.edit_restaurant(restaurant, restaurant_id);
//	}
	
//	Remove Restaurant
//	@DeleteMapping("/remove/restaurant/{restaurant_id}")
//	public String delete_restaurant(@PathVariable int restaurant_id)
//	{
//		admin_service.remove_restaurant(restaurant_id);
//		return "Restaurant removed successfully!";
//	}
	
//	Food Adding
	@PostMapping("/add/food")
	public FoodsModel add_food(@RequestBody FoodsModel food)
	{
		return admin_service.add_food(food);
	}
	
//	Foods Adding
	@PostMapping("/add/foods")
	public List<FoodsModel> add_foods(@RequestBody List<FoodsModel> foods)
	{
		return admin_service.add_foods(foods);
	}
	
//	View Food
	@GetMapping("/view/food/{food_id}")
	public FoodsModel view_food(@PathVariable int food_id)
	{
		return admin_service.view_food(food_id);
	}
	
//	View Foods
	@GetMapping("view/foods")
	public List<FoodsModel> view_foods()
	{
		return admin_service.view_foods();
	}
	
//	Edit Food
	@PutMapping("/edit/food/{food_id}")
	public FoodsModel update_food(@RequestBody FoodsModel food,@PathVariable int food_id)
	{
		return admin_service.edit_food(food, food_id);
	}
	
//	Remove Food
	@DeleteMapping("/remove/food/{food_id}")
	public String delete_food(@PathVariable int food_id)
	{
		admin_service.remove_food(food_id);
		return "Food removed successfully!";
	}
	
//	View Customer
	@GetMapping("/view/user/customer/{customer_code}")
	public UserModel select_customer(@PathVariable String customer_code)
	{
		return admin_service.view_customer(customer_code);
	}
	
//	View Customers
	@GetMapping("/view/user/customers")
	public List<UserModel> select_customers()
	{
		return admin_service.view_customers();
	}
	
//	View Delivery Partner
	@GetMapping("/view/user/delivery_partner/{delivery_partner_code}")
	public UserModel select_delivery_partner(@PathVariable String delivery_partner_code)
	{
		return admin_service.view_delivery_partner(delivery_partner_code);
	}
	
//	View Delivery Partners
	@GetMapping("/view/user/delivery_partners")
	public List<UserModel> select_delivery_partners()
	{
		return admin_service.view_delivery_partners();
	}
	
//	View Orders
	@GetMapping("/view/orders")
	public List<FoodOrderModel> select_orders()
	{
		return admin_service.view_orders();
	}
}
