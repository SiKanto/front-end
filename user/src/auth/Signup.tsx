import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login.css';
import LoadingSpinner from '../components/LoadingSpinner'; // sesuaikan path

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(''); // 'success' or 'error'
  const [message, setMessage] = useState<string>("");
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Toggle password visibility
  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    const username = `${firstName}${lastName}`.toLowerCase() + Math.floor(Math.random() * 1000);

    try {
      // Minimal loading 1.5 detik
      await new Promise(res => setTimeout(res, 1500));

      const response = await axios.post("https://kanto-backend.up.railway.app/admin/create", 
        {
          firstName,
          lastName,
          email,
          password,
          username,
        }
      );

      if (response.data && response.data.message === "Admin created successfully") {
        setMessage("Admin created successfully!");
        setMessageType('success');
        history("/login");  // Redirect ke login setelah sukses
      } else {
        setMessage(response.data.message || "Something went wrong!");
        setMessageType('error');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message || 
          error.message ||  
          "An error occurred during registration."
        );
        setMessageType('error');
      } else {
        setMessage("An unexpected error occurred.");
        setMessageType('error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      {loading && <LoadingSpinner />}
      <div
        className="container-login-in"
        style={{ filter: loading ? 'blur(2px)' : 'none', pointerEvents: loading ? 'none' : 'auto' }}
      >
        <div className="container-form-login">
          <h2 className="h2-login">Welcome to Kanto</h2>
          {message && <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>{message}</p>}
          <p className="signup-prompt">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Log in
            </Link>
          </p>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <div className="form-login">
                <input
                  className="input-registers"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
                <span className="icon-login">
                  <FontAwesomeIcon icon={faIdCard} />
                </span>
              </div>
              <div className="form-login">
                <input
                  className="input-register"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
                <span className="icon-login">
                  <FontAwesomeIcon icon={faIdCard} />
                </span>
              </div>
            </div>
            <div className="form-login">
              <input
                className="input-login"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
                disabled={loading}
              />
              <span className="icon-password" onClick={togglePasswordEye} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <button className="btn-login" disabled={loading}>Sign up</button>
          </form>
        </div>
        <div className="logo-description">
          <img
            src="/src/assets/images/icon-red192.png"
            alt="Kanto Logo"
            className="logo"
          />
          <h2 className="welcome-text">Welcome to Kanto</h2>
          <p className="tagline">Your journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
