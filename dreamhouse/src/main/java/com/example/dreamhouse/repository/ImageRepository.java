package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {

    List<Image> findByListingId(UUID listingId);
}
