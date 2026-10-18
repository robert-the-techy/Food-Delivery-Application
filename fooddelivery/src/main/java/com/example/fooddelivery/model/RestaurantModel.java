package com.example.fooddelivery.model;

import com.example.fooddelivery.enumvalues.CuisineType;
import com.example.fooddelivery.enumvalues.Restaurant_Status;
import com.example.fooddelivery.model.user.AddressModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class RestaurantModel 
{
	@Id
	@Column(name = "restaurant_code", nullable = false, updatable = false,unique = true)
	private String restaurantCode;
	
	private String restaurantName;
	private String restaurantDescription;

	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	@CollectionTable(name = "restaurant_cuisines", joinColumns = @JoinColumn(name = "restaurant_code"))
	@Column(name = "cuisine_type")
	private Set<CuisineType> cuisineTypes = new LinkedHashSet<>();

	private String restaurantImage;

	private String restaurantPhoneNumber;
	private String restaurantEmail;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "restaurant_address")
	private AddressModel restaurantAddress;

	private LocalTime restaurantOpeningTime;
	private LocalTime restaurantClosingTime;

	private Double restaurantRating;

	@Enumerated(EnumType.STRING)
	private Restaurant_Status restaurantStatus;
	
	public RestaurantModel() {
		super();
	}

	public RestaurantModel(String restaurantName, String restaurantDescription, Set<CuisineType> cuisineTypes, String restaurantImage, String restaurantPhoneNumber, String restaurantEmail, AddressModel restaurantAddress, LocalTime restaurantOpeningTime, LocalTime restaurantClosingTime, Double restaurantRating, Restaurant_Status restaurantStatus) {
		this.restaurantName = restaurantName;
		this.restaurantDescription = restaurantDescription;
		this.cuisineTypes = cuisineTypes;
		this.restaurantImage = restaurantImage;
		this.restaurantPhoneNumber = restaurantPhoneNumber;
		this.restaurantEmail = restaurantEmail;
		this.restaurantAddress = restaurantAddress;
		this.restaurantOpeningTime = restaurantOpeningTime;
		this.restaurantClosingTime = restaurantClosingTime;
		this.restaurantRating = restaurantRating;
		this.restaurantStatus = restaurantStatus;
	}

	public String getRestaurantCode() {
		return restaurantCode;
	}

	public void setRestaurantCode(String restaurantCode) {
		this.restaurantCode = restaurantCode;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getRestaurantDescription() {
		return restaurantDescription;
	}

	public void setRestaurantDescription(String restaurantDescription) {
		this.restaurantDescription = restaurantDescription;
	}

	public Set<CuisineType> getCuisineTypes() {
		return cuisineTypes;
	}

	public void setCuisineTypes(Set<CuisineType> cuisineTypes) {
		this.cuisineTypes = cuisineTypes;
	}

	public String getRestaurantImage() {
		return restaurantImage;
	}

	public void setRestaurantImage(String restaurantImage) {
		this.restaurantImage = restaurantImage;
	}

	public String getRestaurantPhoneNumber() {
		return restaurantPhoneNumber;
	}

	public void setRestaurantPhoneNumber(String restaurantPhoneNumber) {
		this.restaurantPhoneNumber = restaurantPhoneNumber;
	}

	public String getRestaurantEmail() {
		return restaurantEmail;
	}

	public void setRestaurantEmail(String restaurantEmail) {
		this.restaurantEmail = restaurantEmail;
	}

	public AddressModel getRestaurantAddress() {
		return restaurantAddress;
	}

	public void setRestaurantAddress(AddressModel restaurantAddress) {
		this.restaurantAddress = restaurantAddress;
	}

	public LocalTime getRestaurantOpeningTime() {
		return restaurantOpeningTime;
	}

	public void setRestaurantOpeningTime(LocalTime restaurantOpeningTime) {
		this.restaurantOpeningTime = restaurantOpeningTime;
	}

	public LocalTime getRestaurantClosingTime() {
		return restaurantClosingTime;
	}

	public void setRestaurantClosingTime(LocalTime restaurantClosingTime) {
		this.restaurantClosingTime = restaurantClosingTime;
	}

	public Double getRestaurantRating() {
		return restaurantRating;
	}

	public void setRestaurantRating(Double restaurantRating) {
		this.restaurantRating = restaurantRating;
	}

	public Restaurant_Status getRestaurantStatus() {
		return restaurantStatus;
	}

	public void setRestaurantStatus(Restaurant_Status restaurantStatus) {
		this.restaurantStatus = restaurantStatus;
	}
}
