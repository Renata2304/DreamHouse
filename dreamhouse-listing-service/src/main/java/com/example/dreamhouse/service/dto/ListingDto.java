package com.example.dreamhouse.service.dto;

import java.math.BigDecimal;
import java.util.UUID;

public class ListingDto {
    private UUID id;
    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private float surface;
    private int rooms;

    public UUID getId() {
        return id;
    }

    public ListingDto setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ListingDto setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ListingDto setDescription(String description) {
        this.description = description;
        return this;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public ListingDto setPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public ListingDto setLocation(String location) {
        this.location = location;
        return this;
    }

    public float getSurface() {
        return surface;
    }

    public ListingDto setSurface(float surface) {
        this.surface = surface;
        return this;
    }

    public int getRooms() {
        return rooms;
    }

    public ListingDto setRooms(int rooms) {
        this.rooms = rooms;
        return this;
    }
}
