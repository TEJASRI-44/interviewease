import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CandidateDashboard = () => {
  const name = localStorage.getItem("userName") || "Candidate";

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },
    sidebar: {
      width: "250px",
      background: "#2c3e50",
      color: "#fff",
      padding: "20px",
    },
    navLink: {
      display: "block",
      padding: "10px 15px",
      color: "#ecf0f1",
      textDecoration: "none",
      margin: "10px 0",
      borderRadius: "6px",
      transition: "background 0.3s",
    },
    activeNavLink: {
      backgroundColor: "#1abc9c",
      fontWeight: "bold",
    },
    content: {
      flex: 1,
      padding: "30px",
      background: "#ecf0f1",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2c3e50",
    },
  };

  const navItems = [
    { label: "📅 Interview Booking", path: "/candidate-dashboard/interview-booking" },
    { label: "🗓️ My Bookings", path: "/candidate-dashboard/my-bookings" },
    { label: "📄 Resume Builder", path: "/candidate-dashboard/resume-builder" },
    { label: "🤖 Auto Apply", path: "/candidate-dashboard/auto-apply" },
    { label: "📊 Internship Tracker", path: "/candidate-dashboard/internship-tracker" },
    { label: "⭐ Saved Internships", path: "/candidate-dashboard/saved-internships" },
    { label: "👤 Profile", path: "/candidate-dashboard/profile" },
    { label: "📝 Feedback", path: "/candidate-dashboard/feedback" },
    { label: "🎤 Mock Interview", path: "/candidate-dashboard/mock-interview" },
  ];

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h2>Hi, {name} 👋</h2>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) =>
              isActive
                ? { ...styles.navLink, ...styles.activeNavLink }
                : styles.navLink
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      <main style={styles.content}>
        <div style={styles.header}>Candidate Dashboard</div>
        <Outlet />
      </main>
    </div>
  );
};

export default CandidateDashboard;
