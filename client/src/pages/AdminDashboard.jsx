import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  CalendarIcon,
  ClockIcon,
  SparklesIcon,
  AlertIcon,
  UserIcon,
  CloseIcon,
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected counsellor for slot management
  const [selectedCounsellorId, setSelectedCounsellorId] = useState('');
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('10:00 AM');
  const [submittingSlot, setSubmittingSlot] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [bookingsRes, counsellorsRes] = await Promise.all([
        api.get('/admin/bookings'),
        api.get('/counsellors'),
      ]);

      if (bookingsRes && bookingsRes.data) {
        setBookings(bookingsRes.data);
      }
      if (counsellorsRes && counsellorsRes.data) {
        setCounsellors(counsellorsRes.data);
        if (counsellorsRes.data.length > 0 && !selectedCounsellorId) {
          setSelectedCounsellorId(counsellorsRes.data[0]._id);
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setError(
        err.response?.data?.message || 'Failed to load administrative records. Verify you are logged in as admin.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  // Access control guard
  if (!user || user.role !== 'admin') {
    return (
      <div className="page-container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <AlertIcon size={24} />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Access Forbidden</h3>
            <p>You need administrator privileges to view this portal. Please log in with an admin account.</p>
          </div>
        </div>
        <Link to="/login" className="btn btn-primary">
          Log In as Admin
        </Link>
      </div>
    );
  }

  // Selected counsellor object
  const activeCounsellor = counsellors.find((c) => c._id === selectedCounsellorId) || counsellors[0];

  // Add slot handler
  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlotDate || !newSlotTime) {
      addToast('Please provide both date and time', 'error');
      return;
    }

    setSubmittingSlot(true);
    try {
      const res = await api.post(`/admin/counsellors/${selectedCounsellorId}/slots`, {
        date: newSlotDate,
        time: newSlotTime,
      });

      if (res && res.data) {
        addToast('New slot successfully created!', 'success');
        setNewSlotDate('');
        // Refresh counsellor list
        const updated = await api.get('/counsellors');
        setCounsellors(updated.data);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add slot', 'error');
    } finally {
      setSubmittingSlot(false);
    }
  };

  // Remove slot handler
  const handleRemoveSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to delete this unbooked slot?')) return;

    try {
      await api.delete(`/admin/counsellors/${selectedCounsellorId}/slots/${slotId}`);
      addToast('Slot removed successfully', 'info');
      // Refresh counsellor list
      const updated = await api.get('/counsellors');
      setCounsellors(updated.data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Could not delete slot', 'error');
    }
  };

  // Calculate summary metrics
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalPaidBookings = bookings.filter((b) => b.paymentStatus === 'paid').length;

  return (
    <div className="admin-page page-container">
      {/* Admin Header */}
      <div className="admin-header-row">
        <div>
          <span className="admin-badge">Admin Control Center</span>
          <h1 className="admin-page-title">TalkItOut Administration</h1>
          <p className="admin-page-sub">
            Monitor platform bookings, track Razorpay transactions, and manage counsellor availability slots.
          </p>
        </div>
        <button onClick={fetchAdminData} className="btn btn-outline btn-sm">
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
          <AlertIcon size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-box">
          <span className="metric-title">Total Bookings</span>
          <span className="metric-value">{bookings.length}</span>
          <span className="metric-sub">Across all student accounts</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">Confirmed Sessions</span>
          <span className="metric-value" style={{ color: 'var(--color-sage-dark)' }}>
            {totalPaidBookings}
          </span>
          <span className="metric-sub">Paid & verified appointments</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">Platform Revenue</span>
          <span className="metric-value" style={{ color: 'var(--color-warm-accent)' }}>
            ₹{totalRevenue}
          </span>
          <span className="metric-sub">Total counselling collections</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">Active Counsellors</span>
          <span className="metric-value">{counsellors.length}</span>
          <span className="metric-sub">Verified campus providers</span>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading administrative records..." />
      ) : (
        <>
          {/* Section 1: All Bookings Table */}
          <section className="admin-section">
            <div className="section-title-row">
              <h2 className="admin-section-heading">Student Counselling Bookings</h2>
              <span className="badge-pill">{bookings.length} Records</span>
            </div>

            {bookings.length === 0 ? (
              <div className="empty-state-card" style={{ padding: '2rem' }}>
                <p>No bookings have been made yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Counsellor</th>
                      <th>Date & Time</th>
                      <th>Mode</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                      <th>Razorpay ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id}>
                        <td>
                          <strong>{b.user?.name || 'Student'}</strong>
                          <div className="table-sub-text">{b.user?.email}</div>
                        </td>
                        <td>
                          <strong>{b.counsellor?.name || 'Counsellor'}</strong>
                          <div className="table-sub-text">{b.counsellor?.specialization}</div>
                        </td>
                        <td>
                          <div>{b.date}</div>
                          <div className="table-sub-text">{b.time}</div>
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>
                          {b.mode === 'chat' ? '💬 Chat' : '🏫 In-Person'}
                        </td>
                        <td>₹{b.amount}</td>
                        <td>
                          <span className={`booking-status-badge status-${b.paymentStatus}`}>
                            {b.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <code className="table-code">{b.razorpayPaymentId || b.razorpayOrderId || '—'}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Section 2: Slot Availability Manager */}
          <section className="admin-section" style={{ marginTop: '3.5rem' }}>
            <div className="section-title-row">
              <h2 className="admin-section-heading">Counsellor Availability & Slot Management</h2>
            </div>

            <div className="slot-management-layout">
              {/* Left Column: Counsellor Selector & Add Slot Form */}
              <div className="slot-editor-card">
                <h3 className="editor-card-title">Add Availability Slot</h3>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Select Counsellor:</label>
                  <select
                    value={selectedCounsellorId}
                    onChange={(e) => setSelectedCounsellorId(e.target.value)}
                    className="form-input"
                  >
                    {counsellors.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleAddSlot} className="add-slot-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="newSlotDate">
                      Slot Date (YYYY-MM-DD)
                    </label>
                    <input
                      id="newSlotDate"
                      type="date"
                      value={newSlotDate}
                      onChange={(e) => setNewSlotDate(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="newSlotTime">
                      Slot Time (e.g. 10:00 AM)
                    </label>
                    <select
                      id="newSlotTime"
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                      className="form-input"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingSlot || !newSlotDate}
                    className="btn btn-primary btn-block"
                  >
                    {submittingSlot ? 'Saving Slot...' : 'Add Slot to Schedule'}
                  </button>
                </form>
              </div>

              {/* Right Column: Existing Slots List */}
              <div className="slots-list-card">
                <div className="slots-list-header">
                  <div>
                    <h3 className="editor-card-title">
                      {activeCounsellor ? activeCounsellor.name : 'Counsellor'}
                    </h3>
                    <p className="slots-list-sub">
                      Total Slots: {activeCounsellor?.availableSlots?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="slots-chip-grid">
                  {activeCounsellor?.availableSlots?.map((slot) => (
                    <div
                      key={slot._id}
                      className={`admin-slot-pill ${slot.isBooked ? 'slot-booked' : 'slot-free'}`}
                    >
                      <div className="slot-pill-time">
                        <span className="slot-date-text">{slot.date}</span>
                        <span className="slot-time-text">{slot.time}</span>
                      </div>

                      {slot.isBooked ? (
                        <span className="slot-booked-tag">Booked</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(slot._id)}
                          className="btn-delete-slot"
                          title="Delete unbooked slot"
                        >
                          <CloseIcon size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
