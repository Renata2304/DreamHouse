package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.User;
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

    // Metoda pentru a salva un utilizator
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Metoda pentru a obține un utilizator după ID
    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    // Metoda pentru a obține un utilizator după email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Metoda pentru a obține utilizatorii după rol
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    // Metoda pentru a obține toate utilizatorii
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Conversia din User în UserDto
    public UserDto convertToDto(User user) {
        return new UserDto()
                .setId(user.getId())
                .setName(user.getName())
                .setEmail(user.getEmail())
                .setRole(user.getRole())
                .setCreatedAt(user.getCreatedAt());
    }

    // Conversia listei de Users în DTOs
    public List<UserDto> convertToDtoList(List<User> users) {
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Ștergerea unui utilizator
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
