package com.interviewease.interviewease_backend.controller;

import com.interviewease.interviewease_backend.jwt.JwtUtil;
import com.interviewease.interviewease_backend.model.User;
import com.interviewease.interviewease_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private final org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder encoder =
            new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        Map<String, String> res = new HashMap<>();

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            res.put("message", "Email already registered");
            return res;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        res.put("message", "Signup successful");
        return res;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User loginRequest) {
        Map<String, Object> res = new HashMap<>();

        Optional<User> userOpt = userRepo.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            res.put("message", "Invalid email or password");
            return res;
        }

        User user = userOpt.get();

        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            res.put("message", "Invalid email or password");
            return res;
        }

        String token;
        try {
            token = JwtUtil.generateToken(user.getEmail());
        } catch (Exception e) {
            res.put("message", "Token generation failed");
            return res;
        }

        res.put("message", "Login successful");
        res.put("token", token);
        res.put("role", user.getRole());
        res.put("name", user.getName());
        res.put("userid", user.getuserId()); // fixed method name casing
        return res;
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        boolean isValid = jwtUtil.validateToken(token);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }
}
