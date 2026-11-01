import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import BookingModal from '../components/counselling/BookingModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import {
  HeartIcon,
  CalendarIcon,
  SparklesIcon,
  AlertIcon,
  UserIcon,
} from '../components/common/Icons';

const Counselling = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCounsellorForBooking, setActiveCounsellorForBooking] = useState(null);

  const fetchCounsellors = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/counsellors');
      if (res && res.data) {
        setCounsellors(res.data);
      }
    } catch (err) {
      console.error('Failed to load counsellors:', err);
      setError('Unable to fetch counsellors. Please ensure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
  }, []);

  return (
    <div className="counselling-page page-container">
      {/* Page Header */}
      <div className="media-page-header">
        <div className="media-page-badge" style={{ backgroundColor: 'var(--color-warm-bg)', color: 'var(--color-warm-accent)' }}>
          <HeartIcon size={18} />
          <span>Confidential 1-on-1 Student Care</span>
        </div>
        <h1 className="media-page-title">Meet Your Student Counsellors</h1>
        <p className="media-page-subtitle">
          Whether you are wrestling with academic perfectionism, living away from home for the first time, or feeling weighed down by anxiety — our certified counsellors are here with compassionate, judgment-free listening.
        </p>

        <div className="counselling-assurances-row">
          <div className="assurance-chip">
            <SparklesIcon size={16} />
            <span>Strictly Confidential</span>
          </div>
          <div className="assurance-chip">
            <CalendarIcon size={16} />
            <span>Flexible 7-Day Slots</span>
          </div>
          <div className="assurance-chip">
            <UserIcon size={16} />
            <span>Chat or In-Person</span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
          <AlertIcon size={20} />
          <div>
            <p style={{ fontWeight: 600 }}>{error}</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Ensure your MongoDB is connected and <code>npm run seed</code> was executed in <code>/server</code>.
            </p>
          </div>
        </div>
      )}

      {/* Loading & Empty States */}
      {loading ? (
        <div style={{ padding: '4rem 0' }}>
          <LoadingSpinner message="Finding empathetic counsellors for you..." />
        </div>
      ) : counsellors.length === 0 ? (
        <EmptyState
          icon={HeartIcon}
          title="No counsellors listed right now"
          description="Please seed the database with sample counsellors using `npm run seed` in /server."
        />
      ) : (
        /* Counsellor Directory Grid */
        <div className="counsellors-directory-grid">
          {counsellors.map((counsellor) => {
            const openSlotsCount = counsellor.availableSlots?.filter((s) => !s.isBooked).length || 0;

            return (
              <div key={counsellor._id} className="counsellor-profile-card">
                <div className="counsellor-card-top">
                  <img
                    src={counsellor.photo}
                    alt={counsellor.name}
                    className="counsellor-profile-photo"
                  />
                  <div className="counsellor-primary-info">
                    <h3 className="counsellor-full-name">{counsellor.name}</h3>
                    <p className="counsellor-spec-tag">{counsellor.specialization}</p>
                    <div className="counsellor-fee-badge">₹{counsellor.fee} / session</div>
                  </div>
                </div>

                <div className="counsellor-card-body">
                  <p className="counsellor-bio-text">{counsellor.bio}</p>

                  <div className="counsellor-modes-row">
                    <span className="modes-label">Modes:</span>
                    {counsellor.modes?.map((m) => (
                      <span key={m} className="counsellor-mode-chip">
                        {m === 'chat' ? '💬 Online Chat' : '🏫 In-Person'}
                      </span>
                    ))}
                  </div>

                  <div className="counsellor-slots-status">
                    <CalendarIcon size={14} />
                    <span>
                      <strong>{openSlotsCount}</strong> available slots over next 7 days
                    </span>
                  </div>
                </div>

                <div className="counsellor-card-action">
                  <button
                    onClick={() => setActiveCounsellorForBooking(counsellor)}
                    disabled={openSlotsCount === 0}
                    className="btn btn-accent btn-block btn-lg"
                  >
                    <HeartIcon size={18} />
                    <span>{openSlotsCount > 0 ? 'Book a Session' : 'Slots Full'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Flow Modal */}
      {activeCounsellorForBooking && (
        <BookingModal
          counsellor={activeCounsellorForBooking}
          onClose={() => setActiveCounsellorForBooking(null)}
          onRefreshCounsellors={fetchCounsellors}
        />
      )}
    </div>
  );
};

export default Counselling;
