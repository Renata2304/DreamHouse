package com.example.dreamhouse.controller;

import com.example.dreamhouse.entity.Image;
import com.example.dreamhouse.service.ImageService;
import com.example.dreamhouse.service.dto.ImageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addImage(@RequestBody ImageDto imageDto, @RequestParam UUID listingId) {
        Image image = imageService.addImage(imageDto, listingId);
        return ResponseEntity.status(201).body(image);
    }

    @GetMapping("/byListing/{listingId}")
    public ResponseEntity<List<ImageDto>> getImagesByListing(@PathVariable UUID listingId) {
        List<ImageDto> images = imageService.getImagesByListing(listingId);
        return ResponseEntity.status(200).body(images);
    }
}
