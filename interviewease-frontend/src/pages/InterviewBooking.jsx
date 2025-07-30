import React, { useEffect, useState } from "react";
import axios from "axios";

function InterviewBookings() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/slots/available");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleBook = async (slotId) => {
    const userId = localStorage.getItem("userId"); // candidate ID
    try {
      await axios.post(`http://localhost:8080/api/slots/book/${slotId}?user=${userId}`);
      alert("Slot booked successfully!");
      fetchAvailableSlots(); // Refresh list
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book slot");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Available Interview Slots</h2>
      {slots.length === 0 ? (
        <p style={{ textAlign: "center" }}>No slots available</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#007bff", color: "white" }}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Start Time</th>
              <th style={styles.th}>End Time</th>
              <th style={styles.th}>Interviewer ID</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td style={styles.td}>{slot.date}</td>
                <td style={styles.td}>{slot.startTime}</td>
                <td style={styles.td}>{slot.endTime}</td>
                <td style={styles.td}>{slot.interviewerId}</td>
                <td style={styles.td}>
                  <button onClick={() => handleBook(slot.id)} style={styles.button}>
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default InterviewBookings;
