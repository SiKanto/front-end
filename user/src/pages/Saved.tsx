// src/pages/Saved.tsx
import "../styles/saved-page.css";
import { useSavedPlaces } from "../contexts/SavedPlacesContext";
import PlaceCard from "../components/PlaceCard";
import PlaceSidebar from "../components/PlaceSidebar";
import type { Place } from "../data/dummyPlaces";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Saved() {
    const { savedPlaces } = useSavedPlaces();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [pageVisible, setPageVisible] = useState(false);

    // ⏬ Animasi transisi page on mount
    useEffect(() => {
        setTimeout(() => setPageVisible(true), 10);
    }, []);

    // ⏬ Scroll animation effect
    useEffect(() => {
        const elements = document.querySelectorAll(".scroll-fade");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <section
                className={`saved-page scroll-fade ${
                    pageVisible ? "visible" : ""
                }`}
            >
                <h2 className="saved-title scroll-fade">
                    Your Favorite Places
                </h2>
                {savedPlaces.length === 0 ? (
                    <p className="empty-message scroll-fade">
                        You haven’t saved any places yet.
                    </p>
                ) : (
                    <div className="saved-grid scroll-fade">
                        {savedPlaces.map((place) => (
                            <PlaceCard
                                key={place._id}
                                {...place}
                                onClick={() => setSelectedPlace(place)}
                            />
                        ))}
                    </div>
                )}
            </section>

            <PlaceSidebar
                place={selectedPlace}
                onClose={() => setSelectedPlace(null)}
            />
        </>
    );
}
