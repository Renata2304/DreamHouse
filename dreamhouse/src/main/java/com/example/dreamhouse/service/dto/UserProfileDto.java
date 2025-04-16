package com.example.dreamhouse.service.dto;

public class UserProfileDto {
    private String bio;
    private String avatarUrl;

    // constructori
    public UserProfileDto() {}

    public UserProfileDto(String bio, String avatarUrl) {
        this.bio = bio;
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
