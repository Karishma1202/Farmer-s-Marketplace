import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import locationImage from "../assets/location.png";
import { useNavigate } from "react-router-dom"; 

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state || {}; // Get the productId from the location state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quantityRef = useRef(null); 

  useEffect(() => {
    fetch("http://localhost:5001/get-products")
      .then((response) => response.json())
      .then((data) => {
        // Find the product by ID
        const selectedProduct = data.products.find((p) => p.id === productId);
        setProduct(selectedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  const handleAddtoCart = () => {
    const quantity = parseInt(quantityRef.current.value, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please select at least one quantity.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = product.price * quantity;

    const newCartItem = {
      id: product.id,
      name: product.product_name,
      price: product.price,
      quantity: quantity,
      total: total,
    };

    // ✅ Check if product already exists in cart
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
      cart[existingIndex].total = cart[existingIndex].quantity * cart[existingIndex].price;
    } else {
      cart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{product.product_name}</h2>
      <div style={styles.productContainer}>
        {/* Product Image */}
        <div style={styles.imageContainer}>
          <img
            src={product.image_url || "placeholder_image_url.jpg"}
            
            style={styles.productImage}
          />
        </div>

        {/* Product Details */}
        <div style={styles.detailsContainer}>
          <p style={styles.price}>Price: {product.price} Rs/kg</p>
          <p style={styles.stock}>Stock: {product.quantity} {product.unit_type}</p>
          <div style={styles.quantityContainer}>
            <label>Quantity </label>
            <input ref={quantityRef} type="number" min="1" defaultValue="1" style={styles.quantityInput} />
          </div>

          <button style={styles.addToCartBtn} onClick={handleAddtoCart}>
            🛒 Add to Cart
          </button>

          <p style={styles.delivery}>🚚 Delivery by Farmer</p>

          {/* Centered Location Image and Text */}
          <div style={styles.locationContainer}>
            <img
              src={locationImage}
              alt="Location Icon"
              style={styles.icon}
            />
            <span style={styles.locationText}>{product.location}</span>
          </div>
        </div>

        {/* Farmer Details */}
        <div style={styles.farmerContainer}>
          <h3>Farmer Details</h3>
          <p><strong>Name:</strong> {product.farmer_name}</p>
          <p><strong>Phone:</strong> {product.contact}</p>
        </div>
      </div>

      {/* Product Description */}
      <div style={styles.descriptionContainer}>
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

const styles = {
    container: {
      padding: "30px",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f8f9fa",
    },
    heading: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "700",
      marginBottom: "25px",
      color: "#333",
    },
    productContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease-in-out",
    },
    productContainerHover: {
      transform: "scale(1.02)",
    },
    icon: {
      width: "22px",
      height: "22px",
      marginRight: "10px",
    },
    locationContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "12px",
      color: "#555",
    },
    locationText: {
      fontSize: "17px",
      fontWeight: "600",
    },
    imageContainer: {
      textAlign: "center",
    },
    productImage: {
      width: "100%",
      height: "260px",
      objectFit: "cover",
      borderRadius: "12px",
    },
    productLabel: {
      fontSize: "20px",
      fontWeight: "600",
      marginTop: "12px",
    },
    detailsContainer: {
      textAlign: "center",
      padding: "25px",
    },
    price: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#ff5722",
    },
    stock: {
      fontSize: "16px",
      color: "#777",
    },
    quantityContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "12px",
    },
    quantityInput: {
      width: "55px",
      padding: "6px",
      borderRadius: "8px",
      border: "1px solid #bbb",
      textAlign: "center",
    },
    addToCartBtn: {
      backgroundColor: "#ff5722",
      border: "none",
      padding: "12px 18px",
      margin: "6px",
      cursor: "pointer",
      fontWeight: "700",
      borderRadius: "6px",
      color: "#fff",
      transition: "background 0.3s ease-in-out",
    },
    addToCartBtnHover: {
      backgroundColor: "#e64a19",
    },
    delivery: {
      fontSize: "15px",
      fontWeight: "600",
      marginTop: "12px",
    },
    farmerContainer: {
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "30px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    },
    descriptionContainer: {
      marginTop: "50px",
      padding: "20px",
      borderTop: "2px solid #ccc",
      textAlign: "center",
      backgroundColor: "white", // Soft background for contrast
      borderRadius: "15px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.68)", // Light shadow for depth
      fontSize: "20px",
      color: "black",
      lineHeight: "1.3", // Improve readability
      fontWeight: "500",
    },
    
  };
  

export default ProductDetails;
