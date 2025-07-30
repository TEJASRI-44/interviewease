import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Your Role</h2>
      <button onClick={() => navigate("/resume")}>🎓 Candidate</button>
      <button onClick={() => navigate("/video")}>🧑‍💼 Interviewer</button>
    </div>
  );
};

export default RoleSelector;
