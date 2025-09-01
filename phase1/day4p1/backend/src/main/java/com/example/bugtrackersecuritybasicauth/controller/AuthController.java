package com.example.bugtrackersecuritybasicauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bugtrackersecuritybasicauth.dto.AuthRequestDto;
import com.example.bugtrackersecuritybasicauth.dto.AuthResponseDto;
import com.example.bugtrackersecuritybasicauth.dto.RegisterRequestDto;
import com.example.bugtrackersecuritybasicauth.service.JwtService;
import com.example.bugtrackersecuritybasicauth.service.UserService;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        
        String token = jwtService.generateToken(authRequest.getUsername());
        return ResponseEntity.ok(new AuthResponseDto(token, authRequest.getUsername()));
    }
    
    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); 
        String username = jwtService.extractUsername(token);
        
        if (jwtService.validateToken(token, username)) {
            return ResponseEntity.ok("Token is valid for user: " + username);
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
    
    @GetMapping("/user")
    public ResponseEntity<String> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        return ResponseEntity.ok(username);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto registerRequest) {
        System.out.println("Register endpoint called with username: " + registerRequest.getUsername());
        
        try {
            String result = userService.registerUser(registerRequest.getUsername(), 
                                                   registerRequest.getPassword(), 
                                                   registerRequest.getRole());
            
            System.out.println("Registration result: " + result);
            
            if (result.equals("Username already exists") || result.contains("cannot be empty")) {
                return ResponseEntity.badRequest().body(Map.of("message", result, "success", false));
            }
            
            return ResponseEntity.ok(Map.of("message", result, "success", true));
        } catch (Exception e) {
            System.out.println("Registration error: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("message", "Registration failed", "success", false));
        }
    }
}