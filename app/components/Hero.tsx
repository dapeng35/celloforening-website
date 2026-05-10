'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Oppdag, Lær, og Spill Cello!</h1>
        <p>Bli med i Bergen Cello-klubb for barn 6-15 år. Lær av de beste, spill med venner, og ha det gøy med musikk!</p>
        <div className={styles.heroButtons}>
          <Link href="#aktiviteter" className={styles.buttonPrimary}>
            Se Aktiviteter
          </Link>
          <Link href="#kalender" className={styles.buttonSecondary}>
            Sjekk Kalender
          </Link>
        </div>
      </div>
    </section>
  );
}
