package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.entity.PurchaseRequest;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.repository.PurchaseRequestRepository;
import com.example.dreamhouse.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PurchaseRequestService {

    private final PurchaseRequestRepository requestRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public PurchaseRequestService(
            PurchaseRequestRepository requestRepository,
            ListingRepository listingRepository,
            UserRepository userRepository,
            EmailService emailService
    ) {
        this.requestRepository = requestRepository;
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public PurchaseRequest createRequest(UUID listingId, UUID userId, String message) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found"));
        User requester = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        User owner = listing.getOwner();

        PurchaseRequest request = new PurchaseRequest();
        request.setListing(listing);
        request.setRequester(requester);
        request.setMessage(message);
        PurchaseRequest savedRequest = requestRepository.save(request);

        emailService.sendUserInterestNotification(
                owner.getEmail(),
                requester.getUsername(),
                listing.getTitle()
        );

        return savedRequest;
    }

}
