package com.example.dreamhouse.service.dto;

import java.util.UUID;

public class FavoritesDto {

    private UUID userId;
    private UUID listingId;

    public UUID getUserId() {
        return userId;
    }

    public FavoritesDto setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public UUID getListingId() {
        return listingId;
    }

    public FavoritesDto setListingId(UUID listingId) {
        this.listingId = listingId;
        return this;
    }
}
