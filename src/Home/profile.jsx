import React, { useState } from 'react';
import './Profile.css';
import { User, Mail, MapPin, Phone, Briefcase, Calendar, Clock } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const userData = {
    personal: {
      name: "Harsh Jaiswal ",
      email: "Hjaiswal@gamil.com",
      address: "Nagpur Maharashtra, India",
      phone: "+91 92093 12532",
      dateJoined: "January 15, 2025"
    },
    business: {
      companyName: "-",
      position: "Student",
      workAddress: "-",
      workPhone: "-",
      department: "-"
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>User Profile</h1>
        {/* <button className="settings-btn">
          <Settings size={16} className="icon" />
          Settings
        </button> */}
      </header>

      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-banner">
            <div className="profile-user-icon">
              <User size={48} />
            </div>
            <div className="profile-user-info">
              <h2>{userData.personal.name}</h2>
              <p><Mail size={16} className="icon" />{userData.personal.email}</p>
            </div>
            <div className="profile-member-date">
              <Clock size={16} className="icon" />
              <span>Member since {userData.personal.dateJoined}</span>
            </div>
          </div>

          <div className="profile-tabs">
            <button
              className={activeTab === 'personal' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button
              className={activeTab === 'business' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('business')}
            >
              Business Information
            </button>
          </div>

          <div className="profile-tab-content">
            {activeTab === 'personal' ? (
              <div className="info-section">
                <div className="info-item">
                  <MapPin className="icon" size={20} />
                  <div>
                    <p className="label">Address</p>
                    <p>{userData.personal.address}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Phone className="icon" size={20} />
                  <div>
                    <p className="label">Phone</p>
                    <p>{userData.personal.phone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Calendar className="icon" size={20} />
                  <div>
                    <p className="label">Date Joined</p>
                    <p>{userData.personal.dateJoined}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="info-section">
                <div className="info-item">
                  <Briefcase className="icon" size={20} />
                  <div>
                    <p className="label">Company</p>
                    <p>{userData.business.companyName}</p>
                  </div>
                </div>
                <div className="info-item">
                  <User className="icon" size={20} />
                  <div>
                    <p className="label">Position</p>
                    <p>{userData.business.position}</p>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin className="icon" size={20} />
                  <div>
                    <p className="label">Work Address</p>
                    <p>{userData.business.workAddress}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Phone className="icon" size={20} />
                  <div>
                    <p className="label">Work Phone</p>
                    <p>{userData.business.workPhone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-footer">
            {/* <button className="edit-btn">
              Edit Profile Information
              <ChevronRight size={16} className="icon" />
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;