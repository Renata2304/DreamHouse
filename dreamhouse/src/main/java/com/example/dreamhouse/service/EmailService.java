package com.example.dreamhouse.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendUserInterestNotification(String toEmail, String requesterUsername, String listingTitle) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Interes pentru proprietatea ta");
            helper.setText(
                    "Salut!\n\n" +
                            "Utilizatorul \"" + requesterUsername + "\" este interesat de proprietatea ta: \"" + listingTitle + "\".\n\n" +
                            "Te rugăm să te conectezi în platforma DreamHouse pentru a vedea detaliile.\n\n" +
                            "Cu respect,\nEchipa DreamHouse",
                    false
            );

            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Eroare la trimiterea emailului: " + e.getMessage());
        }
    }
}
