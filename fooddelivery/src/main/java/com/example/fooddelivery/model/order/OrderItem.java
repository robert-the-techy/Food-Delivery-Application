package com.example.fooddelivery.model.order;

import com.example.fooddelivery.model.FoodOrderModel;
import com.example.fooddelivery.model.FoodsModel;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id")
    private FoodOrderModel order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "food_id")
    private FoodsModel food;

    private int quantity;

    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;           // price at the time of ordering

    public OrderItem()
    {
        super();
    }

    public OrderItem(FoodOrderModel order, FoodsModel food, int quantity, BigDecimal unitPrice) {
        this.order = order;
        this.food = food;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FoodOrderModel getOrder() {
        return order;
    }

    public void setOrder(FoodOrderModel order) {
        this.order = order;
    }

    public FoodsModel getFood() {
        return food;
    }

    public void setFood(FoodsModel food) {
        this.food = food;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}