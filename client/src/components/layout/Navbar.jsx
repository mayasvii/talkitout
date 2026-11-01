import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LeafIcon,
  MenuIcon,
  CloseIcon,
  UserIcon,
  LogOutIcon,
  ShieldAlertIcon,
} from '../common/Icons';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Row 1: Logo on left; Prominent Help Now + Auth on right */}
        <div className="navbar-top-row">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="brand-icon-wrapper">
              <LeafIcon size={24} />
            </div>
            <span className="brand-text">TalkItOut</span>
          </Link>

          <div className="navbar-top-right">
            {/* Prominent Help Now button - always visible on desktop and mobile */}
            <Link
              to="/help-now"
              className="btn btn-help-now"
              title="Immediate crisis support, Tele-MANAS, and free 24x7 helplines"
              onClick={closeMenu}
            >
              <ShieldAlertIcon size={18} />
              <span>Help Now</span>
            </Link>

            {/* Desktop Auth Section */}
            <div className="desktop-auth-wrapper">
              {isAuthenticated ? (
                <div className="auth-user-group">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `btn btn-ghost user-pill ${isActive ? 'active' : ''}`}
                  >
                    <UserIcon size={16} />
                    <span>{user?.name?.split(' ')[0] || 'Dashboard'}</span>
                  </NavLink>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm logout-btn" title="Sign Out">
                    <LogOutIcon size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="auth-guest-group">
                  <Link to="/login" className="btn btn-ghost">
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Row 2: All main page links evenly spaced */}
        <nav className="navbar-links-row" aria-label="Main Navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/audiobooks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Audiobooks
          </NavLink>
          <NavLink to="/music" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Music
          </NavLink>
          <NavLink to="/breathe" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Breathe
          </NavLink>
          <NavLink to="/exam" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Exam Mode
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/journal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Journal
            </NavLink>
          )}
          <NavLink to="/counselling" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Counselling
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}>
              Admin Panel
            </NavLink>
          )}
        </nav>
      </div>

      {/* Mobile Drawer (clean full-width list) */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close menu">
                <CloseIcon size={22} />
              </button>
            </div>

            <div className="mobile-menu-links">
              <NavLink to="/" className="mobile-nav-link" onClick={closeMenu} end>
                Home
              </NavLink>
              <NavLink to="/audiobooks" className="mobile-nav-link" onClick={closeMenu}>
                Audiobooks
              </NavLink>
              <NavLink to="/music" className="mobile-nav-link" onClick={closeMenu}>
                Music & Soundscapes
              </NavLink>
              <NavLink to="/breathe" className="mobile-nav-link" onClick={closeMenu}>
                Breathe & Yoga
              </NavLink>
              <NavLink to="/exam" className="mobile-nav-link" onClick={closeMenu}>
                Exam Mode
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/journal" className="mobile-nav-link" onClick={closeMenu}>
                  Private Journal
                </NavLink>
              )}
              <NavLink to="/counselling" className="mobile-nav-link" onClick={closeMenu}>
                Confidential Counselling
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
                  My Student Dashboard
                </NavLink>
              )}
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="mobile-nav-link" onClick={closeMenu}>
                  Admin Panel
                </NavLink>
              )}
            </div>

            <div className="mobile-menu-auth">
              {isAuthenticated ? (
                <div className="mobile-auth-logged">
                  <div className="mobile-user-info">
                    <UserIcon size={18} />
                    <span>Signed in as <strong>{user?.name}</strong></span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-outline btn-block">
                    <LogOutIcon size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-guest">
                  <Link to="/login" className="btn btn-outline btn-block" onClick={closeMenu}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn btn-primary btn-block" onClick={closeMenu}>
                    Create Free Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;