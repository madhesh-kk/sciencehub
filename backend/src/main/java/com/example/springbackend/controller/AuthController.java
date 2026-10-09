package com.example.springbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbackend.model.User;
import com.example.springbackend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public java.util.Map<String, String> login(@RequestBody User user) {
        User found = userRepository.findByUsername(user.getUsername());
        java.util.Map<String, String> response = new java.util.HashMap<>();
        if (found != null && found.getPassword().equals(user.getPassword())) {
            response.put("message", "Login successful");
            response.put("username", found.getUsername());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
        return response;
    }
}
