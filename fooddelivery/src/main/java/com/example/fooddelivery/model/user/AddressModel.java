package com.example.fooddelivery.model.user;

import com.example.fooddelivery.enumvalues.User_Roles;
import com.example.fooddelivery.model.UserModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class AddressModel
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int addressId;

    String roomNo;
    String buildingName;
    String areaName;
    String cityName;
    String stateName;
    int pinCode;

    @OneToOne
    @JoinColumn(name = "user_code")
    @JsonIgnore
    UserModel userCode;

    public AddressModel()
    {
        super();
    }

    public AddressModel(String roomNo, String buildingName, String areaName, String cityName, String stateName, int pinCode, UserModel userCode) {
        this.roomNo = roomNo;
        this.buildingName = buildingName;
        this.areaName = areaName;
        this.cityName = cityName;
        this.stateName = stateName;
        this.pinCode = pinCode;
        this.userCode = userCode;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public int getPinCode() {
        return pinCode;
    }

    public void setPinCode(int pinCode) {
        this.pinCode = pinCode;
    }

    public UserModel getUserCode() {
        return userCode;
    }

    public void setUserCode(UserModel userCode) {
        this.userCode = userCode;
    }
}
