package com.hexaware.cinema.service;

import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.cinema.dto.AdminDTO;
import com.hexaware.cinema.entity.Admin;
import com.hexaware.cinema.repository.AdminRepository;

@Service
public class AdminServiceImp implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void addAdmin(AdminDTO adminDTO) {
        Optional<Admin> existingAdmin = adminRepository.findByAdminUsername(adminDTO.getAdminUsername());
       

        Admin admin = new Admin();
        admin.setAdminName(adminDTO.getAdminName());
        admin.setAdminUsername(adminDTO.getAdminUsername());
        admin.setAdminPassword(passwordEncoder.encode(adminDTO.getAdminPassword())); // Not recommended for production

        adminRepository.save(admin);
    }

    public boolean verifyAdminCredentials(String username, String password) {
        Optional<Admin> adminOptional = adminRepository.findByAdminUsername(username);
        
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (Objects.equals(password, admin.getAdminPassword())) {
                return true; // Credentials are valid
            }
        }

        return false; // Invalid credentials or admin not found
    }


}
