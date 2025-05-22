import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
  }, [location]); // <- Re-run setiap kali lokasi berubah


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header>
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/name-red.png" alt="icon-kanto" style={{ cursor: 'pointer' }} />
      </div>
      <div className="logout">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
