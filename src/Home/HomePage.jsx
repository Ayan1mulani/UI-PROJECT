import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Button,
  InputAdornment,
  TextField,
  IconButton,
  BottomNavigation,
} from "@mui/material";

// Product data
const productsWithModels = [
  {
    id: 101,
    name: "Modern Comfort Sofa",
    category: "Furniture",
    image: "https://th.bing.com/th/id/OIP.HyGGLHPTLRBbIVyaQdbU_gHaHa?rs=1&pid=ImgDetMain",
    model: "sofa.glb",
    description: "Modern sofa with comfortable padding and premium fabric",
    seller: "Furniture Plus",
    price: "4999 ₹",
    contactNumber: "8668361520"
  },
  {
    id: 102,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    image: "https://th.bing.com/th/id/OIP.nM95v_vGolSoaL-TqVh1RQHaMK?rs=1&pid=ImgDetMain",
    model: "chair.glb",
    description: "Ergonomic office chair with lumbar support",
    seller: "Office Solutions",
    price: "1999 ₹",
    contactNumber: "8668361520"

  },
  {
    id: 103,
    name: "McLaren P1 Model Car",
    category: "Toys",
    image: "https://ae01.alicdn.com/kf/HTB1L3cERXXXXXbuXVXXq6xXFXXXR/Collectible-Car-Models-1-32-Yellow-McLaren-P1-Alloy-Diecast-Car-Model-Toy-Vehicles-Electronic-Car.jpg",
    model: "car.glb",
    description: "Collectible McLaren P1 model with detailed features",
    seller: "Toy Universe",
    price: "499 ₹"
    ,
    contactNumber: "8668361520"
  },
  {
    id: 104,
    name: "Minimalist Coffee Table",
    category: "Furniture",
    image: "https://th.bing.com/th/id/OIP.wl7BzdAGF9XiLnKLE0VbwwHaFd?rs=1&pid=ImgDetMain",
    model: "table.glb",
    description: "Modern coffee table with tempered glass top",
    seller: "Home Interiors",
    price: "3000 ₹"
    ,
    contactNumber: "8668361520"
  },
];

const HomePage = () => {
  const [favorites, setFavorites] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); 
  const [navValue, setNavValue] = useState(0);
  const navigate = useNavigate();
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleViewModelClick = (modelName, e) => {
    e.stopPropagation();
    navigate(`/view/${modelName}`);
  };
  const handleLogout = () => {
  localStorage.removeItem("token"); // or whatever key you're using
  navigate("/"); // redirect to login page
};

  const handleWhatsAppChat = (phoneNumber, productName, e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hi, I'm interested in the ${productName}. Can you provide more information?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter products based on search term
  const filteredProducts = productsWithModels.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count favorites
  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  return (
    <div className="homepage">
      {/* Header Section */}
      <div className="header">
<div className="profile" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
        
          <PersonIcon />
          <span className="username">Harsh Jaiswal</span>
        </div>
         <div className="logout-button">
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  </div>
      </div>
      
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Explore Products in 3D</h1>
        <p>Experience furniture and more in your space before you buy</p>
      </div>
      
      {/* Search Container */}
      <div className="search-container">
        <TextField
          className="search-field"
          placeholder="Search Products"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <h2 className="section-title">3D View Products</h2>
      
      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="products-container">
          {filteredProducts.map((item) => (
            <div className="product-item" key={item.id} onClick={() => handleItemClick(item.id)}>
              <div className="image-container">
                <img className="product-image" src={item.image} alt={item.name} />
                <span 
                  className="favorite-button"
                  onClick={(e) => toggleFavorite(item.id, e)}
                >
                  {favorites[item.id] ? (
                    <FavoriteIcon className="favorited" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </span>
              </div>
              
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="price">{item.price}</div>
                <p className="seller">Seller: {item.seller}</p>
                
                <div className="product-actions">
                <Button
  variant="contained"
  className="view-3d-button"
  startIcon={<ThreeDRotationIcon />}
  onClick={(e) => handleViewModelClick(item.model, e)}
  style={{ padding: '8px 16px' }}
>
                    View in 3D
                  </Button>
                  
                  {item.contactNumber && (
                    <Button
                      variant="contained"
                      className="whatsapp-button"
                      startIcon={<WhatsAppIcon />}
                      onClick={(e) => handleWhatsAppChat(item.contactNumber, item.name, e)}
                      style={{ backgroundColor: "#25D366", marginLeft: "10px" }}
                    >
                      Chat Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* List View */}
      {viewMode === "list" && (
        <div>
          {filteredProducts.map((item) => (
            <div className="item-card" key={item.id} onClick={() => handleItemClick(item.id)}>
              <img className="item-image" src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p className="seller-name">{item.seller}</p>
                <div className="item-price">{item.price}</div>
                <div className="item-actions">
                  <Button
                    variant="contained"
                    className="view-btn"
                    size="small"
                    startIcon={<ThreeDRotationIcon />}
                    onClick={(e) => handleViewModelClick(item.model, e)}
                  >
                    View in 3D
                  </Button>
                  
                  {item.contactNumber && (
                    <Button
                      variant="contained"
                      size="small"
                      className="whatsapp-button"
                      startIcon={<WhatsAppIcon />}
                      onClick={(e) => handleWhatsAppChat(item.contactNumber, item.name, e)}
                      style={{ backgroundColor: "#25D366", marginLeft: "10px" }}
                    >
                      Chat
                    </Button>
                  )}
                  
                  <IconButton
                    onClick={(e) => toggleFavorite(item.id, e)}
                    color={favorites[item.id] ? "error" : "default"}
                  >
                    {favorites[item.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation
      >
       
       
      </BottomNavigation>
    </div>
  );
};

export default HomePage;