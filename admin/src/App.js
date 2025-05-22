import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Destinations from './components/Destinations/Destinations';
import Users from './components/Users/Users';
import Tickets from './components/Tickets/Tickets';
import Dashboard from './components/Dashboard/Dashboard';
import Modal from './components/Modal/Modal';
import Register from './auth/Register';
import Login from './auth/Login';
import Footer from './components/Footer/Footer'
import './App.css';

const App = () => {
  const [showAddModal, setShowAddModal] = useState(false); // State untuk modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  // Fungsi untuk menangani klik Add Destination
  const handleAddDestination = () => {
    setShowAddModal(true); // Menampilkan modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowAddModal(false); // Menutup modal
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-container">
          {isAuthenticated && <Sidebar />}
          <div id="content">
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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
