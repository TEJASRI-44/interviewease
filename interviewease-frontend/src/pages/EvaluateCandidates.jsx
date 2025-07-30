// File: EvaluateCandidates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function EvaluateCandidates() {
  const [videos, setVideos] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recordings/all")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Error loading videos:", err));
  }, []);

  const handleGetFeedback = async (videoUrl, index) => {
    try {
      const videoBlob = await fetch("http://localhost:8080" + videoUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", videoBlob, `video_${index}.webm`);

      const res = await axios.post(
        "http://localhost:8080/api/evaluation/get-feedback",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFeedback((prev) => ({ ...prev, [index]: res.data.feedback || res.data }));
    } catch (err) {
      console.error("Error getting feedback:", err);
      alert("Failed to get AI feedback");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ textAlign: "center" }}>Evaluate Interview Recordings</h2>
      {videos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No recordings found.</p>
      ) : (
        videos.map((video, index) => (
          <div key={video.id} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "10px" }}>
            <h4>Candidate ID: {video.candidateId}</h4>
            <video width="100%" height="300" controls>
              <source src={`http://localhost:8080${video.videoUrl}`} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => handleGetFeedback(video.videoUrl, index)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Get AI Feedback
            </button>
            {feedback[index] && (
              <div style={{ marginTop: "10px", color: "#2c3e50" }}>
                <strong>AI Feedback:</strong> {feedback[index]}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EvaluateCandidates;
