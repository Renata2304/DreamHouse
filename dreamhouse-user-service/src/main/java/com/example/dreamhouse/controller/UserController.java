package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.exception.EntityNotFoundException;
import com.example.dreamhouse.exception.UnauthorizedException;
import com.example.dreamhouse.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('client_admin')")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with id " + id + " not found.");
        }
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyRole('client_admin')")
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with email " + email + " not found.");
        }
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyRole('client_admin')")
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            throw new EntityNotFoundException("No users found.");
        }
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasAnyRole('client_admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
