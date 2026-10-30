import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  CloseIcon,
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon,
  AlertIcon,
  ArrowRightIcon,
} from '../common/Icons';

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookingModal = ({ counsellor, onClose, onRefreshCounsellors }) => {
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Selection states
  const [selectedMode, setSelectedMode] = useState(counsellor.modes[0] || 'chat');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Flow states: 'selecting' | 'loading' | 'success' | 'failed' | 'slot-taken'
  const [status, setStatus] = useState('selecting');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Group unbooked slots by distinct dates
  const availableSlotsGrouped = useMemo(() => {
    const unbooked = counsellor.availableSlots.filter((slot) => !slot.isBooked);
    const groups = {};
    unbooked.forEach((s) => {
      if (!groups[s.date]) groups[s.date] = [];
      groups[s.date].push(s);
    });
    return groups;
  }, [counsellor.availableSlots]);

  const distinctDates = Object.keys(availableSlotsGrouped).sort();

  // Auto-select first available date if not selected
  React.useEffect(() => {
    if (distinctDates.length > 0 && !selectedDate) {
      setSelectedDate(distinctDates[0]);
    }
  }, [distinctDates, selectedDate]);

  // Current times for selected date
  const availableTimes = selectedDate ? availableSlotsGrouped[selectedDate] || [] : [];

  // Reset time if date changes and previous time is not valid
  React.useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.some((t) => t.time === selectedTime)) {
      setSelectedTime(availableTimes[0].time);
    }
  }, [selectedDate, availableTimes, selectedTime]);

  /**
   * Handle Razorpay Order creation and launch Checkout popup
   */
  const handleProceedToPayment = async () => {
    if (!isAuthenticated) {
      addToast('Please log in as a student to book a counselling session', 'info');
      navigate('/login', { state: { from: { pathname: '/counselling' } } });
      return;
    }

    if (!selectedDate || !selectedTime) {
      setErrorMessage('Please pick an available date and time slot');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Step 1: Create Order on Backend
      const res = await api.post('/bookings/create-order', {
        counsellorId: counsellor._id,
        mode: selectedMode,
        date: selectedDate,
        time: selectedTime,
      });

      if (!res || !res.data) {
        throw new Error('Failed to create booking order');
      }

      const orderData = res.data;

      // Step 2: Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded || !window.Razorpay) {
        // Fallback for offline / sandbox environments
        console.warn('Razorpay script could not be loaded from CDN. Offering sandbox simulation.');
        const simulate = window.confirm(
          `TalkItOut Sandbox Mode:\nRazorpay SDK couldn't reach the CDN (offline mode).\n\nSimulate successful payment for ₹${counsellor.fee} to verify booking?`
        );
        if (simulate) {
          await verifyPaymentOnServer(
            orderData.bookingId,
            orderData.orderId,
            `pay_test_${Date.now()}`,
            'mock_test_signature'
          );
        } else {
          setIsProcessing(false);
          setStatus('failed');
          setErrorMessage('Payment cancelled in simulation.');
        }
        return;
      }

      // Step 3: Open Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'TalkItOut Student Wellness',
        description: `1-on-1 Session with ${counsellor.name} (${selectedMode})`,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120',
        order_id: orderData.orderId.startsWith('order_test_') ? undefined : orderData.orderId,
        handler: async function (response) {
          // Razorpay returns razorpay_payment_id, razorpay_order_id, razorpay_signature
          await verifyPaymentOnServer(
            orderData.bookingId,
            response.razorpay_order_id || orderData.orderId,
            response.razorpay_payment_id,
            response.razorpay_signature || 'mock_test_signature'
          );
        },
        prefill: {
          name: user?.name || 'Student',
          email: user?.email || 'student@talkitout.com',
          contact: '9999999999',
        },
        theme: {
          color: '#538075',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setStatus('failed');
            setErrorMessage('Payment was cancelled or closed. Your slot has not been reserved.');
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', function (response) {
        setIsProcessing(false);
        setStatus('failed');
        setErrorMessage(
          response.error?.description || 'Payment was declined by the bank. Please try again.'
        );
      });

      razorpayInstance.open();
    } catch (err) {
      setIsProcessing(false);
      const msg = err.response?.data?.message || err.message || 'Error initiating booking';

      if (msg.includes('already booked') || msg.includes('not found')) {
        setStatus('slot-taken');
        setErrorMessage(msg);
        if (onRefreshCounsellors) onRefreshCounsellors();
      } else {
        setStatus('failed');
        setErrorMessage(msg);
      }
    }
  };

  /**
   * Verify Signature on server
   */
  const verifyPaymentOnServer = async (bookingId, orderId, paymentId, signature) => {
    try {
      const verifyRes = await api.post('/bookings/verify-payment', {
        bookingId,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      });

      if (verifyRes && verifyRes.data) {
        setConfirmedBooking(verifyRes.data);
        setStatus('success');
        addToast('Appointment confirmed successfully! 🌿', 'success');
        if (onRefreshCounsellors) onRefreshCounsellors();
      }
    } catch (err) {
      setStatus('failed');
      setErrorMessage(
        err.response?.data?.message || 'Payment signature verification failed. Please contact student support.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="booking-modal-header">
          <div className="modal-counsellor-summary">
            <img src={counsellor.photo} alt={counsellor.name} className="modal-counsellor-avatar" />
            <div>
              <h3 className="modal-counsellor-name">{counsellor.name}</h3>
              <p className="modal-counsellor-specialization">{counsellor.specialization}</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close booking modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* 1. SUCCESS STATE */}
        {status === 'success' && confirmedBooking && (
          <div className="booking-success-view">
            <div className="success-icon-badge">
              <SparklesIcon size={40} />
            </div>
            <h2 className="success-heading">Appointment Confirmed! 🌱</h2>
            <p className="success-subheading">
              Your confidential session has been booked. Take a breath — support is ready for you.
            </p>

            <div className="success-receipt-card">
              <div className="receipt-row">
                <span className="receipt-label">Counsellor</span>
                <span className="receipt-value">{counsellor.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Session Mode</span>
                <span className="receipt-value" style={{ textTransform: 'capitalize' }}>
                  {confirmedBooking.mode === 'chat' ? '💬 Confidential Chat' : '🏫 In-Person on Campus'}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Date & Time</span>
                <span className="receipt-value">
                  {confirmedBooking.date} at {confirmedBooking.time}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Consultation Fee</span>
                <span className="receipt-value font-bold">₹{confirmedBooking.amount} (Paid)</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Booking Reference</span>
                <span className="receipt-code">{confirmedBooking._id}</span>
              </div>
            </div>

            <div className="success-actions-row">
              <button
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
                className="btn btn-primary btn-block btn-lg"
              >
                <span>View in My Student Dashboard</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 2. FAILED STATE */}
        {status === 'failed' && (
          <div className="booking-error-view">
            <div className="error-icon-badge">
              <AlertIcon size={40} />
            </div>
            <h2 className="error-heading">Payment Incomplete</h2>
            <p className="error-text">
              {errorMessage || 'Your payment was not completed or was cancelled. Your card was not charged.'}
            </p>

            <div className="error-actions-row">
              <button onClick={() => setStatus('selecting')} className="btn btn-primary btn-lg">
                <span>Try Again</span>
              </button>
              <button onClick={onClose} className="btn btn-outline btn-lg">
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. SLOT ALREADY TAKEN STATE */}
        {status === 'slot-taken' && (
          <div className="booking-error-view">
            <div className="error-icon-badge" style={{ backgroundColor: 'var(--color-warm-bg)', color: 'var(--color-warm-accent)' }}>
              <ClockIcon size={40} />
            </div>
            <h2 className="error-heading">Slot Already Reserved</h2>
            <p className="error-text">
              {errorMessage || 'Another student just booked this time slot. Please pick an alternative date or time.'}
            </p>

            <div className="error-actions-row">
              <button
                onClick={() => {
                  setStatus('selecting');
                  setSelectedTime('');
                }}
                className="btn btn-primary btn-lg"
              >
                <span>Choose Another Slot</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. SELECTING & CHECKOUT STATE */}
        {status === 'selecting' && (
          <div className="booking-form-content">
            {errorMessage && (
              <div className="alert alert-error">
                <AlertIcon size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Mode Selection */}
            <div className="booking-section-group">
              <label className="booking-section-label">1. Choose Consultation Mode</label>
              <div className="mode-toggle-group">
                {counsellor.modes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`mode-toggle-card ${selectedMode === mode ? 'active' : ''}`}
                  >
                    <span className="mode-title">
                      {mode === 'chat' ? '💬 Confidential Online Chat' : '🏫 In-Person on Campus'}
                    </span>
                    <span className="mode-sub">
                      {mode === 'chat' ? 'Private encrypted messaging room' : 'Student Counselling Wing, Room 204'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot Picker */}
            <div className="booking-section-group">
              <label className="booking-section-label">2. Select Date (Next 7 Days)</label>
              {distinctDates.length === 0 ? (
                <p className="no-slots-note">
                  No slots currently open for this counsellor. Please check back tomorrow.
                </p>
              ) : (
                <>
                  <div className="date-pill-scroll">
                    {distinctDates.map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`date-select-pill ${selectedDate === date ? 'active' : ''}`}
                      >
                        <CalendarIcon size={14} />
                        <span>{date}</span>
                      </button>
                    ))}
                  </div>

                  <label className="booking-section-label" style={{ marginTop: '1rem' }}>
                    Available Time Slots on {selectedDate}
                  </label>
                  <div className="time-slots-grid">
                    {availableTimes.map((s) => (
                      <button
                        key={s._id || s.time}
                        type="button"
                        onClick={() => setSelectedTime(s.time)}
                        className={`time-slot-pill ${selectedTime === s.time ? 'active' : ''}`}
                      >
                        <ClockIcon size={14} />
                        <span>{s.time}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Step 3: Fee Breakdown */}
            <div className="booking-fee-summary-card">
              <div className="fee-row">
                <span>Standard Consultation Fee</span>
                <span>₹{counsellor.fee}</span>
              </div>
              <div className="fee-row fee-discount">
                <span>Student Care Subsidy</span>
                <span>- ₹0 (100% Free Campus Grant)</span>
              </div>
              <div className="fee-total-row">
                <span>Total Amount to Pay</span>
                <span className="fee-final-price">₹{counsellor.fee}</span>
              </div>
            </div>

            {/* Step 4: Pay & Book CTA */}
            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing || !selectedDate || !selectedTime}
              className="btn btn-primary btn-block btn-lg booking-pay-cta"
            >
              {isProcessing ? (
                <span>Connecting to Secure Razorpay...</span>
              ) : (
                <>
                  <HeartIcon size={18} />
                  <span>Pay ₹{counsellor.fee} & Book Session</span>
                </>
              )}
            </button>
            <p className="payment-security-note">
              🔒 Powered by Razorpay (Test Mode). 100% secure, encrypted, and student confidential.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
