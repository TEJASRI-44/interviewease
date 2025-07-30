import React, { useState } from "react";
import axios from "axios";

function InterviewSlotSchedule() {
 const [slot, setSlot] = useState({
  interviewerId: localStorage.getItem("userId"),
  date: "",
  startTime: "",
  endTime: "",
});


  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/slots/add", slot);
      alert("Slot scheduled!");
      setSlot({
        ...slot,
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Failed to schedule:", error);
      alert("Error scheduling slot.");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "3rem auto",
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1.5rem",
      color: "#333",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2 style={styles.heading}>Schedule Interview Slot</h2>

      <label style={styles.label}>Date:</label>
      <input
        type="date"
        name="date"
        value={slot.date}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <label style={styles.label}>Start Time:</label>
      <input
        type="time"
        name="startTime"
        value={slot.startTime}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <label style={styles.label}>End Time:</label>
      <input
        type="time"
        name="endTime"
        value={slot.endTime}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>
        Schedule Slot
      </button>
    </form>
  );
}

export default InterviewSlotSchedule;
