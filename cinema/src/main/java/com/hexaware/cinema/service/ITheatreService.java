package com.hexaware.cinema.service;

import com.hexaware.cinema.dto.TheatreDTO;

import java.util.List;

public interface ITheatreService {

    TheatreDTO addTheatre(TheatreDTO theatreDTO);

    List<TheatreDTO> getAllTheatres();

    void removeTheatreById(int id);

    void removeTheatreByName(String name);

    TheatreDTO getTheatreByName(String theatreName);

}