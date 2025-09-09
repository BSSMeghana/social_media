import React from "react";
import styles from "../styles/HeroSection2.module.css";
import { useRouter } from "next/router";

export default function HeroSection2() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Explore the Unknown</h1>
        <p className={styles.tagline}>
          Unlock hidden adventures, rare experiences, and offbeat destinations. Let your wanderlust guide you.
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/login")}
        >
          Continue
        </button>
      </div>

      {/* Decorative background elements */}
      <div className={styles.backgroundCircle}></div>
      <div className={styles.overlayGradient}></div>
    </section>
  );
}
