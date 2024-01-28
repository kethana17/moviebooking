package com.hexaware.cinema.controller;

/*
 * Author: Charishma
 * Date: 
 * Description: This is Login Rest Controller
 */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cinema.config.UserInfoUserDetailsService;
import com.hexaware.cinema.dto.AuthRequest;
import com.hexaware.cinema.service.JwtService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/login")
public class LoginRestController {
	

	@Autowired
	AuthenticationManager authenticationManager;
	Logger logger = LoggerFactory.getLogger(LoginRestController.class);

	@Autowired
	private JwtService jwtService;
	
	//@Autowired
   // private  UserInfoUserDetailsService adminDetailsService; // Inject admin UserDetailsService
    
	@Autowired    
	private  UserInfoUserDetailsService userDetailsService; // Inject regular user UserDetailsService


    @PostMapping("/adminlogin")
    public String adminLogin(@RequestBody AuthRequest authRequest) {
        authenticate(authRequest.getUsername(), authRequest.getPassword(), userDetailsService);

        String token = jwtService.generateToken(authRequest.getUsername());
        return  token;
    }

    @PostMapping("/userlogin")
    public String customerLogin(@RequestBody AuthRequest authRequest) {
        authenticate(authRequest.getUsername(), authRequest.getPassword(), userDetailsService);

        String token = jwtService.generateToken(authRequest.getUsername());
        return token;
    }
    
    private void authenticate(String username, String password, UserInfoUserDetailsService userDetailsService) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        if (!authenticate.isAuthenticated()) {
            throw new UsernameNotFoundException("Invalid Username or Password / Invalid request");
        }
    }
	
}