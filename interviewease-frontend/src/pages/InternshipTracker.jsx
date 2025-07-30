import React, { useEffect, useState } from "react";
import axios from "axios";

const InternshipTracker = () => {
  const [applied, setApplied] = useState([]);
  const [available, setAvailable] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const userId = localStorage.getItem("userId")

  useEffect(()=>{
    if(!userId){
      alert("user not logged in");
    }
  },[userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/internship-tracker/applied/${userId}`)
      .then((res) => {
        setApplied(res.data);
        const ids = res.data.map((item) => item.internship?.id); // null-safe
        setAppliedIds(ids);
      })
      .catch((err) => console.error("Applied Fetch Error", err));

   
    axios
      .get(`http://localhost:8080/api/auto-apply/all`)
      .then((res) => {
        setAvailable(res.data);
      })
      .catch((err) => console.error("Available Fetch Error", err));
  }, [userId]);

  // ✅ Apply to internship
  const handleApply = async (internshipId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/internship-tracker/apply/${internshipId}?userId=${userId}`
      );
      setAppliedIds((prev) => [...prev, internshipId]);
      alert(" Applied successfully");
    } catch (err) {
      alert(" Failed to apply");
    }
  };

 
  const handleSave = async (internshipId) => {
    try {
    await axios.post(
      `http://localhost:8080/api/internship-tracker/save/${internshipId}`,
      null,
      {
        params: {
          userId: userId,
        },
      }
    );
      setSavedIds((prev) => [...prev, internshipId]);
      alert(" Internship saved");
    } catch (err) {
      alert(" Failed to save internship");
    }
  };

  return (
    <div style={pageStyle}>
      <h2> Internship Tracker</h2>

      {/*  Applied Internships Section */}
      <section>
        <h3> Applied Internships</h3>
        {applied.length === 0 ? (
          <p>No internships applied yet.</p>
        ) : (
          <ul style={ulStyle}>
            {applied.map((item) => (
              <li key={item.id} style={cardStyle}>
                <h4>
                  {item.internship?.title} at {item.internship?.company}
                </h4>
                <p>
                  <strong>Location:</strong> {item.internship?.location}
                </p>
                <p>
                  <strong>Type:</strong> {item.internship?.type}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/*  Available Internships Section */}
      <section style={{ marginTop: "40px" }}>
        <h3> Available Internships</h3>
        {available.length === 0 ? (
          <p>No internships available.</p>
        ) : (
          <ul style={ulStyle}>
            {available.map((intern) => (
              <li key={intern.id} style={cardStyle}>
                <h4>
                  {intern.title} at {intern.company}
                </h4>
                <p>
                  <strong>Location:</strong> {intern.location}
                </p>
                <p>
                  <strong>Type:</strong> {intern.type}
                </p>
                <p>
                  <strong>Skills:</strong> {intern.requiredSkills}
                </p>

                <button
                  style={{
                    ...btnStyle,
                    backgroundColor: appliedIds.includes(intern.id)
                      ? "#95a5a6"
                      : "#27ae60",
                  }}
                  disabled={appliedIds.includes(intern.id)}
                  onClick={() => handleApply(intern.id)}
                >
                  {appliedIds.includes(intern.id)
                    ? " Applied"
                    : " Apply"}
                </button>

                <button
                  style={{
                    ...btnStyle,
                    backgroundColor: savedIds.includes(intern.id)
                      ? "#f39c12"
                      : "#2980b9",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleSave(intern.id)}
                  disabled={savedIds.includes(intern.id)}
                >
                  {savedIds.includes(intern.id) ? "⭐ Saved" : "⭐ Save"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

//  Styling
const pageStyle = {
  padding: "30px",
  maxWidth: "800px",
  margin: "auto",
  fontFamily: "Segoe UI",
};

const ulStyle = {
  padding: 0,
  listStyle: "none",
};

const cardStyle = {
  background: "#fff",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const btnStyle = {
  padding: "8px 15px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default InternshipTracker;
