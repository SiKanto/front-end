import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-kanto-red.png";
import "../styles/navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="Kanto Logo" className="logo-image" />
        </Link>

        <nav className="navbar-menu">
          <Link to="/recommendation" className="navbar-link">Recommendation</Link>
          <Link to="/saved" className="navbar-link">Saved</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </nav>

        <div className="navbar-actions">
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
      </div>
    </header>
  );
}
