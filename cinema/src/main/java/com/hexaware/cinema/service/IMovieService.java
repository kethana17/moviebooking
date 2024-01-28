package com.hexaware.cinema.service;

import com.hexaware.cinema.dto.MovieDTO;
import com.hexaware.cinema.entity.Movie;

import java.util.List;

public interface IMovieService {

    // Add a new movie
    MovieDTO addMovie(MovieDTO movieDTO);

    // Get all movies
    List<MovieDTO> getAllMovies();

    // Remove a movie by ID
    void removeMovie(int id);
    // Remove a movie by Name

    void removeMovieByName(String name);

	Movie getMovieByName(String name);

}
