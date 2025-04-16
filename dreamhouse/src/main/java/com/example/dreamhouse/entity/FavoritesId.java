package com.example.dreamhouse.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class FavoritesId implements Serializable {

    private UUID user;
    private UUID listing;

    public FavoritesId() {}

    public FavoritesId(UUID user, UUID listing) {
        this.user = user;
        this.listing = listing;
    }

    public UUID getUser() {
        return user;
    }

    public void setUser(UUID user) {
        this.user = user;
    }

    public UUID getListing() {
        return listing;
    }

    public void setListing(UUID listing) {
        this.listing = listing;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FavoritesId that)) return false;
        return Objects.equals(user, that.user) && Objects.equals(listing, that.listing);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, listing);
    }
}
