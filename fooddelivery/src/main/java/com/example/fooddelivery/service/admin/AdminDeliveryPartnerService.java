package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.dto.admin.DeliveryPartnerDetailsResponse;
import com.example.fooddelivery.dto.admin.DeliveryPartnerRows;
import com.example.fooddelivery.dto.admin.DeliveryPartnerStats;
import com.example.fooddelivery.enumvalues.DeliveryPartnerStatus;
import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.DeliveryPartnerDetails;
import com.example.fooddelivery.repository.FoodOrderRepository;
import com.example.fooddelivery.repository.order.DeliveryPartnerOrderTotals;
import com.example.fooddelivery.repository.user.DeliveryPartnerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminDeliveryPartnerService
{
    @Autowired
    DeliveryPartnerDetailsRepository deliveryPartnerDetailsRepository;

    @Autowired
    FoodOrderRepository foodOrderRepository;

    @Transactional(readOnly = true)
    public DeliveryPartnerDetailsResponse getDeliveryPartnerDetails()
    {
        List<DeliveryPartnerDetails> deliveryPartnerDetails = deliveryPartnerDetailsRepository.findAllWithUser();

        Map<String,DeliveryPartnerOrderTotals> totalOrders = foodOrderRepository.findDeliveryPartnerTotals(Order_Status.DELIVERED).stream().collect(Collectors.toMap(DeliveryPartnerOrderTotals::partnerCode, t-> t));

        List<DeliveryPartnerRows> rows = deliveryPartnerDetails.stream().map(d ->
        {
            UserModel userModel = d.getUser();
            DeliveryPartnerOrderTotals deliveryPartnerOrderTotals = totalOrders.get(userModel.getUserCode());

            return new DeliveryPartnerRows(
                    userModel.getUserCode(),
                    userModel.getUserName(),
                    userModel.getUserEmail(),
                    userModel.getUserPhone(),
                    d.getPartnerRatings(),
                    d.getPartnerStatus(),
                    d.getPartnerJoinedDate(),
                    deliveryPartnerOrderTotals == null ? 0 : deliveryPartnerOrderTotals.getOrders(),
                    d.getPartnerVehicleType(),
                    userModel.getUserAddress() == null ? null : userModel.getUserAddress());
        }).toList();

        DeliveryPartnerStats stats = new DeliveryPartnerStats(
                rows.size(),
                deliveryPartnerDetailsRepository.countByPartnerStatus(DeliveryPartnerStatus.ONLINE),
                deliveryPartnerDetailsRepository.countByPartnerStatus(DeliveryPartnerStatus.OFFLINE),
                deliveryPartnerDetailsRepository.countByPartnerStatus(DeliveryPartnerStatus.BLOCKED)
        );

        return new DeliveryPartnerDetailsResponse(stats,rows);
    }
}