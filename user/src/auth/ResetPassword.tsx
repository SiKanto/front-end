import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'; // sesuaikan path

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // Step 1: Email, Step 2: New Password
  const [loading, setLoading] = useState<boolean>(false);
  const history = useNavigate();

  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      await new Promise(res => setTimeout(res, 500)); // loading minimal 1.5 detik

      const response = await axios.post('https://kanto-backend.up.railway.app/users/check-email', { email });

      if (response.data.exists) {
        setStep(2);
      } else {
        setMessage('Email not found. Please check and try again.');
        setMessageType('error');
      }
    } catch {
      setMessage('Error checking email.');
      setMessageType('error');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      await new Promise(res => setTimeout(res, 1500)); // loading minimal 1.5 detik

      const response = await axios.post('https://kanto-backend.up.railway.app/users/reset-password', { email, newPassword });

      if (response.status === 200 && response.data.message === "Password reset successful") {
        setMessage('Password reset successful');
        setMessageType('success');
        setTimeout(() => {
          history('/login');
        }, 2000);
      } else {
        setMessage('Failed to reset password. Please try again.');
        setMessageType('error');
      }
    } catch {
      setMessage('Error resetting password.');
      setMessageType('error');
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
          <h2 className="h2-login">Reset Password</h2>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="form-login">
                <input
                  className="input-login"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <span className="icon-login">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <button className="btn-login" disabled={loading}>
                Lanjut
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-login">
                <input
                  className="input-login"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <span
                  className="icon-password"
                  onClick={togglePasswordEye}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <button className="btn-login" disabled={loading}>
                Ganti Password
              </button>
            </form>
          )}

          {message && (
            <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
              {message}
            </p>
          )}

          <p className="signup-prompt">
            Remember your password?{' '}
            <Link to="/login" className="forgot">
              Go back to login
            </Link>
          </p>
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

export default ResetPassword;
