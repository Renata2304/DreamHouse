package com.example.dreamhouse.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class FavoriteId implements Serializable {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "listing_id")
    private UUID listingId;

    public FavoriteId() {
        this.userId = UUID.randomUUID();  // Optionally generate UUID here if needed
        this.listingId = UUID.randomUUID();  // Optionally generate UUID here if needed
    }

    public FavoriteId(UUID userId, UUID listingId) {
        this.userId = userId;
        this.listingId = listingId;
    }

    // Getters and Setters
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getListingId() {
        return listingId;
    }

    public void setListingId(UUID listingId) {
        this.listingId = listingId;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoriteId that = (FavoriteId) o;
        return userId.equals(that.userId) && listingId.equals(that.listingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, listingId);
    }
}
