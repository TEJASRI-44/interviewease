package com.interviewease.interviewease_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewease.interviewease_backend.model.Internship;
import com.interviewease.interviewease_backend.model.SavedInternship;

public interface SavedInternshipRepository extends JpaRepository<SavedInternship, Long> {
    List<SavedInternship> findByUserId(String userId);

}
