//package com.example.fooddelivery.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.fooddelivery.enumvalues.Order_Status;
//import com.example.fooddelivery.errorsandexceptions.UserNotFound;
//import com.example.fooddelivery.model.FoodOrderModel;
//import com.example.fooddelivery.model.UserModel;
//import com.example.fooddelivery.repository.FoodOrderRepository;
//import com.example.fooddelivery.repository.FoodsRepository;
//import com.example.fooddelivery.repository.UserRepository;
//
//@Service
//public class DeliveryPartnerInteractionService
//{
//	@Autowired
//	UserRepository user_for_delivery_partner;
//
//	@Autowired
//	FoodsRepository foods_for_delivery_partner;
//
//	@Autowired
//	FoodOrderRepository foodorder_for_delivery_partner;
//
////	View Allotted Orders
//	public List<FoodOrderModel> view_alloted_orders(String delivery_partner_code)
//	{
//		UserModel delivery_partner = user_for_delivery_partner.findByUserCode(delivery_partner_code).orElseThrow(()-> new RuntimeException("Delivery partner not found!"));
//		return foodorder_for_delivery_partner.findAllByDeliveryPartnerOfOrder(delivery_partner);
//	}
//
////	View Alloted Order
//	public FoodOrderModel view_alloted_order(int order_id)
//	{
//		return foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//	}
//
////	Give Out of Delivery Status for Order
//	public FoodOrderModel set_out_of_delivery(int order_id)
//	{
//		FoodOrderModel packed_order = foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//		packed_order.setStatusOfOrder(Order_Status.OUT_OF_DELIVERY);
//
//		return foodorder_for_delivery_partner.save(packed_order);
//	}
//
////	Hand Over Food & Give Ordered Status for Order
//	public FoodOrderModel set_delivered(int order_id)
//	{
//		FoodOrderModel delivered_order = foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//		delivered_order.setStatusOfOrder(Order_Status.DELIVERED);
//
//		return foodorder_for_delivery_partner.save(delivered_order);
//	}
//
////	Cancel Order
//	public FoodOrderModel set_cancelled(int order_id)
//	{
//		FoodOrderModel cancelled_order = foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//		cancelled_order.setStatusOfOrder(Order_Status.CANCELLED);
//
//		return foodorder_for_delivery_partner.save(cancelled_order);
//	}
//
////	Assign Delivery Partner for Order
//	public FoodOrderModel assign_delivery_partner(int order_id,String delivery_partner_code)
//	{
//		FoodOrderModel got_order_details = foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//		UserModel got_delivery_partner = user_for_delivery_partner.findByUserCode(delivery_partner_code).orElseThrow(()-> new RuntimeException("Delivery partner not found!"));
//
//		got_order_details.setDeliveryPartnerOfOrder(got_delivery_partner);
//		got_order_details.setStatusOfOrder(Order_Status.PREPARING);
//
//		return foodorder_for_delivery_partner.save(got_order_details);
//	}
//
////	Remove Delivery Partner for Order
//	public FoodOrderModel remove_delivery_partner(int order_id)
//	{
//		FoodOrderModel got_order_details = foodorder_for_delivery_partner.findById(order_id).orElseThrow(()-> new UserNotFound("Order not found!"));
//
//		got_order_details.setDeliveryPartnerOfOrder(null);
//		got_order_details.setStatusOfOrder(Order_Status.PREPARING);
//
//		return foodorder_for_delivery_partner.save(got_order_details);
//	}
//}
