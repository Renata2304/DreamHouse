package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FavoritesRepository extends JpaRepository<Favorites, UUID> {

    boolean existsByUserIdAndListingId(UUID userId, UUID listingId);

    Optional<Favorites> findByUserIdAndListingId(UUID userId, UUID listingId);

    @Query("SELECT f FROM Favorites f WHERE f.user.id = :userId")
    List<Favorites> findByUserId(@Param("userId") UUID userId);


}