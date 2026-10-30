import React from 'react';
import { LeafIcon } from './Icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[TalkItOut Error Boundary caught an error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen">
          <div className="error-boundary-card">
            <div className="error-boundary-icon">
              <LeafIcon size={36} />
            </div>
            <h2 className="error-boundary-title">Take a breath. Something paused.</h2>
            <p className="error-boundary-text">
              We encountered an unexpected display glitch. Don't worry, your account and sessions are safe.
            </p>
            <div className="error-boundary-actions">
              <button onClick={this.handleReload} className="btn btn-primary btn-lg">
                <span>Refresh & Breathe Again</span>
              </button>
              <a href="/" className="btn btn-outline btn-lg">
                <span>Go to Homepage</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
