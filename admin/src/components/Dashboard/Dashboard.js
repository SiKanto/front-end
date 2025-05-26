import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Misalkan data statistik hardcoded dulu, bisa diganti dengan data dari API nanti
  const stats = {
    usersToday: 120,  // Pengguna yang mengakses hari ini
    totalUsers: 1024,  // Total pengguna
    ticketsSold: 350  // Tiket yang terjual
  };

  return (
    <section id="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>Users Today</h3>
          <p>{stats.usersToday}</p>
        </div>
        <div className="stat-item">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-item">
          <h3>Tickets Sold</h3>
          <p>{stats.ticketsSold}</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
