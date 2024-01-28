package com.hexaware.cinema.repository;

import com.hexaware.cinema.entity.Movie;


import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

	Movie findByTitle(String name);
}