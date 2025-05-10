package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface FavoritesRepository extends JpaRepository<Favorites, UUID> {

    boolean existsByUserIdAndListingId(UUID userId, UUID listingId);

    Optional<Favorites> findByUserIdAndListingId(UUID userId, UUID listingId);
}