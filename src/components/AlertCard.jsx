import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AlertCard({ alert, onClick }) {
  const { id, title, severity, status } = alert;

  const getSeverityBadgeClass = (sev) => {
    switch (sev.toLowerCase()) {
      case 'critical': return 'badge-severity critical';
      case 'high': return 'badge-severity high';
      case 'medium': return 'badge-severity medium';
      case 'low': return 'badge-severity low';
      case 'resolved': return 'badge-severity resolved';
      default: return 'badge-severity low';
    }
  };

  const getCardModifierClass = (sev) => {
    switch (sev.toLowerCase()) {
      case 'critical': return 'compact-alert-card is-critical';
      case 'high': return 'compact-alert-card is-high';
      case 'medium': return 'compact-alert-card is-medium';
      case 'low': return 'compact-alert-card is-low';
      case 'resolved': return 'compact-alert-card is-resolved';
      default: return 'compact-alert-card';
    }
  };

  const getStatusClass = (st) => {
    if (st === 'Open') return 'alert-status-badge status-open';
    if (st === 'Monitoring') return 'alert-status-badge status-monitoring';
    if (st === 'Resolved') return 'alert-status-badge status-resolved';
    return 'alert-status-badge status-open';
  };

  return (
    <article 
      className={getCardModifierClass(severity)}
      onClick={() => onClick(alert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(alert)}
      aria-label={`${severity} alert: ${title}`}
    >
      {/* 1. Severity Badge */}
      <div className="compact-alert-top">
        <span className={getSeverityBadgeClass(severity)}>
          {severity.toUpperCase()}
        </span>
      </div>

      {/* 2. Alert Title */}
      <h3 className="compact-alert-title">
        {title}
      </h3>

      {/* 3. Bottom Row: Status & View Button */}
      <div className="compact-alert-bottom">
        <span className={getStatusClass(status)}>
          {status}
        </span>

        <button 
          className="btn-action-sm compact-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick(alert);
          }}
          aria-label={`View details for ${title}`}
        >
          <span>View</span>
          <ChevronRight size={13} strokeWidth={2.4} />
        </button>
      </div>
    </article>
  );
}
