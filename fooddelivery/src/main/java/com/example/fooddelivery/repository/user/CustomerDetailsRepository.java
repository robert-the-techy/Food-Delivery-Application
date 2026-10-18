package com.example.fooddelivery.repository.user;

import com.example.fooddelivery.enumvalues.CustomerStatus;
import com.example.fooddelivery.model.user.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomerDetailsRepository extends JpaRepository<CustomerDetails,String>
{
    long countByCustomerStatus(CustomerStatus customerStatus);

    @Query(""" 
               SELECT c FROM CustomerDetails c JOIN FETCH c.user u LEFT JOIN FETCH u.userAddress ORDER BY c.joinedDate DESC
          """)
    List<CustomerDetails> findAllWithUser();

    // CustomerDetailsRepository
    @Modifying
    @Query("""
            update CustomerDetails c set c.customerStatus = com.example.fooddelivery.enumvalues.CustomerStatus.INACTIVE where c.customerStatus = com.example.fooddelivery.enumvalues.CustomerStatus.ACTIVE and c.joinedDate < :cutoff and not exists (select 1 from FoodOrderModel o where o.customer = c.user and o.orderDate >= :cutoff)
            """)
    int markInactive(@Param("cutoff") LocalDateTime cutoff);

    @Modifying
    @Query(""" 
            update CustomerDetails c set c.customerStatus = com.example.fooddelivery.enumvalues.CustomerStatus.ACTIVE where c.customerStatus = com.example.fooddelivery.enumvalues.CustomerStatus.INACTIVE and exists (select 1 from FoodOrderModel o where o.customer = c.user and o.orderDate >= :cutoff)
            """)
    int markActive(@Param("cutoff") LocalDateTime cutoff);
}
