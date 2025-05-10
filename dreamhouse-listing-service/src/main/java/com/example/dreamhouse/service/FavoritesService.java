package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Favorites;
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

    public Favorites addFavorite(FavoritesDto favoriteDto) {
        UUID userId = favoriteDto.getUserId();
        UUID listingId = favoriteDto.getListingId();

        if (favoritesRepository.existsByUserIdAndListingId(userId, listingId)) {
            throw new RuntimeException("Favorite already exists.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new RuntimeException("Listing not found"));

        Favorites favorite = new Favorites(user, listing);
        return favoritesRepository.save(favorite);
    }

    public boolean isFavorite(UUID userId, UUID listingId) {
        return favoritesRepository.existsByUserIdAndListingId(userId, listingId);
    }

    public void removeFavorite(UUID userId, UUID listingId) {
        Favorites favorites = favoritesRepository.findByUserIdAndListingId(userId, listingId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));
        favoritesRepository.delete(favorites);
    }
}