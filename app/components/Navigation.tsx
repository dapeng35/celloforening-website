'use client';

import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>🎻 Bergen Cello-klubb</div>
        <ul className={styles.navLinks}>
          <li><Link href="#hjem">Hjem</Link></li>
          <li><Link href="#aktiviteter">Aktiviteter</Link></li>
          <li><Link href="#kalender">Kalender</Link></li>
          <li><Link href="#kontakt">Kontakt</Link></li>
        </ul>
        <button className={styles.ctaButton}>Bli Medlem</button>
      </div>
    </nav>
  );
}
