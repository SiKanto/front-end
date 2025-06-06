// File: src/components/Hero.tsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import BeachImage from "../assets/images/main-beach.png";
import { Icon } from "@iconify/react";
import clipboardCheckIcon from "@iconify/icons-solar/clipboard-check-outline";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
        } else {
          el.classList.remove("show");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${BeachImage})` }}
    >
      <div className="hero-overlay">
        <div ref={heroRef} className="hero-content fade-in-up">
          <h1 className="hero-title">Welcome, adventure is <br />more comfortable if we know <br />where the destination is</h1>
          <Link to="/survey" className="hero-button">
            <span className="icon">
              <Icon icon={clipboardCheckIcon} className="icon" />
            </span>
            Take Survey
          </Link>
        </div>
      </div>
    </section>
  );
}
