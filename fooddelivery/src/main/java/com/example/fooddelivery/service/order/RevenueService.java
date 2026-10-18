package com.example.fooddelivery.service.order;

import com.example.fooddelivery.dto.order.WeeklyRevenueRequest;
import com.example.fooddelivery.model.order.OrderRevenueModel;
import com.example.fooddelivery.repository.order.OrderRevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RevenueService
{
    @Autowired
    OrderRevenueRepository orderRevenueRepository;

    public List<WeeklyRevenueRequest> getCurrentWeekRevenue()
    {
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(6);

        Map<LocalDate, BigDecimal> map = orderRevenueRepository.findByDateRange(start,today).stream().collect(Collectors.toMap(OrderRevenueModel::getRevenueDate,OrderRevenueModel::getAppTotalCommission));

        List<WeeklyRevenueRequest> result = new ArrayList<>();

        for(int i=0;i<7;i++)
        {
            LocalDate date = start.plusDays(i);
            BigDecimal amount = map.getOrDefault(date,BigDecimal.ZERO);
            String dayName = date.getDayOfWeek().getDisplayName(TextStyle.SHORT,Locale.ENGLISH);
            result.add(new WeeklyRevenueRequest(dayName,amount.doubleValue()));
        }

        return result;
    }
}
