package com.example.fooddelivery.service.user;

import com.example.fooddelivery.repository.user.CustomerDetailsRepository;
import com.example.fooddelivery.repository.user.DeliveryPartnerDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StatusUpdateService
{
    @Autowired
    CustomerDetailsRepository customerDetailsRepository;

    @Autowired
    DeliveryPartnerDetailsRepository deliveryPartnerDetailsRepository;

    @Scheduled(cron = "0 0 2 * * *")
    @Transactional
    public void updateCustomers()
    {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
        customerDetailsRepository.markInactive(cutoff);
        customerDetailsRepository.markActive(cutoff);
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void updatePartners() {
        deliveryPartnerDetailsRepository.markOffline(LocalDateTime.now().minusMinutes(2));
    }
}
