import styles from './styles.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.center}>
      magic is just science we don't understand yet.
    </div>
    <div className={styles.right}>
      <a href="https://antonivanov.tech/" target="_blank" rel="noopener noreferrer">
        developed by Anton Ivanov
      </a>
    </div>
  </footer>
); 