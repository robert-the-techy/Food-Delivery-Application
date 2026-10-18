package com.example.fooddelivery.repository.order;

import java.math.BigDecimal;

public interface CustomerOrderTotals
{
    String getCustomerCode();
    Long getOrders();
    BigDecimal getSpent();
}
