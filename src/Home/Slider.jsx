import React from "react";
import { Link } from "react-router-dom";
import "./Slider.css";

// List of categories with related items
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
  {
    name: "Books",
    image: "https://th.bing.com/th/id/OIP.jeVfx14-a23XhQnKRmmwpAHaGe?rs=1&pid=ImgDetMain",
    items: [
      { name: "Novel", image: "https://example.com/novel.jpg" },
      { name: "Science Book", image: "https://example.com/science-book.jpg" },
    ],
  },
  {
    name: "Clothes",
    image: "https://th.bing.com/th/id/OIP.dH2IBYbh9vuyr2-ryPuqxgHaEm?rs=1&pid=ImgDetMain",
    items: [
      { name: "T-shirt", image: "https://example.com/tshirt.jpg" },
      { name: "Jeans", image: "https://example.com/jeans.jpg" },
    ],
  },
  {
    name: "Home Decor",
    image: "https://th.bing.com/th/id/OIP.heupZNeAh-eq0a0Cxgj5CAHaHa?rs=1&pid=ImgDetMain",
    items: [
      { name: "Vase", image: "https://example.com/vase.jpg" },
      { name: "Wall Art", image: "https://example.com/wall-art.jpg" },
    ],
  },
];

const Slider = () => {
  return (
    <div className="slider-container">
      {/* Category selection */}
      <div className="slider">
        {categories.map((category, index) => (
          <div key={index} className="slider-item">
            <Link to={`/ListItems/${category.name}`} state={{ category }}>
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
