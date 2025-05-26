// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext'; // Import AuthProvider
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Bungkus aplikasi dengan AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
