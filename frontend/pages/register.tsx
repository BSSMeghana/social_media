import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/Register.module.css"; // Adjust path as needed

export default function SignupPage() {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle states for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Loading and messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Toggle password field visibility
  const togglePasswordVisibility = () => setShowPassword(s => !s);

  // Simple email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Client-side form validation
  const validateForm = () => {
    if (!username.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        fullName: username,
        email,
        password,
      });
      setMessage(response.data.message || "Registration successful!");
      // Clear form on success
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageGifBg}>
      <div className={styles.centeredContent}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Sign Up</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>

            {/* Username input */}
            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Fullname"
                className={styles.input}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email input */}
            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="username@gmail.com"
                className={styles.input}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password input with eye toggle */}
            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={styles.input}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={styles.toggleEye}
                role="button"
                tabIndex={0}
                onClick={togglePasswordVisibility}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    togglePasswordVisibility();
                  }
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    height="25"
                    width="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4877f5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="12" rx="8" ry="5" />
                    <circle cx="12" cy="12" r="2.5" fill="#4877f5" />
                  </svg>
                ) : (
                  <svg
                    height="25"
                    width="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4877f5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="12" rx="8" ry="5" />
                    <circle cx="12" cy="12" r="2.5" fill="#4877f5" />
                    <line x1="4" y1="20" x2="20" y2="4" stroke="#bcbcbc" strokeWidth="2" />
                  </svg>
                )}
              </span>
            </div>

            {/* Confirm Password input (no eye toggle) */}
            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className={styles.input}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Error and success messages */}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span>or</span>
              <span className={styles.dividerLine}></span>
            </div>

            {/* Google sign-up button */}
            <button type="button" className={`${styles.button} ${styles.googleButton}`}>
              <span className={styles.googleIconWrapper}>
                <svg
                  width="22"
                  height="22"
                  viewBox="1 1 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.08 1.53 7.49 2.81l5.54-5.52C33.66 3.83 29.45 2 24 2 14.83 2 6.98 7.66 3.24 15.36l6.79 5.28C12.11 14.41 17.67 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.41 24.54c0-1.82-.16-3.17-.51-4.56H24v9.19h12.66c-.27 2.01-1.64 5.04-4.73 7.07l7.28 5.64c4.25-3.92 6.7-9.72 6.7-17.34z" />
                    <path fill="#FBBC05" d="M10.03 28.25a14.64 14.64 0 0 1 0-8.47l-6.8-5.29A23.989 23.989 0 0 0 2 24c0 3.86.92 7.54 2.53 10.51l7.5-6.26z" />
                    <path fill="#EA4335" d="M24 46c6.48 0 11.92-2.12 15.89-5.77l-7.58-5.87c-2.1 1.42-4.97 2.43-8.31 2.43-6.37 0-11.77-4.16-13.71-9.99l-7.7 5.84C6.23 41.32 14.35 46 24 46z" />
                    <path fill="none" d="M2 2h44v44H2z" />
                  </g>
                </svg>
              </span>
              <span className={styles.googleButtonText}>Sign up with Google</span>
            </button>

            {/* Link to login */}
            <p className={styles.signupLink}>
              If you already have an account, please&nbsp;
              <Link href="/login" className={styles.link}>Log In</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
