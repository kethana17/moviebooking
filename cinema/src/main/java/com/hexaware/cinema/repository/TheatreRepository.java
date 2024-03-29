package com.hexaware.cinema.repository;

import com.hexaware.cinema.entity.Theatre;


import org.springframework.data.jpa.repository.JpaRepository;

public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

	Theatre findByName(String name);
}