package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Review;
import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.ReviewRepository;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.ReviewDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ListingRepository listingRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    public Review addReview(ReviewDto reviewDto) {
        UUID userId = UUID.fromString(((JwtAuthenticationToken) SecurityContextHolder
                .getContext().getAuthentication()).getToken().getClaimAsString("sub"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        Listing listing = listingRepository.findById(reviewDto.getListingId())
                .orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        Review review = new Review();
        review.setUser(user);
        review.setListing(listing);
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByListing(UUID listingId) {
        return reviewRepository.findByListingId(listingId);
    }

    public List<Review> getReviewsByUser(UUID userId) {
        return reviewRepository.findByUserId(userId);
    }
}
