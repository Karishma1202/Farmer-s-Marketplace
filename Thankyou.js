import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6e45e2, #88d3ce)",
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px 30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          🎉 Thank You! 🎉
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Your order has been placed successfully.  
          We appreciate your business!
        </p>
        <button
          onClick={goToHome}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            color: "#6e45e2",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go to Home 🏡
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
