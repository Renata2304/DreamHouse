package com.example.dreamhouse.controller;

import com.example.dreamhouse.service.dto.FeedbackRequest;
import com.example.dreamhouse.entity.Feedback;
import com.example.dreamhouse.service.FeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/feedback")
@SecurityRequirement(name = "bearerAuth")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PreAuthorize("hasRole('client_user')")
    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody FeedbackRequest request) {
        try {
            log.info("Received feedback request: {}", request);
            Feedback feedback = feedbackService.createFeedback(request);
            log.info("Feedback created successfully with ID: {}", feedback.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(feedback);
        } catch (Exception e) {
            log.error("Error creating feedback: ", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Failed to submit feedback: " + e.getMessage()));
        }
    }
} 