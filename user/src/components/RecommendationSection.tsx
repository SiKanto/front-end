import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PlaceCard from "./PlaceCard";
import PlaceSidebar from "./PlaceSidebar";
import { Icon } from "@iconify/react";
import arrowLeft from "@iconify/icons-solar/alt-arrow-left-outline";
import arrowRight from "@iconify/icons-solar/alt-arrow-right-outline";
import "../styles/recommendation-section.css";
import axios from "axios";
import type { Place } from "../data/dummyPlaces"; // Import the correct type

const ITEMS_PER_PAGE = 6;

export default function RecommendationSection() {
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null); // Type for selectedPlace
  const [places, setPlaces] = useState<Place[]>([]); // Type for places array
  const [loading, setLoading] = useState(true);

  const maxPage = Math.ceil(places.length / ITEMS_PER_PAGE) - 1;
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visiblePlaces = places.slice(start, end);

  const changePage = (newPage: number) => {
    if (newPage === page) return;
    setFade(true);
    setTimeout(() => {
      setPage(newPage);
      setFade(false);
    }, 200);
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView]);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get("https://kanto-backend.up.railway.app/destinations")
      .then((response) => {
        // Assuming the API data structure matches the Place interface
        const fetchedPlaces: Place[] = response.data; // Type the response data
        setPlaces(fetchedPlaces);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.section
      ref={ref}
      className="recommendation-section"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
    >
      <div className="recommendation-header">
        <div className="recommendation-title">
          <h2>What you might like</h2>
          <p>Based on your survey result</p>
        </div>

        <div className="recommendation-nav-group">
          <div className="recommendation-nav">
            <button
              className={`nav-btn ${page > 0 ? "active" : "outline"}`}
              onClick={() => changePage(page - 1)}
              disabled={page === 0}
            >
              <Icon icon={arrowLeft} width="16" />
            </button>
            <button
              className={`nav-btn ${page < maxPage ? "active" : "outline"}`}
              onClick={() => changePage(page + 1)}
              disabled={page === maxPage}
            >
              <Icon icon={arrowRight} width="16" />
            </button>
          </div>
          <div className="recommendation-page-indicator">
            Page {page + 1} of {maxPage + 1}
          </div>
        </div>
      </div>

      <div className={`recommendation-grid ${fade ? "fade-out" : ""}`}>
        {visiblePlaces.map((place, i) => (
          <div key={i} onClick={() => setSelectedPlace(place)}>
            <PlaceCard {...place} />
          </div>
        ))}
      </div>

      {selectedPlace && (
        <PlaceSidebar place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </motion.section>
  );
}
