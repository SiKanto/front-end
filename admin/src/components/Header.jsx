import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"; // Menggunakan AuthContext
import LoadingSpinner from "./LoadingSpinner";

const Header = ({ toggleSidebar }) => { // Menerima toggleSidebar sebagai props
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
      {/* Tombol Hamburger di perangkat kecil */}
      <button
        onClick={toggleSidebar} // Memanggil toggleSidebar hanya sekali
        className="lg:hidden fixed top-0 left-6 z-50 p-4 text-[#DC0000]"
      >
        <span className="text-2xl">☰</span>
      </button>

      {/* Logo */}
      <div className="flex justify-center lg:justify-start lg:ml-5 items-center w-full absolute left-0 right-0">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src="/name-red.png" alt="icon-kanto" className="h-8" />
        </div>
      </div>

      {/* Render Loading Spinner jika loading true */}
      {loading && <LoadingSpinner />}

      {/* Tombol Logout/Login */}
      <div className="ml-auto z-20"> {/* Ini akan memposisikan tombol logout ke kanan */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-xs md:text-sm lg:text-base font-medium text-[#DC0000] border-[1px] border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-3 py-1 text-xs md:taxt-sm font-medium text-[#DC0000] border-2 border-[#DC0000] rounded-full hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
