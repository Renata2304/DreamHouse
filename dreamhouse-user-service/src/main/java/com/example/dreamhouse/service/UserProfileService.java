package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.entity.UserProfile;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.UserProfileDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDto getProfileByUserId(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        UserProfile profile = user.getUserProfile();
        if (profile == null) {
            throw new IllegalStateException("Profile not found for user");
        }

        return new UserProfileDto(profile.getBio(), profile.getAvatarUrl());
    }

    public UserProfileDto updateOwnProfile(String username, UserProfileDto updatedProfile) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = authentication.getToken();
        UUID id = UUID.fromString(jwt.getClaimAsString("sub"));
        Optional<User> userOpt = userRepository.findUserById(id);
        User user = userOpt.orElseThrow(() -> new IllegalStateException("User not found"));

        UserProfile profile = user.getUserProfile();

        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
            user.setUserProfile(profile);
        }

        profile.setBio(updatedProfile.getBio());
        profile.setAvatarUrl(updatedProfile.getAvatarUrl());

        userRepository.save(user);

        return new UserProfileDto(profile.getBio(), profile.getAvatarUrl());
    }
}

