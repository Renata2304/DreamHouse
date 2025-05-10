package com.example.dreamhouse.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class FavoritesId implements Serializable {
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "listing_id")
    private UUID listingId;

    public FavoritesId() {}

    public FavoritesId(UUID userId, UUID listingId) {
        this.userId = userId;
        this.listingId = listingId;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FavoritesId that)) return false;
        return Objects.equals(userId, that.userId) && Objects.equals(listingId, that.listingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, listingId);
    }
}
