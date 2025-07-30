import React, { useState, useEffect } from "react";

const images = ["/1.jpg", "/2.jpg", "/3.jpg"]; // Ensure these are in public/

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      position: "relative",
      backgroundImage: `url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "background-image 1s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(114, 110, 110, 0.3))",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      color: "#ffffff",
      padding: "0 20px",
      animation: "fadeIn 1.5s ease-in-out",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "15px",
      textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
    },
    description: {
      fontSize: "1.3rem",
      maxWidth: "600px",
      margin: "0 auto 30px",
      textShadow: "1px 1px 5px rgba(0,0,0,0.6)",
    },
    button: {
      padding: "12px 30px",
      fontSize: "1rem",
      backgroundColor: "#ff7f50",
      border: "none",
      borderRadius: "25px",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h2 style={styles.title}>Welcome to InterviewEase</h2>
        <p style={styles.description}>
          Prepare smarter. Perform better. Your journey to success starts here.
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#ff5722")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#ff7f50")
          }
          onClick={() => (window.location.href = "/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
