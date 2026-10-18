package com.example.fooddelivery.repository.user;

import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.AddressModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<AddressModel,Integer>
{
    AddressModel findByUserCode(UserModel userCode);
}
