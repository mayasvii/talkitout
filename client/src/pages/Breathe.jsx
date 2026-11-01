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
  ShieldAlertIcon,
  CloseIcon,
  CheckIcon,
  BookOpenIcon,
  PhoneIcon,
} from '../components/common/Icons';

const GROUNDING_STEPS = [
  {
    stepNum: '0',
    badge: 'Step 0 • Calm Breath',
    title: 'First, take one slow breath: in for 4, out for 6.',
    instruction:
      'Gently follow the circle below. Breathe in through your nose for 4 counts, then let it sigh out through your mouth for 6 counts.',
    isBreath: true,
  },
  {
    stepNum: '5',
    badge: 'Step 1 of 5 • Sight',
    title: 'Name 5 things you can SEE around you.',
    instruction:
      'Look around your room or desk slowly. A shadow, a pen, a pattern on the desk, the light on the wall, or your shoes.',
    hint: 'Say them out loud or in your mind.',
    emoji: '👀',
  },
  {
    stepNum: '4',
    badge: 'Step 2 of 5 • Touch',
    title: 'Notice 4 things you can TOUCH or feel.',
    instruction:
      'Notice your feet resting on the floor, the fabric of your clothes, the smooth surface of your desk, or the chair supporting you.',
    hint: 'Physical contact brings your nervous system into the room.',
    emoji: '✋',
  },
  {
    stepNum: '3',
    badge: 'Step 3 of 5 • Sound',
    title: 'Listen for 3 things you can HEAR.',
    instruction:
      'Listen closely for quiet ambient sounds: the hum of an air conditioner or laptop fan, distant traffic, or the gentle sound of your own breath.',
    hint: 'Tune into whatever is audible right now.',
    emoji: '👂',
  },
  {
    stepNum: '2',
    badge: 'Step 4 of 5 • Smell',
    title: 'Find 2 things you can SMELL (or think of 2 smells you like).',
    instruction:
      'Notice any subtle aroma in the air around you, or gently recall two scents that make you feel peaceful—like fresh rain, brewed coffee, or clean laundry.',
    hint: 'Scents connect directly to calming brain pathways.',
    emoji: '👃',
  },
  {
    stepNum: '1',
    badge: 'Step 5 of 5 • Taste',
    title: 'Name 1 thing you can TASTE (or think of a taste you like).',
    instruction:
      'Take a sip of water, notice any taste in your mouth, or bring to mind a comforting taste—like cold fresh water, mint, or a warm slice of bread.',
    hint: 'Anchor your senses into this safe present moment.',
    emoji: '👅',
  },
  {
    stepNum: 'Done',
    badge: 'Completed • Mind Anchored',
    title: 'Well done. Take another slow breath. Notice how you feel now.',
    instruction:
      'You just gave your nervous system a chance to decelerate. Intense panic is a temporary wave; you are right here, and you are safe.',
    isFinal: true,
  },
];

const Breathe = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active view: 'list' | 'breathing' | 'yoga'
  const [activeMode, setActiveMode] = useState('list');
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // Grounding interactive wizard state
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);

  // Auto-launch routine or grounding if passed in URL
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

    if (searchParams.get('grounding') === 'true' || window.location.hash === '#panic-grounding') {
      setGroundingOpen(true);
      setTimeout(() => {
        const el = document.getElementById('panic-grounding');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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
    if (searchParams.get('routine')) {
      setSearchParams({});
    }
  };

  const currentStepData = GROUNDING_STEPS[groundingStep];

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

      {/* Mobile Quick-Jump Panic Pill (Visible on small screens) */}
      <div className="mobile-panic-shortcut-bar">
        <button
          onClick={() => {
            setGroundingOpen(true);
            setGroundingStep(0);
            const el = document.getElementById('panic-grounding');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="breathe-mobile-panic-pill"
          aria-label="Quick jump to 5-4-3-2-1 panic grounding"
        >
          <ShieldAlertIcon size={16} />
          <span>Panic or anxiety attack? Ground yourself (5-4-3-2-1)</span>
        </button>
      </div>

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
          {/* Prominent Section: Panic or anxiety attack? Ground yourself */}
          <section id="panic-grounding" className="panic-grounding-section">
            {!groundingOpen ? (
              /* State A: Initial Card */
              <div className="panic-trigger-card">
                <div className="panic-trigger-left">
                  <div className="panic-badge">
                    <SparklesIcon size={16} />
                    <span>Panic or anxiety attack? Ground yourself</span>
                  </div>
                  <h2 className="panic-trigger-title">
                    Feeling overwhelmed or having a panic attack?
                  </h2>
                  <p className="panic-trigger-sub">
                    You're safe. This will pass. Take it one step at a time.
                  </p>
                </div>
                <div className="panic-trigger-right">
                  <button
                    onClick={() => {
                      setGroundingOpen(true);
                      setGroundingStep(0);
                    }}
                    className="btn btn-accent btn-lg panic-start-btn"
                  >
                    <WindIcon size={18} />
                    <span>Start grounding (5-4-3-2-1)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* State B: Interactive Step-by-Step Flow */
              <div className="grounding-flow-card">
                {/* Flow Top Bar: Progress & Exit */}
                <div className="flow-header">
                  <div className="flow-progress-meta">
                    <span className="flow-step-tag">{currentStepData.badge}</span>
                    <span className="flow-step-counter">
                      Step {groundingStep + 1} of {GROUNDING_STEPS.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setGroundingOpen(false)}
                    className="btn btn-ghost btn-sm flow-close-btn"
                    title="Close grounding flow"
                    aria-label="Close grounding flow"
                  >
                    <CloseIcon size={18} />
                    <span>Close</span>
                  </button>
                </div>

                {/* Progress Bar Indicator */}
                <div className="flow-progress-track">
                  <div
                    className="flow-progress-fill"
                    style={{
                      width: `${((groundingStep + 1) / GROUNDING_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Step Content Card */}
                <div className="flow-step-body">
                  {currentStepData.isBreath ? (
                    /* Step 0: Breathing circle animation */
                    <div className="flow-breath-container">
                      <div className="grounding-breath-circle-wrapper">
                        <div className="grounding-breath-circle">
                          <span className="breath-instruction-text">Breathe</span>
                        </div>
                      </div>
                      <div className="breath-timing-guide">
                        <span>Inhale (4s) • Exhale slowly (6s)</span>
                      </div>
                      <h3 className="flow-step-title">{currentStepData.title}</h3>
                      <p className="flow-step-desc">{currentStepData.instruction}</p>
                    </div>
                  ) : currentStepData.isFinal ? (
                    /* Final Completion Step */
                    <div className="flow-final-container">
                      <div className="flow-final-icon-wrapper">
                        <CheckIcon size={32} />
                      </div>
                      <h3 className="flow-step-title">{currentStepData.title}</h3>
                      <p className="flow-step-desc">{currentStepData.instruction}</p>
                      <div className="flow-final-actions">
                        <button
                          onClick={() => {
                            setGroundingOpen(false);
                            startBreathingRoutine(BREATHING_ROUTINES[0]);
                          }}
                          className="btn btn-primary btn-lg"
                        >
                          <WindIcon size={18} />
                          <span>Do the breathing exercise</span>
                        </button>
                        <Link to="/journal" className="btn btn-secondary btn-lg">
                          <BookOpenIcon size={18} />
                          <span>Write in my journal</span>
                        </Link>
                        <Link to="/help-now" className="btn btn-accent btn-lg">
                          <ShieldAlertIcon size={18} />
                          <span>I still need help</span>
                        </Link>
                      </div>
                      <button
                        onClick={() => setGroundingStep(0)}
                        className="btn btn-ghost btn-sm flow-restart-btn"
                      >
                        Repeat grounding from Step 0
                      </button>
                    </div>
                  ) : (
                    /* Steps 5, 4, 3, 2, 1 */
                    <div className="flow-sensory-container">
                      <div className="sensory-icon-bubble">
                        <span className="sensory-emoji">{currentStepData.emoji}</span>
                        <span className="sensory-step-digit">{currentStepData.stepNum}</span>
                      </div>
                      <h3 className="flow-step-title">{currentStepData.title}</h3>
                      <p className="flow-step-desc">{currentStepData.instruction}</p>
                      {currentStepData.hint && (
                        <div className="flow-step-hint">
                          <SparklesIcon size={16} />
                          <span>{currentStepData.hint}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Flow Navigation Controls */}
                {!currentStepData.isFinal && (
                  <div className="flow-nav-footer">
                    <button
                      onClick={() => setGroundingStep((prev) => Math.max(0, prev - 1))}
                      disabled={groundingStep === 0}
                      className="btn btn-outline flow-nav-btn"
                    >
                      <span>Back</span>
                    </button>
                    <div className="flow-dots-group">
                      {GROUNDING_STEPS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGroundingStep(idx)}
                          className={`flow-dot ${idx === groundingStep ? 'active' : ''}`}
                          aria-label={`Jump to step ${idx}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setGroundingStep((prev) => Math.min(GROUNDING_STEPS.length - 1, prev + 1))
                      }
                      className="btn btn-accent flow-nav-btn"
                    >
                      <span>Next</span>
                      <ArrowRightIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Under the Flow: "While it's happening" tips */}
            <div className="panic-tips-container">
              <h3 className="panic-tips-heading">While it's happening</h3>
              <ul className="panic-tips-list">
                <li className="panic-tip-item">
                  <span className="tip-bullet">•</span>
                  <span>
                    Remind yourself: <strong>"This is a panic attack. It will pass."</strong>
                  </span>
                </li>
                <li className="panic-tip-item">
                  <span className="tip-bullet">•</span>
                  <span>Breathe slowly, a longer breath out than in.</span>
                </li>
                <li className="panic-tip-item">
                  <span className="tip-bullet">•</span>
                  <span>Sit down somewhere safe, and loosen tight clothing.</span>
                </li>
                <li className="panic-tip-item">
                  <span className="tip-bullet">•</span>
                  <span>Reach out to someone you trust.</span>
                </li>
              </ul>
            </div>

            {/* 4. Safety Note at the Bottom */}
            <div className="panic-medical-note">
              <ShieldAlertIcon size={18} className="note-alert-icon" />
              <p>
                This is a self-help technique, not medical treatment. If you have chest pain,
                trouble breathing that doesn't ease, or feel unsafe, call{' '}
                <a href="tel:112" className="medical-phone-link">
                  112
                </a>{' '}
                or Tele-MANAS{' '}
                <a href="tel:14416" className="medical-phone-link">
                  14416
                </a>{' '}
                right away.
              </p>
            </div>
          </section>

          {/* Section Divider */}
          <div className="media-page-header">
            <div className="media-page-badge">
              <WindIcon size={18} />
              <span>Somatic Grounding Tools</span>
            </div>
            <h1 className="media-page-title">Breathe, Reset & Move</h1>
            <p className="media-page-subtitle">
              Micro-routines to steady your nervous system, release muscle tightness, and quiet
              study stress.
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
                <span>Start {DESK_YOGA_ROUTINE.name}</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Breathe;