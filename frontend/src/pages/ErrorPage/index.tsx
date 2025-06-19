import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const ErrorPage = () => {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.emoji}>🧙‍♂️</div>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Sorry, this page does not exist.</p>
      <Link to="/" className={styles.homeButton}>
        go to main page
      </Link>
    </div>
  );
};
