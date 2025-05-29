import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  localStorage.clear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Toggle visibility of password
  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  // When the component mounts, check if 'rememberMe' was previously selected
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    } else {
      setRememberMe(false);  // Ensure it is unchecked by default if nothing is saved
    }
  }, []);

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        onLogin(response.data.token);
        history('/dashboard');

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
    <div className="flex justify-center items-center mt-8 bg-[#f4f4f9] px-4">
      <div className="flex w-full max-w-screen-lg gap-16 flex-col lg:flex-row">
        {/* Form Login */}
        <div className="w-full lg:w-1/2 p-8 items-center mt-4 rounded-lg mx-auto">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold text-center mb-6 text-[#333]">Welcome back</h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <input
                className="w-full h-[41px] p-4 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000] transition-colors"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="relative mb-6">
              <input
                className="w-full h-[41px] p-4 pr-12 border border-[#ddd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#DC0000] transition-colors"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordEye}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="text-sm text-[#6D6D6D]">Remember me</label>
              </div>
              <Link to="/reset-password" className="text-sm text-[#000] hover:text-[#DC0000]">
                Forgot Password?
              </Link>
            </div>
            <button className="w-full h-[41px] p-0 bg-[#fff] text-[#DC0000] border border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-[#fff] transition-colors">
              Login
            </button>
          </form>
          {message && <p className="text-red-500 text-center mt-4">{message}</p>}
          <p className="text-center mt-4 text-[#6D6D6D]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#000] hover:text-[#DC0000]">
              Sign up
            </Link>
          </p>
        </div>

        {/* Bagian Kanan untuk Logo dan Deskripsi */}
        <div className="w-[490px] h-[519px] p-8 bg-[#fff] text-white rounded-lg flex-col items-center justify-center shadow-lg hidden lg:flex">
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

export default Login;
