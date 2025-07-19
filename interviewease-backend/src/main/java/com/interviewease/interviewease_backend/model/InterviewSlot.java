package com.interviewease.interviewease_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InterviewSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;    // Format: YYYY-MM-DD
    private String time;    // Format: HH:mm
    private boolean booked = false;
    private String bookedBy;

    // ✅ No-arg constructor (required by JPA)
    public InterviewSlot() {}

    // ✅ All-args constructor (used in CommandLineRunner)
    public InterviewSlot(Long id, String date, String time, boolean booked, String bookedBy) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.booked = booked;
        this.bookedBy = bookedBy;
    }

    // 🔁 Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public boolean isBooked() { return booked; }
    public void setBooked(boolean booked) { this.booked = booked; }

    public String getBookedBy() { return bookedBy; }
    public void setBookedBy(String bookedBy) { this.bookedBy = bookedBy; }
}
