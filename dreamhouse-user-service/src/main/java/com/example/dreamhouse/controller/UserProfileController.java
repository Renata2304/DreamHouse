package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.UserProfileService;
import com.example.dreamhouse.service.dto.UserProfileDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "http://localhost:3001")
public class UserProfileController {

    private final UserProfileService profileService;
    private final UserRepository userRepository;

    public UserProfileController(UserProfileService profileService, UserRepository userRepository) {
        this.profileService = profileService;
        this.userRepository = userRepository;
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

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getMyProfile() {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = authentication.getToken();
        UUID id = UUID.fromString(jwt.getClaimAsString("sub"));
        Optional<User> userOpt = userRepository.findUserById(id);
        User user = userOpt.orElseThrow(() -> new IllegalStateException("User not found"));

        UserProfileDto profileDto = profileService.getProfileByUserId(id);
        return ResponseEntity.ok(profileDto);
    }

}

