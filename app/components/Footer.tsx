import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p><strong>🎻 Bergen Cello-klubb for Barn</strong></p>
        <p>En plass hvor unge musikere vokser og utvikler seg</p>
        <p className={styles.copyright}>© 2026 Bergen Cello-klubb</p>
      </div>
    </footer>
  );
}
