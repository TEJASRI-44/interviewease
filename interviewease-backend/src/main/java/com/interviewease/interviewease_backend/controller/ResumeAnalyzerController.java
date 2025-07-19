package com.interviewease.interviewease_backend.controller;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend
public class ResumeAnalyzerController {

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeResume(@RequestParam("resume") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Integer> skillScores = new HashMap<>();

        List<String> keywords = Arrays.asList("Java", "React", "Spring Boot", "SQL", "Python", "Git");

        try (InputStream inputStream = file.getInputStream();
             PDDocument document = PDDocument.load(inputStream)) {

            String resumeText = new PDFTextStripper().getText(document).toLowerCase();

            for (String skill : keywords) {
                int count = resumeText.split(skill.toLowerCase()).length - 1;
                skillScores.put(skill, Math.min(count * 10, 100)); // Max 100
            }

            response.put("skills", skillScores);
            int avg = (int) skillScores.values().stream().mapToInt(Integer::intValue).average().orElse(0);
            response.put("feedback", avg > 60 ? "Strong resume" : "Consider adding more skills");

        } catch (Exception e) {
            response.put("error", "Failed to read PDF");
            e.printStackTrace();
        }

        return ResponseEntity.ok(response);
    }
}
