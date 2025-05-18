package com.example.dreamhouse.service;

import com.example.dreamhouse.service.dto.FeedbackRequest;
import com.example.dreamhouse.entity.Feedback;
import com.example.dreamhouse.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final EmailService emailService;

    @Transactional
    public Feedback createFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setSatisfactionLevel(request.getSatisfactionLevel());
        feedback.setCategory(request.getCategory());
        feedback.setComments(request.getComments());
        feedback.setWantUpdates(request.isWantUpdates());
        feedback.setCreatedAt(LocalDateTime.now());

        feedback = feedbackRepository.save(feedback);
        emailService.sendFeedbackNotification(feedback);

        return feedback;
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
