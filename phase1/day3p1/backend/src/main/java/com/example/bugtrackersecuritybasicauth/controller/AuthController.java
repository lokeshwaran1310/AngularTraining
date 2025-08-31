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
import com.example.bugtrackersecuritybasicauth.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtService jwtService;

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
}