package com.maybank.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maybank.backend.entity.Favourite;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    boolean existsByPlaceId(String placeId);
}