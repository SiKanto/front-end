import Navbar from "../components/Navbar";
import RecommendationSection from "../components/RecommendationSection";
import MapSection from "../components/mapSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

interface HomeProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Home({ onLogout, isLoggedIn }: HomeProps) {
  return (
    <div className="font-sans">
      <Navbar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      <Hero />
      <main className="main-container">
        <RecommendationSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
