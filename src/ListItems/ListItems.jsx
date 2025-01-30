import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ListItems.css";

const categories = [
  {
    name: "Electronics",
    image: "https://th.bing.com/th/id/OIP.S9-z8OxT_oYQ6Qh6ClUHdgHaHa?w=199&h=199&c=7&r=0&o=5&dpr=2&pid=1.7",
    items: [
      { name: "Laptop", image: "https://example.com/laptop.jpg" },
      { name: "Smartphone", image: "https://example.com/smartphone.jpg" },
      { name: "Headphones", image: "https://example.com/headphones.jpg" },
    ],
  },
  {
    name: "Furniture",
    image: "https://www.nilkamalfurniture.com/cdn/shop/files/14f5dbd5-eb33-4b0b-97e5-3d2d3f12be8e.jpg?v=1691123978&width=1080",
    items: [
      { name: "Sofa", image: "https://example.com/sofa.jpg" },
      { name: "Table", image: "https://example.com/table.jpg" },
    ],
  },
  // Add other categories here...
];

const ListItems = () => {
  const { name } = useParams();
  const location = useLocation();
  const { category } = location.state || {};

  const selectedCategory = category || categories.find((cat) => cat.name === name);

  if (!selectedCategory) {
    return <div className="list-items-not-found">Category not found</div>;
  }

  return (
    <div className="list-items-page">
      <h2 className="list-items-title">{selectedCategory.name}</h2>
      <div className="list-items-grid">
        {selectedCategory.items.map((item, index) => (
          <div key={index} className="list-item-card">
            <img src={item.image} alt={item.name} className="list-item-image" />
            <p className="list-item-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
