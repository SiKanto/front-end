// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import About from "./pages/About";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Reset from "./auth/ResetPassword";
import { useAuth } from "./contexts/authContext";

export default function App() {
    const { token, login } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendation" element={<Home />} />
            <Route path="/saved" element={token ? <Saved /> : <Navigate to="/login" replace />} />
            <Route path="/about" element={<About />} />
            <Route
                path="/login"
                element={
                    !token ? (
                        <Login onLogin={login} />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />
            <Route
                path="/signup"
                element={!token ? <Signup /> : <Navigate to="/" replace />}
            />
            <Route
                path="/reset-password"
                element={!token ? <Reset /> : <Navigate to="/" replace />}
            />
            <Route
                path="*"
                element={<Navigate to={token ? "/" : "/login"} replace />}
            />
        </Routes>
    );
}
