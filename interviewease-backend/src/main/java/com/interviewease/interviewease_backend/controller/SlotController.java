package com.interviewease.interviewease_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interviewease.interviewease_backend.model.InterviewSlot;
import com.interviewease.interviewease_backend.repository.InterviewSlotRepository;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    @Autowired
    private InterviewSlotRepository slotRepo;

    @GetMapping
    public List<InterviewSlot> getAvailableSlots() {
        return slotRepo.findByBookedFalse();
    }

    @PostMapping("/book/{id}")
    public ResponseEntity<String> bookSlot(@PathVariable Long id, @RequestParam String user) {
        Optional<InterviewSlot> slotOpt = slotRepo.findById(id);
        if (slotOpt.isEmpty() || slotOpt.get().isBooked()) {
            return ResponseEntity.badRequest().body("Slot unavailable");
        }

        InterviewSlot slot = slotOpt.get();
        slot.setBooked(true);
        slot.setBookedBy(user);
        slotRepo.save(slot);
        return ResponseEntity.ok("Slot booked successfully");
    }
    
    @GetMapping("/bookings/user/{user}")
    public ResponseEntity<List<InterviewSlot>> getBookedSlotsByUser(@PathVariable String user) {
        List<InterviewSlot> slots = slotRepo.findByBookedBy(user);
        return ResponseEntity.ok(slots);
    }
    
    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id, @RequestParam String user) {
        Optional<InterviewSlot> slotOpt = slotRepo.findById(id);
        if (slotOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Slot not found");
        }

        InterviewSlot slot = slotOpt.get();

        if (!slot.isBooked() || !user.equals(slot.getBookedBy())) {
            return ResponseEntity.badRequest().body("You are not authorized to cancel this booking");
        }

        slot.setBooked(false);
        slot.setBookedBy(null);
        slotRepo.save(slot);
        return ResponseEntity.ok("Booking cancelled successfully");
    }


}
