package com.hexaware.cinema.service;

import com.hexaware.cinema.dto.UserDTO;
import com.hexaware.cinema.entity.User;

public interface IUserService {

    UserDTO createUser(UserDTO userDTO);

    User getUserById(int userId);

	User authenticateUser(String username, String password);

    // Add more methods as needed for updating, deleting, or retrieving users
}