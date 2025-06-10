import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecommendationSection from "../components/RecommendationSection";
import MapSection from "../components/mapSection";
import Footer from "../components/Footer";
import SurveySidebar from "../components/surveySidebar";
import "../styles/home.css";

export default function Home() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const handleRegionSelect = (region: string) => {
        setSelectedRegion(region);
        setShowSidebar(false);
    };

    return (
        <div className="font-sans">
            <Navbar />
            <Hero onTakeSurvey={() => setShowSidebar(true)} />
            <main className="main-container">
                <RecommendationSection
                    selectedRegion={selectedRegion}
                    onRegionSelect={handleRegionSelect}
                />
            </main>
            <MapSection />
            <Footer />

            {showSidebar && (
                <div
                    className="survey-overlay"
                    onClick={() => setShowSidebar(false)}
                >
                    <div
                        className="survey-slide-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SurveySidebar onRegionSelect={handleRegionSelect} />{" "}
                        {/* Pass down handleRegionSelect */}
                    </div>
                </div>
            )}
        </div>
    );
}
