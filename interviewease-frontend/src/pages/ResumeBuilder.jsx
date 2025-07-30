import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ResumeTemplate = React.forwardRef(({ formData }, ref) => (
  <div ref={ref} style={{ padding: "30px", fontFamily: "Segoe UI", lineHeight: "1.6", color: "#2c3e50" }}>
    <h1 style={{ borderBottom: "2px solid #ccc" }}>{formData.name}</h1>
    <p><strong>Email:</strong> {formData.email} | <strong>Phone:</strong> {formData.phone}</p>
    <p><strong>LinkedIn:</strong> {formData.linkedin} | <strong>GitHub:</strong> {formData.github}</p>

    <h3>Objective</h3>
    <p>{formData.objective}</p>

    <h3>Skills</h3>
    <ul>{formData.skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>

    <h3>Education</h3>
    <ul>{formData.education.map((edu, i) => (
      <li key={i}><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</li>
    ))}</ul>

    <h3>Projects</h3>
    <ul>{formData.projects.map((proj, i) => (
      <li key={i}><strong>{proj.title}</strong>: {proj.description}</li>
    ))}</ul>

    <h3>Certifications</h3>
    <ul>{formData.certifications.map((cert, i) => <li key={i}>{cert}</li>)}</ul>

    <h3>Internships</h3>
    <ul>{formData.internships.map((intern, i) => (
      <li key={i}><strong>{intern.company}</strong> - {intern.role} ({intern.duration})</li>
    ))}</ul>

    <h3>Achievements</h3>
    <ul>{formData.achievements.map((ach, i) => <li key={i}>{ach}</li>)}</ul>
  </div>
));

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    objective: "",
    skills: [],
    education: [{ degree: "", institution: "", year: "" }],
    projects: [{ title: "", description: "" }],
    certifications: [""],
    internships: [{ company: "", role: "", duration: "" }],
    achievements: [""],
  });

  const [newSkill, setNewSkill] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateFieldArray = (key, index, field, value) => {
    const updated = [...formData[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const updateSingleFieldArray = (key, index, value) => {
    const updated = [...formData[key]];
    updated[index] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const addEntry = (key, template) => {
    setFormData({ ...formData, [key]: [...formData[key], template] });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData({ ...formData, skills: updated });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI" }}>
      <h2>Advanced Resume Builder</h2>

      {/* Personal Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
        <input name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} />
        <textarea name="objective" placeholder="Objective" value={formData.objective} onChange={handleChange} rows={3} />
      </div>

      {/* Skills */}
      <h3>Skills</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <input value={newSkill} placeholder="Add Skill" onChange={(e) => setNewSkill(e.target.value)} />
        <button onClick={addSkill}>+ Add Skill</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {formData.skills.map((skill, i) => (
          <span key={i} style={{ margin: "5px", padding: "5px 10px", background: "#eee", borderRadius: "5px" }}>
            {skill} <button onClick={() => removeSkill(i)} style={{ color: "red" }}>x</button>
          </span>
        ))}
      </div>

      {/* Education */}
      <h3>Education</h3>
      {formData.education.map((edu, i) => (
        <div key={i} style={{ display: "flex", gap: "10px" }}>
          <input placeholder="Degree" value={edu.degree} onChange={(e) => updateFieldArray("education", i, "degree", e.target.value)} />
          <input placeholder="Institution" value={edu.institution} onChange={(e) => updateFieldArray("education", i, "institution", e.target.value)} />
          <input placeholder="Year" value={edu.year} onChange={(e) => updateFieldArray("education", i, "year", e.target.value)} />
        </div>
      ))}
      <button onClick={() => addEntry("education", { degree: "", institution: "", year: "" })}>+ Add Education</button>

      {/* Projects */}
      <h3>Projects</h3>
      {formData.projects.map((proj, i) => (
        <div key={i} style={{ display: "flex", gap: "10px" }}>
          <input placeholder="Title" value={proj.title} onChange={(e) => updateFieldArray("projects", i, "title", e.target.value)} />
          <input placeholder="Description" value={proj.description} onChange={(e) => updateFieldArray("projects", i, "description", e.target.value)} />
        </div>
      ))}
      <button onClick={() => addEntry("projects", { title: "", description: "" })}>+ Add Project</button>

      {/* Certifications */}
      <h3>Certifications</h3>
      {formData.certifications.map((cert, i) => (
        <input key={i} placeholder="Certification" value={cert} onChange={(e) => updateSingleFieldArray("certifications", i, e.target.value)} />
      ))}
      <button onClick={() => addEntry("certifications", "")}>+ Add Certification</button>

      {/* Internships */}
      <h3>Internships</h3>
      {formData.internships.map((intern, i) => (
        <div key={i} style={{ display: "flex", gap: "10px" }}>
          <input placeholder="Company" value={intern.company} onChange={(e) => updateFieldArray("internships", i, "company", e.target.value)} />
          <input placeholder="Role" value={intern.role} onChange={(e) => updateFieldArray("internships", i, "role", e.target.value)} />
          <input placeholder="Duration" value={intern.duration} onChange={(e) => updateFieldArray("internships", i, "duration", e.target.value)} />
        </div>
      ))}
      <button onClick={() => addEntry("internships", { company: "", role: "", duration: "" })}>+ Add Internship</button>

      {/* Achievements */}
      <h3>Achievements</h3>
      {formData.achievements.map((ach, i) => (
        <input key={i} placeholder="Achievement" value={ach} onChange={(e) => updateSingleFieldArray("achievements", i, e.target.value)} />
      ))}
      <button onClick={() => addEntry("achievements", "")}>+ Add Achievement</button>

      <br /><br />
      <button onClick={handlePrint} style={{ padding: "10px 20px", background: "#2c3e50", color: "#fff", border: "none", borderRadius: "6px" }}>
        📥 Download PDF
      </button>

      {/* Resume Preview */}
      <div style={{ marginTop: "30px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <ResumeTemplate ref={componentRef} formData={formData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
