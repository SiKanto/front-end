import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import { SavedPlacesProvider } from "./contexts/SavedPlacesContext.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";

// Replace with your actual Google Client ID
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <GoogleOAuthProvider clientId={googleClientId}>
                <SavedPlacesProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </SavedPlacesProvider>
            </GoogleOAuthProvider>
        </AuthProvider>
    </StrictMode>
);
