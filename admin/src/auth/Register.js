import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/create', {
        firstName,
        lastName,
        email,
        password
      });

      if (response.data && response.data.success) {
        setMessage('Admin created successfully!');
        history('/login');
      } else {
        setMessage(response.data.message || 'Something went wrong!');
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className='h2-register'>Welcome to Kanto</h2>
        {message && <p>{message}</p>}
        <p className='already-register'>Already have an account? <Link to="/login">Log in</Link></p>
        <form onSubmit={handleRegister}>
          <div className="nama">
            <input
              className='first-name'
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className='last-name'
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            className='email-register'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='password-register'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="welcome-box">
        <img src="/icon-red192.png" alt="Kanto Logo" className="logo"/>
        <h2>Welcome to Kanto</h2>
        <p>Your journey starts here</p>
      </div>
    </div>
  );
};

export default Register;
