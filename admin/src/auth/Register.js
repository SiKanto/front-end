// src/components/Users/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://kanto-backend.up.railway.app/admin/create`, {
        username,
        email,
        password
      });

      // Menggunakan response untuk memberikan feedback lebih lanjut
      if (response.data && response.data.success) {
        setMessage('Admin created successfully!');
        history('/login');  // Redirect ke halaman login setelah registrasi berhasil
      } else {
        setMessage(response.data.message || 'Something went wrong!'); // Menampilkan pesan error dari response
      }

    } catch (error) {
      // Jika error terjadi, tampilkan pesan error yang sesuai
      setMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register Admin</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}  {/* Menampilkan pesan berdasarkan response */}
      <p>Sudah punya akun? <Link to="/login">Klik untuk login</Link></p> {/* Link ke halaman Login */}
    </div>
  );
};

export default Register;
