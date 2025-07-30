import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/slots/bookings/candidate/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error loading bookings:", err));
  }, [userId]);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ textAlign: "center" }}>My Booked Interviews</h2>
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#343a40", color: "white" }}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Start Time</th>
              <th style={styles.th}>End Time</th>
              <th style={styles.th}>Interviewer</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((slot) => (
              <tr key={slot.id}>
                <td style={styles.td}>{slot.date}</td>
                <td style={styles.td}>{slot.startTime}</td>
                <td style={styles.td}>{slot.endTime}</td>
                <td style={styles.td}>{slot.interviewer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: { padding: "10px", border: "1px solid #ccc", textAlign: "left" },
  td: { padding: "10px", border: "1px solid #ddd" },
};

export default MyBookings;