import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-kanto-white.png";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src={Logo} alt="Kanto Logo" className="logo-image" />
          </div>
        </div>

        {/* Middle */}
        <div className="footer-middle">
          <Link to="/recommendation" className="footer-link">Recommendation</Link>
          <Link to="/saved" className="footer-link">Saved</Link>
          <Link to="/about" className="footer-link">About</Link>
        </div>

        {/* Right */}
        <div className="footer-right">
          <div className="footer-actions">
            <Link to="/signup" className="signup-link-footer">Sign up</Link>
            <Link to="/login" className="login-link-footer">Login</Link>
          </div>
          <p className="footer-copy">
            © 2025 Kanto’s team – Capstone Project<br />
            <span className="footer-subcopy">Part of DBS Foundation program</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
