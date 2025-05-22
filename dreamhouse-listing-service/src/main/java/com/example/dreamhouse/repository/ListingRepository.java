package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ListingRepository extends JpaRepository<Listing, UUID> {

    @Query("SELECT l FROM Listing l WHERE l.location = :location")
    Optional<List<Listing>> findByLocation(@Param("location") String location);

    List<Listing> findAllByOwnerId(UUID ownerId);

}
