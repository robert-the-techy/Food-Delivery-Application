package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.enumvalues.Payment_Status;
import com.example.fooddelivery.enumvalues.Restaurant_Status;
import com.example.fooddelivery.enumvalues.ReviewType;
import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.repository.FoodOrderRepository;
import com.example.fooddelivery.repository.RestaurantRepository;
import com.example.fooddelivery.repository.order.OrderRevenueRepository;
import com.example.fooddelivery.repository.reviewrating.ReviewRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController
{
    @Autowired
    FoodOrderRepository foodOrderRepository;

    @Autowired
    OrderRevenueRepository orderRevenueRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    ReviewRatingRepository reviewRatingRepository;

    @PostMapping("/today")
    public Map<String,Object> today()
    {
        LocalDate today = LocalDate.now();

        LocalDateTime todayStart = today.atStartOfDay();
        LocalDateTime todayEnd = today.plusDays(1).atStartOfDay().plusNanos(1);
        LocalDateTime yesterdayStart = today.minusDays(1).atStartOfDay();
        LocalDateTime yesterdayEnd = todayStart.minusNanos(1);

        long orders = foodOrderRepository.countByOrderDateBetween(todayStart,todayEnd);
        long ordersYesterday = foodOrderRepository.countByOrderDateBetween(yesterdayStart,yesterdayEnd);

        long cancelled = foodOrderRepository.countByOrderDateBetweenAndOrderStatus(todayStart,todayEnd, Order_Status.CANCELLED);
        long cancelledYesterday = foodOrderRepository.countByOrderDateBetweenAndOrderStatus(yesterdayStart,yesterdayEnd, Order_Status.CANCELLED);

        double avg = avgMinutes(todayStart,todayEnd);
        double avgYesterday = avgMinutes(yesterdayStart,yesterdayEnd);

        long live = foodOrderRepository.countByOrderStatusIn(List.of(Order_Status.PLACED,Order_Status.PREPARING,Order_Status.OUT_OF_DELIVERY));

        BigDecimal revenue = orderRevenueRepository.sumAppCommissionByDate(today);

        LocalDateTime delayedCutOff = LocalDateTime.now().minusMinutes(30);
        long delayedOrders = foodOrderRepository.countByOrderStatusInAndStartTimeBefore(List.of(Order_Status.PLACED,Order_Status.PREPARING,Order_Status.OUT_OF_DELIVERY),delayedCutOff);
        long refundIssues = foodOrderRepository.countByPaymentStatusIn(List.of(Payment_Status.REFUNDED,Payment_Status.FAILED));
        long inactiveRestaurants = restaurantRepository.countByRestaurantStatus(Restaurant_Status.INACTIVE);
        long lowRatedRestaurants = reviewRatingRepository.findLowRatedTargetCodes(ReviewType.RESTAURANT).size();
        long lowRatedRiders = reviewRatingRepository.findLowRatedTargetCodes(ReviewType.DELIVERY_PARTNER).size();

        Map<String,Object> result = new HashMap<>();
        result.put("ordersToday",orders);
        result.put("ordersChange",percentageChange(orders,ordersYesterday));
        result.put("revenueToday",revenue);
        result.put("liveOrders",live);
        result.put("avgDeliveryMinutes",Math.round(avg));
        result.put("avgChangeMinutes",(avg == 0 || avgYesterday == 0) ? null : Math.round(avg - avgYesterday));
        result.put("cancelledToday",cancelled);
        result.put("cancelledChange",percentageChange(cancelled,cancelledYesterday));

        result.put("delayedOrders",delayedOrders);
        result.put("refundIssues",refundIssues);
        result.put("inactiveRestaurants",inactiveRestaurants);
        result.put("lowRated",lowRatedRestaurants + lowRatedRiders);

        return result;
    }

    private Double percentageChange(long current,long previous)
    {
        if(previous == 0)
        {
            return null;
        }
        return Math.round((current-previous)*1000.0/previous)/10.0;
    }

    private double avgMinutes(LocalDateTime start,LocalDateTime end)
    {
        return foodOrderRepository.findByCompleteTimeBetween(start,end).stream().map(FoodOrderModel::getDeliveryMinutes).filter(Objects::nonNull).mapToLong(Long::longValue).average().orElse(0);
    }
}
