import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BREATHING_ROUTINES,
  DESK_YOGA_ROUTINE,
} from '../data/wellnessRoutines';
import BreathingTimer from '../components/breathe/BreathingTimer';
import YogaFlow from '../components/breathe/YogaFlow';
import {
  WindIcon,
  SparklesIcon,
  ClockIcon,
  ArrowRightIcon,
  HeartIcon,
  LeafIcon,
} from '../components/common/Icons';

const Breathe = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view: 'list' | 'breathing' | 'yoga'
  const [activeMode, setActiveMode] = useState('list');
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // Auto-launch routine if passed in URL (e.g. from "Need to calm down?" button)
  useEffect(() => {
    const routineQuery = searchParams.get('routine');
    if (routineQuery) {
      if (routineQuery === 'yoga') {
        setSelectedRoutine(DESK_YOGA_ROUTINE);
        setActiveMode('yoga');
      } else {
        const match =
          BREATHING_ROUTINES.find((r) => r.id === routineQuery) ||
          BREATHING_ROUTINES.find((r) => r.id.includes(routineQuery)) ||
          BREATHING_ROUTINES[0]; // Fallback to Box Breathing
        if (match) {
          setSelectedRoutine(match);
          setActiveMode('breathing');
        }
      }
    }
  }, [searchParams]);

  const startBreathingRoutine = (routine) => {
    setSelectedRoutine(routine);
    setActiveMode('breathing');
  };

  const startYogaRoutine = () => {
    setSelectedRoutine(DESK_YOGA_ROUTINE);
    setActiveMode('yoga');
  };

  const backToList = () => {
    setActiveMode('list');
    setSelectedRoutine(null);
    // Clear routine search param without page reload
    if (searchParams.get('routine')) {
      setSearchParams({});
    }
  };

  return (
    <div className="breathe-page page-container">
      {/* 1. Log In to Save Progress Hint (if not logged in) */}
      {!isAuthenticated ? (
        <div className="guest-progress-banner">
          <div className="guest-banner-content">
            <SparklesIcon size={18} className="banner-sparkle" />
            <p className="guest-banner-text">
              <strong>Guest mode:</strong> You can practice all exercises freely!{' '}
              <Link to="/login" className="guest-banner-link">
                Log in to your student account
              </Link>{' '}
              to bookmark routines and save your daily mindful minutes.
            </p>
          </div>
        </div>
      ) : (
        <div className="logged-in-wellness-badge">
          <LeafIcon size={16} />
          <span>
            Logged in as <strong>{user?.name?.split(' ')[0]}</strong> • Ready for your mindful reset
          </span>
        </div>
      )}

      {/* 2. Interactive Modes */}
      {activeMode === 'breathing' && selectedRoutine && (
        <BreathingTimer routine={selectedRoutine} onClose={backToList} />
      )}

      {activeMode === 'yoga' && selectedRoutine && (
        <YogaFlow routine={selectedRoutine} onClose={backToList} />
      )}

      {/* 3. Main Exercises List View */}
      {activeMode === 'list' && (
        <>
          <div className="media-page-header">
            <div className="media-page-badge">
              <WindIcon size={18} />
              <span>Somatic Grounding Tools</span>
            </div>
            <h1 className="media-page-title">Breathe, Reset & Move</h1>
            <p className="media-page-subtitle">
              Scientifically proven micro-routines to de-escalate acute anxiety, lower heart rate, and release tech-neck stiffness without leaving your study chair.
            </p>
          </div>

          <div className="exercises-grid">
            {/* Breathing Routine Cards */}
            {BREATHING_ROUTINES.map((routine) => (
              <div key={routine.id} className={`exercise-card card-${routine.colorScheme}`}>
                <div className="exercise-card-header">
                  <div className="exercise-meta-tags">
                    <span className="exercise-badge">{routine.difficulty}</span>
                    <span className="exercise-tag">{routine.tag}</span>
                  </div>
                  <span className="exercise-duration">
                    <ClockIcon size={14} />
                    <span>{routine.duration}</span>
                  </span>
                </div>

                <div className="exercise-body">
                  <h3 className="exercise-title">{routine.name}</h3>
                  <p className="exercise-benefit">{routine.benefit}</p>

                  <div className="exercise-phases-summary">
                    <span className="phases-label">Pattern:</span>
                    <span className="phases-text">
                      {routine.phases.map((p) => `${p.name} (${p.duration}s)`).join(' ➔ ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => startBreathingRoutine(routine)}
                  className="btn btn-primary btn-block exercise-start-btn"
                >
                  <WindIcon size={18} />
                  <span>Start {routine.name}</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            ))}

            {/* 5-Minute Desk Yoga Card */}
            <div className={`exercise-card card-${DESK_YOGA_ROUTINE.colorScheme}`}>
              <div className="exercise-card-header">
                <div className="exercise-meta-tags">
                  <span className="exercise-badge">{DESK_YOGA_ROUTINE.difficulty}</span>
                  <span className="exercise-tag">{DESK_YOGA_ROUTINE.tag}</span>
                </div>
                <span className="exercise-duration">
                  <ClockIcon size={14} />
                  <span>{DESK_YOGA_ROUTINE.duration}</span>
                </span>
              </div>

              <div className="exercise-body">
                <h3 className="exercise-title">{DESK_YOGA_ROUTINE.name}</h3>
                <p className="exercise-benefit">{DESK_YOGA_ROUTINE.benefit}</p>

                <div className="exercise-phases-summary">
                  <span className="phases-label">Includes:</span>
                  <span className="phases-text">
                    7 Guided Poses (Cat-Cow, Neck Release, Eagle Arms, Hip Opener)
                  </span>
                </div>
              </div>

              <button
                onClick={startYogaRoutine}
                className="btn btn-accent btn-block exercise-start-btn"
              >
                <HeartIcon size={18} />
                <span>Begin Desk Yoga Flow</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>

          {/* Quick Scientific Guidance */}
          <section className="mindful-science-box">
            <h4 className="science-title">💡 Why Somatic Breathing Works</h4>
            <div className="science-points-grid">
              <div className="science-item">
                <span className="science-dot"></span>
                <p>
                  <strong>Vagus Nerve Activation:</strong> Prolonged exhales stimulate your parasympathetic nervous system, naturally signalling your adrenal glands to reduce cortisol.
                </p>
              </div>
              <div className="science-item">
                <span className="science-dot"></span>
                <p>
                  <strong>Pre-Exam Grounding:</strong> 2 minutes of box breathing stabilizes blood carbon dioxide levels, eliminating hyperventilation and dizziness.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Breathe;
