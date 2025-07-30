import React, { useState } from "react";
import axios from "axios";

const AutoApply = () => {
  const [preferences, setPreferences] = useState({
    skills: "",
    location: "",
    type: "",
  });
  const [resume, setResume] = useState(null);
  const [matchedInternships, setMatchedInternships] = useState([]);

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("skills", preferences.skills);
    formData.append("location", preferences.location);
    formData.append("type", preferences.type);
    formData.append("resume", resume);
    formData.append("userId", localStorage.getItem("userId") || "defaultUser");

    try {
      const res = await axios.post("http://localhost:8080/api/auto-apply/apply-all", formData);
      setMatchedInternships(res.data);
      alert(` Applied to ${res.data.length} internships`);
    } catch (error) {
      console.error(error);
      alert(" Failed to apply. Try again.");
    }
  };

  return (
    <div style={container}>
      <h2> Auto Apply for Internships</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={preferences.skills}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="location"
          placeholder="Preferred Location"
          value={preferences.location}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="type"
          placeholder="Internship Type (remote/in-office)"
          value={preferences.type}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Apply All</button>
      </form>

      {matchedInternships.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>✅ Internships Applied</h3>
          <ul>
            {matchedInternships.map((i) => (
              <li key={i.id} style={cardStyle}>
                <h4>{i.title} at {i.company}</h4>
                <p><strong>Location:</strong> {i.location}</p>
                <p><strong>Type:</strong> {i.type}</p>
                <p><strong>Skills:</strong> {i.requiredSkills}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const container = { padding: "30px", maxWidth: "600px", margin: "auto" };
const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { padding: "10px", background: "#2c3e50", color: "#fff", border: "none", borderRadius: "5px" };
const cardStyle = {
  background: "#f8f9fa",
  padding: "15px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "6px",
};

export default AutoApply;
