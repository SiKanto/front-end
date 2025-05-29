import React, { useState, useEffect } from "react";
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
import ResetPassword from "./auth/resetPassword";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk sidebar
  const { isAuthenticated, login } = useAuth(); // Ambil isAuthenticated dan login/logout dari context

  const handleLogin = (token) => {
    setLoading(true); // Tampilkan loading spinner
    setTimeout(() => {
      login(token); // Update status autentikasi
      setLoading(false); // Sembunyikan spinner setelah login selesai
    }, 2000); // Simulasi proses login selama 2 detik
  };

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // Toggle state sidebar dengan prevState untuk pembaruan yang benar
  };

  // Logika untuk klik di luar sidebar untuk menutup sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Periksa apakah klik terjadi di luar sidebar dan hamburger button
      if (!event.target.closest(".sidebar") && !event.target.closest(".hamburger") && isSidebarOpen) {
        setIsSidebarOpen(false); // Menutup sidebar jika klik di luar
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]); // Pastikan hanya dipanggil sekali saat isSidebarOpen berubah

  // Redirect ke login jika belum terautentikasi
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen">
      {/* Header dengan z-index untuk tetap di atas */}
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex overflow-hidden pt-16 h-screen"> {/* Add padding-top untuk mencegah overlap dengan header */}
        {/* Menampilkan sidebar hanya jika sudah login */}
        {isAuthenticated && (
          <div
            className={`absolute transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} // Sidebar dengan animasi
          >
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/destinations"
              element={isAuthenticated ? (
                <Destinations />
              ) : (
                <Navigate to="/login" />
              )}
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
