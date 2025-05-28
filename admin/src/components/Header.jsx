// src/components/Header/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"; // Menggunakan AuthContext
import LoadingSpinner from "./LoadingSpinner";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Ambil isAuthenticated dan logout dari context
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true); // Tampilkan loading spinner
    setTimeout(() => {
      logout(); // Logout menggunakan AuthContext
      setLoading(false); // Sembunyikan spinner setelah logout selesai
      navigate("/login"); // Arahkan ke halaman login setelah logout
    }, 2000); // Simulasi proses logout selama 2 detik
  };

  const handleLogin = () => {
    navigate("/login"); // Arahkan ke halaman login
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md fixed top-0 left-0 w-full z-50 h-16">
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src="/name-red.png" alt="icon-kanto" className="h-8" />
      </div>

      {/* Render Loading Spinner jika loading true */}
      {loading && <LoadingSpinner />}

      {/* Tombol Logout/Login */}
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-sm font-medium text-[#DC0000] border-2 border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-6 py-2 text-md font-medium text-[#DC0000] border-2 border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
