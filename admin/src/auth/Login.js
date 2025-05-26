import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope  } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  // Cek apakah ada data login di localStorage saat komponen dimuat
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/login', {
        email,
        password
      });

      if (response.data && response.data.token) { 
        onLogin(response.data.token);
        history('/dashboard');

        // Simpan data login ke localStorage jika Remember Me dicentang
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          // Hapus data login jika Remember Me tidak dicentang
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'There was an issue with the login.');
      } else {
        setMessage('Network error.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              className="email-login"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="mail-form">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className="input-container">
            <input
              className="password-login"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="pass-form" onClick={togglePasswordEye}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          <div className="extra-options">
            <div className="container-checkbox">
              <input 
                type="checkbox" 
                className="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <label className="label-checkbox">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          <button className='button-login' type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
      <div className="welcome-box">
        <img src="/icon-red192.png" alt="Kanto Logo" className="logo"/>
        <h2>Welcome to Kanto</h2>
        <p>Your journey starts here</p>
      </div>
    </div>
  );
};

export default Login;
