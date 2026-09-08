import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="skeleton-container" aria-label="Loading Security Telemetry" aria-busy="true">
      {/* 2-Column Summary Cards Skeletons */}
      <div className="summary-cards-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="summary-card skeleton-card">
            <div className="skeleton-line" style={{ width: '60%', height: '14px' }} />
            <div className="skeleton-line" style={{ width: '40%', height: '32px', margin: '12px 0 6px' }} />
            <div className="skeleton-line" style={{ width: '80%', height: '12px' }} />
          </div>
        ))}
      </div>

      {/* Alert Section Skeleton */}
      <div className="ui-card skeleton-card" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div className="skeleton-line" style={{ width: '45%', height: '20px' }} />
          <div className="skeleton-line" style={{ width: '25%', height: '20px' }} />
        </div>

        {/* Tab Skeletons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-pill" style={{ width: '70px', height: '30px' }} />
          ))}
        </div>

        {/* Alert Card Skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mobile-alert-card skeleton-card">
              <div className="skeleton-line" style={{ width: '25%', height: '16px', marginBottom: '8px' }} />
              <div className="skeleton-line" style={{ width: '70%', height: '18px', marginBottom: '6px' }} />
              <div className="skeleton-line" style={{ width: '90%', height: '14px', marginBottom: '12px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="skeleton-line" style={{ width: '30%', height: '14px' }} />
                <div className="skeleton-line" style={{ width: '20%', height: '14px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
