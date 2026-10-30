import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CloseIcon, AlertIcon, SparklesIcon, LeafIcon } from './Icons';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-floating-container" aria-live="polite">
      {toasts.map((toast) => {
        let icon = <LeafIcon size={18} />;
        if (toast.type === 'error') icon = <AlertIcon size={18} />;
        if (toast.type === 'success') icon = <SparklesIcon size={18} />;

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <span className="toast-icon">{icon}</span>
            <p className="toast-message">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close-btn"
              aria-label="Dismiss notification"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
