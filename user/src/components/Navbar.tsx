// File: src/components/Navbar.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-kanto-red.png";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify/icons-solar/hamburger-menu-outline";
import closeIcon from "@iconify/icons-solar/close-circle-outline";
import "../styles/navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={Logo} alt="Kanto Logo" className="logo-image" />
          </Link>
        </div>

        {/* Menu Tengah */}
        <nav className="navbar-center">
          <Link to="/recommendation" className="navbar-link">Recommendation</Link>
          <Link to="/saved" className="navbar-link">Saved</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </nav>

        {/* Login/Logout */}
        <div className="navbar-right">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="signup-link">Sign up</Link>
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )}
        </div>

        {/* Toggle (mobile) */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Icon icon={isMenuOpen ? closeIcon : menuIcon} width="28" height="28" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`navbar-mobile ${isMenuOpen ? "active" : ""}`}>
        <nav className="navbar-menu">
          <Link to="/recommendation" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Recommendation</Link>
          <Link to="/saved" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Saved</Link>
          <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>About</Link>
        </nav>

        <div className="navbar-actions">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="signup-link" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="login-button">Login</button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}
