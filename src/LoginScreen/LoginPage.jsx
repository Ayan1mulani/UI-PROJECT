import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="overlay"></div>
      <img className="img1" src="../img1.jpg" alt="Background" />
      
      <div className="login-card">
        <h2>ReShare Marketplace</h2>
        <p>Join the sustainability movement</p>

        <div className="login-options">
          <button className="login-btn ">Login</button>
          <div> <h5 className='create-account'>Create Account</h5></div>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;