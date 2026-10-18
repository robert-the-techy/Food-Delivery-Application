package com.example.fooddelivery.controller.admin;

import com.example.fooddelivery.dto.admin.AdminDetailsResponse;
import com.example.fooddelivery.model.UserModel;
import com.example.fooddelivery.model.user.AddressModel;
import com.example.fooddelivery.model.user.AdminDetails;
import com.example.fooddelivery.model.user.DateModifier;
import com.example.fooddelivery.repository.UserRepository;
import com.example.fooddelivery.repository.admin.AdminDetailsRepository;
import com.example.fooddelivery.service.admin.AdminProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProfileController
{
    @Autowired
    AdminProfileService adminProfileService;

    @PostMapping("/admin/{adminCode}")
    public AdminDetailsResponse selectAdminDetails(@PathVariable String adminCode)
    {
        return adminProfileService.getAdminDetails(adminCode);
    }

    @PostMapping("/admin/updated-details/{adminCode}")
    public ResponseEntity<?> changeAdminDetails(@PathVariable String adminCode,@RequestBody AdminDetailsResponse adminDetailsResponse)
    {
        adminProfileService.updateAdminDetails(adminCode,adminDetailsResponse);

        return ResponseEntity.ok("Details updated successfully!");
    }
}
