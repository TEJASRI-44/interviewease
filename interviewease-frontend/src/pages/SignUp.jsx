import { useState } from "react";
import React from "react";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate", // default role
  });
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", form);

      // ✅ Check the message from backend
      if (response.data.message === "Signup successful") {
        alert("Registered Successfully!");
        localStorage.setItem("userRole", form.role);
        setForm({ name: "", email: "", password: "", role: "candidate" });
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      // 🛑 Handle backend error status (e.g., 400 - Email already registered)
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Error during registration.");
    }
  };


  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
      fontFamily: "Segoe UI, sans-serif",
    },
    form: {
      background: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "400px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Sign Up</h2>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={styles.input} />

        <select name="role" value={form.role} onChange={handleChange} style={styles.select}>
          <option value="candidate">Candidate</option>
          <option value="interviewer">Interviewer</option>
        </select>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
