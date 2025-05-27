import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext"; // Import useAuth hook
import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Destinations from "./components/Destinations";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import Dashboard from "./components/Dashboard";
import Register from "./auth/Register";
import Login from "./auth/Login";
import './App.css'

const App = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth(); // Ambil isAuthenticated dan login/logout dari context

  const handleLogin = (token) => {
    setLoading(true); // Tampilkan loading spinner
    setTimeout(() => {
      login(token); // Update status autentikasi
      setLoading(false); // Sembunyikan spinner setelah login selesai
    }, 2000); // Simulasi proses login selama 2 detik
  };

  // Redirect ke login jika belum terautentikasi
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen">
      {/* Header with z-index to stay on top */}
      <Header />
      <div className="flex-1 flex overflow-hidden pt-16"> {/* Add padding-top to prevent header overlap */}
        {/* Menampilkan sidebar hanya jika sudah login */}
        {isAuthenticated && (
          <div className="w-64 bg-gray-800 text-white fixed z-10">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto ml-64">
          <Routes>
            {/* Halaman login dan register tidak menampilkan sidebar */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/destinations"
              element={
                isAuthenticated ? (
                  <Destinations />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/users"
              element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
            />
            <Route
              path="/tickets"
              element={isAuthenticated ? <Tickets /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
