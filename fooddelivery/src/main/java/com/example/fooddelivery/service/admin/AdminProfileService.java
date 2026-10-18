package com.example.fooddelivery.service.admin;

import com.example.fooddelivery.dto.admin.AddressResponse;
import com.example.fooddelivery.dto.admin.AdminDetailsResponse;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.AddressModel;
import com.example.fooddelivery.model.user.AdminDetails;
import com.example.fooddelivery.model.user.DateConverter;
import com.example.fooddelivery.model.user.DateModifier;
import com.example.fooddelivery.repository.UserRepository;
import com.example.fooddelivery.repository.admin.AdminDetailsRepository;
import com.example.fooddelivery.repository.user.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AdminProfileService
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    @Autowired
    AddressRepository addressRepository;

    public AdminDetailsResponse getAdminDetails(String adminCode)
    {
        UserModel userModel = userRepository.findByUserCode(adminCode).orElseThrow(()-> new RuntimeException("Admin not found!"));
        AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(userModel.getUserCode());

        if (adminDetails == null)
        {
            throw new RuntimeException("Admin not found!");
        }

        AdminDetailsResponse adminDetailsResponse = new AdminDetailsResponse();
        adminDetailsResponse.setUserCode(userModel.getUserCode());
        adminDetailsResponse.setUserName(userModel.getUserName());
        adminDetailsResponse.setUserDateOfBirth(userModel.getUserDateOfBirth());
        adminDetailsResponse.setUserEmail(userModel.getUserEmail());
        adminDetailsResponse.setUserPhone(userModel.getUserPhone());
        adminDetailsResponse.setUserRole(userModel.getUserRole());

        AddressModel addressModel = userModel.getUserAddress();
        if(addressModel != null)
        {
            AddressResponse addressResponse = new AddressResponse();

            addressResponse.setRoomNo(addressModel.getRoomNo());
            addressResponse.setBuildingName(addressModel.getBuildingName());
            addressResponse.setAreaName(addressModel.getAreaName());
            addressResponse.setCityName(addressModel.getCityName());
            addressResponse.setStateName(addressModel.getStateName());
            addressResponse.setPinCode(addressModel.getPinCode());

            adminDetailsResponse.setUserAddress(addressResponse);
        }

        adminDetailsResponse.setUserDetailsUpdatedDate(DateModifier.dateModifier(adminDetails.getDetailsUpdatedDate()));
        adminDetailsResponse.setUserPasswordUpdatedDate(DateModifier.dateModifier(adminDetails.getPasswordUpdatedDate()));
        adminDetailsResponse.setUserLoggedInDate(DateModifier.dateModifier(adminDetails.getLoggedInDate()));
        adminDetailsResponse.setUserLoggedOutDate(DateModifier.dateModifier(adminDetails.getLoggedOutDate()));

        return adminDetailsResponse;
    }

    public void updateAdminDetails(String adminCode,AdminDetailsResponse adminDetailsResponse)
    {
        UserModel userModel = userRepository.findByUserCode(adminCode).orElseThrow(()-> new RuntimeException("Admin not found!"));
        AdminDetails adminDetails = adminDetailsRepository.findByEmployeeCode(userModel.getUserCode());

        userModel.setUserName(adminDetailsResponse.getUserName());
        userModel.setUserDateOfBirth(DateConverter.dateConversion(adminDetailsResponse.getUserDateOfBirth()));
        userModel.setUserEmail(adminDetailsResponse.getUserEmail());
        userModel.setUserPhone(adminDetailsResponse.getUserPhone());

        AddressModel addressModel = addressRepository.findByUserCode(userModel);
        if(addressModel == null)
        {
            addressModel = new AddressModel();
            addressModel.setUserCode(userModel);
        }
        addressModel.setRoomNo(adminDetailsResponse.getUserAddress().getRoomNo());
        addressModel.setBuildingName(adminDetailsResponse.getUserAddress().getBuildingName());
        addressModel.setAreaName(adminDetailsResponse.getUserAddress().getAreaName());
        addressModel.setCityName(adminDetailsResponse.getUserAddress().getCityName());
        addressModel.setStateName(adminDetailsResponse.getUserAddress().getStateName());
        addressModel.setPinCode(adminDetailsResponse.getUserAddress().getPinCode());

        userModel.setUserAddress(addressModel);

        userRepository.save(userModel);


        if(adminDetails == null)
        {
            adminDetails = new AdminDetails();
            adminDetails.setUser(userModel);
        }
        adminDetails.setDetailsUpdatedDate(LocalDateTime.now());

        adminDetailsRepository.save(adminDetails);
    }
}
