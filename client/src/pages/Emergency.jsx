import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  ShieldAlertIcon,
  HeartIcon,
  WindIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '../components/common/Icons';

const HELPLINES = [
  {
    name: 'Tele-MANAS (Govt. of India)',
    number: '14416',
    altNumber: '1800-891-4416',
    tel: '14416',
    hours: '24x7 • Always Open',
    cost: '100% Free & Confidential',
    languages: 'Available in 20+ Indian regional languages and English',
    description:
      'National Tele Mental Health Programme of India launched by the Ministry of Health and Family Welfare. Connects you directly with certified mental health professionals.',
    badge: 'National Helpline',
    color: 'teal',
  },
  {
    name: 'KIRAN Helpline',
    number: '1800-599-0019',
    tel: '18005990019',
    hours: '24x7 • Toll-Free',
    cost: '100% Free',
    languages: 'Hindi, English, and 11 Regional Languages',
    description:
      'Supported by the Ministry of Social Justice and Empowerment. Provides early screening, first-aid, psychological support, distress management, and mental wellbeing guidance.',
    badge: 'Govt. Toll-Free',
    color: 'lavender',
  },
  {
    name: 'Vandrevala Foundation',
    number: '+91 9999 666 555',
    tel: '+919999666555',
    hours: '24x7 • Always Open',
    cost: 'Free Support',
    languages: 'English, Hindi, and Major Regional Languages',
    description:
      'One of India’s most trusted crisis helplines. Experienced clinical counsellors offering compassionate, immediate intervention for anxiety, depression, exam distress, and suicidal thoughts.',
    badge: 'Crisis Support',
    color: 'mint',
  },
  {
    name: 'NIMHANS Helpline',
    number: '080-46110007',
    tel: '08046110007',
    hours: '24x7 • Round the Clock',
    cost: 'Free Psychosocial Care',
    languages: 'Multiple Languages',
    description:
      'National Institute of Mental Health and Neuro-Sciences. Offers expert clinical psychosocial support and crisis guidance backed by India’s premier mental health institution.',
    badge: 'Clinical Institution',
    color: 'warm',
  },
  {
    name: 'AASRA Helpline',
    number: '+91 98204 66726',
    tel: '+919820466726',
    hours: '24x7 • Suicide Prevention',
    cost: 'Confidential Care',
    languages: 'English & Hindi',
    description:
      'Non-profit providing a non-judgmental, accepting environment for anyone in emotional pain, loneliness, or crisis who needs someone warm and attentive to speak with.',
    badge: 'Suicide Prevention',
    color: 'lavender',
  },
  {
    name: 'Sneha India',
    number: '044-24640050',
    tel: '04424640050',
    hours: '24x7 • Suicide Prevention',
    cost: 'Free & Anonymous',
    languages: 'English & Tamil',
    description:
      'Dedicated suicide prevention helpline providing unconditional emotional support and compassionate listening for students and young adults facing acute distress.',
    badge: 'Crisis Care',
    color: 'teal',
  },
];

const Emergency = () => {
  return (
    <div className="emergency-page page-container">
      {/* 1. Warm, Reassuring Banner */}
      <div className="emergency-hero-card">
        <div className="emergency-badge">
          <ShieldAlertIcon size={18} />
          <span>Immediate Emotional & Crisis Support</span>
        </div>
        <h1 className="emergency-title">You are not alone. Help is right here.</h1>
        <p className="emergency-intro">
          If you are feeling overwhelmed, having thoughts of giving up, or simply carrying more weight
          than you can bear alone, please reach out. There is <strong>no shame</strong> in feeling this way.
          Every call is <strong>free, anonymous, and 100% confidential</strong>.
        </p>
        <div className="emergency-quick-actions">
          <a href="tel:14416" className="btn btn-accent btn-lg emergency-call-btn">
            <PhoneIcon size={20} />
            <span>Call Tele-MANAS: 14416 (Free 24x7)</span>
          </a>
          <Link to="/breathe?routine=box-breathing" className="btn btn-secondary btn-lg emergency-breathe-btn">
            <WindIcon size={20} />
            <span>Need to Calm Down Right Now?</span>
          </Link>
        </div>
      </div>

      {/* 2. Direct Indian Crisis Helplines Grid */}
      <section className="emergency-section">
        <div className="section-title-row">
          <h2 className="dashboard-section-title">Verified 24/7 Helplines in India</h2>
          <span className="badge-pill">Free & Confidential</span>
        </div>

        <div className="helpline-cards-grid">
          {HELPLINES.map((helpline, idx) => (
            <div key={idx} className={`helpline-card card-${helpline.color}`}>
              <div className="helpline-card-header">
                <span className="helpline-badge">{helpline.badge}</span>
                <span className="helpline-hours">
                  <ClockIcon size={14} />
                  <span>{helpline.hours}</span>
                </span>
              </div>

              <h3 className="helpline-name">{helpline.name}</h3>
              <p className="helpline-desc">{helpline.description}</p>

              <div className="helpline-meta">
                <div className="helpline-meta-row">
                  <span className="meta-label">Cost:</span>
                  <span className="meta-val">{helpline.cost}</span>
                </div>
                <div className="helpline-meta-row">
                  <span className="meta-label">Languages:</span>
                  <span className="meta-val">{helpline.languages}</span>
                </div>
              </div>

              <div className="helpline-action-area">
                <a href={`tel:${helpline.tel}`} className="btn btn-primary btn-block helpline-dial-btn">
                  <PhoneIcon size={18} />
                  <span>Call {helpline.number}</span>
                </a>
                {helpline.altNumber && (
                  <a href={`tel:${helpline.altNumber.replace(/-/g, '')}`} className="helpline-alt-link">
                    Alt: {helpline.altNumber}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. In the Moment: 5-4-3-2-1 Sensory Grounding Tool */}
      <section className="emergency-section">
        <div className="grounding-guide-card">
          <div className="grounding-header">
            <SparklesIcon size={22} className="grounding-sparkle" />
            <div>
              <h3 className="grounding-title">Ground Yourself in 60 Seconds (The 5-4-3-2-1 Technique)</h3>
              <p className="grounding-sub">
                If your chest feels tight or your mind is spinning with panic, look around your room right now:
              </p>
            </div>
          </div>

          <div className="grounding-steps-grid">
            <div className="grounding-step-box">
              <span className="step-num">5</span>
              <span className="step-text">Things you can <strong>see</strong></span>
            </div>
            <div className="grounding-step-box">
              <span className="step-num">4</span>
              <span className="step-text">Things you can <strong>touch</strong></span>
            </div>
            <div className="grounding-step-box">
              <span className="step-num">3</span>
              <span className="step-text">Things you can <strong>hear</strong></span>
            </div>
            <div className="grounding-step-box">
              <span className="step-num">2</span>
              <span className="step-text">Things you can <strong>smell</strong></span>
            </div>
            <div className="grounding-step-box">
              <span className="step-num">1</span>
              <span className="step-text">Thing you are <strong>grateful for</strong></span>
            </div>
          </div>

          <div className="grounding-footer">
            <p>Then take a deep, slow breath out through your mouth like you are cooling hot soup.</p>
            <Link to="/breathe?routine=box-breathing" className="btn btn-outline btn-sm">
              <WindIcon size={16} />
              <span>Open Guided Box Breathing</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Emergency;
