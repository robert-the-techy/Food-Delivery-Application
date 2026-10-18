package com.example.fooddelivery.repository.user;

import com.example.fooddelivery.enumvalues.DeliveryPartnerStatus;
import com.example.fooddelivery.model.user.DeliveryPartnerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface DeliveryPartnerDetailsRepository extends JpaRepository<DeliveryPartnerDetails,String>
{
    long countByPartnerStatus(DeliveryPartnerStatus deliveryPartnerStatus);

    @Query(""" 
               SELECT d FROM DeliveryPartnerDetails d JOIN FETCH d.user u LEFT JOIN FETCH u.userAddress ORDER BY d.partnerJoinedDate DESC
          """)
    List<DeliveryPartnerDetails> findAllWithUser();

    @Modifying
    @Query("""
            update DeliveryPartnerDetails d set d.partnerStatus = com.example.fooddelivery.enumvalues.DeliveryPartnerStatus.OFFLINE where d.partnerStatus = com.example.fooddelivery.enumvalues.DeliveryPartnerStatus.ONLINE and (d.partnerLastActive is null or d.partnerLastActive < :cutoff)
            """)
    void markOffline(@Param("cutoff") LocalDateTime cutoff);
}
