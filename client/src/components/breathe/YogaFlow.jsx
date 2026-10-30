import React, { useState, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  CloseIcon,
  ArrowRightIcon,
} from '../common/Icons';

const YogaFlow = ({ routine, onClose }) => {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const currentPose = routine.poses[currentPoseIndex];

  const [secondsRemaining, setSecondsRemaining] = useState(currentPose.targetDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset timer whenever switching poses
  useEffect(() => {
    setSecondsRemaining(currentPose.targetDuration);
    setIsTimerRunning(true);
  }, [currentPoseIndex, currentPose]);

  // Hold timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0 && !isCompleted) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            return 0; // Keep at 0 so student can switch at their own pace
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining, isCompleted]);

  const handleNext = () => {
    if (currentPoseIndex < routine.poses.length - 1) {
      setCurrentPoseIndex((i) => i + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentPoseIndex > 0) {
      setCurrentPoseIndex((i) => i - 1);
    }
  };

  const restartRoutine = () => {
    setCurrentPoseIndex(0);
    setIsCompleted(false);
    setSecondsRemaining(routine.poses[0].targetDuration);
    setIsTimerRunning(true);
  };

  const progressPercentage = Math.round(
    ((currentPoseIndex + 1) / routine.poses.length) * 100
  );

  return (
    <div className="yoga-flow-container">
      {/* Top Header */}
      <div className="yoga-top-bar">
        <div className="yoga-meta">
          <span className="routine-badge">{routine.name}</span>
          <span className="routine-tag">Pose {currentPoseIndex + 1} of {routine.poses.length}</span>
        </div>
        <button onClick={onClose} className="btn-close-timer" title="Return to routine list">
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="yoga-progress-track">
        <div
          className="yoga-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {isCompleted ? (
        /* Completion View */
        <div className="yoga-completion-screen">
          <div className="completion-icon-wrapper" style={{ backgroundColor: 'var(--color-warm-bg)', color: 'var(--color-warm-accent)' }}>
            <SparklesIcon size={42} />
          </div>
          <h2 className="completion-title">Desk Yoga Complete! 🌿</h2>
          <p className="completion-text">
            Your spine, shoulders, and eyes thank you. Taking short physical breaks significantly increases test retention and reduces study fatigue.
          </p>
          <div className="completion-actions">
            <button onClick={restartRoutine} className="btn btn-primary btn-lg">
              <span>Restart Routine</span>
            </button>
            <button onClick={onClose} className="btn btn-outline btn-lg">
              <span>Back to Wellness Tools</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Pose Card */
        <div className="yoga-active-card">
          {/* Pose Header Banner */}
          <div className="pose-visual-row">
            <div className="pose-emoji-badge">
              <span className="pose-emoji-symbol">{currentPose.emoji}</span>
            </div>
            <div className="pose-title-group">
              <span className="pose-step-badge">Step {currentPose.id}</span>
              <h2 className="pose-title">{currentPose.title}</h2>
            </div>
          </div>

          {/* Hold Countdown Clock */}
          <div className="pose-timer-box">
            <div className="pose-countdown-display">
              <span className="pose-countdown-number">{secondsRemaining}s</span>
              <span className="pose-countdown-label">
                {secondsRemaining > 0 ? 'Hold & breathe softly' : 'Pose time complete!'}
              </span>
            </div>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="btn btn-outline btn-sm"
              title={isTimerRunning ? 'Pause hold timer' : 'Resume hold timer'}
            >
              {isTimerRunning ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
              <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
            </button>
          </div>

          {/* Instruction Details */}
          <div className="pose-instruction-box">
            <h4 className="pose-section-subtitle">How to do it:</h4>
            <p className="pose-instruction-text">{currentPose.instruction}</p>

            <div className="pose-benefit-strip">
              <span className="benefit-label">Why it helps:</span>
              <span className="benefit-text">{currentPose.benefit}</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="yoga-navigation-row">
            <button
              onClick={handlePrev}
              disabled={currentPoseIndex === 0}
              className="btn btn-outline"
            >
              Previous Pose
            </button>

            <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              <span>{currentPoseIndex === routine.poses.length - 1 ? 'Finish Routine' : 'Next Pose'}</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaFlow;
