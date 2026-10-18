package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.dto.admin.CustomerDetailsResponse;
import com.example.fooddelivery.dto.admin.CustomerRows;
import com.example.fooddelivery.dto.admin.CustomerStats;
import com.example.fooddelivery.enumvalues.CustomerStatus;
import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.CustomerDetails;
import com.example.fooddelivery.repository.FoodOrderRepository;
import com.example.fooddelivery.repository.order.CustomerOrderTotals;
import com.example.fooddelivery.repository.user.CustomerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminCustomersService
{
    @Autowired
    CustomerDetailsRepository customerDetailsRepository;

    @Autowired
    FoodOrderRepository foodOrderRepository;

    @Transactional(readOnly = true)
    public CustomerDetailsResponse getCustomerDetails()
    {
        List<CustomerDetails> customerDetails = customerDetailsRepository.findAllWithUser();

        Map<String, CustomerOrderTotals> totals = foodOrderRepository.findCustomerTotals(Order_Status.DELIVERED).stream().collect(Collectors.toMap(CustomerOrderTotals::getCustomerCode,t -> t));

        List<CustomerRows> rows = customerDetails.stream().map(c ->
        {
            UserModel userModel = c.getUser();
            CustomerOrderTotals customerOrderTotals = totals.get(userModel.getUserCode());

            return new CustomerRows(
                    userModel.getUserCode(),
                    userModel.getUserName(),
                    userModel.getUserEmail(),
                    userModel.getUserPhone(),
                    c.getCustomerLevel(),
                    c.getCustomerStatus(),
                    c.getJoinedDate(),
                    customerOrderTotals == null ? 0 : customerOrderTotals.getOrders(),
                    customerOrderTotals == null || customerOrderTotals.getSpent() == null ? BigDecimal.ZERO : customerOrderTotals.getSpent(),
                    userModel.getUserAddress() == null ? null : userModel.getUserAddress());
        }).toList();

        CustomerStats stats = new CustomerStats(
                rows.size(),
                customerDetailsRepository.countByCustomerStatus(CustomerStatus.ACTIVE),
                customerDetailsRepository.countByCustomerStatus(CustomerStatus.INACTIVE),
                customerDetailsRepository.countByCustomerStatus(CustomerStatus.BLOCKED)
        );

        return new CustomerDetailsResponse(stats,rows);
    }
}
