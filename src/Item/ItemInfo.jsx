import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemsForSale } from "../data/itemsData";
import "./ItemDetailPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ItemDetailPage = () => {
  const { id } = useParams(); // Retrieve the item ID from the URL
  const navigate = useNavigate();
  const [showReviews, setShowReviews] = useState(false); // Toggle state for reviews

  const item = itemsForSale.find((item) => item.id === parseInt(id));

  if (!item) {
    return <h4>Item not found</h4>;
  }

  const handleChatClick = () => {
    navigate("/chat"); // Navigate to the /Chats route
  };

  return (
    <div className="item-detail-container">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="back-button">
        <ArrowBackIcon /> Back
      </button>

      {/* Item Details Section */}
      <div className="item-detail-content">
        <div className="item-image-container">
          <img src={item.image} alt={item.name} className="item-image2" />
        </div>

        <div className="item-details">
          <h2 className="item-title">{item.name}</h2>
          <p className="item-description">{item.description}</p>

          {/* Action Buttons */}
          <div className="item-buttons">
            <button
              className="add-to-cart-button"
              onClick={() => alert("Added to Cart!")}
            >
              Add to Cart <ShoppingCartIcon />
            </button>

            <button className="add-to-cart-button" onClick={handleChatClick}>
              Chat with Seller<ChatIcon />
            </button>
          </div>

          {/* Toggle Reviews Section */}
          <div className="seller-reviews">
            <button
              className="toggle-reviews-button"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? (
                <>
                  <VisibilityOffIcon /> Hide Reviews
                </>
              ) : (
                <>
                  <VisibilityIcon />  Seller Reviews
                </>
              )}
            </button>

            {/* Seller Reviews Section */}
            {showReviews && (
              <div className="reviews-list">
                <h4>Seller Reviews</h4>
                {item.reviews.length > 0 ? (
                  item.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <div className="review-header">
                        <strong>{review.reviewer}</strong>
                        <div className="stars">
                          {Array(review.rating)
                            .fill()
                            .map((_, i) => (
                              <StarIcon key={i} className="star-icon" />
                            ))}
                        </div>
                      </div>
                      <p className="review-comment">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
