package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.dto.order.RestaurantStatsResponse;
import com.example.fooddelivery.enumvalues.Restaurant_Status;
import com.example.fooddelivery.model.RestaurantModel;
import com.example.fooddelivery.repository.FoodsRepository;
import com.example.fooddelivery.repository.RestaurantRepository;
import com.example.fooddelivery.repository.order.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminRestaurantService
{
    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    FoodsRepository foodsRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    public RestaurantStatsResponse getRestaurantStats()
    {
        LocalTime now = LocalTime.now();
        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        List<RestaurantModel> restaurants = restaurantRepository.findAll();

        // one query for all menu counts
        Map<String, Long> menuCounts = new HashMap<>();
        for (Object[] row : foodsRepository.countMenuItemsPerRestaurant())
        {
            menuCounts.put((String) row[0], (Long) row[1]);
        }

        List<RestaurantStatsResponse.RestaurantCardResponse> cards = restaurants.stream()
                .map(r -> new RestaurantStatsResponse.RestaurantCardResponse(
                        r.getRestaurantCode(),
                        r.getRestaurantName(),
                        r.getRestaurantImage(),
                        r.getRestaurantRating(),
                        r.getCuisineTypes(),
                        r.getRestaurantAddress() != null ? r.getRestaurantAddress().getAreaName() : null,
                        r.getRestaurantAddress() != null ? r.getRestaurantAddress().getCityName() : null,
                        menuCounts.getOrDefault(r.getRestaurantCode(), 0L),
                        getAvailability(r, now)))
                .toList();


        // counts come from the same availability values, so they always match the cards
        long open = cards.stream().filter(c -> c.availability().equals("OPEN")).count();
        long closed = cards.stream().filter(c -> c.availability().equals("CLOSED")).count();
        long inactive = cards.stream().filter(c -> c.availability().equals("INACTIVE")).count();

        RestaurantStatsResponse.TopRated topRated = restaurants.stream()
                .filter(r -> r.getRestaurantRating() != null)
                .max(Comparator.comparingDouble(RestaurantModel::getRestaurantRating))
                .map(r -> new RestaurantStatsResponse.TopRated(
                        r.getRestaurantCode(),
                        r.getRestaurantName(),
                        r.getRestaurantRating(),
                        menuCounts.getOrDefault(r.getRestaurantCode(), 0L),
                        orderItemRepository.countOrdersBetween(r.getRestaurantCode(), start, end)))
                .orElse(null);

        return new RestaurantStatsResponse(cards.size(), open, closed, inactive, topRated, cards);
    }

    private String getAvailability(RestaurantModel r, LocalTime now)
    {
        if (r.getRestaurantStatus() == Restaurant_Status.INACTIVE)
        {
            return "INACTIVE";
        }
        return isOpenNow(r, now) ? "OPEN" : "CLOSED";
    }

    /** Open = ACTIVE and the current time is inside opening/closing time (overnight hours supported). */
    private boolean isOpenNow(RestaurantModel r, LocalTime now)
    {
        if (r.getRestaurantStatus() != Restaurant_Status.ACTIVE || r.getRestaurantOpeningTime() == null || r.getRestaurantClosingTime() == null)
        {
            return false;
        }

        LocalTime opening = r.getRestaurantOpeningTime();
        LocalTime closing = r.getRestaurantClosingTime();

        if (opening.isBefore(closing)) {
            return !now.isBefore(opening) && now.isBefore(closing);   // e.g. 09:00 - 22:00
        }
        return !now.isBefore(opening) || now.isBefore(closing);       // e.g. 18:00 - 02:00
    }
}
