import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
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
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Friend';

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState('');

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

      {/* 2. Quick Access Cards */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Wellness Tools</h2>
        <div className="dashboard-tools-grid">
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

          <Link to="/music" className="tool-card card-lavender">
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

          <Link to="/breathe" className="tool-card card-mint">
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

      {/* 3. My Bookings Section (Connected to live API) */}
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
          /* Empty Bookings State */
          <div className="bookings-placeholder-card">
            <div className="placeholder-icon-circle">
              <CalendarIcon size={32} />
            </div>
            <h3 className="placeholder-title">No upcoming sessions yet</h3>
            <p className="placeholder-desc">
              Feeling overwhelmed by academics, exams, or campus life? Our verified student counsellors offer confidential 1-on-1 consultations. Once you book, your confirmed time slot, counsellor notes, and meeting link will appear right here.
            </p>
            <Link to="/counselling" className="btn btn-primary btn-lg">
              <HeartIcon size={18} />
              <span>Meet Our Counsellors</span>
            </Link>
          </div>
        ) : (
          /* Bookings List Cards */
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
