// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 pt-20">
      <ul className="space-y-4">
        <li>
          <Link 
            to="/dashboard" 
            className="block px-6 py-3 text-lg font-medium text-[#860000] hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/destinations" 
            className="block px-6 py-3 text-lg font-medium text-[#860000] hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Destinations
          </Link>
        </li>
        <li>
          <Link 
            to="/users" 
            className="block px-6 py-3 text-lg font-medium text-[#860000] hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Users
          </Link>
        </li>
        <li>
          <Link 
            to="/tickets" 
            className="block px-6 py-3 text-lg font-medium text-[#860000] hover:bg-[#DC0000] hover:text-white transition-all"
          >
            Tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
