package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.UserProfile;
import com.example.dreamhouse.service.dto.UserProfileDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {
    UserProfileDto getProfileByUserId(UUID userId);
}

