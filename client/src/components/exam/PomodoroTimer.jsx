import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  CheckIcon,
  MusicIcon,
  SparklesIcon,
} from '../common/Icons';

const MODES = {
  focus25: { label: '25m Focus', duration: 25 * 60, type: 'focus', title: 'Deep Study Sprint' },
  focus50: { label: '50m Deep Flow', duration: 50 * 60, type: 'focus', title: 'Extended Flow Session' },
  shortBreak: { label: '5m Short Rest', duration: 5 * 60, type: 'break', title: 'Quick Brain Rest' },
  longBreak: { label: '15m Deep Recharge', duration: 15 * 60, type: 'break', title: 'Full Cycle Recharge' },
};

const TIPS = {
  focus: [
    'One task at a time. Close all unrelated browser tabs and silence your phone.',
    'Focus on understanding the core concept rather than memorizing every word.',
    'If a distracting thought pops up, write it down on a scratchpad and return to studying.',
    'The goal is uninterrupted focus, not perfection. Keep steady momentum.',
  ],
  break: [
    'Step away from all screens! Look out a window or gaze at something 20 feet away.',
    'Stand up, stretch your neck and shoulders, and drink a tall glass of water.',
    'Take 3 slow, deep belly breaths to let your nervous system reset.',
    'Avoid checking social media — give your dopamine receptors a true rest.',
  ],
};

const PomodoroTimer = () => {
  const [activeModeKey, setActiveModeKey] = useState('focus25');
  const [timeLeft, setTimeLeft] = useState(MODES.focus25.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const activeMode = MODES[activeModeKey];
  const timerRef = useRef(null);

  // Play gentle completion chime via Web Audio API (zero external assets needed)
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq, delay, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.01, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + dur);
      };

      // Calming ascending chord: E5, G#5, B5, E6
      playTone(659.25, 0, 0.8);
      playTone(830.61, 0.2, 0.8);
      playTone(987.77, 0.4, 0.9);
      playTone(1318.51, 0.6, 1.2);
    } catch (e) {
      console.warn('Audio chime could not be played:', e);
    }
  };

  // Timer interval engine
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();

            // Increment completed focus sessions
            if (activeMode.type === 'focus') {
              setCompletedSessions((c) => c + 1);
            }

            // Rotate tips
            setTipIndex((i) => (i + 1) % 4);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, activeMode]);

  // Mode change handler
  const handleModeChange = (modeKey) => {
    setIsRunning(false);
    setActiveModeKey(modeKey);
    setTimeLeft(MODES[modeKey].duration);
    setTipIndex((i) => (i + 1) % 4);
  };

  // Toggle start / pause
  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(activeMode.duration);
    }
    setIsRunning((prev) => !prev);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(activeMode.duration);
  };

  // Format time MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Percentage progress for visual circle
  const progressPercent = Math.max(
    0,
    Math.min(100, ((activeMode.duration - timeLeft) / activeMode.duration) * 100)
  );

  return (
    <div className="pomodoro-container">
      {/* Mode Selector Tabs */}
      <div className="pomodoro-modes-bar">
        {Object.entries(MODES).map(([key, config]) => {
          const isSelected = activeModeKey === key;
          return (
            <button
              key={key}
              onClick={() => handleModeChange(key)}
              className={`pomodoro-mode-btn ${isSelected ? 'active' : ''}`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Main Clock Card */}
      <div className="pomodoro-display-card">
        <div className="pomodoro-header-badge">
          <SparklesIcon size={16} />
          <span>{activeMode.title}</span>
        </div>

        {/* Circular Display */}
        <div className={`pomodoro-clock-circle ${isRunning ? 'is-ticking' : ''}`}>
          <div className="pomodoro-time-text">{formattedTime}</div>
          <div className="pomodoro-status-text">
            {isRunning ? (activeMode.type === 'focus' ? 'Focusing...' : 'Resting...') : 'Ready'}
          </div>

          {/* SVG Ring Progress */}
          <svg className="pomodoro-ring-svg" viewBox="0 0 220 220">
            <circle
              className="pomodoro-ring-bg"
              cx="110"
              cy="110"
              r="100"
            />
            <circle
              className="pomodoro-ring-progress"
              cx="110"
              cy="110"
              r="100"
              style={{
                strokeDasharray: 628.3,
                strokeDashoffset: 628.3 - (628.3 * progressPercent) / 100,
              }}
            />
          </svg>
        </div>

        {/* Action Controls */}
        <div className="pomodoro-controls">
          <button
            onClick={toggleTimer}
            className={`btn ${isRunning ? 'btn-accent' : 'btn-primary'} btn-lg pomodoro-main-action`}
          >
            {isRunning ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            <span>{isRunning ? 'Pause Sprint' : 'Start Focus'}</span>
          </button>
          <button onClick={resetTimer} className="btn btn-outline btn-md">
            <span>Reset</span>
          </button>
        </div>

        {/* Cycle Counter & Ambience Link */}
        <div className="pomodoro-meta-row">
          <div className="pomodoro-cycle-indicator">
            <span className="cycle-label">Today's Pomodoros:</span>
            <div className="cycle-dots">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`cycle-dot ${completedSessions >= dot ? 'filled' : ''}`}
                  title={`Sprint ${dot}`}
                />
              ))}
            </div>
            <span className="cycle-count">({completedSessions} completed)</span>
          </div>

          <Link to="/music" className="pomodoro-ambient-link">
            <MusicIcon size={16} />
            <span>Play Lo-Fi or Alpha Waves</span>
          </Link>
        </div>

        {/* Contextual Focus Tip */}
        <div className="pomodoro-tip-box">
          <span className="tip-tag">Study Tip</span>
          <p className="tip-content">
            {TIPS[activeMode.type][tipIndex % TIPS[activeMode.type].length]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
