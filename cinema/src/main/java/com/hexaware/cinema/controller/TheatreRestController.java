package com.hexaware.cinema.controller;

import com.hexaware.cinema.dto.TheatreDTO;
import com.hexaware.cinema.service.ITheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/theatres")
public class TheatreRestController {

    @Autowired
    private ITheatreService theatreService;

    // Add a new theatre
    @PostMapping("/addTheatre")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<TheatreDTO> addTheatre(@RequestBody TheatreDTO theatreDTO) {
        TheatreDTO createdTheatre = theatreService.addTheatre(theatreDTO);
        return new ResponseEntity<>(createdTheatre, HttpStatus.CREATED);
    }

    // Get all theatres
    @GetMapping("/getAllTheatres")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<TheatreDTO>> getAllTheatres() {
        List<TheatreDTO> theatres = theatreService.getAllTheatres();
        return new ResponseEntity<>(theatres, HttpStatus.OK);
    }

    // Remove a theatre by ID
    @DeleteMapping("/removeTheatre/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> removeTheatre(@PathVariable int id) {
        theatreService.removeTheatreById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Remove a theatre by name
    @DeleteMapping("/removeByName/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> removeTheatreByName(@PathVariable String name) {
        theatreService.removeTheatreByName(name);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/getTheatreByName/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<TheatreDTO> getTheatreByName(@PathVariable String name) {
        TheatreDTO theatre = theatreService.getTheatreByName(name);
        return new ResponseEntity<>(theatre, HttpStatus.OK);
    }
}
