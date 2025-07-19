package com.interviewease.interviewease_backend.controller;

import com.interviewease.interviewease_backend.model.AppliedInternship;
import com.interviewease.interviewease_backend.model.Internship;
import com.interviewease.interviewease_backend.repository.AppliedInternshipRepository;
import com.interviewease.interviewease_backend.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auto-apply")
@CrossOrigin(origins = "http://localhost:3000")
public class AutoApplyController {

    @Autowired
    private InternshipRepository internshipRepo;

    @Autowired
    private AppliedInternshipRepository appliedRepo;

    // Match internships based on user preferences
    @PostMapping
    public List<Internship> autoApply(@RequestBody Map<String, String> preferences) {
        String skills = preferences.get("skills").toLowerCase();
        String location = preferences.get("location");
        String type = preferences.get("type");

        List<Internship> filtered = internshipRepo.findByLocationIgnoreCaseAndTypeIgnoreCase(location, type);

        return filtered.stream()
                .filter(internship ->
                        Arrays.stream(internship.getRequiredSkills().toLowerCase().split(","))
                                .anyMatch(skill -> skills.contains(skill.trim())))
                .collect(Collectors.toList());
    }

    // Apply to all matched internships
    @PostMapping("/apply-all")
    public ResponseEntity<?> applyToAll(@RequestParam("userId") String userId,
                                        @RequestParam("skills") String skills,
                                        @RequestParam("location") String location,
                                        @RequestParam("type") String type,
                                        @RequestParam("resume") MultipartFile resume) {
        try {
            // Save resume
            String filename = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
            Path filepath = Paths.get("resumes", filename);
            Files.createDirectories(filepath.getParent());
            Files.write(filepath, resume.getBytes());

            // Filter internships
            List<Internship> matches = internshipRepo.findByLocationIgnoreCaseAndTypeIgnoreCase(location, type);
            List<Internship> filtered = matches.stream()
                    .filter(internship -> Arrays.stream(internship.getRequiredSkills().toLowerCase().split(","))
                            .anyMatch(skill -> skills.toLowerCase().contains(skill.trim())))
                    .collect(Collectors.toList());

            // Save applications
            for (Internship internship : filtered) {
                AppliedInternship applied = new AppliedInternship();
                applied.setUserId(userId);
                applied.setInternship(internship);
                applied.setResumeLink(filename);
                applied.setStatus("Applied");
                applied.setAppliedDate(LocalDate.now());

                appliedRepo.save(applied);
            }

            return ResponseEntity.ok(filtered);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Resume upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<Internship> getAllInternships() {
        return internshipRepo.findAll();
    }
}
