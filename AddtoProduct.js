import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddtoProduct.css";

function AddtoProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitType, setUnitType] = useState("kg");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [harvestDate, setHarvestDate] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [delivery, setDelivery] = useState("Yes");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  // Helper function to convert image file to Base64 string
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields (except harvestDate)
    if (
      !productName ||
      !category ||
      !quantity ||
      !price ||
      !farmerName ||
      !contact ||
      !location ||
      !image
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(contact)) {
      alert("Please enter a valid phone number (numbers only).");
      return;
    }

    const newProduct = {
      productName,
      category,
      quantity,
      unitType,
      price,
      description,
      image: image.name,
      harvestDate,
      farmerName,
      contact,
      location,
      delivery,
    };

    if (image) {
      try {
        const base64Image = await convertFileToBase64(image);
        newProduct.image = base64Image;
      } catch (error) {
        console.error("Error converting image file to Base64", error);
      }
    }

    try {
      const response = await fetch("http://localhost:5001/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (data.success) {
        alert("Product added successfully!");
        setProductName("");
        setCategory("");
        setQuantity("");
        setUnitType("kg");
        setPrice("");
        setDescription("");
        setImage(null);
        setHarvestDate("");
        setFarmerName("");
        setContact("");
        setLocation("");
        setDelivery("Yes");
        setImagePreview(null);
        navigate("/MyProduct" , {
          state: { productName, quantity, description, imagePreview },
        }); 
      }else {
        alert("Error adding product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Dairy">Crops</option>
        </select>

        <label>Quantity Available:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label>Unit Type:</label>
        <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
          <option value="kg">Kg</option>
          <option value="liters">Liters</option>
          <option value="pieces">Pieces</option>
        </select>

        <label>Price per Unit:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Product Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Product Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Preview"
            className="image-preview"
          />
        )}

        <label>Harvest Date:</label>
        <input
          type="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />

        <label>Farmer’s Name:</label>
        <input
          type="text"
          value={farmerName}
          onChange={(e) => setFarmerName(e.target.value)}
          required
        />

        <label>Farmer’s Contact Details:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <label>Farm Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>Delivery Available?</label>
        <select value={delivery} onChange={(e) => setDelivery(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddtoProduct;
