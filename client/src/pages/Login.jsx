import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { LeafIcon, AlertIcon } from '../components/common/Icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError('');

    try {
      const response = await api.post('/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (response && response.data) {
        // Update global auth state with user data and token
        login(response.data, response.data.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Unable to connect to the server. Please ensure the backend is running.';
      setApiError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Quick fill helper for evaluator convenience
  const handleQuickFill = (role) => {
    if (role === 'student') {
      setFormData({ email: 'student@talkitout.com', password: 'Student@123' });
    } else {
      setFormData({ email: 'admin@talkitout.com', password: 'Admin@123' });
    }
    setErrors({});
    setApiError('');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <LeafIcon size={28} />
          </div>
          <h2 className="auth-title">Welcome Back 🌱</h2>
          <p className="auth-subtitle">
            Sign in to access your saved audiobooks, soundscapes, and session bookings.
          </p>
        </div>

        {apiError && (
          <div className="alert alert-error">
            <AlertIcon size={18} />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              College or Personal Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. yourname@college.edu"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              autoComplete="email"
            />
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              autoComplete="current-password"
            />
            {errors.password && <span className="field-error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
            {submitting ? 'Signing in gently...' : 'Log In to TalkItOut'}
          </button>
        </form>

        {/* Evaluator Quick-Fill helper */}
        <div className="auth-quick-test">
          <span className="quick-test-label">Demo Quick Fill:</span>
          <div className="quick-test-buttons">
            <button
              type="button"
              onClick={() => handleQuickFill('student')}
              className="btn btn-tag btn-sm"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="btn btn-tag btn-sm"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="auth-footer-link">
          <p>
            First time here?{' '}
            <Link to="/signup" className="link-highlight">
              Create a free student account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
