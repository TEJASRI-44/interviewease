package com.interviewease.interviewease_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewease.interviewease_backend.model.AppliedInternship;

public interface AppliedInternshipRepository extends JpaRepository<AppliedInternship, Long> {

    List<AppliedInternship> findByUserId(String userId);
}
