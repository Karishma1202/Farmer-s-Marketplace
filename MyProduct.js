import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "center", // Center the navigation items
    alignItems: "center",
    backgroundColor: "#ffffff", // White background
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", // Soft shadow effect
    border: "1px solid #e0e0e0", // Light border
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    color: "#2C3E50", // Dark blue text
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    transition: "0.3s",
    borderRadius: "8px",
    gap: "5px", // Space between icon and text
  },
  navLinkHover: {
    color: "#27AE60", // Green hover effect
    transform: "scale(1.05)",
  },
  icon: {
    fontSize: "20px",
    color: "#F1C40F", // Yellow icon color
  },
  productSection: {
    marginTop: "30px",
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    fontWeight: "bold",
  },
  addProductBtn: {
    backgroundColor: "#1ABC9C",
    color: "white",
    padding: "12px 18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
    fontWeight: "bold",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  productCard: {
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "0.3s",
  },
  productImage: {
    width: "100%",            // Make image responsive within its container
    height: "auto",           // Maintain aspect ratio
    maxHeight: "300px",       // Limit image height for better display
    objectFit: "contain",     // Ensure the image is not cropped or stretched
    borderRadius: "10px",     // Keep the rounded corners
    cursor: "pointer",        // Enable click functionality
  },  
  productDetails: {
    marginTop: "10px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  price: {
    fontSize: "16px",
    color: "#16A085",
    fontWeight: "bold",
  },
  outOfStock: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh", // Enable scrolling if content overflows
    overflowY: "auto", // Allow scrolling
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    position: "relative",
  },  
  outOfStockBtn: {
    backgroundColor: "#E74C3C",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  crossImage: {
    width: "100px", // Adjust the size as needed
    height: "30px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  closeModal: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/get-products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products.reverse());
          localStorage.setItem("products", JSON.stringify(data.products.reverse()));
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts.reverse());
      }
    };

    fetchProducts();
  }, []);


  const toggleOutOfStock = async (product) => {
    console.log("Button clicked! Product before update:", product);
  
    const updatedProduct = { ...product, quantity: 0 };
  
    try {
      const response = await fetch("http://localhost:5001/update-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
  
      const result = await response.json();
      console.log("Server response:", result); // Debugging line
  
      if (result.success) {
        const updatedProducts = products.map((p) =>
          p.id === product.id ? updatedProduct : p
        );
        setProducts([...updatedProducts]); // Force UI update
        setSelectedProduct(updatedProduct);
        console.log("Updated products:", updatedProducts);
      } else {
        console.error("Failed to update product:", result.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.productSection}>
        <div style={styles.productHeader}>
          <h2 style={styles.heading}>All Products</h2>
          <Link to="/add-product">
            <button style={styles.addProductBtn}>Add New Product ➕</button>
          </Link>
        </div>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div style={styles.productList}>
            {products.map((product, index) => (
              <div key={index} style={styles.productCard}>
                <img
                  src={product.image_url || "https://via.placeholder.com/250"}
                  alt="Product"
                  style={styles.productImage}
                  onClick={() => setSelectedProduct(product)}
                />
                <div style={styles.productDetails}>
                  <h3 style={styles.productName}>{product.product_name}</h3>
                  <p style={styles.price}>₹{product.price}</p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  {Number(product.quantity) <= 0 && (
                    <span style={styles.outOfStock}>Out of Stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModal} onClick={() => setSelectedProduct(null)}>
              ✖
            </button>
            <img
              src={selectedProduct.image_url || "https://via.placeholder.com/250"}
              alt="Product Detail"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{selectedProduct.product_name}</h3>
            <p><strong>Category:</strong> {selectedProduct.category || "N/A"}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            {Number(selectedProduct.quantity) <= 0 && (
              <p style={styles.outOfStock}>Out of Stock</p>
            )}
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            {selectedProduct.description && <p><strong>Description:</strong> {selectedProduct.description}</p>}

            {/* "Out of Stock" Button */}
            <button
              style={styles.outOfStockBtn}
              onClick={() => toggleOutOfStock(selectedProduct)}
            >
              Mark as Out of Stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const links = [
    { path: "/HomePage", label: "🏠 Home" },
    { path: "/MyProduct", label: "🌿 My Products" },
    { path: "/Orders", label: "📦 Orders" },
    { path: "/Contact Us", label: "📞 Contact Us" },
  ];

  return (
    <div style={styles.navbar}>
      {links.map((link, index) => (
        <Link key={index} to={link.path} style={styles.navLink}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MyProduct;
