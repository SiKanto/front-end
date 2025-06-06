import "../styles/place-sidebar.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import heartIcon from "@iconify/icons-solar/heart-outline";
import heartFilled from "@iconify/icons-solar/heart-bold";
import shareIcon from "@iconify/icons-solar/share-outline";
import starIcon from "@iconify/icons-solar/star-bold";
import clockIcon from "@iconify/icons-solar/clock-circle-outline";
import tagIcon from "@iconify/icons-solar/ticket-outline";
import infoIcon from "@iconify/icons-solar/info-square-outline";
import type { Place } from "../data/dummyPlaces";
import { useSavedPlaces } from "../contexts/SavedPlacesContext";

interface Props {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceSidebar({ place, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const { addPlace, removePlace, isSaved } = useSavedPlaces();

  useEffect(() => {
    setIsVisible(true);
  }, [place]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    if (place) {
      isSaved(place.id) ? removePlace(place.id) : addPlace(place);
    }
  };

  if (!place) return null;

  return (
    <div className="sidebar-overlay" onClick={handleClose}>
      <div className={`place-sidebar ${isVisible ? "slide-in" : "slide-out"}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>×</button>

        {/* ✅ FIXED: Gambar ditampilkan */}
        <div className="sidebar-image">
          <img src={place.image} alt={place.name} />
        </div>

        <div className="sidebar-content">
          <h2 className="sidebar-title">{place.name}</h2>
          <p className="sidebar-location">{place.location}</p>

          <div className="sidebar-actions">
            <button onClick={handleSave}>
              <Icon icon={isSaved(place.id) ? heartFilled : heartIcon} />
            </button>
            <button><Icon icon={shareIcon} /></button>
          </div>

          <div className="sidebar-rating">
            <span className="rating-badge">
              <Icon icon={starIcon} />{place.rating}
            </span>
            <p className="type">{place.category}</p>
          </div>

          <div className="sidebar-section"><Icon icon={infoIcon} /><p>{place.description}</p></div>
          <div className="sidebar-section"><Icon icon={clockIcon} /><p>{place.openHour}</p></div>
          <div className="sidebar-section"><Icon icon={tagIcon} /><p>{place.price}</p></div>
        </div>
      </div>
    </div>
  );
}
