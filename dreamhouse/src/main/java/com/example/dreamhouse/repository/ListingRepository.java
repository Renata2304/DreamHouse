package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ListingRepository extends JpaRepository<Listing, UUID> {

//    List<Listing> findByOwnerId(UUID ownerId);

//    List<Listing> findByLocationContainingIgnoreCase(String location);

//    List<Listing> findByPriceBetween(BigDecimal price, BigDecimal price2);

    Optional<List<Listing>> findByLocation(String location);
}
