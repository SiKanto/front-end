import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import LoadingSpinner from "../components/LoadingSpinner";
import { CSSTransition } from "react-transition-group";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(""); // 'success' or 'error'
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // ref untuk CSSTransition
  const nodeRef = useRef(null);

  const togglePasswordEye = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await new Promise((res) => setTimeout(res, 1500)); // loading minimal 1.5 detik

      const response = await axios.post(
        "https://kanto-backend.up.railway.app/users/login",
        {
          email,
          password,
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        onLogin(response.data.token);
        history("/");

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
        setMessageType("error");
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(
          error.response.data.message || "There was an issue with the login."
        );
      } else {
        setMessage("Network error.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await new Promise((res) => setTimeout(res, 1500));

      const token = response.credential;

      const loginResponse = await axios.post(
        "https://kanto-backend.up.railway.app/users/google-login",
        {
          token,
        }
      );

      if (loginResponse.data.token) {
        localStorage.setItem("token", loginResponse.data.token);
        onLogin(loginResponse.data.token);
        history("/");
      } else {
        setMessage("Google login failed. Please try again.");
        setMessageType("error");
      }
    } catch {
      setMessage("Error logging in with Google.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      {loading && <LoadingSpinner />}
      <div
        className="container-login-in"
        style={{
          filter: loading ? "blur(2px)" : "none",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <CSSTransition
          in={!loading} // animasi muncul saat loading false
          appear={true}
          timeout={600}
          classNames="flip"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="container-form-login">
            <h2 className="h2-login">Welcome back</h2>
            <form onSubmit={handleLogin}>
              <div className="form-login">
                <input
                  className="input-login"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <span className="icon-login">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="form-login">
                <input
                  className="input-login"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <span
                  className="icon-password"
                  onClick={togglePasswordEye}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <div className="action-login">
                <div className="remember">
                  <label
                    htmlFor="rememberMeCheckbox"
                    className="label-checkbox"
                  >
                    <input
                      id="rememberMeCheckbox"
                      type="checkbox"
                      className="input-checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      disabled={loading}
                    />
                    Remember me
                  </label>
                </div>
                <Link to="/reset-password" className="forgot">
                  Forgot Password?
                </Link>
              </div>
              <button className="btn-login" disabled={loading}>
                Login
              </button>
            </form>

            <div className="google-login">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setMessage("Google login failed. Please try again.");
                  setMessageType("error");
                }}
                useOneTap
              />
            </div>

            {message && (
              <p
                className={`message ${
                  messageType === "success"
                    ? "success-message"
                    : "error-message"
                }`}
              >
                {message}
              </p>
            )}

            <p className="signup-prompt">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </p>
          </div>
        </CSSTransition>
        <div className="logo-description">
          <img
            src="/src/assets/images/icon-red192.png"
            alt="Kanto Logo"
            className="logo"
          />
          <h2 className="welcome-text">Welcome to Kanto</h2>
          <p className="tagline">Your journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
