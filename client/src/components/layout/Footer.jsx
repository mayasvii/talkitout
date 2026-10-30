import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon, HeartIcon } from '../common/Icons';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-crisis-banner">
        <div className="footer-container crisis-content">
          <HeartIcon size={20} className="crisis-icon" />
          <p className="crisis-text">
            <strong>Need immediate help?</strong> If you're in crisis, call{' '}
            <a href="tel:14416" className="crisis-link">
              Tele-MANAS 14416
            </a>{' '}
            (free, 24x7 government mental health helpline).
          </p>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <LeafIcon size={24} />
              <span>TalkItOut</span>
            </div>
            <p className="footer-tagline">
              A gentle, judgment-free space designed for college students to pause, listen, reflect, and talk it out.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Wellness Tools</h4>
            <ul className="footer-link-list">
              <li><Link to="/audiobooks">Student Audiobooks</Link></li>
              <li><Link to="/music">Binaural & Focus Music</Link></li>
              <li><Link to="/breathe">Breathing Exercises</Link></li>
              <li><Link to="/counselling">Student Counselling</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Student Account</h4>
            <ul className="footer-link-list">
              <li><Link to="/dashboard">My Dashboard</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/signup">Join TalkItOut</Link></li>
            </ul>
          </div>

          <div className="footer-note-col">
            <div className="mindful-quote-card">
              <p className="mindful-quote-text">
                "You don't have to carry the whole semester at once. Just breathe through this moment."
              </p>
              <span className="mindful-quote-author">🌿 TalkItOut College Wellness</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-container footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} TalkItOut. Built with care for student mental well-being.
            </p>
            <p className="footer-badge">College Capstone Project (MERN Stack)</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
