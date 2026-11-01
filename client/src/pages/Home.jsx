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
  BookOpenIcon,
  CheckIcon,
  ShieldAlertIcon,
} from '../components/common/Icons';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Section with Rich Gradient and Decorative Soft Blurred Orbs */}
      <section className="hero-section">
        {/* Soft decorative blurred circles */}
        <div className="hero-blob hero-blob-teal" aria-hidden="true" />
        <div className="hero-blob hero-blob-sage" aria-hidden="true" />
        <div className="hero-blob hero-blob-amber" aria-hidden="true" />

        <div className="page-container hero-grid-container">
          {/* Left Column: Hero Copy & Actions */}
          <div className="hero-text-col">
            <div className="hero-badge">
              <SparklesIcon size={16} />
              <span>A safe haven for college students</span>
            </div>

            <h1 className="hero-title">
              Take a deep breath. <br />
              <span className="hero-highlight">You don't have to carry it all alone.</span>
            </h1>

            <p className="hero-subtitle">
              College deadlines, exam stress, and life changes can feel overwhelming.
              TalkItOut is your gentle space for soothing audiobooks, calming 432Hz focus frequencies,
              private journaling, and confidential student support.
            </p>

            <div className="hero-cta-group">
              <Link to="/audiobooks" className="btn btn-accent btn-lg">
                <span>Start Mindful Reset</span>
                <ArrowRightIcon size={18} />
              </Link>
              <Link to="/exam" className="btn btn-primary btn-lg">
                <span>Exam Mode</span>
              </Link>
            </div>

            {/* Need to Calm Down Hero Card */}
            <div className="hero-calm-card">
              <div className="calm-card-icon-pulse">
                <WindIcon size={22} />
              </div>
              <div className="calm-card-info">
                <h3 className="calm-card-heading">Need to calm down right now?</h3>
                <p className="calm-card-text">
                  Follow a gentle 2-minute box breathing cycle to quiet your racing pulse and regain your center.
                </p>
              </div>
              <Link to="/breathe?routine=box-breathing" className="btn btn-secondary btn-sm calm-card-btn">
                <span>Breathe Now</span>
                <ArrowRightIcon size={14} />
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

          {/* Right Column: Inline Calm SVG Illustration */}
          <div className="hero-visual-col">
            <div className="hero-illustration-wrapper">
              <svg
                viewBox="0 0 540 460"
                className="hero-inline-svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Calm rolling hills under a gentle rising sun with peaceful breathing ripples"
              >
                <defs>
                  {/* Sky gradient */}
                  <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#DCEBEE" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#E3EEE4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F7F5EF" stopOpacity="0.2" />
                  </linearGradient>

                  {/* Sun glow */}
                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E3A857" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#F0C68A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E3A857" stopOpacity="0" />
                  </radialGradient>

                  {/* Far hills gradient (soft sage) */}
                  <linearGradient id="farHillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8C5B0" />
                    <stop offset="100%" stopColor="#7FA68A" />
                  </linearGradient>

                  {/* Mid hills gradient (calm teal) */}
                  <linearGradient id="midHillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A8B99" />
                    <stop offset="100%" stopColor="#2F6F7E" />
                  </linearGradient>

                  {/* Near hill gradient (deep teal) */}
                  <linearGradient id="nearHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2F6F7E" />
                    <stop offset="100%" stopColor="#23535E" />
                  </linearGradient>

                  {/* Card shadow filter */}
                  <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1F2E33" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* Sky Backing rounded card */}
                <rect width="540" height="460" rx="32" fill="url(#skyGrad)" />

                {/* Breathing concentric aura rings */}
                <circle cx="270" cy="190" r="160" fill="none" stroke="#2F6F7E" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="270" cy="190" r="120" fill="none" stroke="#7FA68A" strokeOpacity="0.12" strokeWidth="2" />
                <circle cx="270" cy="190" r="85" fill="none" stroke="#E3A857" strokeOpacity="0.22" strokeWidth="2.5" />

                {/* Gentle Rising Sun */}
                <circle cx="270" cy="190" r="68" fill="url(#sunGlow)" />
                <circle cx="270" cy="190" r="42" fill="#E3A857" />

                {/* Distant soft birds / mindful breath notes */}
                <path d="M120 120 Q130 112 140 120 Q150 112 160 120" fill="none" stroke="#5D6F74" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M380 95 Q388 88 396 95 Q404 88 412 95" fill="none" stroke="#5D6F74" strokeWidth="1.75" strokeLinecap="round" opacity="0.5" />

                {/* Far Rolling Hills (Sage) */}
                <path
                  d="M0 320 C110 260 210 280 330 330 C430 370 490 320 540 300 L540 460 L0 460 Z"
                  fill="url(#farHillGrad)"
                  opacity="0.85"
                />

                {/* Mid Mountain/Hills (Teal Sage) */}
                <path
                  d="M0 365 C130 320 250 380 380 340 C460 315 500 335 540 350 L540 460 L0 460 Z"
                  fill="url(#midHillGrad)"
                  opacity="0.95"
                />

                {/* Foreground Soft Rolling Slope */}
                <path
                  d="M0 405 C140 375 280 430 540 385 L540 460 L0 460 Z"
                  fill="url(#nearHillGrad)"
                />

                {/* Gentle Mindful Plants / Leaves on Foreground */}
                <g transform="translate(60, 360)">
                  <path d="M0 60 Q10 25 35 15 Q20 40 0 60" fill="#7FA68A" opacity="0.9" />
                  <path d="M0 60 Q-15 30 -5 10 Q5 35 0 60" fill="#E3EEE4" opacity="0.8" />
                  <path d="M0 60 L0 10" stroke="#E3EEE4" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                </g>

                <g transform="translate(460, 345)">
                  <path d="M0 70 Q-15 30 -35 20 Q-18 45 0 70" fill="#A8C5B0" opacity="0.9" />
                  <path d="M0 70 Q15 35 10 15 Q0 40 0 70" fill="#E3EEE4" opacity="0.8" />
                  <path d="M0 70 L-5 15" stroke="#E3EEE4" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                </g>

                {/* Floating "Inhale • Hold • Exhale" badge overlay */}
                <g transform="translate(170, 375)" filter="url(#softShadow)">
                  <rect width="200" height="46" rx="23" fill="#FFFFFF" />
                  <circle cx="28" cy="23" r="10" fill="#DCEBEE" />
                  <circle cx="28" cy="23" r="5" fill="#2F6F7E" />
                  <text x="50" y="28" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#1F2E33">
                    Inhale • Pause • Exhale
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Band: Off-White (#F7F5EF) - Feature Cards with Soft Tints and Circular Icons */}
      <section className="section-band-offwhite section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-kicker">Tailored Support</span>
            <h2 className="section-title">Support Designed Around Your College Day</h2>
            <p className="section-subtitle">
              Whether you have 5 minutes between lectures or need a peaceful evening reset.
            </p>
          </div>

          <div className="features-grid-enhanced">
            {/* Card 1: Audiobooks (Teal Tint) */}
            <div className="feature-card card-teal">
              <div className="feature-icon-wrapper icon-bg-teal">
                <HeadphonesIcon size={26} />
              </div>
              <span className="card-badge badge-teal">Bite-Sized Listens</span>
              <h3 className="feature-card-title">Student Audiobooks</h3>
              <p className="feature-card-text">
                Short, practical listens on conquering exam stress, handling academic burnout, and overcoming imposter syndrome.
              </p>
              <Link to="/audiobooks" className="feature-card-link">
                <span>Browse Audiobooks</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 2: Music & Soundscapes (Sage Tint) */}
            <div className="feature-card card-sage">
              <div className="feature-icon-wrapper icon-bg-sage">
                <MusicIcon size={26} />
              </div>
              <span className="card-badge badge-sage">Calm Frequencies</span>
              <h3 className="feature-card-title">Music & Soundscapes</h3>
              <p className="feature-card-text">
                432Hz anxiety relief, sleep delta frequencies, and non-distracting lo-fi study beats for late-night assignments.
              </p>
              <Link to="/music" className="feature-card-link">
                <span>Explore Soundscapes</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 3: Breathing & Somatic Reset (Sky Tint) */}
            <div className="feature-card card-sky">
              <div className="feature-icon-wrapper icon-bg-sky">
                <WindIcon size={26} />
              </div>
              <span className="card-badge badge-sky">Nervous Reset</span>
              <h3 className="feature-card-title">Breathing & Yoga</h3>
              <p className="feature-card-text">
                Guided 3-minute somatic reset exercises and box breathing techniques to quickly steady your racing pulse.
              </p>
              <Link to="/breathe" className="feature-card-link">
                <span>Take a Breath</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 4: Exam Mode (Warm Amber Tint) */}
            <div className="feature-card card-amber">
              <div className="feature-icon-wrapper icon-bg-amber">
                <SparklesIcon size={26} />
              </div>
              <span className="card-badge badge-amber">Study De-Stress</span>
              <h3 className="feature-card-title">Exam Calm Mode</h3>
              <p className="feature-card-text">
                Dedicated anti-panic hub: pre-exam grounding, focus audio, 20-20-20 resets, and academic stress tools.
              </p>
              <Link to="/exam" className="feature-card-link">
                <span>Enter Exam Mode</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 5: Private Journal (Soft Tint) */}
            <div className="feature-card card-teal">
              <div className="feature-icon-wrapper icon-bg-teal">
                <BookOpenIcon size={26} />
              </div>
              <span className="card-badge badge-teal">Encrypted & Safe</span>
              <h3 className="feature-card-title">Private Journal</h3>
              <p className="feature-card-text">
                Untangle racing thoughts in your private student journal. Only you can read what you write.
              </p>
              <Link to="/journal" className="feature-card-link">
                <span>Open Journal</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Card 6: Confidential Counselling (Warm Amber Accent) */}
            <div className="feature-card card-amber">
              <div className="feature-icon-wrapper icon-bg-amber">
                <HeartIcon size={26} />
              </div>
              <span className="card-badge badge-amber">1-on-1 Guidance</span>
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

      {/* 3. Band: Light Sage (#E3EEE4) - How It Works with Depth and Polish */}
      <section className="section-band-sage section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-kicker">Simple & Safe</span>
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
                Restless before an exam? Can't fall asleep? Pick an audiobook, mood playlist, or schedule a gentle chat.
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

      {/* 4. Band: Pale Sky (#DCEBEE) - Quick Student Sanctuary Spotlight */}
      <section className="section-band-sky section-padding">
        <div className="page-container">
          <div className="sky-spotlight-card">
            <div className="sky-spotlight-text">
              <div className="hero-badge badge-amber">
                <SparklesIcon size={16} />
                <span>Instant De-Stress Toolkit</span>
              </div>
              <h2 className="sky-spotlight-title">Feeling Anxious in the Middle of Campus?</h2>
              <p className="sky-spotlight-desc">
                Pop in your earbuds and try the 5-4-3-2-1 Sensory Grounding tool, or listen to a 3-minute emergency calm audio.
                You do not have to wait for an appointment to feel steady again.
              </p>
              <div className="sky-spotlight-actions">
                <Link to="/breathe?routine=box-breathing" className="btn btn-primary">
                  <WindIcon size={18} />
                  <span>Try 2-Minute Breathing</span>
                </Link>
                <Link to="/help-now" className="btn btn-outline">
                  <ShieldAlertIcon size={18} />
                  <span>View 24x7 Helplines</span>
                </Link>
              </div>
            </div>

            <div className="sky-spotlight-features">
              <div className="spotlight-pill-item">
                <CheckIcon size={18} className="pill-check-icon" />
                <span>Tele-MANAS 14416 (24x7 Free)</span>
              </div>
              <div className="spotlight-pill-item">
                <CheckIcon size={18} className="pill-check-icon" />
                <span>Encrypted Private Journal</span>
              </div>
              <div className="spotlight-pill-item">
                <CheckIcon size={18} className="pill-check-icon" />
                <span>432Hz Anxiety Relief Audio</span>
              </div>
              <div className="spotlight-pill-item">
                <CheckIcon size={18} className="pill-check-icon" />
                <span>Certified Student Counsellors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Band: Deep Teal (#2F6F7E) - Call-to-Action Section with White Text */}
      <section className="section-band-teal section-padding text-center">
        <div className="page-container">
          <div className="teal-cta-content">
            <div className="teal-cta-badge">
              <LeafIcon size={18} />
              <span>TalkItOut Student Care</span>
            </div>
            <h2 className="teal-cta-title">Ready to Take a Gentle Pause Today?</h2>
            <p className="teal-cta-desc">
              Join thousands of college students finding comfort, focus, and mindful guidance.
              100% free, confidential, and made for your peace of mind.
            </p>
            <div className="teal-cta-buttons">
              <Link to="/signup" className="btn btn-accent btn-lg">
                <span>Create Free Account</span>
                <ArrowRightIcon size={18} />
              </Link>
              <Link to="/audiobooks" className="btn btn-outline-white btn-lg">
                <HeadphonesIcon size={18} />
                <span>Listen Without Account</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;