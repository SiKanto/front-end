// App.js
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext'; // Import useAuth hook
import LoadingSpinner from './components/Loading/LoadingSpinner';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Destinations from './components/Destinations/Destinations';
import Users from './components/Users/Users';
import Tickets from './components/Tickets/Tickets';
import Dashboard from './components/Dashboard/Dashboard';
import Modal from './components/Modal/Modal';
import Register from './auth/Register';
import Login from './auth/Login';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login} = useAuth(); // Ambil isAuthenticated dan login/logout dari context

  const handleLogin = (token) => {
    setLoading(true); // Tampilkan loading spinner
    setTimeout(() => { // Simulasi proses login
      login(token); // Update status autentikasi
      setLoading(false); // Sembunyikan spinner setelah login selesai
    }, 2000); // Tampilkan spinner selama 2 detik
  };

  const handleAddDestination = () => {
    setShowAddModal(true); // Menampilkan modal untuk menambah destinasi
  };

  const closeModal = () => {
    setShowAddModal(false); // Menutup modal
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        {isAuthenticated && <Sidebar />}
        <div id="content">
          {/* Tampilkan spinner loading saat loading true */}
          {loading && <LoadingSpinner />}
          
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/destinations" element={isAuthenticated ? <Destinations onAddDestination={handleAddDestination} /> : <Navigate to="/login" />} />
            <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
            <Route path="/tickets" element={isAuthenticated ? <Tickets /> : <Navigate to="/login" />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>

      {/* Menampilkan Modal Add Destination */}
      {showAddModal && <Modal type="add" onClose={closeModal} />}

      {/* Menampilkan Modal Edit Destination */}
      {showEditModal && <Modal type="edit" onClose={() => setShowEditModal(false)} />}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
