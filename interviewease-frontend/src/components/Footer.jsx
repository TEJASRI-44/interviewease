import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      textAlign: "center",
      padding: "20px",
      fontSize: "14px",
      position: "relative",
      bottom: 0,
      width: "100%",
      marginTop: "auto",
    },
  };

  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 InterviewEase. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
