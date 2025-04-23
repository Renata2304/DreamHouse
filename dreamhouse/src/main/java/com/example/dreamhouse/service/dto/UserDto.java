package com.example.dreamhouse.service.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class UserDto {

    private UUID id;
    private String name;
    private String email;
    private String role;

    // Getters and setters

    public UUID getId() {
        return id;
    }

    public UserDto setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserDto setName(String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getRole() {
        return role;
    }

    public UserDto setRole(String role) {
        this.role = role;
        return this;
    }
}
