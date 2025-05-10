package com.example.dreamhouse.repository;

import com.example.dreamhouse.entity.PurchaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, UUID> {
}
