package com.example.dreamhouse.controller;

import com.example.dreamhouse.service.UserProfileService;
import com.example.dreamhouse.service.dto.UserProfileDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/profiles")
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable UUID userId) {
        UserProfileDto profileDto = profileService.getProfileByUserId(userId);
        return ResponseEntity.ok(profileDto);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PutMapping("/me")
    public ResponseEntity<UserProfileDto> updateMyProfile(@RequestBody UserProfileDto updatedProfile,
                                                          Principal principal) {
        UserProfileDto updated = profileService.updateOwnProfile(principal.getName(), updatedProfile);
        return ResponseEntity.ok(updated);
    }
}

