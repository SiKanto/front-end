import './Sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';  // Gunakan Link dari react-router-dom

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/tickets">Tickets</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;

