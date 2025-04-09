package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Favorites;
import com.example.dreamhouse.service.FavoritesService;
import com.example.dreamhouse.service.dto.FavoritesDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @PostMapping("/add")
    public ResponseEntity<Favorites> addFavorite(@RequestBody FavoritesDto favoritesDto) {
        Favorites favorite = favoritesService.addFavorite(favoritesDto);
        return ResponseEntity.status(201).body(favorite);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isFavorite(@RequestParam UUID userId, @RequestParam UUID listingId) {
        boolean isFavorite = favoritesService.isFavorite(userId, listingId);
        return ResponseEntity.ok(isFavorite);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam UUID userId, @RequestParam UUID listingId) {
        favoritesService.removeFavorite(userId, listingId);
        return ResponseEntity.noContent().build();
    }
}