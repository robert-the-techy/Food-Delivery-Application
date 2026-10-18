package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.dto.order.LiveOrderRow;
import com.example.fooddelivery.dto.order.LiveOrderStats;
import com.example.fooddelivery.dto.order.LiveOrdersResponse;
import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.repository.FoodOrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AdminLiveOrdersService
{
    @Autowired
    FoodOrderRepository foodOrderRepository;

    @Transactional(readOnly = true)
    public LiveOrdersResponse getLiveOrders()
    {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime yesterdayStart = todayStart.minusDays(1);

        long todayOrders = foodOrderRepository.countByOrderDateBetween(todayStart,now);
        long yesterdayOrders = foodOrderRepository.countByOrderDateBetween(yesterdayStart,todayStart);

        List<FoodOrderModel> activeOrders = foodOrderRepository.findActive(List.of(Order_Status.PLACED,Order_Status.PREPARING,Order_Status.OUT_OF_DELIVERY));

        long placed = 0;
        long preparing = 0;
        long outOfDelivery = 0;
        long unassigned = 0;

        Set<Object> preparingRestaurants = new HashSet<>();
        List<Long> waitMinutes = new ArrayList<>();

        for (FoodOrderModel o : activeOrders)
        {
            if(o.getDeliveryPartner() == null)
            {
                unassigned++;
            }

            switch (o.getOrderStatus())
            {
                case PLACED -> placed++;
                case PREPARING ->
                {
                    preparing++;

                    o.getItems().forEach(i -> preparingRestaurants.add(i.getFood().getRestaurantOfFood().getRestaurantCode()));
                }
                case OUT_OF_DELIVERY ->
                {
                    outOfDelivery++;

                    if (o.getOutOfDeliveryTime() != null)
                    {
                        waitMinutes.add(Duration.between(o.getOutOfDeliveryTime(),now).toMinutes());
                    }
                }
                default -> {}
            }
        }

        Long avg = waitMinutes.isEmpty() ? null : Math.round(waitMinutes.stream().mapToLong(Long::longValue).average().orElse(0));

        LiveOrderStats stats = new LiveOrderStats(activeOrders.size(),todayOrders,yesterdayOrders,todayOrders-yesterdayOrders,placed,unassigned,preparing,preparingRestaurants.size(),outOfDelivery,avg);

        List<LiveOrderRow> rows = activeOrders.stream().map(o ->
                {
                    var firstItem = o.getItems().isEmpty() ? null : o.getItems().get(0);
                    var restaurant = firstItem == null ? null : firstItem.getFood().getRestaurantOfFood();

                    return new LiveOrderRow(
                            o.getOrderId(),
                            o.getCustomer().getUserName(),
                            o.getCustomer().getUserPhone(),
                            restaurant == null ? "-" : restaurant.getRestaurantName(),
                            restaurant == null ? "" : restaurant.getRestaurantAddress().getAreaName(),
                            o.getDeliveryPartner() == null ? null : o.getDeliveryPartner().getUserName(),
                            o.getTotalFoodItems(),
                            o.getTotalAmount(),
                            o.getOrderDate(),
                            o.getOrderStatus());
                }).toList();

        return new LiveOrdersResponse(stats,rows);
    }
}
