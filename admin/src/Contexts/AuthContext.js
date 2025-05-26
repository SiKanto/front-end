// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Membuat Context untuk autentikasi
const AuthContext = createContext();

// Membuat Provider untuk autentikasi
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context ini
export const useAuth = () => useContext(AuthContext);
