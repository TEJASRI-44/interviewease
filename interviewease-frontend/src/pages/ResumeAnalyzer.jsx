import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:8080/api/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📄 Resume Analyzer</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>Analyze</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>🧠 Feedback: {result.feedback}</h3>
          <ul>
            {Object.entries(result.skills).map(([skill, score]) => (
              <li key={skill}>
                <strong>{skill}</strong>: {score}/100
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
