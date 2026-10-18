package com.example.fooddelivery.model.order;

import com.example.fooddelivery.model.FoodOrderModel;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

//appFoodCommission   = subtotal × commissionPercentage          (e.g. 20% of food price)
//restaurantCommission    = subtotal - appFoodCommission
//deliveryPartnerCommission = deliveryFee × partnerPercentage          (e.g. 80% of delivery fee)
//appDeliveryCommission  = deliveryFee - deliveryPartnerCommission
//appTotalCommission      = appFoodCommission + appDeliveryCommission

@Entity
@Table(name = "order_revenue")
public class OrderRevenueModel
{
    @Id
    @Column(name = "order_id")
    private String orderId;                 // filled automatically from the order

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId                                 // copies order's ID into orderId
    @JoinColumn(name = "order_id")
    private FoodOrderModel order;

    @Column(precision = 10, scale = 2)
    private BigDecimal commissionPercentage;

    @Column(precision = 10, scale = 2)
    private BigDecimal partnerPercentage;

    @Column(precision = 10, scale = 2)
    private BigDecimal appFoodCommission;

    @Column(precision = 10, scale = 2)
    private BigDecimal appDeliveryCommission;

    @Column(precision = 10, scale = 2)
    private BigDecimal restaurantCommission;

    @Column(precision = 10, scale = 2)
    private BigDecimal deliveryPartnerCommission;

    private LocalDate revenueDate;

    @Column(precision = 10, scale = 2)
    private BigDecimal appTotalCommission;

    public OrderRevenueModel()
    {
        super();
    }

    public OrderRevenueModel(FoodOrderModel order, BigDecimal commissionPercentage, BigDecimal partnerPercentage, BigDecimal appFoodCommission, BigDecimal appDeliveryCommission, BigDecimal restaurantCommission, BigDecimal deliveryPartnerCommission, LocalDate revenueDate, BigDecimal appTotalCommission) {
        this.order = order;
        this.commissionPercentage = commissionPercentage;
        this.partnerPercentage = partnerPercentage;
        this.appFoodCommission = appFoodCommission;
        this.appDeliveryCommission = appDeliveryCommission;
        this.restaurantCommission = restaurantCommission;
        this.deliveryPartnerCommission = deliveryPartnerCommission;
        this.revenueDate = revenueDate;
        this.appTotalCommission = appTotalCommission;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public FoodOrderModel getOrder() {
        return order;
    }

    public void setOrder(FoodOrderModel order) {
        this.order = order;
    }

    public BigDecimal getCommissionPercentage() {
        return commissionPercentage;
    }

    public void setCommissionPercentage(BigDecimal commissionPercentage) {
        this.commissionPercentage = commissionPercentage;
    }

    public BigDecimal getPartnerPercentage() {
        return partnerPercentage;
    }

    public void setPartnerPercentage(BigDecimal partnerPercentage) {
        this.partnerPercentage = partnerPercentage;
    }

    public BigDecimal getAppFoodCommission() {
        return appFoodCommission;
    }

    public void setAppFoodCommission(BigDecimal appFoodCommission) {
        this.appFoodCommission = appFoodCommission;
    }

    public BigDecimal getAppDeliveryCommission() {
        return appDeliveryCommission;
    }

    public void setAppDeliveryCommission(BigDecimal appDeliveryCommission) {
        this.appDeliveryCommission = appDeliveryCommission;
    }

    public BigDecimal getRestaurantCommission() {
        return restaurantCommission;
    }

    public void setRestaurantCommission(BigDecimal restaurantCommission) {
        this.restaurantCommission = restaurantCommission;
    }

    public BigDecimal getDeliveryPartnerCommission() {
        return deliveryPartnerCommission;
    }

    public void setDeliveryPartnerCommission(BigDecimal deliveryPartnerCommission) {
        this.deliveryPartnerCommission = deliveryPartnerCommission;
    }

    public LocalDate getRevenueDate() {
        return revenueDate;
    }

    public void setRevenueDate(LocalDate revenueDate) {
        this.revenueDate = revenueDate;
    }

    public BigDecimal getAppTotalCommission() {
        return appTotalCommission;
    }

    public void setAppTotalCommission(BigDecimal appTotalCommission) {
        this.appTotalCommission = appTotalCommission;
    }
}
