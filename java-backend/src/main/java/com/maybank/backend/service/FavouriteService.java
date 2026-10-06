package com.maybank.backend.service;

import com.maybank.backend.dto.FavouriteRequest;
import com.maybank.backend.entity.Favourite;

public interface FavouriteService {

    Favourite saveFavourite(FavouriteRequest request);
}