import { useRouter } from 'next/router';
import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>☐ LOGO</div>
      <nav className={styles.nav}>
        <a href="#">Features</a>
        <a href="#">Channels</a>
        <a href="#">Blog</a>
        <a href="#">FAQs</a>
      </nav>
      <div className={styles.actions}>
         <Link href="/login" className={styles.loginButton}>
          Log In
        </Link>
       <Link href="/connect" className={styles.getStartedButton}>
       Get Started
       </Link>
      </div>

    </header>
  );
}
