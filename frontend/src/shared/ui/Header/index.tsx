import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/shared/services/AuthService';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoGrimoire from '@/shared/assets/logo2.png';
import './styles.scss';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await authService.logout();
    navigate(AppRoutes.LOGIN);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <Link to={AppRoutes.ROOT} className="header__logo">
        <img src={LogoGrimoire} alt="Grimoire Logo" className="header__logo-image" />
      </Link>

      {user ? (
        <div className="header__profile" ref={menuRef}>
          <div className="header__profile-icon" onClick={toggleMenu}>
            🧙‍♂️
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="header__menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={AppRoutes.ME} className="header__menu-item" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button type="button" className="header__menu-item" onClick={handleLogout}>
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link to={AppRoutes.LOGIN} className="header__login-button">
          Login
        </Link>
      )}
    </header>
  );
};
