import "../styles/place-sidebar.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import heartIcon from "@iconify/icons-solar/heart-outline";
import heartFilled from "@iconify/icons-solar/heart-bold";
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

interface Review {
    _id: string;
    rating: number;
    comment: string;
    userId: {
        username: string;
    };
}

export default function PlaceSidebar({ place, onClose }: Props) {
    const [isVisible, setIsVisible] = useState(true);
    const { isSaved, toggleSaved } = useSavedPlaces();
    const [userRating, setUserRating] = useState<number>(0);
    const [showInput, setShowInput] = useState(false);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);
            console.log("Token ditemukan:", storedToken);
        } else {
            console.warn("Token tidak ditemukan di localStorage");
        }

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log("User ditemukan:", parsedUser);
            } catch (err) {
                console.error("Gagal parse user:", err);
            }
        } else {
            console.warn("Tidak ada user di localStorage");
        }
    }, []);

    useEffect(() => {
        setIsVisible(true);
        if (place) {
            fetchReviews(place._id);
        }
        setUserRating(0);
        setComment("");
        setShowInput(false);
    }, [place]);

    const fetchReviews = async (id: string) => {
        setLoadingReviews(true);
        try {
            const res = await fetch(
                `https://kanto-backend.up.railway.app/reviews/${id}`
            );
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoadingReviews(false);
        }
    };

    const submitReview = async () => {
        if (!token) {
            console.error("Token tidak ditemukan. Pengguna harus login.");
            return;
        }

        if (!userRating || !comment.trim()) return;

        const reviewData = {
            destinationId: place?._id,
            rating: userRating,
            comment: comment.trim(),
            userId: user?.id,
        };

        console.log("Submitting review with data:", reviewData);
        try {
            const res = await fetch(
                "https://kanto-backend.up.railway.app/reviews",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(reviewData),
                }
            );

            if (res.ok) {
                setComment("");
                setUserRating(0);
                setShowInput(false);
                fetchReviews(place!._id);
            } else {
                console.error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review", error);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    if (!place) return null;

    return (
        <div className="sidebar-overlay" onClick={handleClose}>
            <div
                className={`place-sidebar ${
                    isVisible ? "slide-in" : "slide-out"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={handleClose}>
                    ×
                </button>

                <div className="sidebar-image">
                    <img src={place.imageURL} alt={place.name} />
                </div>

                <div className="sidebar-content">
                    <h2 className="sidebar-title">{place.name}</h2>
                    <p className="sidebar-location">{place.location}</p>

                    <div className="sidebar-actions">
                        <button
                            onClick={() => toggleSaved(place)}
                            aria-label="Save"
                        >
                            <Icon
                                icon={
                                    isSaved(place._id) ? heartFilled : heartIcon
                                }
                            />
                        </button>
                    </div>

                    <div className="sidebar-rating">
                        <span className="rating-badge">
                            <Icon icon={starIcon} />
                            {place.rating}
                        </span>
                        <p className="type">{place.category}</p>
                    </div>

                    <div className="sidebar-section">
                        <Icon icon={infoIcon} />
                        <p>{place.description}</p>
                    </div>

                    <div className="sidebar-section">
                        <Icon icon={clockIcon} />
                        <p>
                            {place.openingHours} - {place.closingHours}
                        </p>
                    </div>

                    <div className="sidebar-section">
                        <Icon icon={tagIcon} />
                        <p>{place.price}</p>
                    </div>

                    <div className="sidebar-section-review">
                        <h3>Berikan Penilaian</h3>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => {
                                        setUserRating(star);
                                        setShowInput(true);
                                    }}
                                    style={{
                                        color:
                                            star <= userRating
                                                ? "#FFD700"
                                                : "#ccc",
                                        cursor: "pointer",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        {showInput && (
                            <div className="review-input">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tulis ulasanmu..."
                                />
                                <button className="btn-kirim" onClick={submitReview}>Kirim</button>
                            </div>
                        )}
                    </div>

                    <div className="sidebar-section-review">
                        <h3>Ulasan Pengguna</h3>
                        {loadingReviews ? (
                            <p>Memuat ulasan...</p>
                        ) : reviews.length === 0 ? (
                            <p>Belum ada ulasan.</p>
                        ) : (
                            <ul className="review-list">
                                {reviews.map((review) => (
                                    <li key={review._id}>
                                        <div className="review-rating">
                                            {"★".repeat(review.rating)}{" "}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>
                                        <p>{review.comment}</p>
                                        <small>
                                            - {review.userId?.username ?? "Pengguna"}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}