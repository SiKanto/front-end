import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import the provider
import App from './App.tsx';
import './index.css';

// Replace with your actual Google Client ID
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("Google Client ID:", googleClientId);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
