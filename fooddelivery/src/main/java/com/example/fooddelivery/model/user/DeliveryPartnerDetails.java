package com.example.fooddelivery.model.user;

import com.example.fooddelivery.enumvalues.DeliveryPartnerRatings;
import com.example.fooddelivery.enumvalues.DeliveryPartnerStatus;
import com.example.fooddelivery.enumvalues.DeliveryPartnerVehicleType;
import com.example.fooddelivery.model.UserModel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class DeliveryPartnerDetails
{
    @Id
    private String employeeCode;

    @OneToOne
    @MapsId
    @JoinColumn(name = "employee_code")
    private UserModel user;

    @Enumerated(EnumType.ORDINAL)
    private DeliveryPartnerRatings partnerRatings;

    private LocalDateTime partnerLastActive;

    @Enumerated(EnumType.STRING)
    private DeliveryPartnerStatus partnerStatus;

    private LocalDateTime partnerJoinedDate;

    @Enumerated(EnumType.STRING)
    private DeliveryPartnerVehicleType partnerVehicleType;

    public DeliveryPartnerDetails()
    {
        super();
    }

    public DeliveryPartnerDetails(UserModel user, DeliveryPartnerRatings partnerRatings, LocalDateTime partnerLastActive, DeliveryPartnerStatus partnerStatus, LocalDateTime partnerJoinedDate, DeliveryPartnerVehicleType partnerVehicleType) {
        this.user = user;
        this.partnerRatings = partnerRatings;
        this.partnerLastActive = partnerLastActive;
        this.partnerStatus = partnerStatus;
        this.partnerJoinedDate = partnerJoinedDate;
        this.partnerVehicleType = partnerVehicleType;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public DeliveryPartnerRatings getPartnerRatings() {
        return partnerRatings;
    }

    public void setPartnerRatings(DeliveryPartnerRatings partnerRatings) {
        this.partnerRatings = partnerRatings;
    }

    public LocalDateTime getPartnerLastActive() {
        return partnerLastActive;
    }

    public void setPartnerLastActive(LocalDateTime partnerLastActive) {
        this.partnerLastActive = partnerLastActive;
    }

    public DeliveryPartnerStatus getPartnerStatus() {
        return partnerStatus;
    }

    public void setPartnerStatus(DeliveryPartnerStatus partnerStatus) {
        this.partnerStatus = partnerStatus;
    }

    public LocalDateTime getPartnerJoinedDate() {
        return partnerJoinedDate;
    }

    public void setPartnerJoinedDate(LocalDateTime partnerJoinedDate) {
        this.partnerJoinedDate = partnerJoinedDate;
    }

    public DeliveryPartnerVehicleType getPartnerVehicleType() {
        return partnerVehicleType;
    }

    public void setPartnerVehicleType(DeliveryPartnerVehicleType partnerVehicleType) {
        this.partnerVehicleType = partnerVehicleType;
    }
}
