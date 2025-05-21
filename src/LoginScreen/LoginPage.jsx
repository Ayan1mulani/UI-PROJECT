import React, { useState ,useEffect} from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const LoginPage = ({ hideBottom }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
    useEffect(() => {
    hideBottom(true); // hide on mount
    return () => hideBottom(false); // show on unmount
  }, [hideBottom]);

  const handleSubmit = async () => {
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Fixed URL format - added http:// and proper API endpoint
      const response = await axios.post('http://localhost:4040/api/v1/auth/token', {
        email,
        password,
      });

      // Better error handling and response processing
      if (response.data && response.data.token) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.token);
        
        // Set authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Navigate to home page
        navigate('/Home');
      } else {
        setError('Invalid response from server. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(`Server error (${err.response.status}). Please try again later.`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign in to your account</h2>
        <p className="login-subtitle">
          {/* Or <span className="link">create a new account</span> */}
        </p>

        {error && <div className="error-box">{error}</div>}

        <form className="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="form-remember">
            {/* <label>
              <input type="checkbox" /> Remember me
            </label> */}
            {/* <span className="link">Forgot your password?</span> */}
          </div>

          <button type="submit" disabled={isLoading} className={`submit-btn ${isLoading ? 'disabled' : ''}`}>
            {isLoading ? (
              <span className="spinner">Signing in...</span>
            ) : (
              <>
                <LogIn size={18} style={{ marginRight: '8px' }} />
                Sign in
              </>
            )}
          </button>
        </form>     
      </div>
    </div>
  );
};

export default LoginPage;