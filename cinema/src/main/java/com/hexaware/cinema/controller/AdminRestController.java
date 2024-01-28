package com.hexaware.cinema.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hexaware.cinema.dto.AdminDTO;
import com.hexaware.cinema.service.IAdminService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admins")
public class AdminRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdminRestController.class);

    @Autowired
    private IAdminService adminService;

    @PostMapping("/add")
    public ResponseEntity<String> addAdmin(@RequestBody AdminDTO adminDTO) {
        try {
            adminService.addAdmin(adminDTO);
            logger.info("Admin added successfully: {}", adminDTO.getAdminUsername());
            return new ResponseEntity<>("Admin added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
        	logger.error("Error adding admin: {}", e.getMessage());
            return new ResponseEntity<>("Error adding admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/verify/{username}/{password}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> verifyAdminCredentials(
            @PathVariable String username,
            @PathVariable String password) {
    	
        System.out.println("Received request for verification - Username: " + username + ", Password: " + password);

        boolean isValidCredentials = adminService.verifyAdminCredentials(username, password);
        if (isValidCredentials) {
            return new ResponseEntity<>("Credentials are valid", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }


}