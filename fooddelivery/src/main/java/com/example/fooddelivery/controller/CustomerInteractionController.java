//package com.example.fooddelivery.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
////import com.example.fooddelivery.model.FoodOrderModel;
//import com.example.fooddelivery.model.FoodsModel;
//import com.example.fooddelivery.service.CustomerInteractionService;
//
//@RestController
//@RequestMapping("/customer")
//public class CustomerInteractionController
//{
//	@Autowired
//	CustomerInteractionService customer_service;
//
////	View Food
//	@GetMapping("/view/food/{food_id}")
//	public FoodsModel select_food(@PathVariable int food_id)
//	{
//		return customer_service.view_food(food_id);
//	}
//
////	View Foods
//	@GetMapping("/view/foods")
//	public List<FoodsModel> select_foods()
//	{
//		return customer_service.view_foods();
//	}
//
////	Order Foods
////	@PostMapping("/order/{customer_code}")
////	public FoodOrderModel insert_foods(@PathVariable String customer_code,@RequestBody List<Integer> food_ids)
////	{
////		return customer_service.order_foods(customer_code, food_ids);
////	}
//
////	Cancel Order
////	@PutMapping("/orders_cancel/{customer_code}")
////	public FoodOrderModel delete_order(@PathVariable String customer_code)
////	{
////		return customer_service.cancel_order(customer_code);
////	}
//}
