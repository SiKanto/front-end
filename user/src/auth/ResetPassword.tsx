import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import logo192 from "../assets/images/icon-red192.png";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const history = useNavigate();

    const nodeRef = useRef(null);

    const togglePasswordEye = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://kanto-backend.up.railway.app/users/check-email",
                { email }
            );

            if (response.data.exists) {
                setStep(2);
                setMessage("");
                setMessageType("");
            } else {
                setMessage("Email not found. Please check and try again.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error checking email.");
            setMessageType("error");
        }
    };

    const handlePasswordSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://kanto-backend.up.railway.app/users/reset-password",
                { email, newPassword }
            );

            if (
                response.status === 200 &&
                response.data.message === "Password reset successful"
            ) {
                setMessage("Password reset successful");
                setMessageType("success");
                setTimeout(() => {
                    history("/login");
                }, 2000);
            } else {
                setMessage("Failed to reset password. Please try again.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error resetting password.");
            setMessageType("error");
        }
    };

    return (
        <div className="container-login">
            <div className="container-login-in">
                <CSSTransition
                    in={true}
                    appear
                    timeout={600}
                    classNames="flip"
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef} className="container-form-login">
                        <h2 className="h2-login">Reset Password</h2>

                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit}>
                                <div className="form-login">
                                    <input
                                        className="input-login"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    <span className="icon-login">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                                <button className="btn-login">Lanjut</button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="form-login">
                                    <input
                                        className="input-login"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                    />
                                    <span
                                        className="icon-password"
                                        onClick={togglePasswordEye}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                showPassword
                                                    ? faEye
                                                    : faEyeSlash
                                            }
                                        />
                                    </span>
                                </div>
                                <button className="btn-login">
                                    Ganti Password
                                </button>
                            </form>
                        )}

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
                            Remember your password?{" "}
                            <Link to="/login" className="signup-link">
                                Log in
                            </Link>
                        </p>
                    </div>
                </CSSTransition>

                <div className="logo-description">
                    <img
                        src={logo192}
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

export default ResetPassword;
