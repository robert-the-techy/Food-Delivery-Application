package com.example.fooddelivery.controller.delivery_partner;

import com.example.fooddelivery.enumvalues.DeliveryPartnerStatus;
import com.example.fooddelivery.model.user.DeliveryPartnerDetails;
import com.example.fooddelivery.repository.user.DeliveryPartnerDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/delivery-partner/heartbeat")
@CrossOrigin(origins = "http://localhost:5173")
public class PartnerStatusController
{
    @Autowired
    DeliveryPartnerDetailsRepository deliveryPartnerDetailsRepository;
    @Transactional
    public void heartbeat(Principal p)
    {
        DeliveryPartnerDetails d = deliveryPartnerDetailsRepository.findById(p.getName()).orElseThrow();
        if (d.getPartnerStatus() == DeliveryPartnerStatus.BLOCKED) return;
        d.setPartnerLastActive(LocalDateTime.now());
        d.setPartnerStatus(DeliveryPartnerStatus.ONLINE);
    }
}
