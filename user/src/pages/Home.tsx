import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecommendationSection from "../components/RecommendationSection";
import MapSection from "../components/mapSection";
import Footer from "../components/Footer";

interface HomeProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Home({ onLogout, isLoggedIn }: HomeProps) {
  return (
    <div className="font-sans">
      <Navbar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      <main className="main-container">
        <Hero />
        <RecommendationSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
