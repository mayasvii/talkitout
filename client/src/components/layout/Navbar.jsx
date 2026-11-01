import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LeafIcon,
  MenuIcon,
  CloseIcon,
  UserIcon,
  LogOutIcon,
  WindIcon,
  BookOpenIcon,
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
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon-wrapper">
            <LeafIcon size={24} />
          </div>
          <span className="brand-text">TalkItOut</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
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
          <NavLink to="/counselling" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Counselling
          </NavLink>
          <NavLink to="/journal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Journal
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => `nav-link emergency-nav-link ${isActive ? 'active' : ''}`}>
            Emergency
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}>
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Desktop Right Section: Calm Pill + Auth */}
        <div className="navbar-desktop-auth">
          {/* Instant Calm Down Button */}
          <Link
            to="/breathe?routine=box-breathing"
            className="calm-down-pill"
            title="Instant Box Breathing de-escalation"
          >
            <WindIcon size={16} />
            <span>Need to calm down?</span>
          </Link>

          {isAuthenticated ? (
            <div className="auth-user-group">
              <NavLink to="/dashboard" className={({ isActive }) => `btn btn-ghost user-pill ${isActive ? 'active' : ''}`}>
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

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Quick Calm Button inside Mobile Drawer */}
            <div className="mobile-calm-wrapper">
              <Link
                to="/breathe?routine=box-breathing"
                className="calm-down-pill mobile-calm-btn"
                onClick={closeMenu}
              >
                <WindIcon size={18} />
                <span>Need to calm down? (Box Breathe)</span>
              </Link>
            </div>

            <div className="mobile-menu-links">
              <NavLink to="/" className="mobile-nav-link" onClick={closeMenu} end>
                Home
              </NavLink>
              <NavLink to="/audiobooks" className="mobile-nav-link" onClick={closeMenu}>
                Audiobooks
              </NavLink>
              <NavLink to="/music" className="mobile-nav-link" onClick={closeMenu}>
                Music
              </NavLink>
              <NavLink to="/breathe" className="mobile-nav-link" onClick={closeMenu}>
                Breathe & Yoga
              </NavLink>
              <NavLink to="/counselling" className="mobile-nav-link" onClick={closeMenu}>
                Counselling
              </NavLink>
              <NavLink to="/journal" className="mobile-nav-link" onClick={closeMenu}>
                Private Journal
              </NavLink>
              <NavLink to="/emergency" className="mobile-nav-link" onClick={closeMenu}>
                Emergency 24x7 Helplines
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
                    Logout
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
