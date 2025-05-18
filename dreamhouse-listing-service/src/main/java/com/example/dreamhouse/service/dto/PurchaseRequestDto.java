package com.example.dreamhouse.service.dto;

import java.util.UUID;

public class PurchaseRequestDto {
    private UUID listingId;
    private String message;

    public UUID getListingId() {
        return listingId;
    }

    public void setListingId(UUID listingId) {
        this.listingId = listingId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
