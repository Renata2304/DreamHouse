package com.example.dreamhouse.entity;

import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "feedbacks", schema = "project")
public class Feedback {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(name = "satisfaction_level", nullable = false)
    private String satisfactionLevel;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String comments;

    @Column(name = "want_updates")
    private boolean wantUpdates;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSatisfactionLevel() {
        return satisfactionLevel;
    }

    public void setSatisfactionLevel(String satisfactionLevel) {
        this.satisfactionLevel = satisfactionLevel;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public boolean isWantUpdates() {
        return wantUpdates;
    }

    public void setWantUpdates(boolean wantUpdates) {
        this.wantUpdates = wantUpdates;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}