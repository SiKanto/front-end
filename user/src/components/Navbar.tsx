import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-kanto-red.png";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="Kanto Logo" className="logo-image" />
        </Link>

        {/* Menu */}
        <nav className="navbar-menu">
          <Link to="/recommendation" className="navbar-link">Recommendation</Link>
          <Link to="/saved" className="navbar-link">Saved</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="navbar-actions">
          <Link to="/signup" className="signup-link">Sign up</Link>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
