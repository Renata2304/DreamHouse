package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Review;
import com.example.dreamhouse.service.ReviewService;
import com.example.dreamhouse.service.dto.ReviewDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reviews")
@SecurityRequirement(name = "bearerAuth")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PreAuthorize("hasAnyRole('client_admin', 'client_user')")
    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody ReviewDto reviewDto) {
        Review review = reviewService.addReview(reviewDto);
        return ResponseEntity.status(201).body(review);
    }

    @PreAuthorize("hasAnyRole('client_admin', 'client_user')")
    @GetMapping("/byListing/{listingId}")
    public ResponseEntity<List<Review>> getReviewsByListing(@PathVariable UUID listingId) {
        List<Review> reviews = reviewService.getReviewsByListing(listingId);
        return ResponseEntity.status(200).body(reviews);
    }

    @PreAuthorize("hasAnyRole('client_admin', 'client_user')")
    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable UUID userId) {
        List<Review> reviews = reviewService.getReviewsByUser(userId);
        return ResponseEntity.status(200).body(reviews);
    }
}
