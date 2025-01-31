import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our platform! We are dedicated to making a difference by
          connecting donors with those in need.
        </p>

        <div className="about-section">
          <h2>Contact Us</h2>
          <p>Email: contact@ourplatform.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        

        <div className="about-section">
          <h2>Address</h2>
          <p>123 Charity Street</p>
          <p>Mumbai, India</p>
          <p>Pin: 400001</p>
        </div>

        <div className="about-section">
          <h2>Need Help?</h2>
          <p>
            If you have any queries, feel free to reach out to our support team.
            We’re here to assist you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;