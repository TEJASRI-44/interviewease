import React, { useEffect, useState } from "react";
import axios from "axios";

function JoinInterviewpage() {
  const [slot, setSlot] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const interviewerId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/slots/next-slot/${interviewerId}`)
      .then((res) => setSlot(res.data))
      .catch((err) => console.error("Error fetching next slot:", err));
  }, [interviewerId]);

  const handleJoin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/slots/notify/${slot.id}`);
      window.open(`https://meet.jit.si/interviewease-slot-${slot.id}`, "_blank");
    } catch (err) {
      console.error("Error notifying candidate:", err);
      alert("Failed to notify candidate.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", video);
    formData.append("candidateId", slot.bookedBy);
    formData.append("interviewerId", slot.interviewerId);

    try {
      const res = await axios.post("http://localhost:8080/api/upload-recording", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMsg(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMsg("Upload failed. Please try again.");
    }
  };

  if (!slot) {
    return <p style={{ textAlign: "center" }}>No upcoming interviews found.</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center", fontFamily: "Segoe UI" }}>
      <h2>Next Interview Slot</h2>
      <p><strong>Date:</strong> {slot.date}</p>
      <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
      <p><strong>Candidate ID:</strong> {slot.bookedBy}</p>

      <button
        onClick={handleJoin}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Join Interview
      </button>

      <hr style={{ margin: "2rem 0" }} />
      <h3>Upload Interview Recording</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} required />
        <br /><br />
        <button type="submit" style={{ padding: "8px 20px" }}>Upload</button>
      </form>
      <p style={{ color: "green", marginTop: "1rem" }}>{uploadMsg}</p>
    </div>
  );
}

export default JoinInterviewpage;
