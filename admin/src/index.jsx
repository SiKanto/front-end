import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Aplikasi utama
import { BrowserRouter as Router } from 'react-router-dom'; // Mengimpor Router
import { AuthProvider } from './Contexts/AuthContext'; // Import AuthProvider

// Membuat root React untuk aplikasi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <AuthProvider> {/* Bungkus aplikasi dengan AuthProvider */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Router>
);
