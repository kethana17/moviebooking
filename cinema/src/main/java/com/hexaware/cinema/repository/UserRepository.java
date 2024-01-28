package com.hexaware.cinema.repository;

import com.hexaware.cinema.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByUsername(String username);

    User findByEmail(String email);

	User findByUsernameAndPassword(String username, String password);
}