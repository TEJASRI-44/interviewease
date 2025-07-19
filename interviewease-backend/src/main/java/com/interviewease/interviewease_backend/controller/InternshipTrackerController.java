package com.interviewease.interviewease_backend.controller;

import com.interviewease.interviewease_backend.model.AppliedInternship;
import com.interviewease.interviewease_backend.model.Internship;
import com.interviewease.interviewease_backend.model.SavedInternship;
import com.interviewease.interviewease_backend.repository.AppliedInternshipRepository;
import com.interviewease.interviewease_backend.repository.InternshipRepository;
import com.interviewease.interviewease_backend.repository.SavedInternshipRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/internship-tracker")
@CrossOrigin(origins = "http://localhost:3000")
public class InternshipTrackerController {

    @Autowired
    private AppliedInternshipRepository appliedRepo;

    @Autowired
    private InternshipRepository internshipRepo;
    
    @Autowired
    private SavedInternshipRepository savedRepo;

    // ✅ 1. Get internships user has already applied to
    @GetMapping("/applied/{userId}")
    public List<AppliedInternship> getAppliedInternships(@PathVariable String userId) {
        return appliedRepo.findByUserId(userId);
    }

    // ✅ 2. Get internships user has not applied to yet
    @GetMapping("/available/{userId}")
    public List<Internship> getAvailableInternships(@PathVariable String userId) {
        List<AppliedInternship> applied = appliedRepo.findByUserId(userId);
        Set<Long> appliedIds = applied.stream()
                .map(a -> a.getInternship().getId())
                .collect(Collectors.toSet());

        return internshipRepo.findAll().stream()
                .filter(i -> !appliedIds.contains(i.getId()))
                .collect(Collectors.toList());
    }

    // ✅ 3. Apply to a new internship (basic version)
    @PostMapping("/apply/{internshipId}")
    public String applyToInternship(@PathVariable Long internshipId, @RequestParam String userId) {
        Internship internship = internshipRepo.findById(internshipId).orElse(null);
        if (internship == null) {
            return "Internship not found";
        }

        AppliedInternship applied = new AppliedInternship();
        applied.setUserId(userId);
        applied.setInternship(internship);
        applied.setResumeLink("uploaded-later.pdf");  // Update this if you're uploading resume later
        applied.setAppliedDate(LocalDate.now());
        applied.setStatus("Applied");

        appliedRepo.save(applied);
        return "Applied successfully";
    }
    
    @PostMapping("/save/{internshipId}")
    public String saveInternship(@PathVariable Long internshipId, @RequestParam String userId) {
        Internship internship = internshipRepo.findById(internshipId).orElse(null);
        
        if (internship == null) {
            return "Internship not found";
        }

        SavedInternship saved = new SavedInternship();
        saved.setUserId(userId);
        saved.setInternship(internship);
        saved.setSavedDate(LocalDate.now());

        savedRepo.save(saved);
        return "Saved successfully";
    }

    
    @GetMapping("/saved/{userId}")
    public List<Internship> getSavedInternships(@PathVariable String userId) {
        List<SavedInternship> saved = savedRepo.findByUserId(userId);
        
        // extract internships from saved list
        return saved.stream()
                    .map(SavedInternship::getInternship)
                    .collect(Collectors.toList());
    }
}
