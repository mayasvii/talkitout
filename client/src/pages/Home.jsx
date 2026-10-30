import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeadphonesIcon,
  MusicIcon,
  WindIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  LeafIcon,
} from '../components/common/Icons';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <SparklesIcon size={16} />
            <span>A safe haven for college students</span>
          </div>

          <h1 className="hero-title">
            Take a deep breath. <br />
            <span className="hero-highlight">You don't have to carry it all alone.</span>
          </h1>

          <p className="hero-subtitle">
            College is tough, and your feelings are completely valid. TalkItOut offers 
            calming audiobooks, soothing focus frequencies, and confidential student 
            counselling — whenever you need a mindful pause.
          </p>

          <div className="hero-cta-group">
            <Link to="/audiobooks" className="btn btn-primary btn-lg">
              <span>Listen to Audiobooks</span>
              <ArrowRightIcon size={18} />
            </Link>
            <Link to="/music" className="btn btn-secondary btn-lg">
              <span>Soothing Music</span>
            </Link>
          </div>

          <div className="hero-features-strip">
            <div className="strip-item">
              <LeafIcon size={18} />
              <span>100% Free & Confidential</span>
            </div>
            <div className="strip-item">
              <SparklesIcon size={18} />
              <span>No Medical Jargon</span>
            </div>
            <div className="strip-item">
              <HeartIcon size={18} />
              <span>Empathetic Student Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Feature Cards */}
      <section className="features-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">Support designed around your college day</h2>
            <p className="section-subtitle">
              Whether you have 5 minutes between lectures or need a peaceful evening reset.
            </p>
          </div>

          <div className="features-grid">
            {/* Card 1: Audiobooks */}
            <div className="feature-card card-teal">
              <div className="feature-icon-wrapper">
                <HeadphonesIcon size={28} />
              </div>
              <h3 className="feature-card-title">Student Audiobooks</h3>
              <p className="feature-card-text">
                Short, practical listens on conquering exam stress, handling academic burnout, and overcoming imposter syndrome.
              </p>
              <Link to="/audiobooks" className="feature-card-link">
                <span>Browse Audiobooks</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 2: Music */}
            <div className="feature-card card-lavender">
              <div className="feature-icon-wrapper">
                <MusicIcon size={28} />
              </div>
              <h3 className="feature-card-title">Music & Soundscapes</h3>
              <p className="feature-card-text">
                432Hz anxiety relief, sleep delta frequencies, and non-distracting lo-fi study beats for late-night assignments.
              </p>
              <Link to="/music" className="feature-card-link">
                <span>Explore Soundscapes</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 3: Breathing & Yoga */}
            <div className="feature-card card-mint">
              <div className="feature-icon-wrapper">
                <WindIcon size={28} />
              </div>
              <h3 className="feature-card-title">Breathing & Yoga</h3>
              <p className="feature-card-text">
                Guided 3-minute somatic reset exercises and box breathing techniques to quickly steady your racing pulse.
              </p>
              <Link to="/breathe" className="feature-card-link">
                <span>Take a Breath</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 4: Counselling */}
            <div className="feature-card card-warm">
              <div className="feature-icon-wrapper">
                <HeartIcon size={28} />
              </div>
              <h3 className="feature-card-title">Confidential Counselling</h3>
              <p className="feature-card-text">
                Connect with verified counsellors for friendly 1-on-1 chat or in-person sessions to talk through your worries.
              </p>
              <Link to="/counselling" className="feature-card-link">
                <span>Book a Session</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="how-it-works-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">How TalkItOut Works</h2>
            <p className="section-subtitle">
              Three simple, pressure-free steps to restore your peace of mind.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Choose What You Need</h3>
              <p className="step-text">
                Feeling restless before an exam? Can't fall asleep? Pick an audiobook, mood playlist, or schedule a chat.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Listen or Connect</h3>
              <p className="step-text">
                Put your headphones on and let soothing tones calm your nervous system, or book a trusted counsellor slot.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Feel Grounded</h3>
              <p className="step-text">
                No judgment, no grades, no pressure. Return whenever you need a safe sanctuary to breathe and talk it out.
              </p>
            </div>
          </div>

          <div className="home-banner-quote">
            <p className="home-quote-text">
              "You don't have to be productive every single minute. Your rest is just as important as your ambition."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
