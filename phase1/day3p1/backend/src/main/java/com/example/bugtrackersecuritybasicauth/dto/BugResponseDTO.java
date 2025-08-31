package com.example.bugtrackersecuritybasicauth.dto;

public class BugResponseDTO {
    private Long id;
    private String title;
    private String assignee;
    private String status;
    private String project;
    
    public BugResponseDTO() {
    }

    public BugResponseDTO(Long id, String title, String assignee, String status, String project) {
        this.id = id;
        this.title = title;
        this.assignee = assignee;
        this.status = status;
        this.project = project;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }
    
    
}
