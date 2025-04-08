package com.example.dreamhouse.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "listing_id", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "fk_image_listing"))
    private Listing listing;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Listing getListing() {
        return listing;
    }

    public void setListing(Listing listing) {
        this.listing = listing;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
