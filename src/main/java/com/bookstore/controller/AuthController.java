package com.bookstore.controller;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByUsername(loginUser.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            return user.get(); // Basic authentication implementation
        }
        return null;
    }

    @PostMapping("/register")
    public User register(@RequestBody User registerUser) {
        Optional<User> existingUser = userRepository.findByUsername(registerUser.getUsername());
        if (existingUser.isPresent()) {
            return null; // User already exists
        }
        return userRepository.save(registerUser);
    }
}
