import React from "react";

const ContactUs = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,rgb(47, 133, 91),rgb(112, 79, 108))", // Dark blue gradient
      padding: "20px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)", // Glass effect
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "420px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: "transform 0.3s ease-in-out",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "15px",
      color: "#ffffff",
      fontWeight: "bold",
    },
    text: {
      fontSize: "18px",
      color: "#e0e0e0",
      marginBottom: "12px",
    },
    highlight: {
      color: "#00ffcc",
      fontWeight: "bold",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "20px",
    },
    icon: {
      fontSize: "24px",
      color: "#ffffff",
      transition: "0.3s",
      textDecoration: "none",
    },
    iconHover: {
      filter: "drop-shadow(0px 0px 6px #00ffcc)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📞 Get in Touch</h2>
        <p style={styles.text}>
          <strong>🌍 Website:</strong> <span style={styles.highlight}>Farmer MarketPlace</span>
        </p>
        <p style={styles.text}>
          <strong>📍 Address:</strong> 42 Green Avenue, Farm City, India
        </p>
        <p style={styles.text}>
          <strong>📞 Phone:</strong> <span style={styles.highlight}>+91 98765 43210</span>
        </p>
        <p style={styles.text}>
          <strong>📧 Email:</strong> <span style={styles.highlight}>Farmers01@customerconnect.com</span>
        </p>

        <div style={styles.socialIcons}>
          <a href="#" style={{ ...styles.icon }} className="fab fa-facebook"></a>
          <a href="#" style={{ ...styles.icon }} className="fab fa-twitter"></a>
          <a href="#" style={{ ...styles.icon }} className="fab fa-instagram"></a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
