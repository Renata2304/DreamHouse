package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.PurchaseRequest;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.service.PurchaseRequestService;
import com.example.dreamhouse.service.UserService;
import com.example.dreamhouse.service.dto.PurchaseRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/requests")
public class PurchaseRequestController {

    private final PurchaseRequestService requestService;
    private final UserService userService;

    public PurchaseRequestController(PurchaseRequestService requestService, UserService userService) {
        this.requestService = requestService;
        this.userService = userService;
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PostMapping("/create")
    public ResponseEntity<PurchaseRequest> createRequest(@RequestBody PurchaseRequestDTO requestDTO) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = authentication.getToken();
        UUID id = UUID.fromString(jwt.getClaimAsString("sub"));
        UUID userId = userService.getUserById(id)
                .map(User::getId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PurchaseRequest request = requestService.createRequest(
                requestDTO.getListingId(),
                userId,
                requestDTO.getMessage()
        );

        return ResponseEntity.status(201).body(request);
    }
}
