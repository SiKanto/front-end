import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Reset from "./auth/ResetPassword";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = (token: string) => {
    // Store the token in localStorage
    localStorage.setItem("token", token);
    setToken(token);
    console.log('Logged in with token:', token);
  };

  const handleLogout = () => {
    // Remove token on logout
    localStorage.removeItem("token");
    setToken(null);
    console.log('Logged out');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<Reset/>} />
        {/* Additional routes can be added here */}
      </Routes>
    </>
  );
}
