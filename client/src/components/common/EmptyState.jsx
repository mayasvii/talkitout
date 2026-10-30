import React from 'react';
import { SparklesIcon } from './Icons';

const EmptyState = ({
  icon: Icon = SparklesIcon,
  title = 'No items found',
  description = 'Everything is quiet here right now. Try switching categories or check back soon.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        <Icon size={36} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-secondary empty-state-btn">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
