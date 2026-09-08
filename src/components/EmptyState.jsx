import React from 'react';
import { ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export default function EmptyState({ activeTab, onClearFilters }) {
  const isResolvedView = activeTab === 'Resolved';

  return (
    <div className="mobile-empty-state">
      <div className="mobile-empty-icon-circle">
        {isResolvedView ? (
          <CheckCircle2 size={32} strokeWidth={2.2} style={{ color: 'var(--severity-resolved)' }} />
        ) : (
          <ShieldCheck size={32} strokeWidth={2.2} style={{ color: 'var(--primary-purple)' }} />
        )}
      </div>

      <h3 className="mobile-empty-title">
        {isResolvedView ? 'All Clear' : 'No Security Alerts'}
      </h3>

      <p className="mobile-empty-desc">
        {isResolvedView 
          ? 'There are no resolved alerts matching the selected criteria.' 
          : 'No alerts match your current filters.'}
      </p>

      {onClearFilters && (
        <button 
          className="btn-secondary" 
          onClick={onClearFilters}
          style={{ marginTop: '8px', fontSize: '13px' }}
        >
          <RotateCcw size={14} />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );
}
