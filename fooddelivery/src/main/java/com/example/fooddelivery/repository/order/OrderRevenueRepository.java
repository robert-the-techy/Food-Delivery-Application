package com.example.fooddelivery.repository.order;

import com.example.fooddelivery.model.order.OrderRevenueModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface OrderRevenueRepository extends JpaRepository<OrderRevenueModel, String>
{
    @Query(""" 
SELECT o FROM OrderRevenueModel o WHERE o.revenueDate BETWEEN :start AND :end ORDER BY o.revenueDate ASC
           """)
    List<OrderRevenueModel> findByDateRange(@Param("start") LocalDate start,@Param("end") LocalDate end);

    @Query("select coalesce(sum(r.appTotalCommission), 0) from OrderRevenueModel r where r.revenueDate = :date")
    BigDecimal sumAppCommissionByDate(@Param("date") LocalDate date);
}
