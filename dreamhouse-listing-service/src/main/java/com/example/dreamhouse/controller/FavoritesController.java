package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Favorites;
import com.example.dreamhouse.service.FavoritesService;
import com.example.dreamhouse.service.dto.FavoritesDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PostMapping("/add")
    public ResponseEntity<Favorites> addFavorite(@RequestParam UUID listingId) {
        Favorites favorite = favoritesService.addFavorite(listingId);
        return ResponseEntity.status(201).body(favorite);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam UUID userId, @RequestParam UUID listingId) {
        favoritesService.removeFavorite(userId, listingId);
        return ResponseEntity.noContent().build();
    }
}