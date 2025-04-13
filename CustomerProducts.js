import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProducts = () => {
      fetch("http://localhost:5001/get-products")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched products:", data.products);
          setProducts(data.products);
          setFilteredProducts(data.products);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setError(error.message);
          setLoading(false);
        });
    };

    fetchProducts(); 
    const interval = setInterval(fetchProducts, 5000);

    return () => clearInterval(interval);
  }, []);

 
  const handleProductClick = (product) => {
    navigate("/product-details", { state: { productId: product.id } });
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };
  

  const handleFilterChange = (event) => {
    const category = event.target.value.toLowerCase();
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category && product.category.toLowerCase() === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Browse and shop your favorite products!</h2>
      <select onChange={handleFilterChange} value={selectedCategory} style={styles.filterDropdown}>
        <option value="all">All</option>
        <option value="vegetables">Vegetables</option>
        <option value="fruits">Fruits</option>
        <option value="crops">Crops</option>
        <option value="grains">Grains</option>
        <option value="dairy">Dairy</option>
      </select>

      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error}</p>
      ) : (
        <div style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img
                  src={product.image_url || "placeholder_image_url.jpg"}
                  alt={product.product_name}
                  style={styles.productImage}
                  onClick={() => handleProductClick(product)}
                />
                <h3 style={styles.productName}>{product.product_name}</h3>
                <p style={styles.productPrice}>PRICE: {product.price} Rs/kg</p>

                {product.quantity > 0 ? (
                  <button style={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
                    Add to cart 🛒
                  </button>
                ) : (
                  <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>
                )}
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  filterDropdown: {
    padding: "8px",
    fontSize: "16px",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "18px",
    color: "#888",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  productCard: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    cursor: "pointer", // ✅ Indicate it's clickable
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FFD700",
    color: "black",
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default CustomerProducts;
