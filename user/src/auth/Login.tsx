import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || 'There was an issue with the login.');
      } else {
        setMessage('Network error.');
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
        localStorage.setItem('userToken', loginResponse.data.token);
        onLogin(loginResponse.data.token);
        history('/');
      } else {
        setMessage('Google login failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error logging in with Google.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 bg-[#f4f4f9] px-4">
      <div className="flex w-full max-w-screen-lg gap-16">
        <div className="w-full md:w-1/2 p-8 items-center mt-4 rounded-lg">
          <h2 className="text-[48px] font-bold text-center mb-6 text-[#333]">Welcome back</h2>
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

          {/* Google Login Button */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setMessage('Google login failed. Please try again.')}
              useOneTap
            />
          </div>

          {message && <p className="text-red-500 text-center mt-4">{message}</p>}

          <p className="text-center mt-4 text-[#6D6D6D]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#000] hover:text-[#DC0000]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
