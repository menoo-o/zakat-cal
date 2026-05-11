"use client";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏛</span>
          <span className={styles.logoText}>Al-Hisab</span>
        </a>

        <div className={styles.links}>
          <a href="#calculator" className={`${styles.link} ${styles.active}`}>
            Calculator
          </a>
          <a href="#nisab" className={styles.link}>
            Nisab Rates
          </a>
          <a href="#about" className={styles.link}>
            About Zakat
          </a>
          <a href="#faq" className={styles.link}>
            FAQ
          </a>
        </div>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.ctaBtn}>Give Zakat →</button>
        </div>
      </div>
    </nav>
  );
}
