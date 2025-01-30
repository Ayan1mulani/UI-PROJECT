import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom'; 


const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    address: 'Loni Kalbhor, Pune',
    gender: 'male',
    phone: '+91 8668361520',
    email: 'Siuuuuu@gmail.com',
    profileImage: 'https://th.bing.com/th/id/OIP.tsQsaTzPJG_e6lddMgvR_QHaHa?w=190&h=190&c=7&r=0&o=5&dpr=2&pid=1.7'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle the image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setUserInfo((prev) => ({
        ...prev,
        profileImage: imageUrl
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated:', userInfo);
    // Here, you would typically send the updated data to an API
  };
  const navigate = useNavigate(); 

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div>

    <div className="profile-container">

      <div className="profile-card">
        <button>
      <div className="bg-2" onClick={() => navigate(-1)  }>&larr;</div>
      </button>

        <div className="profile-photo">
          <img
            src={userInfo.profileImage}
            alt="Profile"
            className="profile-img"
            onClick={handleProfileClick} // Navigate to profile page on click
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange} // Handle the image change
          />
        </div>
        <div className="profile-info">
          <h2> Update Profile Information</h2>

          <form onSubmit={handleUpdate}>
            <div className="profile-inputs">
              <div className="input-field">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div>

         

              <div className="input-field">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

            

              <div className="input-field">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-field">
                <button type="submit" className="update-btn">Update Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;