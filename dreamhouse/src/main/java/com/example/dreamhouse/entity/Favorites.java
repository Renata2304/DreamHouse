package com.example.dreamhouse.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "favorites", schema = "project")
public class Favorites {

    @EmbeddedId
    private FavoritesId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(
            name = "user_id",
            nullable = false,
            insertable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "fk_favorite_user")
    )
    private User user;

    @ManyToOne
    @MapsId("listingId")
    @JoinColumn(
            name = "listing_id",
            nullable = false,
            insertable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "fk_favorite_listing")
    )
    private Listing listing;

    public Favorites() {}

    public Favorites(User user, Listing listing) {
        this.user = user;
        this.listing = listing;
        this.id = new FavoritesId(user.getId(), listing.getId());
    }

    public FavoritesId getId() {
        return id;
    }

    public void setId(FavoritesId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }
}