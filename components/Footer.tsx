import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.brandName}>Al-Hisab</p>
          <p className={styles.brandDesc}>
            Empowering the Ummah with modern financial tools built on timeless
            Islamic principles. Manage your Zakat, Sadaqah, and wealth with
            absolute clarity.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              🌐
            </a>
            <a href="#" className={styles.socialLink} aria-label="Email">
              ✉
            </a>
          </div>
        </div>

        <nav className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
          <a href="#" id="about">Zakat Guide</a>
        </nav>
      </div>

      <div className={styles.copyright}>
        © 2026 Al-Hisab Wealth Management. All rights reserved. Built for the
        Ummah.
      </div>
    </footer>
  );
}
