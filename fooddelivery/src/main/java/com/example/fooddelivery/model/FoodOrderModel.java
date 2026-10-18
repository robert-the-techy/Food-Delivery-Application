package com.example.fooddelivery.model;

import com.example.fooddelivery.enumvalues.Order_Cancel_Reasons;
import com.example.fooddelivery.enumvalues.Order_Status;
import com.example.fooddelivery.enumvalues.Payment_Mode;
import com.example.fooddelivery.enumvalues.Payment_Status;
import com.example.fooddelivery.model.order.OrderIdGenerator;
import com.example.fooddelivery.model.order.OrderItem;
import com.example.fooddelivery.model.user.AddressModel;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "food_orders")
public class FoodOrderModel
{
	@Id
	@GeneratedValue(generator = "order-id-gen")
	@GenericGenerator(name = "order-id-gen", type = OrderIdGenerator.class)
	private String orderId;                 // OR201, OR202...

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "customer_code")
	private UserModel customer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "delivery_partner_code")
	private UserModel deliveryPartner;

	@Column(nullable = false)
	private LocalDateTime orderDate;

	private LocalDateTime startTime;
	private LocalDateTime outOfDeliveryTime;
	private LocalDateTime completeTime;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> items = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private Order_Status orderStatus;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "delivery_address_id")
	private AddressModel deliveryAddress;

	@Enumerated(EnumType.STRING)
	private Payment_Mode paymentMode;

	@Enumerated(EnumType.STRING)
	private Payment_Status paymentStatus;

	@Enumerated(EnumType.STRING)
	private Order_Cancel_Reasons cancelReasons;

	@Column(precision = 10, scale = 2)
	private BigDecimal subtotal;

	@Column(precision = 10, scale = 2)
	private BigDecimal orderGST;

	@Column(precision = 10, scale = 2)
	private BigDecimal orderDiscount;

	@Column(precision = 10, scale = 2)
	private BigDecimal deliveryFee;

	@Column(precision = 10, scale = 2)
	private BigDecimal totalAmount;

	private String orderNotes;

	@PrePersist
	void onCreate() {
		if (orderDate == null) orderDate = LocalDateTime.now();
	}

	@Transient
	public Long getDeliveryMinutes()
	{
		if (startTime == null || completeTime == null) return null;
		return Duration.between(startTime, completeTime).toMinutes();
	}

	@Transient
	public int getTotalFoodItems()
	{
		return items.stream().mapToInt(OrderItem::getQuantity).sum();
	}

	public FoodOrderModel()
	{
		super();
	}

	public FoodOrderModel(UserModel customer, UserModel deliveryPartner, LocalDateTime orderDate, LocalDateTime startTime, LocalDateTime outOfDeliveryTime, LocalDateTime completeTime, List<OrderItem> items, Order_Status orderStatus, AddressModel deliveryAddress, Payment_Mode paymentMode, Payment_Status paymentStatus, Order_Cancel_Reasons cancelReasons, BigDecimal subtotal, BigDecimal orderGST, BigDecimal orderDiscount, BigDecimal deliveryFee, BigDecimal totalAmount, String orderNotes) {
		this.customer = customer;
		this.deliveryPartner = deliveryPartner;
		this.orderDate = orderDate;
		this.startTime = startTime;
		this.outOfDeliveryTime = outOfDeliveryTime;
		this.completeTime = completeTime;
		this.items = items;
		this.orderStatus = orderStatus;
		this.deliveryAddress = deliveryAddress;
		this.paymentMode = paymentMode;
		this.paymentStatus = paymentStatus;
		this.cancelReasons = cancelReasons;
		this.subtotal = subtotal;
		this.orderGST = orderGST;
		this.orderDiscount = orderDiscount;
		this.deliveryFee = deliveryFee;
		this.totalAmount = totalAmount;
		this.orderNotes = orderNotes;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public UserModel getCustomer() {
		return customer;
	}

	public void setCustomer(UserModel customer) {
		this.customer = customer;
	}

	public UserModel getDeliveryPartner() {
		return deliveryPartner;
	}

	public void setDeliveryPartner(UserModel deliveryPartner) {
		this.deliveryPartner = deliveryPartner;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getOutOfDeliveryTime() {
		return outOfDeliveryTime;
	}

	public void setOutOfDeliveryTime(LocalDateTime outOfDeliveryTime) {
		this.outOfDeliveryTime = outOfDeliveryTime;
	}

	public LocalDateTime getCompleteTime() {
		return completeTime;
	}

	public void setCompleteTime(LocalDateTime completeTime) {
		this.completeTime = completeTime;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public Order_Status getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(Order_Status orderStatus) {
		this.orderStatus = orderStatus;
	}

	public AddressModel getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(AddressModel deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public Payment_Mode getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(Payment_Mode paymentMode) {
		this.paymentMode = paymentMode;
	}

	public Payment_Status getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(Payment_Status paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Order_Cancel_Reasons getCancelReasons() {
		return cancelReasons;
	}

	public void setCancelReasons(Order_Cancel_Reasons cancelReasons) {
		this.cancelReasons = cancelReasons;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	public BigDecimal getOrderGST() {
		return orderGST;
	}

	public void setOrderGST(BigDecimal orderGST) {
		this.orderGST = orderGST;
	}

	public BigDecimal getOrderDiscount() {
		return orderDiscount;
	}

	public void setOrderDiscount(BigDecimal orderDiscount) {
		this.orderDiscount = orderDiscount;
	}

	public BigDecimal getDeliveryFee() {
		return deliveryFee;
	}

	public void setDeliveryFee(BigDecimal deliveryFee) {
		this.deliveryFee = deliveryFee;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderNotes() {
		return orderNotes;
	}

	public void setOrderNotes(String orderNotes) {
		this.orderNotes = orderNotes;
	}
}