import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/FarmerLogin.jpg"; // Import your background image

const Customers = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isLogin
      ? "http://localhost:5002/api/login"
      : "http://localhost:5002/api/register";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        alert(
          isLogin ? "Login Successful!" : "Registration Successful! Please log in."
        );
        if (isLogin) {
          navigate("/home");
        } else {
          setIsLogin(true);
        }
      }, 500);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isLogin ? "Customer Login" : "Customer Register"}</h2>
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />

        {!isLogin && (
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            background: isHovered ? styles.buttonHover.background : styles.button.background,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};


const styles = {
  body: {
    margin: "0",
    padding: "0",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: "cover",  
    backgroundPosition: "center center",
    filter: "blur(8px)",  // Apply blur effect to the background
    zIndex: "-1", 
  },

  container: {
    width: "450px",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    margin: "100px auto",
    fontFamily: "'Roboto', sans-serif",
    position: "relative",
    zIndex: 2, // Content stays above the blurred background
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: to make content stand out
    borderRadius: "20px",
  },
  heading: {
    color: "#ffffff",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "600",
  },
  message: {
    color: "#ffcc00",
    fontSize: "16px",
    marginBottom: "20px",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s, box-shadow 0.3s",
    backgroundColor: "#f7f7f7",
    boxSizing: "border-box",
  },
  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease, transform 0.2s ease",
    fontWeight: "600",
  },
  buttonHover: {
    background: "#218838",
    transform: "scale(1.05)",
  },
  toggle: {
    color: "#007bff",
    cursor: "pointer",
    marginTop: "20px",
    textDecoration: "underline",
    fontSize: "14px",
  },
};

export default Customers;
