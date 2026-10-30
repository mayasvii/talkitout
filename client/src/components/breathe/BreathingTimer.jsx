import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import {
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  MusicIcon,
  CloseIcon,
  LeafIcon,
} from '../common/Icons';

/**
 * Format total remaining seconds as MM:SS
 */
const formatMinutesSeconds = (totalSec) => {
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AMBIENT_PRESET = {
  _id: 'ambient-breathe-track',
  title: 'Breath of Serenity (432Hz)',
  description: 'Harmonic acoustic calming frequencies for deep relaxation',
  type: 'music',
  category: 'anxiety',
  audioUrl: '/media/music/breath-of-serenity.mp3',
  coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150',
  duration: '15:00',
};

const BreathingTimer = ({ routine, onClose }) => {
  const { playTrack, pauseTrack, isPlaying } = usePlayer();

  // Session options in minutes
  const [sessionMinutes, setSessionMinutes] = useState(routine.recommendedDurationMinutes || 3);
  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState((routine.recommendedDurationMinutes || 3) * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Phase tracker
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(routine.phases[0].duration);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Background audio toggle
  const [ambientAudio, setAmbientAudio] = useState(false);

  const currentPhase = routine.phases[currentPhaseIndex];

  // Sync ambient sound with toggle and active state
  useEffect(() => {
    if (ambientAudio && isActive && !isCompleted) {
      playTrack(AMBIENT_PRESET);
    } else if (!isActive && ambientAudio) {
      pauseTrack();
    }
  }, [ambientAudio, isActive, isCompleted]);

  // Handle session duration change
  const handleDurationChange = (mins) => {
    setSessionMinutes(mins);
    setTotalSecondsRemaining(mins * 60);
    resetTimer(mins);
  };

  const resetTimer = (mins = sessionMinutes) => {
    setIsActive(false);
    setIsCompleted(false);
    setCurrentPhaseIndex(0);
    setPhaseSecondsLeft(routine.phases[0].duration);
    setCompletedCycles(0);
    setTotalSecondsRemaining(mins * 60);
    if (ambientAudio) {
      pauseTrack();
    }
  };

  // Main timer engine
  useEffect(() => {
    let interval = null;

    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        // 1. Decrement overall session time
        setTotalSecondsRemaining((prevTotal) => {
          if (prevTotal <= 1) {
            setIsCompleted(true);
            setIsActive(false);
            if (ambientAudio) pauseTrack();
            return 0;
          }
          return prevTotal - 1;
        });

        // 2. Decrement current phase countdown
        setPhaseSecondsLeft((prevPhase) => {
          if (prevPhase <= 1) {
            // Move to next phase
            const nextIndex = (currentPhaseIndex + 1) % routine.phases.length;
            if (nextIndex === 0) {
              setCompletedCycles((c) => c + 1);
            }
            setCurrentPhaseIndex(nextIndex);
            return routine.phases[nextIndex].duration;
          }
          return prevPhase - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isCompleted, currentPhaseIndex, routine.phases, ambientAudio]);

  // Determine circle CSS scaling class based on phase action
  const getCircleAnimationClass = () => {
    if (!isActive && !isCompleted) return 'circle-idle';
    switch (currentPhase.action) {
      case 'expand':
        return 'circle-inhale';
      case 'shrink':
        return 'circle-exhale';
      case 'hold-full':
      case 'hold-empty':
      default:
        return 'circle-hold';
    }
  };

  return (
    <div className="breathing-timer-container">
      {/* Top Header Bar */}
      <div className="timer-top-bar">
        <div className="timer-routine-meta">
          <span className="routine-badge">{routine.name}</span>
          <span className="routine-tag">{routine.tag}</span>
        </div>
        <button onClick={onClose} className="btn-close-timer" title="Return to exercises">
          <CloseIcon size={20} />
        </button>
      </div>

      {isCompleted ? (
        /* Completion Screen */
        <div className="timer-completion-screen">
          <div className="completion-icon-wrapper">
            <SparklesIcon size={42} />
          </div>
          <h2 className="completion-title">Well done, take a moment 🌱</h2>
          <p className="completion-text">
            You completed <strong>{completedCycles} full breathing cycles</strong> over{' '}
            <strong>{sessionMinutes} {sessionMinutes === 1 ? 'minute' : 'minutes'}</strong> of mindful presence.
          </p>
          <div className="completion-stats-row">
            <div className="stat-box">
              <span className="stat-number">{completedCycles}</span>
              <span className="stat-label">Cycles Completed</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{sessionMinutes} min</span>
              <span className="stat-label">Mindful Rest</span>
            </div>
          </div>
          <div className="completion-actions">
            <button onClick={() => resetTimer()} className="btn btn-primary btn-lg">
              <span>Breathe Again</span>
            </button>
            <button onClick={onClose} className="btn btn-outline btn-lg">
              <span>Choose Another Exercise</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Timer View */
        <div className="timer-active-content">
          {/* Duration Selector Tabs */}
          <div className="duration-selector-row">
            <span className="duration-label">Session Length:</span>
            <div className="duration-pill-group">
              {[1, 3, 5].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleDurationChange(mins)}
                  disabled={isActive}
                  className={`duration-pill ${sessionMinutes === mins ? 'active' : ''}`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Breathing Circle */}
          <div className="circle-stage">
            {/* Outer Glow Halo */}
            <div className={`circle-halo ${getCircleAnimationClass()}`}></div>

            {/* Main Animated Circle */}
            <div
              className={`breathing-animated-circle ${getCircleAnimationClass()} ${routine.colorScheme}`}
              style={{
                transitionDuration: `${currentPhase.duration}s`,
              }}
            >
              <div className="circle-inner-content">
                <span className="circle-phase-cue">
                  {isActive ? currentPhase.name : 'Ready'}
                </span>
                <span className="circle-seconds-countdown">
                  {isActive ? `${phaseSecondsLeft}s` : `${routine.phases[0].duration}s`}
                </span>
                <span className="circle-instruction-subtext">
                  {isActive ? currentPhase.cue : 'Press Start to begin'}
                </span>
              </div>
            </div>
          </div>

          {/* Cycle & Overall Time Indicator */}
          <div className="timer-info-strip">
            <div className="info-chip">
              <LeafIcon size={16} />
              <span>Cycles completed: <strong>{completedCycles}</strong></span>
            </div>
            <div className="info-chip">
              <span>Time remaining: <strong>{formatMinutesSeconds(totalSecondsRemaining)}</strong></span>
            </div>
          </div>

          {/* Controls: Start/Pause, Reset, Ambient Toggle */}
          <div className="timer-controls-row">
            <button
              onClick={() => setIsActive(!isActive)}
              className="btn btn-primary btn-lg timer-main-cta"
            >
              {isActive ? (
                <>
                  <PauseIcon size={20} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <PlayIcon size={20} />
                  <span>{totalSecondsRemaining < sessionMinutes * 60 ? 'Resume' : 'Start Session'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => resetTimer()}
              className="btn btn-outline"
              title="Reset timer to beginning"
            >
              Reset
            </button>

            {/* Ambient Sound Toggle */}
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className={`btn ${ambientAudio ? 'btn-secondary' : 'btn-outline'} ambient-toggle-btn`}
              title="Toggle calming 432Hz ambient sound"
            >
              <MusicIcon size={18} />
              <span>Ambient Sound: {ambientAudio ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathingTimer;
