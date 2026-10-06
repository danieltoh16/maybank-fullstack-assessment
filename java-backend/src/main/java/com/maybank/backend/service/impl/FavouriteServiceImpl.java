package com.maybank.backend.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.maybank.backend.dto.FavouriteRequest;
import com.maybank.backend.entity.Favourite;
import com.maybank.backend.repository.FavouriteRepository;
import com.maybank.backend.service.FavouriteService;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    private final FavouriteRepository favouriteRepository;

    public FavouriteServiceImpl(FavouriteRepository favouriteRepository) {
        this.favouriteRepository = favouriteRepository;
    }

    @Transactional
    @Override
    public Favourite saveFavourite(FavouriteRequest request) {
        if (favouriteRepository.existsByPlaceId(request.getPlaceId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Favourite already exists for this placeId");
        }

        Favourite favourite = new Favourite();

        favourite.setPlaceId(request.getPlaceId());
        favourite.setName(request.getName());
        favourite.setAddress(request.getAddress());
        favourite.setLatitude(request.getLatitude());
        favourite.setLongitude(request.getLongitude());

        return favouriteRepository.save(favourite);
    }
}