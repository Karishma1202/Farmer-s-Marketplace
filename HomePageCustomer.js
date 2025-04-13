import React from "react";
import { useNavigate } from "react-router-dom";
import organicImage from "../assets/organic.png";
import fruit1 from "../assets/fruit1.jpg";
import fruit2 from "../assets/fruit2.jpg";
import fruit3 from "../assets/fruit3.png";
import vegetable1 from "../assets/vegetable1.jpg";
import vegetable2 from "../assets/crops2.jpg";
import vegetable3 from "../assets/vegetable2.jpg";
import cartImage from "../assets/cart.png";

const HomePageCustomer = ({ customerName }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🍃 FreshMart</h2>
        <ul style={styles.navList}>
          {["Home", "Products"].map((item) => (
            <li
              key={item}
              style={styles.navItem}
              onClick={() => navigate(`/${item.toLowerCase()}`)}
            >
              {item}
            </li>
          ))}
          
            <li style={styles.navItem} onClick={() => navigate("/cart")}>
            <img src={cartImage} alt="Cart" style={styles.cartImage} />
          </li>

          {/* Logout Button */}
          <li style={styles.logoutButton} onClick={() => navigate("/")}>
            🚪 Logout
          </li>
        </ul>
      </nav>


      <div style={styles.heroSection}>
        <img src={organicImage} alt="Organic" style={styles.headerImage} />
        <h1 style={styles.heroText}>
          Welcome, {customerName || "Guest"}!  
          <br />Discover Freshness Delivered 🍇🥦
        </h1>
      </div>


      <div style={styles.section}>
        <h3 style={styles.title}>🍎 Fresh Fruits</h3>
        <div style={styles.cardContainer}>
          {[fruit1, fruit2, fruit3].map((src, i) => (
            <img key={i} src={src} alt={`Fruit ${i}`} style={styles.cardImage} />
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.title}>🥬 Fresh Vegetables</h3>
        <div style={styles.cardContainer}>
          {[vegetable1, vegetable2, vegetable3].map((src, i) => (
            <img key={i} src={src} alt={`Vegetable ${i}`} style={styles.cardImage} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(180deg, #fff,rgba(95, 179, 158, 0.2))",
    minHeight: "200vh",
    color: "#333",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "linear-gradient(135deg,rgb(109, 159, 143), #185a9d)",
    color: "#fff",
    boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
    borderRadius: "0 0 20px 20px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    gap: "30px",
    margin: 0,
    padding: 0,
    alignItems: "center", // Ensure vertical alignment
  },
  navItem: {
    cursor: "pointer",
    fontSize: "16px",
    transition: "color 0.3s",
    ":hover": { color: "#FFD700" },
    display: "flex",
    alignItems: "center",
  },
  cartImage: {
    width: "28px",
    height: "28px",
    filter: "invert(1)",
  },
  logoutButton: {
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background 0.3s",
    display: "flex",
    alignItems: "center",
    ":hover": {
      background: "#b30000",
    },
  },
  heroSection: {
    position: "relative",
    textAlign: "center",
    margin: "10px 0",
  },
  headerImage: {
    width: "80%",
    borderRadius: "20px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    objectFit: "cover",
    transition: "transform 0.4s",
    cursor: "pointer",
    marginBottom: "10px",
  },
  heroText: {
    marginTop: "20px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#2c3e50",
    lineHeight: "1.4",
  },
  section: {
    textAlign: "center",
    margin: "20px 0",
  },
  title: {
    fontSize: "28px",
    color: "#27ae60",
    marginBottom: "25px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    position: "relative",
    display: "inline-block",
    borderBottom: "4px solid #27ae60",
    paddingBottom: "10px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  cardImage: {
    width: "300px",
    height: "250px",
    borderRadius: "15px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
    objectFit: "cover",
    transition: "transform 0.4s, box-shadow 0.3s",
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    },
  },
};

export default HomePageCustomer;
