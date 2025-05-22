package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Image;
import com.example.dreamhouse.service.ImageService;
import com.example.dreamhouse.service.dto.ImageDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/images")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "http://localhost:3001")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @PostMapping("/add")
    public ResponseEntity<?> addImages(@RequestBody List<ImageDto> imageDtos, @RequestParam UUID listingId) {
        List<Image> images = imageService.addImages(imageDtos, listingId);
        return ResponseEntity.status(201).body(images);
    }


    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/byListing/{listingId}")
    public ResponseEntity<List<ImageDto>> getImagesByListing(@PathVariable UUID listingId) {
        List<ImageDto> images = imageService.getImagesByListing(listingId);
        return ResponseEntity.status(200).body(images);
    }
}
