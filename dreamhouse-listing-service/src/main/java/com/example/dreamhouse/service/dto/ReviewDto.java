package com.example.dreamhouse.service.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReviewDto {

    private UUID userId;
    private UUID listingId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;

    public UUID getUserId() {
        return userId;
    }

    public ReviewDto setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public UUID getListingId() {
        return listingId;
    }

    public ReviewDto setListingId(UUID listingId) {
        this.listingId = listingId;
        return this;
    }

    public int getRating() {
        return rating;
    }

    public ReviewDto setRating(int rating) {
        this.rating = rating;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public ReviewDto setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public ReviewDto setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
