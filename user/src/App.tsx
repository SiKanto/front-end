import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Reset from "./auth/ResetPassword";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Home onLogout={handleLogout} isLoggedIn={!!token} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />}
      />
      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/" replace />}
      />
      <Route
        path="/reset-password"
        element={!token ? <Reset /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  );
}
