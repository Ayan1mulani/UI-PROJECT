import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus(); // Auto-focus the input when shown
    }
  }, [showSearch]);
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className='top-1'>
      {/* Search Box */}
      <div className={`search-box ${showSearch ? 'show' : ''}`}>
        <input ref={searchInputRef} type="text" placeholder="Search..." />
      </div>

      {/* Profile Section */}
      <div className='box1'         onClick={handleProfileClick} // Navigate to profile page on click
      >
        <img
          className='img'
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="profile"
        />
        <p>Cristano R.</p>
      </div>

      {/* Icons Section */}
      <div className='top-icons'>
        {/* Search / Close Icon */}
        <div onClick={toggleSearch} className="icon">
          {showSearch ? (
            // Close (X) Icon
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e8eaed">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            // Search Icon
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          )}
        </div>

        {/* Notification Icon */}
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;