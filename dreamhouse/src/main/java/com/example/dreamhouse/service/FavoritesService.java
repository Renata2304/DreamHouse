package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Favorite;
import com.example.dreamhouse.entity.FavoriteId;
import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.FavoritesRepository;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.FavoritesDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public FavoritesService(FavoritesRepository favoritesRepository, UserRepository userRepository, ListingRepository listingRepository) {
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    public Favorite addFavorite(FavoritesDto favoritesDto) {
        if (favoritesRepository.existsByUserIdAndListingId(favoritesDto.getUserId(), favoritesDto.getListingId())) {
            throw new RuntimeException("Favorite already exists.");
        }

        Favorite favorite = new Favorite();
        FavoriteId favoriteId = new FavoriteId(favoritesDto.getUserId(), favoritesDto.getListingId());
        favorite.setId(favoriteId);

        User user = userRepository.findById(favoritesDto.getUserId()).orElseThrow();
        Listing listing = listingRepository.findById(favoritesDto.getListingId()).orElseThrow();
        favorite.setUser(user);
        favorite.setListing(listing);

        return favoritesRepository.save(favorite);
    }

    public boolean isFavorite(UUID userId, UUID listingId) {
        return favoritesRepository.existsByUserIdAndListingId(userId, listingId);
    }
}
