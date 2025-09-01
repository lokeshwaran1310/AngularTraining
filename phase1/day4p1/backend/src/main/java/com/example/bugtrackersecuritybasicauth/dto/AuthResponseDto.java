package com.example.bugtrackersecuritybasicauth.dto;

public class AuthResponseDto {
    private String token;
    private String username;
    
    public AuthResponseDto(String token, String username) {
        this.token = token;
        this.username = username;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}
