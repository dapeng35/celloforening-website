import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={styles.footerContent}>
        <p><strong>🎻 Bergen Celloforeningen</strong></p>
        <p>En plass hvor unge musikere vokser og utvikler seg</p>
        <p className={styles.copyright}>© 2026 Bergen Celloforeningen</p>
      </div>
    </footer>
  );
}
