package com.example.dreamhouse.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest {
    private String satisfactionLevel;
    private String category;
    private String comments;
    private boolean wantUpdates;
} 