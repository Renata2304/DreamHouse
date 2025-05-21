package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.service.ListingService;
import com.example.dreamhouse.service.dto.ListingDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/listing")
@CrossOrigin(origins = "http://localhost:3001")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

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

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/getListingDetails/{id}")
    public ResponseEntity<Listing> getListing(@PathVariable UUID id) {
        Listing listing = listingService.getListingById(id);
        return ResponseEntity.status(200).body(listing);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PutMapping("/editListing/{id}")
    public ResponseEntity<Listing> editListing(
            @PathVariable UUID id,
            @RequestBody ListingDto updatedListingDto) {
        Listing updatedListing = listingService.editListing(id, updatedListingDto);
        return ResponseEntity.ok(updatedListing);
    }


}
