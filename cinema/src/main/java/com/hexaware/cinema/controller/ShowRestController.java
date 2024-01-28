package com.hexaware.cinema.controller;

import com.hexaware.cinema.dto.ShowDTO;
import com.hexaware.cinema.service.ShowServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/shows")
public class ShowRestController {

   @Autowired
   ShowServiceImp showService;

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<ShowDTO> addShow(@RequestBody ShowDTO showDTO) {
        ShowDTO addedShow = showService.addShow(showDTO);
        return new ResponseEntity<>(addedShow, HttpStatus.CREATED);
    }

    @GetMapping("/getall")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<ShowDTO>> getAllShows() {
        List<ShowDTO> shows = showService.getAllShows();
        return new ResponseEntity<>(shows, HttpStatus.OK);
    }

    @DeleteMapping("/removeshow/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> removeShowById(@PathVariable int id) {
        showService.removeShowById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/byMovie/{movieName}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<ShowDTO>> getAllShowsByMovieName(@PathVariable String movieName) {
        List<ShowDTO> shows = showService.getAllShowsByMovieName(movieName);
        return new ResponseEntity<>(shows, HttpStatus.OK);
    }
    @GetMapping("/getShowById/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<ShowDTO> getShowById(@PathVariable int id) {
        ShowDTO showDTO = showService.getShowById(id);
        return new ResponseEntity<>(showDTO, HttpStatus.OK);
    }


    // Other methods for updating shows, retrieving shows by ID, etc.
}