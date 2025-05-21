package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.exception.EntityNotFoundException;
import com.example.dreamhouse.exception.UnauthorizedException;
import com.example.dreamhouse.service.ListingService;
import com.example.dreamhouse.service.dto.ListingDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/listing")
@CrossOrigin(origins = "*")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    // Method to get listings by location (or other criteria like owner)
    @GetMapping("/getByLocation")
    public ResponseEntity<List<ListingDto>> getListingsByLocation(@RequestParam String location) {
        List<ListingDto> listingDtoList = listingService.getListingsByLocation(location);
        return ResponseEntity.status(200).body(listingDtoList);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PostMapping("/addListing")
    public ResponseEntity<Listing> addListing(@RequestBody ListingDto listingDto, Principal principal) {
        if (principal == null) {
            throw new IllegalStateException("No user is logged in");
        }
        Listing listing = listingService.addListing(listingDto);
        return ResponseEntity.status(200).body(listing);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @DeleteMapping("/deleteListing/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable UUID id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }

}
