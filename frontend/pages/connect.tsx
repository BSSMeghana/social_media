import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";
import styles from "../styles/connect.module.css";

const ConnectPage = () => {
  const platforms = [
    {
      name: "Instagram",
      connected: false,
      icon: <FaInstagram className={styles.icon} />,
      url: "https://www.instagram.com/accounts/login/",
    },
    {
      name: "Facebook",
      connected: false,
      icon: <FaFacebook className={styles.icon} />,
      url: "https://www.facebook.com/login/",
    },
    {
      name: "LinkedIn",
      connected: false,
      icon: <FaLinkedin className={styles.icon} />,
      url: "https://www.linkedin.com/login/",
    },
    {
      name: "X (Twitter)",
      connected: false,
      icon: <FaTwitter className={styles.icon} />,
      url: "https://twitter.com/login/",
    },
    {
      name: "Pinterest",
      connected: false,
      icon: <FaPinterest className={styles.icon} />,
      url: "https://www.pinterest.com/login/",
    },
    {
      name: "YouTube",
      connected: false,
      icon: <FaYoutube className={styles.icon} />,
      url: "https://accounts.google.com/ServiceLogin?service=youtube",
    },
  ];

  const handleConnect = (url: string) => {
    window.open(url, "_blank"); // Opens login in a new tab
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Page Header */}
        <h1 className={styles.heading}>LOGO</h1>
        <h2 className={styles.subheading}>Connect your social media in seconds</h2>
        <p className={styles.subsubheading}>
          From posting to publish, AI content to analytics — everything starts with a connection.
        </p>

        {/* Platforms List */}
        <div className={styles.platformList}>
          {platforms.map((platform) => (
            <div key={platform.name} className={styles.platformCard}>
              <div className={styles.platformInfo}>
                {platform.icon}
                <span className={styles.platformName}>{platform.name}</span>
              </div>
              <button
                className={`${styles.button} ${
                  platform.connected ? styles.connected : styles.connect
                }`}
                onClick={() => !platform.connected && handleConnect(platform.url)}
              >
                {platform.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
