import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DonatePage.css";

// Function to simulate API call
const mockApiCall = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.itemName && data.itemDescription && data.price && data.itemImage) {
        resolve("Donation submitted successfully!");
      } else {
        reject("Failed to submit donation. Please fill all fields.");
      }
    }, 2000);
  });
};

const DonatePage = () => {
  const navigate = useNavigate(); // Move useNavigate here

  // State for the form
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [itemImageName, setItemImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await mockApiCall({ itemName, itemDescription, price, itemImage });
      setMessage(response);
    } catch (error) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-page">

      <div className="app-bar">  
        <ChevronLeft className="left-icon " size={24} onClick={() => navigate(-1)} /> {/* Go Back */}
        Donate an Item
      </div>

      <form onSubmit={handleSubmit} className="donate-form">
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDescription">Item Description</label>
          <textarea
            id="itemDescription"
            rows="4"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemImage">Item Image</label>
          <input
            type="file"
            id="itemImage"
            onChange={(e) => {
              setItemImage(e.target.files[0]);
              setItemImageName(e.target.files[0].name);
            }}
          />
          {itemImageName && <p>Selected file: {itemImageName}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && <p className="message">{message}</p>}
      </form>

      <div className="quote">
        "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
      </div>
    </div>
  );
};

export default DonatePage;
