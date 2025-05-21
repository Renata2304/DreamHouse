package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.entity.UserProfile;
import com.example.dreamhouse.service.dto.UserDto;
import com.example.dreamhouse.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void syncUser(String id, String username, String email) {
        UUID uuid = UUID.fromString(id);
        userRepository.findById(uuid).orElseGet(() -> {
            User user = new User();
            user.setId(uuid);
            user.setUsername(username);
            user.setEmail(email);
            
            // Create default user profile
            UserProfile profile = new UserProfile();
            profile.setUser(user);
            profile.setBio("Welcome to DreamHouse!");
            profile.setAvatarUrl("https://www.gravatar.com/avatar/" + email.toLowerCase().trim() + "?d=identicon");
            user.setUserProfile(profile);
            
            return userRepository.save(user);
        });
    }

    // Convert User entity to UserDto
    public UserDto convertToDto(User user) {
        // Get the first role from the list of roles or "UNKNOWN" if the list is empty
        String role = user.getRoles().isEmpty() ? "UNKNOWN" : String.valueOf(user.getRoles().getFirst());

        return new UserDto()
                .setId(user.getId())
                .setName(user.getUsername())
                .setEmail(user.getEmail())
                .setRole(role);
    }

    // Convert list of Users to list of UserDtos
    public List<UserDto> convertToDtoList(List<User> users) {
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Delete a user by ID
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
