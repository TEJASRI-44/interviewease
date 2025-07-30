import React, { useEffect, useState } from "react";
import axios from "axios";

function ScheduledInterviews() {
  const [slots, setSlots] = useState([]);
  const interviewerId = localStorage.getItem("userId");

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/api/slots/bookings/interviewer/${interviewerId}`)
    //   .then((res) => setSlots(res.data))
    //   .catch((err) => console.error("Error loading interviews:", err));
    console.log("interviewerId:", interviewerId);
axios
  .get(`http://localhost:8080/api/slots/bookings/interviewer/${interviewerId}`)
  .then((res) => {
    console.log("Fetched slots:", res.data);
    setSlots(res.data);
  })
  .catch((err) => console.error("Error loading interviews:", err));

  }, [interviewerId]);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ textAlign: "center" }}>Scheduled Interview Slots</h2>
      {slots.length === 0 ? (
        <p style={{ textAlign: "center" }}>No interviews scheduled yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#6c757d", color: "white" }}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Start Time</th>
              <th style={styles.th}>End Time</th>
              <th style={styles.th}>Booked By</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td style={styles.td}>{slot.date}</td>
                <td style={styles.td}>{slot.startTime}</td>
                <td style={styles.td}>{slot.endTime}</td>
                <td style={styles.td}>{slot.bookedBy ? slot.candidate : "Not Booked"}</td>
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

export default ScheduledInterviews;
