import React from "react";
import Header from "./Header";
import styles from "../styles/index.module.css";
import dynamic from "next/dynamic";
import HeroContainer from "./HeroContainer";

// Dynamic import with SSR disabled
const HeroSection = dynamic(() => import("./HeroSection1"), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <HeroContainer />
      {/* Other sections like Features, Footer, etc. */}
    </>
  );
}
