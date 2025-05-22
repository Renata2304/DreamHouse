package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Favorites;
import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.exception.UnauthorizedException;
import com.example.dreamhouse.repository.FavoritesRepository;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.FavoritesDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
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

    public Favorites addFavorite(UUID listingId) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = authentication.getToken();
        UUID userId = UUID.fromString(jwt.getClaimAsString("sub"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (favoritesRepository.existsByUserIdAndListingId(userId, listingId)) {
            throw new RuntimeException("Favorite already exists.");
        }

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        Favorites favorite = new Favorites(user, listing);
        return favoritesRepository.save(favorite);
    }


    public boolean isFavorite(UUID userId, UUID listingId) {
        return favoritesRepository.existsByUserIdAndListingId(userId, listingId);
    }

    public void removeFavorite(UUID listingId) {
        var authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getToken().getClaimAsString("sub");

        Favorites favorite = favoritesRepository.findByUserIdAndListingId(UUID.fromString(currentUserId), listingId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoritesRepository.delete(favorite);
    }

    public List<Favorites> getFavoritesForCurrentUser() {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UUID userId = UUID.fromString(authentication.getToken().getClaimAsString("sub"));
        return favoritesRepository.findAllByUserId(userId);
    }

    public List<Favorites> getFavoritesByUserId(UUID userId) {
        return favoritesRepository.findAllByUserId(userId);
    }


}