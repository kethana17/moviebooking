package com.hexaware.cinema.controller;

import com.hexaware.cinema.dto.UserDTO;
import com.hexaware.cinema.entity.User;
import com.hexaware.cinema.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private IUserService userService;

    @GetMapping("/welcome")
    public String hello() {
    	return "welcome";
    }
    @PostMapping("/add")
    
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/authenticate/{username}/{password}")
    public ResponseEntity<User> authenticateUser(
            @PathVariable String username,
            @PathVariable String password
    ) {
        User authenticatedUser = userService.authenticateUser(username, password);
        return ResponseEntity.ok(authenticatedUser);
    }
}