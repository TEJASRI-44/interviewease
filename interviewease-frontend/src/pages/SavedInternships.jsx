import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedInternships = () => {
  const [savedInternships, setSavedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

   useEffect(()=>{
      if(!userId){
        alert("user not logged in");
      }
    },[userId]);

  useEffect(() => {
    const fetchSavedInternships = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/internship-tracker/saved/${userId}`
        );
        setSavedInternships(res.data);
      } catch (error) {
        console.error("Failed to load saved internships", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedInternships();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Saved Internships</h2>
      {savedInternships.length === 0 ? (
        <p>No saved internships found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {savedInternships.map((internship, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
              <h4>{internship.title}</h4>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Location:</strong> {internship.location}</p>
              <p><strong>Type:</strong> {internship.type}</p>
              <p><strong>Stipend:</strong> {internship.stipend}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedInternships;
