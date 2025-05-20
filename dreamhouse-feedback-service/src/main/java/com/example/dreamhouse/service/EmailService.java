package com.example.dreamhouse.service;

import com.example.dreamhouse.entity.Feedback;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("feedback@dreamhouse.com")
    private String fromEmail;

    @Value("admin@dreamhouse.com")
    private String notificationEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFeedbackNotification(Feedback feedback) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(notificationEmail);
            helper.setSubject("New Anonymous Feedback Received");

            String emailContent = buildEmailContent(feedback);
            helper.setText(emailContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send feedback notification email", e);
        }
    }

    private String buildEmailContent(Feedback feedback) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return String.format("""
            <html>
            <body>
                <h2>New Anonymous Feedback Received</h2>
                <p><strong>Received at:</strong> %s</p>
                <p><strong>Category:</strong> %s</p>
                <p><strong>Satisfaction Level:</strong> %s</p>
                <p><strong>Comments:</strong></p>
                <p style="margin-left: 20px;">%s</p>
                <p><strong>Wants Updates:</strong> %s</p>
            </body>
            </html>
            """,
                feedback.getCreatedAt().format(formatter),
                feedback.getCategory(),
                feedback.getSatisfactionLevel(),
                feedback.getComments().replace("\n", "<br/>"),
                feedback.isWantUpdates() ? "Yes" : "No"
        );
    }
}