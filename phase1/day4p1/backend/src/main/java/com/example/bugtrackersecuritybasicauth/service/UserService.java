package com.example.bugtrackersecuritybasicauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bugtrackersecuritybasicauth.entity.User;
import com.example.bugtrackersecuritybasicauth.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(String username, String password, String role) {
        System.out.println("Attempting to register user: " + username);
        
        // Input validation
        if (username == null || username.trim().isEmpty()) {
            return "Username cannot be empty";
        }
        if (password == null || password.trim().isEmpty()) {
            return "Password cannot be empty";
        }
        
        if (userRepository.existsByUsername(username)) {
            System.out.println("Username already exists: " + username);
            return "Username already exists";
        }
        
        // Validate role
        if (role == null || (!role.equals("USER") && !role.equals("DEVELOPER") && !role.equals("ADMIN"))) {
            role = "USER";
        }
        
        User user = new User(username, "{noop}" + password, role);
        userRepository.save(user);
        System.out.println("User registered successfully: " + username);
        
        return "User registered successfully";
    }
}