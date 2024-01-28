package com.hexaware.cinema.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cinema.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
	Optional<Admin> findByAdminUsername(String adminUsername);
    // You may need additional methods based on your requirements
}
