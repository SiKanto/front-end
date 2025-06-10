// src/components/Loading/LoadingSpinner.tsx
import React from "react";
import "../styles/LoadingSpinner.css";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
