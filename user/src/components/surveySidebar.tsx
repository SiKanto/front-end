import sad from "../assets/mood/sad.png";
import sadGray from "../assets/mood/sad-gray.png";
import neutral from "../assets/mood/neutral.png";
import neutralGray from "../assets/mood/neutral-gray.png";
import happy from "../assets/mood/happy.png";
import happyGray from "../assets/mood/happy-gray.png";
import love from "../assets/mood/love.png";
import loveGray from "../assets/mood/love-gray.png";

import { useState } from "react";
import "../styles/survey-sidebar.css";

export default function SurveySidebar() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [experience, setExperience] = useState("");
    const [importance, setImportance] = useState("");

    const moods = [
        { key: "sad", label: "Sad", colorImg: sad, grayImg: sadGray },
        {
            key: "neutral",
            label: "Neutral",
            colorImg: neutral,
            grayImg: neutralGray,
        },
        { key: "happy", label: "Happy", colorImg: happy, grayImg: happyGray },
        { key: "love", label: "Love", colorImg: love, grayImg: loveGray },
    ];

    const regions = ["Bangkalan", "Pamekasan", "Sampang", "Sumenep"];
    const topics = [
        "Menyatu Dengan alam",
        "Menyaksikan kekayaan budaya",
        "Nongkrong di Cafe",
        "Belajar di tempat Edukasi",
        "Bersantai di Taman",
        "Menyusuri kebun yang Asri",
        "Menikmati keindahan Pantai",
        "Menjelajahi tempat Religi",
        "Bermain di Wahana Air",
    ];

    const toggleTopic = (topic: string) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((t) => t !== topic)
                : [...prev, topic]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            selectedMood,
            selectedRegion,
            selectedTopics,
            experience,
            importance,
        });
    };

    return (
        <aside className="survey-sidebar">
            <form onSubmit={handleSubmit}>
                <button
                    type="button"
                    onClick={() =>
                        window.dispatchEvent(new Event("closeSurveySidebar"))
                    }
                    style={{
                        float: "right",
                        fontWeight: "bold",
                        border: "none",
                        background: "transparent",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                >
                    &times;
                </button>

                <h3>Bagaimana mood kamu hari ini?</h3>
                <div className="mood-options">
                    {moods.map((mood) => {
                        const isSelected = selectedMood === mood.key;
                        return (
                            <button
                                type="button"
                                key={mood.key}
                                onClick={() => setSelectedMood(mood.key)}
                                className={`mood-icon-btn ${
                                    isSelected ? "selected" : ""
                                }`}
                            >
                                <img
                                    src={
                                        isSelected
                                            ? mood.colorImg
                                            : mood.grayImg
                                    }
                                    alt={mood.label}
                                    className="mood-icon"
                                />
                            </button>
                        );
                    })}
                </div>

                <h3>Hari ini kamu pengen pergi kemana?</h3>
                <div className="region-options">
                    {regions.map((region) => (
                        <button
                            type="button"
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={
                                selectedRegion === region ? "selected" : ""
                            }
                        >
                            {region}
                        </button>
                    ))}
                </div>

                <h3>Destinasi apa yang paling menarik minat kamu hari ini?</h3>
                <div className="topic-options">
                    {topics.map((topic) => (
                        <button
                            type="button"
                            key={topic}
                            onClick={() => toggleTopic(topic)}
                            className={
                                selectedTopics.includes(topic) ? "selected" : ""
                            }
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                <label>
                    Ceritakan pengalaman wisata terbaik kamu di Madura!
                    <textarea
                        placeholder="Tulis pengalaman seru kamu di sini!"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                </label>

                <label>
                    Seberapa penting rekomendasi tempat wisata bagi kamu dalam
                    merencanakan perjalanan?
                    <textarea
                        placeholder="Tulis pendapat kamu di sini!"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                    />
                </label>

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </aside>
    );
}
