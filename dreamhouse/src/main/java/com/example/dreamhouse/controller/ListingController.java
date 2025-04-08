package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.service.ListingService;
import com.example.dreamhouse.service.dto.ListingDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/listing")
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

    // Method to add a listing
    @PostMapping("/addListing")
    public ResponseEntity<Listing> addListing(@RequestBody ListingDto listingDto, @RequestParam UUID ownerId) {
        Listing listing = listingService.addListing(listingDto, ownerId);
        return ResponseEntity.status(201).body(listing);
    }
}
