import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import magnifierIcon from "@iconify/icons-solar/magnifer-outline";
import arrowDownIcon from "@iconify/icons-solar/alt-arrow-down-outline";
import arrowUpIcon from "@iconify/icons-solar/alt-arrow-up-outline";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map-section.css";
import axios from "axios";
import { motion } from "framer-motion";
import type { Place } from "../data/dummyPlaces";

type Category =
    | "Alam"
    | "Budaya"
    | "Edukasi"
    | "Kebun"
    | "Cafe"
    | "Pantai"
    | "Religi"
    | "Taman"
    | "Wahana Air";

const icons: Record<Category, L.Icon> = {
    Alam: new L.Icon({ iconUrl: "/icons/attraction.png", iconSize: [32, 32] }),
    Budaya: new L.Icon({ iconUrl: "/icons/culture.png", iconSize: [32, 32] }),
    Edukasi: new L.Icon({
        iconUrl: "/icons/education.png",
        iconSize: [32, 32],
    }),
    Kebun: new L.Icon({ iconUrl: "/icons/garden.png", iconSize: [32, 32] }),
    Cafe: new L.Icon({ iconUrl: "/icons/cafe.png", iconSize: [32, 32] }),
    Pantai: new L.Icon({ iconUrl: "/icons/beach.png", iconSize: [32, 32] }),
    Religi: new L.Icon({ iconUrl: "/icons/religion.png", iconSize: [32, 32] }),
    Taman: new L.Icon({ iconUrl: "/icons/park.png", iconSize: [32, 32] }),
    "Wahana Air": new L.Icon({
        iconUrl: "/icons/water.png",
        iconSize: [32, 32],
    }),
};

const fallbackIcon = new L.Icon({
    iconUrl: "/icons/cafe.png",
    iconSize: [32, 32],
});

export default function MapSection() {
    const [places, setPlaces] = useState<Place[]>([]); 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Filter place by");
    const [searchTerm, setSearchTerm] = useState("");

    const [isVisible, setIsVisible] = useState(false);

    const mapSectionRef = useRef(null);

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
        axios
            .get("https://kanto-backend.up.railway.app/destinations")
            .then((response) => {
                const fetchedPlaces: Place[] = response.data;
                setPlaces(fetchedPlaces);
            })
            .catch((error) => {
                console.error("Error fetching places:", error);
            });
    }, []);

    const filteredPlaces = places.filter((place) => {
        const matchesCategory =
            selectedOption === "Filter place by" ||
            place.category === selectedOption;
        const matchesSearch = place.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (mapSectionRef.current) {
            observer.observe(mapSectionRef.current);
        }

        return () => {
            if (mapSectionRef.current) {
                observer.unobserve(mapSectionRef.current);
            }
        };
    }, []);

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.section
            className="map-section"
            ref={mapSectionRef}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div variants={childVariants}>
                <div className="filter-bar">
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
                            <button
                                className="dropdown-toggle"
                                onClick={handleToggle}
                            >
                                {selectedOption}
                                <Icon
                                    icon={
                                        dropdownOpen
                                            ? arrowUpIcon
                                            : arrowDownIcon
                                    }
                                    className={`select-icon ${
                                        dropdownOpen ? "rotate" : ""
                                    }`}
                                />
                            </button>
                            <ul
                                className={`dropdown-menu ${
                                    dropdownOpen ? "open" : ""
                                }`}
                            >
                                <li onClick={() => handleSelect("Alam")}>
                                    Alam
                                </li>
                                <li onClick={() => handleSelect("Budaya")}>
                                    Budaya
                                </li>
                                <li onClick={() => handleSelect("Edukasi")}>
                                    Edukasi
                                </li>
                                <li onClick={() => handleSelect("Kebun")}>
                                    Kebun
                                </li>
                                <li onClick={() => handleSelect("Cafe")}>
                                    Kuliner
                                </li>
                                <li onClick={() => handleSelect("Pantai")}>
                                    Pantai
                                </li>
                                <li onClick={() => handleSelect("Religi")}>
                                    Religi
                                </li>
                                <li onClick={() => handleSelect("Taman")}>
                                    Taman
                                </li>
                                <li onClick={() => handleSelect("Wahana Air")}>
                                    Wahana Air
                                </li>
                            </ul>
                        </div>
                        <button className="apply-btn" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={childVariants}>
                <div className="map-header">
                    <h2>Find your next adventure!</h2>
                    <p>
                        See all the recommendations nearby you
                        <br />
                        from food restaurants or cafes, souvenir shops, and
                        tourist attractions.
                    </p>
                </div>
            </motion.div>

            <motion.div variants={childVariants}>
                <div className="map-container">
                    <MapContainer
                        center={[-7.05, 113.4]}
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
                        {filteredPlaces.map((place, index) => {
                            return (
                                <Marker
                                    key={index}
                                    position={[place.lat, place.lon]}
                                    icon={
                                        icons[place.category as Category] ||
                                        fallbackIcon
                                    }
                                >
                                    <Popup>
                                        <strong>{place.name}</strong>
                                        <br />
                                        {place.location}
                                        <br />
                                        Rating: {place.rating}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </motion.div>
        </motion.section>
    );
}
