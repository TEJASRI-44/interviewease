package com.interviewease.interviewease_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.interviewease.interviewease_backend.model.InterviewSlot;

@Repository
public interface InterviewSlotRepository extends JpaRepository<InterviewSlot, Long> {
    List<InterviewSlot> findByBookedFalse();
	List<InterviewSlot> findByBookedBy(String user);
}
