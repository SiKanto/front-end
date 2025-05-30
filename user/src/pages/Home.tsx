// File: src/pages/Home.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecommendationSection from "../components/RecommendationSection";
import MapSection from "../components/mapSection";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="main-container">
        <Hero />
        <RecommendationSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}