package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.repository.FoodOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AdminOrderHistoryService
{
    @Autowired
    FoodOrderRepository foodOrderRepository;

    public Map<String,Long> getStats()
    {
        LocalDate today = LocalDate.now();
        LocalDateTime todayStart = today.atStartOfDay();
        LocalDateTime todayEnd = today.plusDays(1).atStartOfDay();
        LocalDateTime yesterdayStart = today.minusDays(1).atStartOfDay();

        long totalDelivered = foodOrderRepository.countByOrderStatus(Order_Status.DELIVERED);
        long totalCancelled = foodOrderRepository.countByOrderStatus(Order_Status.CANCELLED);

        Map<String, Long> m = new LinkedHashMap<>();
        m.put("totalOrders", totalDelivered + totalCancelled);
        m.put("totalDelivered", totalDelivered);
        m.put("totalCancelled", totalCancelled);

        m.put("todayOrders", foodOrderRepository.countByOrderDateBetween(todayStart, todayEnd));
        m.put("yesterdayOrders", foodOrderRepository.countByOrderDateBetween(yesterdayStart, todayStart));

        m.put("todayDelivered", foodOrderRepository.countByOrderDateBetweenAndOrderStatus(todayStart, todayEnd, Order_Status.DELIVERED));
        m.put("yesterdayDelivered", foodOrderRepository.countByOrderDateBetweenAndOrderStatus(yesterdayStart, todayStart, Order_Status.DELIVERED));

        m.put("todayCancelled", foodOrderRepository.countByOrderDateBetweenAndOrderStatus(todayStart, todayEnd, Order_Status.CANCELLED));
        m.put("yesterdayCancelled", foodOrderRepository.countByOrderDateBetweenAndOrderStatus(yesterdayStart, todayStart, Order_Status.CANCELLED));

        return m;
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> getRows(LocalDate date)
    {
        List<FoodOrderModel> orders = foodOrderRepository.findByOrderDateBetweenAndOrderStatusInOrderByOrderDateDesc(date.atStartOfDay(), date.plusDays(1).atStartOfDay(), List.of(Order_Status.DELIVERED, Order_Status.CANCELLED));

        List<Map<String,Object>> rows = new ArrayList<>();

        for (FoodOrderModel o : orders)
        {
            var firstItem = o.getItems().isEmpty() ? null : o.getItems().get(0);
            var restaurant = firstItem == null ? null : firstItem.getFood().getRestaurantOfFood();

            Map<String, Object> row = new HashMap<>();
            row.put("orderId", o.getOrderId());
            row.put("status", o.getOrderStatus().name());
            row.put("time", o.getCompleteTime() != null ? o.getCompleteTime() : o.getOrderDate());
            row.put("reason", o.getCancelReasons());
            row.put("customerId", o.getCustomer().getUserCode());
            row.put("customerName", o.getCustomer().getUserName());
            row.put("customerPhone", o.getCustomer().getUserPhone());
            row.put("restaurantName", restaurant == null ? "-" : restaurant.getRestaurantName());
            row.put("restaurantArea", restaurant == null ? "" : restaurant.getRestaurantAddress().getAreaName());
            row.put("amount", o.getTotalAmount());
            row.put("payment", o.getPaymentMode());
            rows.add(row);
        }
        return rows;
    }
}
