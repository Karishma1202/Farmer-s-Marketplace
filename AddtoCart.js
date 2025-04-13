import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../assets/cart.png";
import paytmLogo from "../assets/razorpay.jpg";
import cashIcon from "../assets/cash.jpg";

const AddToCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + change);
    updatedCart[index].total = updatedCart[index].quantity * updatedCart[index].price; 
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };
  
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        <img src={cartIcon} alt="Cart" style={styles.cartIcon} /> Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name || item.product_name}</td>
                  <td>{item.price} Rs</td>
                  <td>
                    <button style={styles.btn} onClick={() => updateQuantity(index, 1)}>+</button>
                    <input type="text" value={item.quantity} readOnly style={styles.quantityInput} />
                    <button style={styles.btn} onClick={() => updateQuantity(index, -1)}>-</button>
                  </td>
                  <td>{item.total} Rs</td>
                  <td>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(index)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.totalContainer}>
            <h3>Grand Total = Rs {getTotalAmount()}</h3>
            <button style={styles.checkoutBtn} onClick={() => navigate("/checkout")}>Checkout ➡️</button>
          </div>
        </>
      )}

      <div style={styles.footer}>
        <p>Payment Option</p>
        <img src={paytmLogo} alt="Paytm" style={styles.paymentLogo} /> 
        <img src={cashIcon} alt="Cash" style={styles.paymentLogo} />
        <p>
          <a href="#" style={styles.link}>Farmers Marketplace</a> is website for farmers and Customer.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  cartIcon: {
    width: "30px",
    verticalAlign: "middle",
    marginRight: "10px",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#ffcc00",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "3px",
    margin: "0 5px",
  },
  quantityInput: {
    width: "40px",
    textAlign: "center",
    border: "1px solid #ddd",
    padding: "5px",
  },
  removeBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  totalContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  checkoutBtn: {
    backgroundColor: "#ffcc00",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
    borderRadius: "10px",
  },
  paymentLogo: {
    width: "100px",
    margin: "10px 5px",  // Adds horizontal spacing
    display: "inline-block",  // Ensures they stay in line
    verticalAlign: "middle", // Aligns them properly
  },
  
  link: {
    color: "#ffcc00",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default AddToCart;
