//package com.example.fooddelivery.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
////import com.example.fooddelivery.model.FoodOrderModel;
//import com.example.fooddelivery.service.DeliveryPartnerInteractionService;
//
//@RestController
//@RequestMapping("/delivery_partner")
//public class DeliveryPartnerInteractionController
//{
//	@Autowired
//	DeliveryPartnerInteractionService delivery_partner_service;
//
////	View Allotted Orders
////	@GetMapping("/view/orders/{delivery_partner_code}")
////	public List<FoodOrderModel> select_orders(@PathVariable String delivery_partner_code)
////	{
////		return delivery_partner_service.view_alloted_orders(delivery_partner_code);
////	}
//
////	View Allotted Order
////	@GetMapping("/view/order/{order_id}")
////	public FoodOrderModel select_order(@PathVariable int order_id)
////	{
////		return delivery_partner_service.view_alloted_order(order_id);
////	}
//
////	Give Out of Delivery Status for Order
////	@PutMapping("/food/out_of_delivery/{order_id}")
////	public FoodOrderModel status_out_of_delivery(@PathVariable int order_id)
////	{
////		return delivery_partner_service.set_out_of_delivery(order_id);
////	}
//
////	Hand Over Food & Give Ordered Status for Order
////	@PutMapping("/food/delivered/{order_id}")
////	public FoodOrderModel status_delivered(@PathVariable int order_id)
////	{
////		return delivery_partner_service.set_delivered(order_id);
////	}
//
////	Cancel Order
////	@PutMapping("/food/cancelled/{order_id}")
////	public FoodOrderModel status_cancelled(@PathVariable int order_id)
////	{
////		return delivery_partner_service.set_cancelled(order_id);
////	}
//
////	Assign Delivery Partner for Order
////	@PutMapping("/assign/{order_id}/{delivery_partner_code}")
////	public FoodOrderModel set_delivery_partner(@PathVariable int order_id,@PathVariable String delivery_partner_code)
////	{
////		return delivery_partner_service.assign_delivery_partner(order_id, delivery_partner_code);
////	}
//
////	Remove Delivery Partner for Order
////	@PutMapping("/remove/delivery_partner/{order_id}")
////	public FoodOrderModel delete_delivery_partner(@PathVariable int order_id)
////	{
////		return delivery_partner_service.remove_delivery_partner(order_id);
////	}
//}
