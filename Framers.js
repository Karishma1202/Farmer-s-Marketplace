import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/FarmerLogin.jpg";

const Farmers = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false); // Show login first
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate phone number
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Adjust regex as needed for your phone format
        return phoneRegex.test(phone);
    };

     const isDuplicatePhoneNumber = async (phone) => {
        const response = await fetch(`http://localhost:5000/check-phone?phone=${phone}`);
        const data = await response.json();
        return data.exists;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Phone number validation
        if (!validatePhoneNumber(formData.phone)) {
            alert("Please enter a valid phone number (10 digits).");
            return;
        }

        // Check for duplicate phone number during signup
        if (isSignup) {
            const isDuplicate = await isDuplicatePhoneNumber(formData.phone);
            if (isDuplicate) {
                alert("Phone number already exists. Please use a different number.");
                return;
            }
        }

        const endpoint = isSignup ? "register" : "login";
        const requestBody = isSignup
            ? { name: formData.name, address: formData.address, email: formData.email, phone: formData.phone, password: formData.password }
            : { phone: formData.phone, password: formData.password };

        try {
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                if (isSignup) {
                    setIsSignup(false); 
                } else {
                    navigate("/HomePage");
                }
            } else {
                alert(data.message); 
            }
        } catch (error) {
            alert("Failed to connect to server");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div> {/* Dark overlay */}
            <div style={styles.formContainer}>
                <h2>{isSignup ? "Farmer Registration" : "Farmer Login"}</h2>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={styles.input} />
                            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={styles.input} />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
                        </>
                    )}
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />

                    <button type="submit" style={styles.button}>{isSignup ? "Register" : "Login"}</button>
                </form>
                <p style={styles.toggleText}>
                    {isSignup ? "Already registered?" : "New Farmer?"}{" "}
                    <span style={styles.toggleLink} onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Login here" : "Register here"}
                    </span>
                </p>
            </div>
        </div>
    );
};

// Simple CSS styles
const styles = {
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${backgroundImage}) no-repeat center center/cover`,
        position: "relative",
        padding: "20px",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)", 
    },
    formContainer: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
        width: "450px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        transition: "transform 0.3s ease-in-out",
    },
    input: {
        width: "100%",
        padding: "14px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
        outline: "none",
        backgroundColor: "#f9f9f9",
        transition: "border 0.3s, box-shadow 0.3s",
    },
    button: {
        width: "100%",
        padding: "14px",
        border: "none",
        background: "linear-gradient(135deg, #28a745, #218838)",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "bold",
        transition: "background 0.3s ease-in-out, transform 0.2s",
    },
    toggleText: {
        marginTop: "14px",
        fontSize: "15px",
        color: "#555",
    },
    toggleLink: {
        color: "#28a745",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "none",
        transition: "color 0.3s",
    },
};

export default Farmers;
