package com.maybank.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maybank.backend.dto.FavouriteRequest;
import com.maybank.backend.entity.Favourite;
import com.maybank.backend.service.FavouriteService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/favourites")
public class FavouriteController {

    private final FavouriteService favouriteService;

    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @PostMapping
    public ResponseEntity<Favourite> saveFavourite(
            @Valid @RequestBody FavouriteRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(favouriteService.saveFavourite(request));
    }
}