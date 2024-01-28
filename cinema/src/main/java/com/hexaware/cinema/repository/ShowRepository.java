package com.hexaware.cinema.repository;

import com.hexaware.cinema.entity.Show;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowRepository extends JpaRepository<Show, Integer> {

	List<Show> findByMovie_Title(String movieName);

}