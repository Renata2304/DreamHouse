package com.example.dreamhouse.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "favorites")
public class Favorites {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_favorite_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false, foreignKey = @ForeignKey(name = "fk_favorite_listing"))
    private Listing listing;

    public Favorites() {}

    public Favorites(User user, Listing listing) {
        this.user = user;
        this.listing = listing;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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