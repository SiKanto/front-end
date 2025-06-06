// File: src/pages/About.tsx
import "../styles/about.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import madura from "../assets/images/icon-bigred.png";
import Footer from "../components/Footer";

export default function About() {
  const [entryVisible, setEntryVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setEntryVisible(true);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeEls = document.querySelectorAll(".scroll-fade");
    fadeEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar isLoggedIn onLogout={() => {}} />
      <section className={`about-page ${entryVisible ? "fade-entry" : ""}`}>
        <div className="about-hero">
          <div className="about-overlay">
            <h1 className="about-title">
              Welcome, adventure is more comfortable if we know where the destination is
            </h1>
          </div>
        </div>

        <div className="about-content scroll-fade">
          <h4 className="about-label scroll-fade">ABOUT US</h4>
          <div className="about-main scroll-fade">
            <div className="about-left scroll-fade">
              <h2 className="about-heading">Kanto</h2>
              <p className="about-sub">your personal traveling companion</p>
              <p className="about-desc">
                Lorem ipsum dolor sit amet consectetur. Pretium sem pulvinar neque sed ut est enim lorem in.
                Fermentum lobortis hendrerit turpis quam turpis. Ornare commodo pellentesque quis id nascetur ut
                imperdiet ornare malesuada. Tempus proin diam enim elementum sapien eu. Vulputate velit aliquet
                euque odio volutpat vitae ornare. Malesuada sed scelerisque id mi amet malesuada mauris.
              </p>
            </div>
            <div className="about-right scroll-fade">
              <img src={madura} alt="Logo" className="about-logo" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
