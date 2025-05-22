package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Favorites;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.service.FavoritesService;
import com.example.dreamhouse.service.UserService;
import com.example.dreamhouse.service.dto.FavoritesDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:3001")
public class FavoritesController {

    private final FavoritesService favoritesService;
    private final UserService userService;

    public FavoritesController(FavoritesService favoritesService, UserService userService) {
        this.favoritesService = favoritesService;
        this.userService = userService;
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
    public ResponseEntity<Void> removeFavorite(@RequestParam UUID listingId) {
        favoritesService.removeFavorite(listingId);
        return ResponseEntity.noContent().build();
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/favorites")
    public List<Favorites> getMyFavorites() {
        return favoritesService.getFavoritesForCurrentUser();
    }

    @GetMapping("/favorites/user/{userId}")
    public List<FavoritesDto> getFavoritesByUserId(@PathVariable UUID userId) {
        return favoritesService.getFavoritesByUserId(userId);
    }


}