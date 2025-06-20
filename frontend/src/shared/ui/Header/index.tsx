import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routes';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/shared/services/AuthService';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoGrimoire from '@/shared/assets/logo2.png';
import './styles.scss';

const NAV_ITEMS = [
  { to: AppRoutes.ROOT, label: 'main' },
  { to: AppRoutes.VAULT, label: 'vault' },
  { to: AppRoutes.JOURNAL, label: 'journal' },
  { to: AppRoutes.TODAY, label: 'today' },
  // { to: AppRoutes.KANBAN, label: 'kanban' },
];

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await authService.logout();
    navigate(AppRoutes.LOGIN);
  };

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <Link to={AppRoutes.ROOT} className="header__logo">
        <img src={LogoGrimoire} alt="Grimoire Logo" className="header__logo-image" />
      </Link>

      {user ? (
        <>
          {/* Desktop Nav */}
          <nav className="header__nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  'header__nav-link' + (isActive ? ' header__nav-link--active' : '')
                }
                end={item.to === AppRoutes.ROOT}
              >
                <span className="header__nav-label header__nav-label--font">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button className="header__hamburger" onClick={toggleMobileMenu} aria-label="Open menu">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="header__mobile-menu"
                ref={mobileMenuRef}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.22 }}
              >
                <nav className="header__mobile-nav">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        'header__mobile-nav-link' + (isActive ? ' header__mobile-nav-link--active' : '')
                      }
                      end={item.to === AppRoutes.ROOT}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="header__nav-label header__nav-label--font">{item.label}</span>
                    </NavLink>
                  ))}
                  <NavLink to={AppRoutes.ME} className="header__mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="header__nav-label header__nav-label--font">profile</span>
                  </NavLink>
                  <button type="button" className="header__mobile-nav-link" onClick={handleLogout}>
                    <span className="header__nav-label header__nav-label--font">logout</span>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile menu (desktop only) */}
          <div className="header__profile desktop-only" ref={menuRef}>
            <div className="header__profile-icon" onClick={toggleProfileMenu}>
              🧙‍♂️
            </div>
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  className="header__menu"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={AppRoutes.ME} className="header__menu-item" onClick={() => setIsProfileMenuOpen(false)}>
                    profile
                  </Link>
                  <button type="button" className="header__menu-item" onClick={handleLogout}>
                    logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <Link to={AppRoutes.LOGIN} className="header__login-button">
          login
        </Link>
      )}
    </header>
  );
};
