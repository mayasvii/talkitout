import React from 'react';
import { Link } from 'react-router-dom';
import {
  WindIcon,
  HeadphonesIcon,
  MusicIcon,
  BookOpenIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
  ShieldAlertIcon,
  LeafIcon,
} from '../components/common/Icons';

const Exam = () => {
  return (
    <div className="exam-page">
      {/* 1. Hero Section with Soft Warm Gradient */}
      <section className="exam-hero-band">
        <div className="page-container">
          <div className="exam-hero-content">
            <div className="hero-badge badge-amber">
              <SparklesIcon size={16} />
              <span>Exam & Academic Pressure Sanctuary</span>
            </div>
            <h1 className="exam-title">
              Exam Mode: Steady Your Mind, <br />
              <span className="hero-highlight">One Breath at a Time.</span>
            </h1>
            <p className="exam-subtitle">
              Midterms, finals, and project deadlines can push your nervous system into overdrive.
              Use these science-backed de-stress tools to eliminate brain fog, quiet pre-exam panic,
              and study with calm clarity.
            </p>
            <div className="exam-hero-actions">
              <Link to="/breathe?routine=box-breathing" className="btn btn-accent btn-lg">
                <WindIcon size={20} />
                <span>Start 60-Sec Pre-Exam Calm</span>
              </Link>
              <Link to="/audiobooks?category=stress" className="btn btn-primary btn-lg">
                <HeadphonesIcon size={20} />
                <span>Exam Stress Audio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Band: Light Sage - 3-Minute Reset Tools */}
      <section className="section-band-sage section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <h2 className="section-title">Emergency Academic Reset</h2>
            <p className="section-subtitle">
              When study overwhelm hits, step away for just 3 minutes. Your brain will thank you.
            </p>
          </div>

          <div className="exam-tools-grid">
            {/* Box Breathing */}
            <div className="feature-card card-teal">
              <div className="feature-icon-wrapper icon-bg-teal">
                <WindIcon size={28} />
              </div>
              <span className="card-badge badge-teal">Panic Buster</span>
              <h3 className="feature-card-title">4-4-4-4 Box Breathing</h3>
              <p className="feature-card-text">
                Used by medical professionals and pilots to immediately lower heart rate and reduce cortisol spikes before exams.
              </p>
              <Link to="/breathe?routine=box-breathing" className="btn btn-primary btn-sm">
                <span>Breathe Now</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* 432Hz Study Frequencies */}
            <div className="feature-card card-sky">
              <div className="feature-icon-wrapper icon-bg-sky">
                <MusicIcon size={28} />
              </div>
              <span className="card-badge badge-sky">Deep Focus</span>
              <h3 className="feature-card-title">Alpha Waves & Lo-Fi Beats</h3>
              <p className="feature-card-text">
                Soothing 432Hz ambient soundscapes and gentle binaural rhythms that block out noisy dorms and quiet exam anxiety.
              </p>
              <Link to="/music" className="btn btn-secondary btn-sm">
                <span>Play Soundscapes</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Pre-Exam Brain Dump */}
            <div className="feature-card card-amber">
              <div className="feature-icon-wrapper icon-bg-amber">
                <BookOpenIcon size={28} />
              </div>
              <span className="card-badge badge-amber">Mind Clearance</span>
              <h3 className="feature-card-title">Private Worry Journal</h3>
              <p className="feature-card-text">
                Studies show writing down specific exam fears for 5 minutes before a test frees up working memory and prevents blanking.
              </p>
              <Link to="/journal" className="btn btn-accent btn-sm">
                <span>Write Thoughts</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Band: Pale Sky - Mindset Reminders */}
      <section className="section-band-sky section-padding">
        <div className="page-container">
          <div className="section-header text-center">
            <h2 className="section-title">Pre-Exam Grounding Checklist</h2>
            <p className="section-subtitle">
              Keep these gentle truths in mind as you walk into the exam hall.
            </p>
          </div>

          <div className="exam-checklist-grid">
            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Your Worth is Not a Letter Grade</h4>
                <p className="checklist-desc">
                  An exam tests memory retrieval on one single morning; it does not measure your intelligence, creativity, or potential.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">The 20-20-20 Eye & Posture Reset</h4>
                <p className="checklist-desc">
                  Every 20 minutes of revision, look 20 feet away for 20 seconds. Unclench your jaw and drop your shoulders away from your ears.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Stay Hydrated & Breathe Deep</h4>
                <p className="checklist-desc">
                  Dehydration worsens mental fatigue by up to 25%. Drink water and take 3 diaphragmatic belly breaths whenever you hit a tricky question.
                </p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="check-icon-circle">
                <CheckIcon size={20} />
              </div>
              <div>
                <h4 className="checklist-heading">Sleep Is When Memory Consolidates</h4>
                <p className="checklist-desc">
                  Pulling an all-nighter impairs cognitive function equivalent to intoxication. 6–7 hours of sleep will boost recall far more than cramming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Band: Deep Teal - Call To Action Sanctuary */}
      <section className="section-band-teal section-padding text-center">
        <div className="page-container">
          <div className="teal-cta-content">
            <div className="teal-cta-badge">
              <HeartIcon size={16} />
              <span>We Are Here For You</span>
            </div>
            <h2 className="teal-cta-title">Facing Severe Academic Distress?</h2>
            <p className="teal-cta-desc">
              If academic stress is making you feel hopeless, remember you do not have to carry it by yourself.
              Talk to a verified student counsellor or call the free 24x7 Tele-MANAS helpline anytime.
            </p>
            <div className="teal-cta-buttons">
              <Link to="/counselling" className="btn btn-accent btn-lg">
                <HeartIcon size={20} />
                <span>Book 1-on-1 Student Chat</span>
              </Link>
              <Link to="/help-now" className="btn btn-outline-white btn-lg">
                <ShieldAlertIcon size={20} />
                <span>24/7 Helpline (14416)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exam;