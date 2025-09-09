import React from "react";
import styles from "../styles/HeroSection3.module.css";
import { useRouter } from "next/router";

export default function HeroSection3() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Share Your Story</h1>
          <p className={styles.tagline}>
            Turn your adventures into stories that inspire others to explore the world.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => router.push("/login")}
          >
            Start Sharing
          </button>
        </div>
      </div>
    </section>
  );
}
