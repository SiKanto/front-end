// Header.js
import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext'; // Menggunakan AuthContext
import LoadingSpinner from '../Loading/LoadingSpinner';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Ambil isAuthenticated dan logout dari context
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true); // Tampilkan loading spinner
    setTimeout(() => {
      logout(); // Logout menggunakan AuthContext
      setLoading(false); // Sembunyikan spinner setelah logout selesai
      navigate('/login'); // Arahkan ke halaman login setelah logout
    }, 2000); // Simulasi proses logout selama 2 detik
  };

  const handleLogin = () => {
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <header>
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/name-red.png" alt="icon-kanto" style={{ cursor: 'pointer' }} />
      </div>

      {/* Render Loading Spinner jika loading true */}
      {loading && <LoadingSpinner />}

      <div className="logout">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button> // Tampilkan tombol logout jika terautentikasi
        ) : (
          <button onClick={handleLogin}>Login</button> // Tampilkan tombol login jika belum terautentikasi
        )}
      </div>
    </header>
  );
};

export default Header;
