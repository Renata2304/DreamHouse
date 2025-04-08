package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    List<Review> findByUserId(UUID userId);

    List<Review> findByListingId(UUID listingId);
}
