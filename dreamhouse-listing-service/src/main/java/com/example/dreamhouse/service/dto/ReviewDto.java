package com.example.dreamhouse.service.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class ReviewDto {

    private UUID listingId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewDto setListingId(UUID listingId) {
        this.listingId = listingId;
        return this;
    }

    public ReviewDto setRating(int rating) {
        this.rating = rating;
        return this;
    }

    public ReviewDto setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public ReviewDto setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
