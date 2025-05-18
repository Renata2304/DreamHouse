package com.dreamhouse.feedbackservice.service;

import com.dreamhouse.feedbackservice.dto.FeedbackRequest;
import com.dreamhouse.feedbackservice.model.Feedback;
import com.dreamhouse.feedbackservice.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final EmailService emailService;

    @Transactional
    public Feedback createFeedback(FeedbackRequest request) {
        Feedback feedback = Feedback.builder()
                .satisfactionLevel(request.getSatisfactionLevel())
                .category(request.getCategory())
                .comments(request.getComments())
                .wantUpdates(request.isWantUpdates())
                .build();

        feedback = feedbackRepository.save(feedback);
        emailService.sendFeedbackNotification(feedback);

        return feedback;
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
} 