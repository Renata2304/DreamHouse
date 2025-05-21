package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.exception.EntityNotFoundException;
import com.example.dreamhouse.exception.UnauthorizedException;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.ListingDto;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public ListingService(ListingRepository listingRepository, UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    public List<ListingDto> getListingsByLocation(String location) {
        Optional<List<Listing>> optionalListingList = listingRepository.findByLocation(location);
        return optionalListingList.map(listings ->
                listings.stream()
                        .map(listing -> new ListingDto()
                                .setId(listing.getId())
                                .setTitle(listing.getTitle())
                                .setDescription(listing.getDescription())
                                .setPrice(listing.getPrice())
                                .setLocation(listing.getLocation()))
                        .collect(Collectors.toList())
        ).orElse(Collections.emptyList());
    }


    public Listing addListing(ListingDto listingDto) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = authentication.getToken();
        UUID id = UUID.fromString(jwt.getClaimAsString("sub"));
        Optional<User> userOpt = userRepository.findUserById(id);
        User owner = userOpt.orElseThrow(() -> new IllegalStateException("User not found"));

        Listing listing = new Listing();
        listing.setTitle(listingDto.getTitle());
        listing.setDescription(listingDto.getDescription());
        listing.setPrice(listingDto.getPrice());
        listing.setLocation(listingDto.getLocation());
        listing.setSurface(listingDto.getSurface());
        listing.setRooms(listingDto.getRooms());
        listing.setOwner(owner);

        return listingRepository.save(listing);
    }

    public void deleteListing(UUID listingId) {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getToken().getClaimAsString("sub");

        Optional<Listing> listingOpt = listingRepository.findById(listingId);
        if (listingOpt.isEmpty()) {
            throw new EntityNotFoundException("Listing with ID " + listingId + " not found.");
        }

        Listing listing = listingOpt.get();

        if (!listing.getOwner().getId().toString().equals(currentUserId)) {
            throw new UnauthorizedException("You are not allowed to delete this listing.");
        }

        listingRepository.deleteById(listingId);
    }

    public Listing getListingById(UUID id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Listing not found"));
    }

    public Listing editListing(UUID listingId, ListingDto updatedListingDto) {
        var authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getToken().getClaimAsString("sub");

        Optional<Listing> listingOpt = listingRepository.findById(listingId);
        if (listingOpt.isEmpty()) {
            throw new EntityNotFoundException("Listing with ID " + listingId + " not found.");
        }

        var listing = listingOpt.get();

        if (!listing.getOwner().getId().toString().equals(currentUserId)) {
            throw new UnauthorizedException("You are not allowed to edit this listing.");
        }

        // Update the listing fields with values from updatedListingDto
        listing.setTitle(updatedListingDto.getTitle());
        listing.setLocation(updatedListingDto.getLocation());
        listing.setPrice(updatedListingDto.getPrice());
        listing.setSurface(updatedListingDto.getSurface());
        listing.setRooms(updatedListingDto.getRooms());
        listing.setDescription(updatedListingDto.getDescription());

        return listingRepository.save(listing);
    }


}
