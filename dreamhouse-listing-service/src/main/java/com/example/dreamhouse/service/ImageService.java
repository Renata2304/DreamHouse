package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Image;
import com.example.dreamhouse.entity.Listing;
import com.example.dreamhouse.repository.ImageRepository;
import com.example.dreamhouse.repository.ListingRepository;
import com.example.dreamhouse.service.dto.ImageDto;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;
    private final ListingRepository listingRepository;

    public ImageService(ImageRepository imageRepository, ListingRepository listingRepository) {
        this.imageRepository = imageRepository;
        this.listingRepository = listingRepository;
    }

    public Image addImage(ImageDto imageDto, UUID listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        Image image = new Image();
        image.setListing(listing);
        image.setImageUrl(imageDto.getImageUrl());

        return imageRepository.save(image);
    }

    public List<ImageDto> getImagesByListing(UUID listingId) {
        List<Image> images = imageRepository.findByListingId(listingId);
        return images.stream()
                .map(image -> new ImageDto()
                        .setListingId(image.getListing().getId())
                        .setImageUrl(image.getImageUrl()))
                .collect(Collectors.toList());
    }
}
