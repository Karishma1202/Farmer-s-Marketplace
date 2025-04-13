import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Framers from "./Farmer/Framers";
import Customers from "./Customer/Customers";
import HomePageCustomer from "./Customer/HomePageCustomer";
import HomePage from "./Farmer/HomePage";
import MyProduct from "./Farmer/MyProduct";
import AddtoProduct from "./Farmer/AddtoProduct";
import ContactUs from "./Farmer/ContactUs";
import CustomerProducts from "./Customer/CustomerProducts";
import AddtoCart from "./Customer/AddtoCart";
import ProductDetails from "./Customer/ProductDetails";
import Checkout from "./Customer/Checkout";
import Thankyou from "./Customer/Thankyou";
import Order from "./Farmer/Order";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/framers" element={<Framers />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/MyProduct" element={<MyProduct />} />
                <Route path="/add-product" element={<AddtoProduct/>} />
                <Route path="/get-products" element={<AddtoProduct/>} />
                <Route path="/Contact Us" element={<ContactUs/>} />
                <Route path="/home" element={<HomePageCustomer/>} />
                <Route path="/products" element={<CustomerProducts />} />
                <Route path="/cart" element={<AddtoCart />} />
                <Route path="/product-details" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thankyou" element={<Thankyou />} />
                <Route path="/orders" element={<Order/>} />
            </Routes>
        </Router>
    );
}

export default App;
