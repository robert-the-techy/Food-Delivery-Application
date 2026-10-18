package com.example.fooddelivery.repository.admin;

import com.example.fooddelivery.model.user.AdminDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDetailsRepository extends JpaRepository<AdminDetails,String>
{
    AdminDetails findByEmployeeCode(String employeeCode);
}
