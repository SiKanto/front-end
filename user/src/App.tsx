// File: src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import About from "./pages/About";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Reset from "./auth/ResetPassword";
import { useState } from "react";

export default function App() {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token") || null
    );

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
            {/* Route for the main page (home) */}
            <Route
                path="/"
                element={<Home onLogout={handleLogout} isLoggedIn={!!token} />}
            />
            <Route
                path="/recommendation"
                element={<Home onLogout={handleLogout} isLoggedIn={!!token} />}
            />

            {/* Route for saved page, requires login */}
            <Route
                path="/saved"
                element={token ? <Saved /> : <Navigate to="/login" replace />}
            />

            {/* Route for about page, no login required */}
            <Route
                path="/about"
                element={<About onLogout={handleLogout} isLoggedIn={!!token} />}
            />

            {/* Route for login */}
            <Route
                path="/login"
                element={
                    !token ? (
                        <Login onLogin={handleLogin} />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            {/* Route for signup */}
            <Route
                path="/signup"
                element={!token ? <Signup /> : <Navigate to="/" replace />}
            />

            {/* Route for reset password */}
            <Route
                path="/reset-password"
                element={!token ? <Reset /> : <Navigate to="/" replace />}
            />

            {/* Catch-all route */}
            <Route
                path="*"
                element={<Navigate to={token ? "/" : "/login"} replace />}
            />
        </Routes>
    );
}
