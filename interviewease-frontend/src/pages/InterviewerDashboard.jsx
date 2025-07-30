import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const InterviewerDashboard = () => {
  const name = localStorage.getItem("userName") || "Interviewer";

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },
    sidebar: {
      width: "250px",
      background: "#34495e",
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
      backgroundColor: "#e67e22",
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
      color: "#34495e",
    },
  };

  const navItems = [
    { label: "📆 Schedule Interview Slots", path:"/interviewer-dashboard/schedule" },
    { label: "👥 Scheduled Interviews", path: "/interviewer-dashboard/scheduled-interviews" },
    { label: "🎥 Join Interview", path: "/interviewer-dashboard/join-interview" },
    { label: "📝 Evaluate Candidates", path: "/interviewer-dashboard/evaluate-candidates" },
    { label: "📊 Reports & Analytics", path: "/interviewer-dashboard/reports" },
    { label: "👤 Profile", path: "/interviewer-dashboard/profile" },
    { label: "📬 Feedback", path: "/interviewer-dashboard/feedback" },
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
        <div style={styles.header}>Interviewer Dashboard</div>
        <Outlet />
      </main>
    </div>
  );
};

export default InterviewerDashboard;
