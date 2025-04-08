package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Favorite;
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
    public ResponseEntity<Favorite> addFavorite(@RequestBody FavoritesDto favoritesDto) {
        Favorite favorite = favoritesService.addFavorite(favoritesDto);
        return ResponseEntity.status(201).body(favorite);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isFavorite(@RequestParam UUID userId, @RequestParam UUID listingId) {
        boolean isFavorite = favoritesService.isFavorite(userId, listingId);
        return ResponseEntity.status(200).body(isFavorite);
    }
}
