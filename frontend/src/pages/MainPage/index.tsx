import { useAuthStore } from '@/store/auth';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import styles from './styles.module.scss';

export const MainPage = () => {
  const { user } = useAuthStore();

  const isAuthenticated = !!user;

  return (
    <div className={styles.mainPage}>
      {isAuthenticated ? (
        <div className={styles.authenticated}>
          <h1 className={styles.title}>Welcome back, {user.username}!</h1>
          <p className={styles.subtitle}>Your available features:</p>

          <div className={styles.features}>
            <Link to={AppRoutes.VAULT} className={styles.featureCard}>
              <h2>🧠 Vault</h2>
              <p>Store and grow your ideas, drafts, scripts, and notes.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.guest}>
          <h1 className={styles.title}>Welcome to Grimoire</h1>
          <p className={styles.subtitle}>
            Manage your quests, projects, and ideas with magic!
          </p>

          <div className={styles.actions}>
            <Link to={AppRoutes.LOGIN} className={styles.loginButton}>
              Login
            </Link>
            <Link to={AppRoutes.REGISTER} className={styles.registerButton}>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};