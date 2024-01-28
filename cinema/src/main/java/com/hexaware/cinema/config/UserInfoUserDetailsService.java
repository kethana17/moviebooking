package com.hexaware.cinema.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import com.hexaware.cinema.entity.Admin;
import com.hexaware.cinema.entity.User;
import com.hexaware.cinema.repository.AdminRepository;
import com.hexaware.cinema.repository.UserRepository;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

	@Autowired 
	private AdminRepository adminRepository;
	
	@Autowired
	private UserRepository memberRepository;

   
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	Optional<Admin> adminInfo = adminRepository.findByAdminUsername(username);
    	if(adminInfo.isPresent()) {
    		return adminInfo.map(AdminInfoUserDetails::new)
    	            .orElseThrow(() -> new UsernameNotFoundException("Admin not found: " + username));
    	}

    	Optional<User> memberInfo = memberRepository.findByUsername(username);
    	if(memberInfo.isPresent()) {
    		return memberInfo.map(UserInfoUserDetails::new)
    	            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    	}
    	throw new UsernameNotFoundException("User not found: " + username);
  
    }
}
