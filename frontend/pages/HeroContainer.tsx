import React, { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import styles from "../styles/HeroContainer.module.css";

// Import HeroSection1 only on client
const HeroSection1 = dynamic(() => import("./HeroSection1"), { ssr: false });

export default function HeroContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <HeroSection1 key={0} />,
    <HeroSection2 key={1} />,
    <HeroSection3 key={2} />,
  ];

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className={styles.heroContainer}>
      {slides[currentSlide]}

      <div className={styles.sliderNav}>
        <button onClick={prevSlide}>◀</button>
        <span>
          {currentSlide + 1} / {slides.length}
        </span>
        <button onClick={nextSlide}>▶</button>
      </div>
    </div>
  );
}
