import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from '@react-oauth/google';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>(''); // 'success' or 'error'
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Toggle visibility of password
  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail || '');
      setPassword(savedPassword || '');
      setRememberMe(true);
    } else {
      setRememberMe(false);  // Ensure it is unchecked by default if nothing is saved
    }
  }, []);

  // Handle login submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kanto-backend.up.railway.app/users/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.token);  // Pass the token to the parent component
        history('/'); // Redirect to homepage or dashboard

        // Handle "Remember Me" logic
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
      } else {
        setMessage('Login failed. Please check your credentials.');
        setMessageType('error');
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || 'There was an issue with the login.');
        setMessageType('error');
      } else {
        setMessage('Network error.');
        setMessageType('error');
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (response: any) => {
    try {
      const token = response.credential; // Token from Google OAuth

      // Send token to backend for verification
      const loginResponse = await axios.post('https://kanto-backend.up.railway.app/users/google-login', {
        token,
      });

      if (loginResponse.data.token) {
        localStorage.setItem('token', loginResponse.data.token);
        onLogin(loginResponse.data.token);
        history('/');
      } else {
        setMessage('Google login failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error logging in with Google.');
      setMessageType('error');
    }
  };

  return (
    <div className="container-login">
      <div className="container-login-in">
        <div className="container-form-login">
          <h2 className="h2-login">Welcome back</h2>
          <form onSubmit={handleLogin}>
            <div className="form-login">
              <input
                className="input-login"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="icon-login">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="form-login">
              <input
                className="input-login"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="icon-password"
                onClick={togglePasswordEye}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="action-login">
              <div className="remember">
                <label htmlFor="rememberMeCheckbox" className="label-checkbox">
                  <input
                    id="rememberMeCheckbox"
                    type="checkbox"
                    className="input-checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember me
                </label>
              </div>
              <Link to="/reset-password" className="forgot">Forgot Password?</Link>
            </div>
            <button className="btn-login">Login</button>
          </form>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setMessage('Google login failed. Please try again.')}
              useOneTap
            />
          </div>

          {message && <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>{message}</p>}

          <p className="signup-prompt">
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </div>

        <div className="logo-description">
          <img src="/src/assets/images/icon-red192.png" alt="Kanto Logo" className="logo" />
          <h2 className="welcome-text">Welcome to Kanto</h2>
          <p className="tagline">Your journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
