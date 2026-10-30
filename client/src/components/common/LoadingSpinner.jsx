import React from 'react';

const LoadingSpinner = ({ message = 'Taking a mindful breath...', size = 'medium' }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner-ring">
        <div className="spinner-inner"></div>
      </div>
      {message && <p className="loading-text">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
