package com.example.fooddelivery.repository.order;

import com.example.fooddelivery.model.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long>
{
    @Query("""
       select count(distinct o.orderId) from OrderItem i join i.order o join i.food f where f.foodRestaurant.restaurantCode = :code and o.orderDate >= :start and o.orderDate < :end
        """)
    long countOrdersBetween(@Param("code") String code,@Param("start") LocalDateTime start,@Param("end") LocalDateTime end);
}
