package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.UserRepository;
import com.example.dreamhouse.service.dto.ListingDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
                                .setTitle(listing.getTitle())
                                .setDescription(listing.getDescription())
                                .setPrice(listing.getPrice())
                                .setLocation(listing.getLocation()))
                        .collect(Collectors.toList())
        ).orElse(Collections.emptyList());
    }

    public Listing addListing(ListingDto listingDto, UUID ownerId) {
        Optional<User> ownerOpt = userRepository.findById(ownerId);
        if (ownerOpt.isPresent()) {
            User owner = ownerOpt.get();

            Listing listing = new Listing();
            listing.setTitle(listingDto.getTitle());
            listing.setDescription(listingDto.getDescription());
            listing.setPrice(listingDto.getPrice());
            listing.setLocation(listingDto.getLocation());
            listing.setOwner(owner);

            return listingRepository.save(listing);
        } else {
            throw new IllegalArgumentException("Owner not found");
        }
    }
}
