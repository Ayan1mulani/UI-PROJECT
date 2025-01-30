import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Header from "./Header";
import Slider from "./Slider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { itemsForSale } from "../data/itemsData"; // Import the items data
import AboutPage from "../About/AboutPage";

const HomePage = () => {
  // State to track favorite status for each item
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();



  // Function to toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], // Toggle between true and false
    }));
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`); // Ensure this navigates to the correct path
  };

  return (
    <div className="homepage">
      {/* Header Section */}
      <Header />
   
      <h1 className="cat">Find What You Love 🎁</h1>
      <Slider />

      <h1 className="cat"> Trending Items 🔥</h1>
      <div>
        {itemsForSale.map((item) => (
          <div className="item-card" key={item.id} onClick={() => handleItemClick(item.id)}>
            <img className="item-image" src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="seller-name">Seller: {item.seller}</p> {/* Added seller's name */}
              <div className="item-actions">
                <span
                  className="favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {favorites[item.id] ? (
                    <FavoriteIcon sx={{ color: "red" }} /> // Red filled heart when favorited
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "grey" }} /> // Grey outlined heart
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AboutPage/>
    </div>
  );
};

export default HomePage;