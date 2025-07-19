package com.interviewease.interviewease_backend.repository;

import com.interviewease.interviewease_backend.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByLocationIgnoreCaseAndTypeIgnoreCase(String location, String type);
}
