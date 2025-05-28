import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: New Password
  const history = useNavigate();

  // Toggle visibility of password
  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email exists
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/check-email', { email });

      if (response.data.exists) {
        setStep(2); // Move to the next step to reset password
        setMessage(''); // Clear previous message
      } else {
        setMessage('Email not found. Please check and try again.');
      }
    } catch (error) {
      setMessage('Error checking email.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send request to reset the password
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/reset-password', { email, newPassword });
      console.log(response)

      if (response.status === 200 && response.data.message === "Password reset successful") {
        setMessage('Password reset successful');
        setTimeout(() => {
          history('/login'); // Redirect to login page after successful password reset
        }, 2000);
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 bg-[#f4f4f9] px-4">
      <div className="flex w-full max-w-screen-lg gap-16">
        {/* Form Reset Password */}
        <div className="w-full md:w-1/2 p-8 items-center mt-4 rounded-lg">
          <h2 className="text-[48px] font-bold text-center mb-6 text-[#333]">Reset Password</h2>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="relative mb-6">
                <input
                  className="w-full h-[41px] p-4 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000] transition-colors"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <button className="w-full h-[41px] p-0 bg-[#fff] text-[#DC0000] border border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-[#fff] transition-colors">
                Lanjut
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-6">
                <input
                  className="w-full h-[41px] p-4 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000] transition-colors"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordEye}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <button className="w-full h-[41px] p-0 bg-[#fff] text-[#DC0000] border border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-[#fff] transition-colors">
                Ganti Password
              </button>
            </form>
          )}

          {message && <p className="text-red-500 text-center mt-4">{message}</p>}

          <p className="text-center mt-4 text-[#6D6D6D]">
            Remember your password?{' '}
            <a href="/login" className="text-[#000] hover:text-[#DC0000]">
              Go back to Login
            </a>
          </p>
        </div>

        {/* Bagian Kanan untuk Logo dan Deskripsi */}
        <div className="w-[490px] h-[519px] p-8 bg-[#fff] text-white rounded-lg flex flex-col items-center justify-center shadow-lg">
          <img
            src="/icon-red192.png"
            alt="Kanto Logo"
            className="mb-4 w-[150px] mx-auto"
          />
          <h2 className="text-[30px] font-bold mb-2 text-center text-[#333]">Welcome to Kanto</h2>
          <p className="text-center text-[#333]">Your journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
