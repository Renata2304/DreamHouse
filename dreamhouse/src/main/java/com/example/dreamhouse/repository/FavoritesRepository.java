package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Favorite;
import com.example.dreamhouse.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FavoritesRepository extends JpaRepository<Favorite, FavoriteId> {

    // Custom query to check if a favorite already exists by userId and listingId
    boolean existsByUserIdAndListingId(UUID userId, UUID listingId);
}
