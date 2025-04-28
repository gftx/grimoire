import { useAuthStore } from '@/store/auth';
import './styles.scss';

export const MePage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="me-page">
        <div className="me-page__empty">No user data available.</div>
      </div>
    );
  }

  return (
    <div className="me-page">
      <h1 className="me-page__title">My Profile</h1>
      <div className="me-page__card">
        <div className="me-page__row">
          <span className="me-page__label">User ID:</span>
          <span className="me-page__value">{user.id}</span>
        </div>
        <div className="me-page__row">
          <span className="me-page__label">Username:</span>
          <span className="me-page__value">{user.username}</span>
        </div>
        <div className="me-page__row">
          <span className="me-page__label">Email:</span>
          <span className="me-page__value">{user.email}</span>
        </div>
        <div className="me-page__row">
          <span className="me-page__label">Role:</span>
          <span className={`me-page__value me-page__role me-page__role--${user.role.toLowerCase()}`}>
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};