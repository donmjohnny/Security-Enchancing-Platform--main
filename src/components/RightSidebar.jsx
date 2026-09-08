import React from 'react';
import { Search, Bell, MoreHorizontal } from 'lucide-react';

export default function RightSidebar({ packages, activities, onShowAllActions }) {
  return (
    <aside className="right-panel" aria-label="Packages & Activity Feed">
      {/* Top Search & Profile Bar */}
      <div className="right-panel-header">
        <button className="icon-btn-ghost" aria-label="Search">
          <Search size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="icon-btn-ghost" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={18} />
            <span 
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--severity-critical)'
              }}
            />
          </button>

          <div className="user-profile-widget">
            <span className="user-name-label">Jany Alby</span>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Jany Alby profile" 
              className="user-avatar-img"
            />
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div>
        <h3 className="panel-section-title">Packages</h3>
        <div className="packages-list">
          {packages.map((pkg) => (
            <div key={pkg.name} className="package-item">
              <span>{pkg.name}</span>
              <span className={`badge-package-status ${pkg.badgeType}`}>
                {pkg.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Last actions / Recent Activity Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="panel-section-title">
          <span>Last actions</span>
          <button 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>

        <div className="timeline-list">
          {activities.slice(0, 5).map((act) => {
            let dotClass = 'dot-purple';
            if (act.dotColor === 'rose') dotClass = 'dot-rose';
            if (act.dotColor === 'emerald') dotClass = 'dot-emerald';
            if (act.dotColor === 'black') dotClass = 'dot-black';

            return (
              <div key={act.id} className="timeline-item">
                <span className={`timeline-dot ${dotClass}`} />
                <div className="timeline-content-text">
                  {act.text}
                </div>
                <div className="timeline-time-label">
                  {act.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show all actions Button */}
      <button 
        className="btn-black-pill"
        onClick={onShowAllActions}
      >
        Show all actions
      </button>
    </aside>
  );
}
