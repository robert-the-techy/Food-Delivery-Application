package com.example.fooddelivery.repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.enumvalues.Payment_Status;
import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.repository.order.CustomerOrderTotals;
import com.example.fooddelivery.repository.order.DeliveryPartnerOrderTotals;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fooddelivery.model.FoodOrderModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodOrderRepository extends JpaRepository<FoodOrderModel,String>
{
	long countByOrderDateBetween(LocalDateTime start,LocalDateTime end);
	long countByOrderDateBetweenAndOrderStatus(LocalDateTime start, LocalDateTime end, Order_Status status);
	List<FoodOrderModel> findByCompleteTimeBetween(LocalDateTime start,LocalDateTime end);

	long countByOrderStatusIn(Collection<Order_Status> statuses);

	long countByOrderStatusInAndStartTimeBefore(List<Order_Status> statuses,LocalDateTime cutoff);
	long countByPaymentStatusIn(List<Payment_Status> statuses);

	@Query("select o from FoodOrderModel o where o.orderStatus in :statuses order by o.orderDate desc")
	List<FoodOrderModel> findActive(@Param("statuses") List<Order_Status> statuses);

	long countByOrderStatus(Order_Status status);

	List<FoodOrderModel> findByOrderDateBetweenAndOrderStatusInOrderByOrderDateDesc(LocalDateTime start, LocalDateTime end, Collection<Order_Status> statuses);

	@Query("""
        SELECT o.customer.userCode AS customerCode,COUNT(o) AS orders,SUM(o.totalAmount) AS spent FROM FoodOrderModel o WHERE o.orderStatus = :status GROUP BY o.customer.userCode
        """)
	List<CustomerOrderTotals> findCustomerTotals(@Param("status") Order_Status status);

	@Query("""
    SELECT o.deliveryPartner.userCode AS deliveryPartnerCode,COUNT(o) AS orders FROM FoodOrderModel o WHERE o.orderStatus = :status AND o.deliveryPartner IS NOT NULL GROUP BY o.deliveryPartner.userCode
        	""")
	List<DeliveryPartnerOrderTotals> findDeliveryPartnerTotals(@Param("status") Order_Status status);
}
