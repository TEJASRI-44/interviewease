import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#2c3e50",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#ecf0f1",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    link: {
      textDecoration: "none",
      color: "#ecf0f1",
      fontSize: "16px",
      fontWeight: "500",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#f39c12",
    },
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>InterviewEase</h1>
      <div style={styles.navLinks}>
        <Link
          to="/"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)}
        >
          Home
        </Link>
        <Link
          to="/signup"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
