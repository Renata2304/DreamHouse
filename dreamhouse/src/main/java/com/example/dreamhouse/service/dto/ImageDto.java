package com.example.dreamhouse.service.dto;

import java.util.UUID;

public class ImageDto {

    private UUID listingId;
    private String imageUrl;

    public UUID getListingId() {
        return listingId;
    }

    public ImageDto setListingId(UUID listingId) {
        this.listingId = listingId;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public ImageDto setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }
}
