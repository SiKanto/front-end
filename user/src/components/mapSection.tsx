import "../styles/map-section.css";
import { Icon } from "@iconify/react";
import magnifierIcon from "@iconify/icons-solar/magnifer-outline";
import arrowDownIcon from "@iconify/icons-solar/alt-arrow-down-outline";
import arrowUpIcon from "@iconify/icons-solar/alt-arrow-up-outline";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { dummyPlaces } from "../data/dummyPlaces";

const icons = {
  Restaurant: new L.Icon({ iconUrl: "/icons/restaurant.png", iconSize: [32, 32] }),
  Cafe: new L.Icon({ iconUrl: "/icons/cafe.png", iconSize: [32, 32] }),
  Mall: new L.Icon({ iconUrl: "/icons/mall.png", iconSize: [32, 32] }),
  Attractions: new L.Icon({ iconUrl: "/icons/attraction.png", iconSize: [32, 32] }),
  Beach: new L.Icon({ iconUrl: "/icons/beach.png", iconSize: [32, 32] }),
};

export default function MapSection() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter place by");
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedOption("Filter place by");
  };

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

  const filteredPlaces = dummyPlaces.filter((place) => {
    const matchesCategory =
      selectedOption === "Filter place by" || place.category === selectedOption;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="map-section">
      <div className="filter-bar scroll-fade">
        <div className="search-input-wrapper">
          <Icon icon={magnifierIcon} className="search-icon" />
          <input
            type="text"
            placeholder="Find place to visit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-right">
          <div className="custom-dropdown">
            <button className="dropdown-toggle" onClick={handleToggle}>
              {selectedOption}
              <Icon
                icon={dropdownOpen ? arrowUpIcon : arrowDownIcon}
                className={`select-icon ${dropdownOpen ? "rotate" : ""}`}
              />
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              <li onClick={() => handleSelect("Restaurant")}>Restaurant</li>
              <li onClick={() => handleSelect("Cafe")}>Cafe</li>
              <li onClick={() => handleSelect("Mall")}>Mall</li>
              <li onClick={() => handleSelect("Attractions")}>Attractions</li>
              <li onClick={() => handleSelect("Beach")}>Beach</li>
            </ul>
          </div>
          <button className="apply-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="map-header scroll-fade">
        <h2 className="scroll-fade">Find your next adventure!</h2>
        <p className="scroll-fade">
          See all the recommendation nearby you
          <br />
          from food restaurant or cafes, souvenirs shop, and tourist attraction.
        </p>
      </div>

      <div className="map-container scroll-fade">
        <MapContainer
          center={[-7.1, 113.2]}
          zoom={9}
          scrollWheelZoom={true}
          className="map-frame"
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "24px",
            zIndex: 0,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPlaces.map((place, index) => (
            <Marker
              key={index}
              position={[place.lat, place.lng]}
              icon={icons[place.category]}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.location}
                <br />
                Rating: {place.rating}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
