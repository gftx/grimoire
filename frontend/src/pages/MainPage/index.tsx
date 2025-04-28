import { Link } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import './styles.scss';

export const MainPage = () => {
  return (
    <div className="main-page">
      <h1 className="main-page__title">Welcome to Grimoire</h1>
      <p className="main-page__subtitle">
        Manage your quests, projects, and ideas with magic!
      </p>

      <div className="main-page__actions">
        <Link to={AppRoutes.LOGIN} className="main-page__button">
          Login
        </Link>
        <Link to={AppRoutes.REGISTER} className="main-page__button main-page__button--secondary">
          Register
        </Link>
      </div>
    </div>
  );
};
