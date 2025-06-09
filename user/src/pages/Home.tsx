import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecommendationSection from "../components/RecommendationSection";
import MapSection from "../components/mapSection";
import Footer from "../components/Footer";
import SurveySidebar from "../components/surveySidebar";
import "../styles/home.css";

interface HomeProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Home({ onLogout, isLoggedIn }: HomeProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handler = () => setShowSidebar(false);
    window.addEventListener("closeSurveySidebar", handler);
    return () => window.removeEventListener("closeSurveySidebar", handler);
  }, []);

  return (
    <div className="font-sans">
      <Navbar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      
      <Hero onTakeSurvey={() => setShowSidebar(true)} />

      <main className="main-container">
        <RecommendationSection />
      </main>

      <MapSection />
      <Footer />

      {showSidebar && (
        <div className="survey-overlay" onClick={() => setShowSidebar(false)}>
          <div
            className="survey-slide-container"
            onClick={(e) => e.stopPropagation()}
          >
            <SurveySidebar />
          </div>
        </div>
      )}
    </div>
  );
}
