import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdCard,
    faEnvelope,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/login.css";
import { CSSTransition } from "react-transition-group";

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messageType, setMessageType] = useState<string>(""); // 'success' or 'error'
    const [message, setMessage] = useState<string>("");
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // ref untuk animasi
    const nodeRef = useRef(null);

    // Fungsi toggle show/hide password
    const togglePasswordEye = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const username =
            `${firstName}${lastName}`.toLowerCase() +
            Math.floor(Math.random() * 1000);

        try {
            const response = await axios.post(
                "https://kanto-backend.up.railway.app/users/register",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    username,
                }
            );

            if (
                response.data &&
                response.data.message === "User created successfully"
            ) {
                setMessage("User created successfully!");
                setMessageType("success");
                history("/login"); // Redirect ke halaman login
            } else {
                setMessage(response.data.message || "Something went wrong!");
                setMessageType("error");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    error.response?.data?.message ||
                        error.message ||
                        "An error occurred during registration."
                );
                setMessageType("error");
            } else {
                setMessage("An unexpected error occurred.");
                setMessageType("error");
            }
        }
    };

    return (
        <div className="container-login">
            <div className="container-login-in">
                <CSSTransition
                    in={true} // true supaya animasi fade in saat mount
                    appear // supaya animasi muncul pertama kali
                    timeout={600}
                    classNames="flip"
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef} className="container-form-login">
                        <h2 className="h2-login">Welcome to Kanto</h2>
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
                            Already have an account?{" "}
                            <Link to="/login" className="signup-link">
                                Log in
                            </Link>
                        </p>
                        <form onSubmit={handleRegister}>
                            <div className="input-group">
                                <div className="form-login">
                                    <input
                                        className="input-registers"
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                    <span className="icon-login">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </span>
                                </div>

                                <div className="form-login">
                                    <input
                                        className="input-register"
                                        type="text"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                    <span className="icon-login">
                                        <FontAwesomeIcon icon={faIdCard} />
                                    </span>
                                </div>
                            </div>

                            <div className="form-login">
                                <input
                                    className="input-login"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <span
                                    className="icon-password"
                                    onClick={togglePasswordEye}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                    />
                                </span>
                            </div>

                            <button className="btn-login">Sign up</button>
                        </form>
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

export default Signup;
