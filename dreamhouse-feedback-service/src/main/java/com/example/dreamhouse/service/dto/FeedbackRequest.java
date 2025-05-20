package com.example.dreamhouse.service.dto;

public class FeedbackRequest {
    private String satisfactionLevel;
    private String category;
    private String comments;
    private boolean wantUpdates;

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
}