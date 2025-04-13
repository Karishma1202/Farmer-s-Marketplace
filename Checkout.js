import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const handleOrder = async () => {
    if (!customer.name || !customer.email || !customer.address || !customer.phone) {
      alert("Please fill in all customer details.");
      return;
    }

    const orderDetails = {
      customer,
      cart,
      totalAmount: getTotalAmount(),
      paymentMethod,
      paymentId: paymentMethod === "razorpay" ? "Pending" : "COD",
    };

    // If Razorpay is selected, initiate the payment
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment(orderDetails);
    } else {
      // For Cash on Delivery, save the order directly to the backend
      try {
        const response = await fetch('http://localhost:8000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          localStorage.removeItem("cart");
          navigate("/thankyou");
        } else {
          alert("Error placing order: " + data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while placing the order.");
      }
    }
  };

  const handleRazorpayPayment = (orderDetails) => {
    const options = {
      key: "rzp_test_re51lYAo5ORt72",
      amount: getTotalAmount() * 100, // Amount in paise
      currency: "INR",
      name: "Farmer's Market",
      description: "Payment for your order",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        const updatedOrder = {
          ...orderDetails,
          paymentMethod: "razorpay",
          paymentId: response.razorpay_payment_id,
        };
        localStorage.setItem("order", JSON.stringify(updatedOrder));

        // Save the order to backend after successful payment
        handleOrderAfterPayment(updatedOrder);
      },
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: {
        color: "#28a745",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleOrderAfterPayment = async (orderDetails) => {
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.removeItem("cart");
        navigate("/thankyou");
      } else {
        alert("Error placing order: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>

      <div style={styles.form}>
        <h3>Customer Details</h3>
        <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} style={styles.input} required />
        <input type="text" name="address" placeholder="Delivery Address" onChange={handleInputChange} style={styles.input} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} style={styles.input} required />
      </div>

      <h3 style={styles.orderSummaryTitle}>Order Summary</h3>
      <ul style={styles.orderList}>
        {cart.map((item, index) => (
          <li key={index} style={styles.orderItem}>
            <span>{item.name}</span> - <strong>{item.quantity} x {item.price} Rs</strong>
          </li>
        ))}
      </ul>
      <h3 style={styles.total}>Total: Rs {getTotalAmount()}</h3>

      <h3 style={styles.paymentTitle}>Select Payment Method</h3>
      <div style={styles.paymentOptions}>
        <label style={styles.radioLabel}>
          <input type="radio" value="razorpay" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
          Razorpay (Online Payment)
        </label>
        <label style={styles.radioLabel}>
          <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
          Cash on Delivery
        </label>
      </div>

      <button style={styles.orderBtn} onClick={handleOrder}>Place Order</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
  },
  orderSummaryTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  orderList: {
    listStyleType: "none",
    padding: "0",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  total: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  paymentTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  radioLabel: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  orderBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
    width: "100%",
  },
};

export default Checkout;
