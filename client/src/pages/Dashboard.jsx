import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  HeadphonesIcon,
  MusicIcon,
  WindIcon,
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserIcon,
  AlertIcon,
  BookOpenIcon,
  ShieldAlertIcon,
  SmileIcon,
  CheckIcon,
  LockIcon,
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MOOD_OPTIONS = [
  { level: 5, emoji: '😄', label: 'Great', color: '#2F6F7E', bg: '#DCEBEE' },
  { level: 4, emoji: '🙂', label: 'Good', color: '#4A8B99', bg: '#E6F1F3' },
  { level: 3, emoji: '😐', label: 'Okay', color: '#7FA68A', bg: '#E3EEE4' },
  { level: 2, emoji: '😔', label: 'Down', color: '#D99B4B', bg: '#FDF4E7' },
  { level: 1, emoji: '😣', label: 'Overwhelmed', color: '#E3A857', bg: '#FDF6EB' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Friend';

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState('');

  // Mood state
  const [moodHistory, setMoodHistory] = useState([]);
  const [todayMood, setTodayMood] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [savingMood, setSavingMood] = useState(false);
  const [moodMessage, setMoodMessage] = useState('');

  // Fetch student appointments
  useEffect(() => {
    const fetchMyBookings = async () => {
      setLoadingBookings(true);
      try {
        const res = await api.get('/bookings/my');
        if (res && res.data) {
          setBookings(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch student bookings:', err);
        setBookingsError('Could not load your appointments. Please verify that the server is active.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchMyBookings();
  }, []);

  // Fetch mood history
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await api.get('/moods/my');
        if (res && res.data) {
          setMoodHistory(res.data);

          // Check if user already checked in today
          const today = new Date();
          const todayEntry = res.data.find((m) => {
            const mDate = new Date(m.createdAt);
            return (
              mDate.getFullYear() === today.getFullYear() &&
              mDate.getMonth() === today.getMonth() &&
              mDate.getDate() === today.getDate()
            );
          });

          if (todayEntry) {
            setTodayMood(todayEntry);
            setSelectedMood(todayEntry.moodLevel);
            if (todayEntry.note) setMoodNote(todayEntry.note);
            setFriendlyMessage(todayEntry.moodLevel);
          }
        }
      } catch (err) {
        console.warn('Could not fetch mood history:', err);
      }
    };

    fetchMoods();
  }, []);

  // Set reassuring feedback text based on mood level
  const setFriendlyMessage = (level) => {
    if (level <= 2) {
      setMoodMessage(
        "We hear you. It's completely okay to feel low or overwhelmed today. Please be gentle with yourself — your wellbeing always comes before coursework."
      );
    } else if (level === 3) {
      setMoodMessage(
        "Thank you for checking in. An ordinary, balanced day is a wonderful foundation to take things one step at a time."
      );
    } else {
      setMoodMessage(
        "Glad to see you in good spirits today! Soak in this positive clarity and keep nurturing your momentum."
      );
    }
  };

  // Submit or update mood
  const handleSaveMood = async (levelToSave, noteToSave) => {
    const level = levelToSave !== undefined ? levelToSave : selectedMood;
    if (!level) {
      showToast('Please select how you are feeling today.', 'info');
      return;
    }

    setSavingMood(true);
    try {
      const res = await api.post('/moods', {
        moodLevel: level,
        note: noteToSave !== undefined ? noteToSave : moodNote,
      });

      if (res && res.data) {
        setTodayMood(res.data);
        setSelectedMood(res.data.moodLevel);
        setFriendlyMessage(res.data.moodLevel);

        // Update mood history list
        setMoodHistory((prev) => {
          const filtered = prev.filter((m) => {
            const mDate = new Date(m.createdAt);
            const now = new Date();
            return !(
              mDate.getFullYear() === now.getFullYear() &&
              mDate.getMonth() === now.getMonth() &&
              mDate.getDate() === now.getDate()
            );
          });
          return [...filtered, res.data];
        });

        showToast("Today's mood check-in saved 🌱", 'success');
      }
    } catch (err) {
      console.error('Error saving mood:', err);
      showToast(err.response?.data?.message || 'Could not record mood.', 'error');
    } finally {
      setSavingMood(false);
    }
  };

  // Handle immediate click on an emoji
  const onEmojiSelect = (level) => {
    setSelectedMood(level);
    handleSaveMood(level, moodNote);
  };

  // Generate last 7 days data for the insights bar chart
  const getLast7DaysData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateLabel = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

      const entry = moodHistory.find((m) => {
        const mDate = new Date(m.createdAt);
        return (
          mDate.getFullYear() === d.getFullYear() &&
          mDate.getMonth() === d.getMonth() &&
          mDate.getDate() === d.getDate()
        );
      });

      days.push({
        dateObj: d,
        dayName,
        dateLabel,
        isToday: i === 0,
        entry,
        level: entry ? entry.moodLevel : 0,
      });
    }
    return days;
  };

  const last7Days = getLast7DaysData();
  const activeMoodLevel = todayMood?.moodLevel || selectedMood;

  return (
    <div className="dashboard-page page-container">
      {/* 1. Header & Greeting */}
      <div className="dashboard-greeting-card">
        <div className="greeting-text-group">
          <div className="greeting-badge">
            <SparklesIcon size={16} />
            <span>Student Wellness Sanctuary</span>
          </div>
          <h1 className="greeting-title">
            Welcome back, {firstName} 🌱
          </h1>
          <p className="greeting-subtitle">
            How is your head space today? You don't have to carry your studies and stress alone. Take a moment to reset.
          </p>
        </div>

        <div className="student-profile-chip">
          <div className="chip-avatar">
            <UserIcon size={20} />
          </div>
          <div className="chip-details">
            <span className="chip-name">{user?.name}</span>
            <span className="chip-role">Account: {user?.role || 'Student'}</span>
            <span className="chip-email">{user?.email}</span>
          </div>
        </div>
      </div>

      {/* 2. Mood Tracker: "How are you feeling today?" */}
      <section className="dashboard-section" id="mood-tracker">
        <div className="mood-tracker-card">
          <div className="mood-card-header">
            <div className="mood-badge">
              <SmileIcon size={18} />
              <span>Daily Emotional Check-in</span>
            </div>
            {todayMood && (
              <span className="mood-status-pill">
                <CheckIcon size={14} />
                <span>Checked in today</span>
              </span>
            )}
          </div>

          <h2 className="mood-title">How are you feeling today?</h2>
          <p className="mood-subtitle">
            Taking 10 seconds to acknowledge your emotional state lowers autonomic nervous system reactivity.
          </p>

          {/* 5 Emoji Selector */}
          <div className="mood-emojis-row">
            {MOOD_OPTIONS.map((opt) => {
              const isSelected = selectedMood === opt.level;
              return (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => onEmojiSelect(opt.level)}
                  className={`mood-emoji-btn ${isSelected ? 'selected' : ''}`}
                  disabled={savingMood}
                  title={`${opt.label} (${opt.level}/5)`}
                  style={{
                    borderColor: isSelected ? opt.color : undefined,
                    backgroundColor: isSelected ? opt.bg : undefined,
                  }}
                >
                  <span className="mood-emoji-char">{opt.emoji}</span>
                  <span className="mood-emoji-label">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Optional reflection note */}
          <div className="mood-note-group">
            <input
              type="text"
              className="form-input mood-note-input"
              placeholder="Add a quick note: What's on your mind? (e.g. Midterm exam tomorrow, feeling rested...)"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              maxLength={300}
            />
            <button
              type="button"
              onClick={() => handleSaveMood(selectedMood, moodNote)}
              className="btn btn-outline btn-sm mood-save-note-btn"
              disabled={savingMood || !selectedMood}
            >
              {savingMood ? 'Saving...' : 'Save Note'}
            </button>
          </div>

          {/* Friendly Reassurance Message */}
          {moodMessage && (
            <div className="mood-friendly-box">
              <SparklesIcon size={18} className="friendly-sparkle" />
              <p className="friendly-text">{moodMessage}</p>
            </div>
          )}

          {/* Mood Insights: 7-Day Bar Chart */}
          <div className="mood-insights-block">
            <div className="insights-header">
              <h3 className="insights-title">Last 7 Days Mood Insights</h3>
              <span className="insights-caption">Consistency over perfection</span>
            </div>

            <div className="insights-chart-container">
              <div className="insights-bars-row">
                {last7Days.map((day, idx) => {
                  const hasEntry = day.level > 0;
                  const opt = MOOD_OPTIONS.find((o) => o.level === day.level);
                  const barHeightPct = hasEntry ? Math.max((day.level / 5) * 100, 20) : 12;

                  return (
                    <div key={idx} className="chart-col">
                      <div className="chart-bar-slot">
                        {hasEntry && (
                          <span className="chart-emoji-tag">{opt?.emoji}</span>
                        )}
                        <div
                          className={`chart-bar ${hasEntry ? 'active' : 'empty'} ${day.isToday ? 'is-today' : ''}`}
                          style={{
                            height: `${barHeightPct}%`,
                            backgroundColor: hasEntry ? opt?.color : 'var(--color-border-subtle)',
                          }}
                          title={
                            hasEntry
                              ? `${day.dayName}: ${opt?.label} (${day.level}/5)`
                              : `${day.dayName}: No entry`
                          }
                        />
                      </div>
                      <span className={`chart-day-label ${day.isToday ? 'today-text' : ''}`}>
                        {day.isToday ? 'Today' : day.dayName}
                      </span>
                      <span className="chart-date-label">{day.dateLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Simple Recommendations (Tailored to student's mood, no AI) */}
      {activeMoodLevel && (
        <section className="dashboard-section recommendations-section">
          <div className="section-title-row">
            <div>
              <h2 className="dashboard-section-title">
                Personalized For Your Mindspace Today
              </h2>
              <p className="section-subtext">
                Carefully selected micro-tools based on your <strong>{MOOD_OPTIONS.find(o => o.level === activeMoodLevel)?.label}</strong> check-in.
              </p>
            </div>
          </div>

          <div className="recommendations-grid">
            {/* Low Mood (1 or 2): Grounding, Calming, Reaching Out */}
            {activeMoodLevel <= 2 && (
              <>
                <Link to="/breathe?routine=box-breathing" className="rec-card card-mint">
                  <div className="rec-icon-wrapper">
                    <WindIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Recommended First</span>
                    <h3 className="rec-title">3-Minute Box Breathing</h3>
                    <p className="rec-desc">
                      Follow our gentle visual breathing circle to lower your heart rate and release acute panic.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Start Breathing</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/music" className="rec-card card-lavender">
                  <div className="rec-icon-wrapper">
                    <MusicIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Sound Therapy</span>
                    <h3 className="rec-title">Panic De-Escalation & Calm Music</h3>
                    <p className="rec-desc">
                      Soothing ambient frequencies and rain piano to comfort a racing mind.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Listen Now</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/counselling" className="rec-card card-warm">
                  <div className="rec-icon-wrapper">
                    <HeartIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Confidential Support</span>
                    <h3 className="rec-title">Talk to a Verified Counsellor</h3>
                    <p className="rec-desc">
                      Book a private 1-on-1 chat or campus appointment. You don't have to carry this alone.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>View Slots</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>
              </>
            )}

            {/* Medium Mood (3): Focus, Re-centering, Rest */}
            {activeMoodLevel === 3 && (
              <>
                <Link to="/music" className="rec-card card-lavender">
                  <div className="rec-icon-wrapper">
                    <MusicIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Study Companion</span>
                    <h3 className="rec-title">Lo-Fi Study Beats & Focus Music</h3>
                    <p className="rec-desc">
                      Gentle rhythms to help you ease into assignments without sensory overload.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Tune In</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/breathe?routine=yoga" className="rec-card card-mint">
                  <div className="rec-icon-wrapper">
                    <WindIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Physical Reset</span>
                    <h3 className="rec-title">5-Minute Chair Yoga Flow</h3>
                    <p className="rec-desc">
                      Release tight shoulders, neck stiffness, and lower-back fatigue from study posture.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Start Stretches</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/audiobooks" className="rec-card card-teal">
                  <div className="rec-icon-wrapper">
                    <HeadphonesIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Mental Clarity</span>
                    <h3 className="rec-title">Quiet the Mind Audiobook</h3>
                    <p className="rec-desc">
                      12 minutes on how to manage academic worry and avoid evening mental exhaustion.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Listen</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>
              </>
            )}

            {/* High Mood (4 or 5): Momentum, Motivation, Gratitude */}
            {activeMoodLevel >= 4 && (
              <>
                <Link to="/audiobooks" className="rec-card card-teal">
                  <div className="rec-icon-wrapper">
                    <HeadphonesIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Growth Mindset</span>
                    <h3 className="rec-title">Overcome Procrastination Audiobook</h3>
                    <p className="rec-desc">
                      Ride your positive momentum today to conquer your toughest study goal.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Listen</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/journal" className="rec-card card-lavender">
                  <div className="rec-icon-wrapper">
                    <BookOpenIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Private Journal</span>
                    <h3 className="rec-title">Record What Went Well Today</h3>
                    <p className="rec-desc">
                      Anchor this uplifting feeling into your private journal so you can revisit it anytime.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Write Thoughts</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <Link to="/music" className="rec-card card-mint">
                  <div className="rec-icon-wrapper">
                    <MusicIcon size={24} />
                  </div>
                  <div className="rec-body">
                    <span className="rec-tag">Creative Flow</span>
                    <h3 className="rec-title">Alpha Waves Focus Frequencies</h3>
                    <p className="rec-desc">
                      Harness your steady headspace for productive creative sessions and deep learning.
                    </p>
                  </div>
                  <span className="rec-action">
                    <span>Listen</span>
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>
              </>
            )}
          </div>
        </section>
      )}

      {/* 4. Quick Access Cards (Includes Journal & Emergency Support) */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">All Student Wellness Tools</h2>
        <div className="dashboard-tools-grid">
          <Link to="/journal" className="tool-card card-lavender">
            <div className="tool-icon-wrapper">
              <BookOpenIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Private Journal</h3>
              <p className="tool-desc">
                Confidential space to reflect, untangle racing thoughts, and track your wins.
              </p>
            </div>
            <span className="tool-action">
              <span>Write</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>

          <Link to="/emergency" className="tool-card card-warm">
            <div className="tool-icon-wrapper">
              <ShieldAlertIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Emergency Support</h3>
              <p className="tool-desc">
                Free 24x7 Tele-MANAS 14416 & verified crisis helplines across India.
              </p>
            </div>
            <span className="tool-action">
              <span>Get Help</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>

          <Link to="/audiobooks" className="tool-card card-teal">
            <div className="tool-icon-wrapper">
              <HeadphonesIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Student Audiobooks</h3>
              <p className="tool-desc">
                Overcome exam panic, study procrastination, and imposter syndrome.
              </p>
            </div>
            <span className="tool-action">
              <span>Listen</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>

          <Link to="/music" className="tool-card card-mint">
            <div className="tool-icon-wrapper">
              <MusicIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Calm & Focus Music</h3>
              <p className="tool-desc">
                Sleep soundscapes, 432Hz calming frequencies, and lo-fi study beats.
              </p>
            </div>
            <span className="tool-action">
              <span>Tune In</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>

          <Link to="/breathe" className="tool-card card-teal">
            <div className="tool-icon-wrapper">
              <WindIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Breathe & Desk Yoga</h3>
              <p className="tool-desc">
                Interactive box breathing timers and 5-minute chair yoga stretches.
              </p>
            </div>
            <span className="tool-action">
              <span>Breathe</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>

          <Link to="/counselling" className="tool-card card-warm">
            <div className="tool-icon-wrapper">
              <HeartIcon size={26} />
            </div>
            <div className="tool-content">
              <h3 className="tool-title">Book a Session</h3>
              <p className="tool-desc">
                1-on-1 confidential chat or in-person sessions with certified counsellors.
              </p>
            </div>
            <span className="tool-action">
              <span>Find Slots</span>
              <ArrowRightIcon size={16} />
            </span>
          </Link>
        </div>
      </section>

      {/* 5. My Bookings Section (Connected to live API) */}
      <section className="dashboard-section">
        <div className="section-title-row">
          <h2 className="dashboard-section-title">My Counselling Sessions</h2>
          <span className="badge-pill">
            {bookings.length} {bookings.length === 1 ? 'Appointment' : 'Appointments'}
          </span>
        </div>

        {bookingsError && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertIcon size={18} />
            <span>{bookingsError}</span>
          </div>
        )}

        {loadingBookings ? (
          <LoadingSpinner message="Checking your scheduled appointments..." />
        ) : bookings.length === 0 ? (
          <div className="bookings-placeholder-card">
            <div className="placeholder-icon-circle">
              <CalendarIcon size={32} />
            </div>
            <h3 className="placeholder-title">No upcoming sessions yet</h3>
            <p className="placeholder-desc">
              Feeling overwhelmed by academics, exams, or campus life? Our verified student counsellors offer confidential 1-on-1 consultations. Once you book, your confirmed time slot, counsellor notes, and meeting link will appear right here.
            </p>
            <Link to="/counselling" className="btn btn-accent btn-lg">
              <HeartIcon size={18} />
              <span>Meet Our Counsellors</span>
            </Link>
          </div>
        ) : (
          <div className="student-bookings-list">
            {bookings.map((booking) => {
              const isPaid = booking.paymentStatus === 'paid';
              const isPending = booking.paymentStatus === 'pending';

              return (
                <div key={booking._id} className="student-booking-card">
                  <div className="booking-card-main">
                    <img
                      src={booking.counsellor?.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
                      alt={booking.counsellor?.name || 'Counsellor'}
                      className="booking-counsellor-img"
                    />

                    <div className="booking-card-info">
                      <div className="booking-header-row">
                        <h3 className="booking-counsellor-title">
                          {booking.counsellor?.name || 'Counsellor'}
                        </h3>
                        <span className={`booking-status-badge status-${booking.paymentStatus}`}>
                          {isPaid && '✓ Confirmed (Paid)'}
                          {isPending && '⏳ Payment Pending'}
                          {!isPaid && !isPending && '✕ Payment Failed'}
                        </span>
                      </div>

                      <p className="booking-counsellor-specialization">
                        {booking.counsellor?.specialization}
                      </p>

                      <div className="booking-details-strip">
                        <span className="strip-detail">
                          <CalendarIcon size={14} />
                          <span>{booking.date}</span>
                        </span>
                        <span className="strip-detail">
                          <ClockIcon size={14} />
                          <span>{booking.time}</span>
                        </span>
                        <span className="strip-detail">
                          <span>Mode: <strong>{booking.mode === 'chat' ? '💬 Online Chat' : '🏫 In-Person'}</strong></span>
                        </span>
                        <span className="strip-detail">
                          <span>Amount: <strong>₹{booking.amount}</strong></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-card-footer">
                    <span className="booking-ref-text">
                      Booking ID: <code>{booking._id}</code>
                    </span>
                    {isPaid && (
                      <span className="booking-ready-badge">
                        <SparklesIcon size={14} />
                        <span>Ready • Link active on session date</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
