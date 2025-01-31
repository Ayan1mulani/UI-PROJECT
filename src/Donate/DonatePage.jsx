import React, { useState } from "react";
import { ChevronLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DonatePage.css";

const mockApiCall = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.itemName && data.itemDescription && data.price && data.itemImage) {
        resolve("🎉 Donation submitted successfully!");
      } else {
        reject("⚠️ Please fill all fields before submitting.");
      }
    }, 2000);
  });
};

const DonatePage = () => {
  const navigate = useNavigate();
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
      {/* Header Section */}
      <div className="app-bar">
        <ChevronLeft className="left-icon" size={24} onClick={() => navigate(-1)} />
        <h2>Donate an Item</h2>
      </div>

      {/* Donation Form */}
      <form onSubmit={handleSubmit} className="donate-form">
        <div className="form-group">
          <label htmlFor="itemName">📦 Item Name</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemDescription">📝 Item Description</label>
          <textarea
            id="itemDescription"
            rows="3"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Describe the item"
            required
          ></textarea>
        </div>

     

        {/* Image Upload with Preview */}
        <div className="form-group file-upload">
          <div className="upload-box">
            <input
              type="file"
              id="itemImage"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setItemImage(file);
                  setItemImageName(file.name);
                }
              }}
              accept="image/*"
            />
            <UploadCloud size={20} />
          </div>
          {itemImage && (
            <div className="image-preview">
              <img src={URL.createObjectURL(itemImage)} alt="Preview" />
              <p>{itemImageName}</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "📩 Submit Donation"}
        </button>
      </form>

      {/* Display Message */}
      {message && <p className={`message ${message.includes("⚠️") ? "error" : "success"}`}>{message}</p>}

      {/* Quote Section */}
      <div className="quote">
        <blockquote>
          "The best way to find yourself is to lose yourself in the service of others."
        </blockquote>
        <span>– Mahatma Gandhi</span>
      </div>
    </div>
  );
};

export default DonatePage;