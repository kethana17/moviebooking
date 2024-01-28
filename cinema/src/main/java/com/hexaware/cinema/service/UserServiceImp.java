package com.hexaware.cinema.service;

import com.hexaware.cinema.dto.UserDTO;
import com.hexaware.cinema.entity.User;
import com.hexaware.cinema.repository.UserRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(newUser);

        return new UserDTO( savedUser.getUsername(), savedUser.getEmail(),savedUser.getPassword());
    }

    @Override
    public User getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user;
    }
    @Override
    public User authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return user; // Authentication successful
            }
        }

        throw new RuntimeException("Invalid username or password");
    }



    
}
