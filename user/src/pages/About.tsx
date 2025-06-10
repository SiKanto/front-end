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
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const fadeEls = document.querySelectorAll(".scroll-fade");
        fadeEls.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <section
                className={`about-page ${entryVisible ? "fade-entry" : ""}`}
            >
                <div className="about-hero">
                    <div className="about-overlay">
                        <h1 className="about-title">
                            Welcome, adventure is more comfortable if we know
                            where the destination is
                        </h1>
                    </div>
                </div>

                <div className="about-content scroll-fade">
                    <h4 className="about-label scroll-fade">ABOUT US</h4>
                    <div className="about-main scroll-fade">
                        <div className="about-left scroll-fade">
                            <h2 className="about-heading">Kanto</h2>
                            <p className="about-sub">
                                your personal traveling companion
                            </p>
                            <p className="about-desc">
                                KANTO, yang berasal dari singkatan{" "}
                                <b>KANca paTOalangan</b> atau Teman Petualangan,
                                hadir untuk membantu Anda menjelajahi keindahan
                                Madura dengan cara yang lebih menyenangkan dan
                                terarah. Kami memberikan rekomendasi destinasi
                                wisata terbaik di empat kabupaten Madura yaitu
                                Bangkalan, Sampang, Pamekasan, dan Sumenep, yang
                                pasti akan membuat perjalanan Anda semakin
                                berkesan. Dengan sistem rekomendasi berbasis
                                digital yang kami kembangkan, KANTO memberikan
                                saran yang dipersonalisasi sesuai minat dan
                                preferensi Anda. Dari wisata alam yang
                                menenangkan, budaya yang kaya, hingga destinasi
                                tersembunyi yang jarang diketahui, KANTO siap
                                menjadi teman setia Anda dalam menemukan
                                tempat-tempat indah di Madura. Kami juga
                                bertujuan untuk mendukung pertumbuhan ekonomi
                                kreatif di Madura dengan menghubungkan wisatawan
                                dengan pelaku usaha lokal, memberikan dampak
                                positif bagi sektor pariwisata dan ekonomi
                                lokal. Temukan pengalaman wisata yang tak
                                terlupakan Bersama KANTO!
                            </p>
                        </div>
                        <div className="about-right scroll-fade">
                            <img
                                src={madura}
                                alt="Logo"
                                className="about-logo"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
