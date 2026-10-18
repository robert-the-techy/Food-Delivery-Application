//package com.example.fooddelivery.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.fooddelivery.enumvalues.Order_Status;
//import com.example.fooddelivery.enumvalues.User_Roles;
//import com.example.fooddelivery.errorsandexceptions.BadRequest;
//import com.example.fooddelivery.errorsandexceptions.UserNotFound;
//import com.example.fooddelivery.model.FoodOrderModel;
//import com.example.fooddelivery.model.FoodsModel;
//import com.example.fooddelivery.model.UserModel;
//import com.example.fooddelivery.repository.FoodOrderRepository;
//import com.example.fooddelivery.repository.FoodsRepository;
//import com.example.fooddelivery.repository.UserRepository;
//
//@Service
//public class CustomerInteractionService
//{
//	@Autowired
//	UserRepository user_for_customer;
//
//	@Autowired
//	FoodOrderRepository foodorder_for_customer;
//
//	@Autowired
//	FoodsRepository foods_for_customer;
//
////	View Food
//	public FoodsModel view_food(int food_id)
//	{
//		return foods_for_customer.findById(food_id).orElseThrow(()-> new UserNotFound("Food not found!"));
//	}
//
////	View Foods
//	public List<FoodsModel> view_foods()
//	{
//		return foods_for_customer.findAll();
//	}
//
////	Order Foods
//	public FoodOrderModel order_foods(String customer_code,List<Integer> food_ids)
//	{
//		FoodOrderModel booked_orders = new FoodOrderModel();
//
//		UserModel customer = user_for_customer.findByUserCode(customer_code).orElseThrow(()-> new RuntimeException("Customer not found!"));
//
//		booked_orders.setCustomerOfOrder(customer);
//		booked_orders.setFoodOfOrder(foods_for_customer.findAllById(food_ids));
//		booked_orders.setStatusOfOrder(Order_Status.PLACED);
//
//		if(customer.getUserRole()==User_Roles.CUSTOMER)
//		{
//			return foodorder_for_customer.save(booked_orders);
//		}
//		else
//		{
//			throw new BadRequest("Bad Request");
//		}
//	}
//
////	Cancel Order
//	public FoodOrderModel cancel_order(String customer_code)
//	{
//		UserModel customer=user_for_customer.findByUserCode(customer_code).orElseThrow(()-> new RuntimeException("Customer not found!"));
//		FoodOrderModel cancelled_orders = foodorder_for_customer.findByCustomerOfOrder(customer).orElseThrow(()-> new UserNotFound("Customer not found!"));
//
//		if(cancelled_orders.getStatusOfOrder()!=Order_Status.CANCELLED && cancelled_orders.getStatusOfOrder()!=null)
//		{
//			cancelled_orders.setStatusOfOrder(Order_Status.CANCELLED);
//		}
//		else if(cancelled_orders.getStatusOfOrder()==Order_Status.CANCELLED)
//		{
//			throw new BadRequest("Order have already cancelled!");
//		}
//		else if(cancelled_orders.getStatusOfOrder()==null)
//		{
//			throw new BadRequest("You did not ordered yet!");
//		}
//
//		return foodorder_for_customer.save(cancelled_orders);
//	}
//}
