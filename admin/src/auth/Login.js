import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate(); // Hook untuk navigasi

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://kanto-backend.up.railway.app/admin/login', {
        email,
        password
      });

      // Pastikan bahwa response memiliki data dan token
      if (response.data && response.data.token) { 
        onLogin(response.data.token);  // Simpan token setelah login
        history('/dashboard');  // Redirect ke halaman dashboard setelah login berhasil
      } else {
        setMessage('Login gagal. Silakan periksa kredensial Anda.');
      }
    } catch (error) {
      // Menangani error jika terjadi masalah di API atau jaringan
      if (error.response) {
        setMessage(error.response.data.message || 'Terjadi kesalahan saat login.');
      } else {
        setMessage('Terjadi kesalahan jaringan.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login Admin</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>Belum punya akun? <Link to="/register">Klik untuk daftar</Link></p>
    </div>
  );
};

export default Login;
