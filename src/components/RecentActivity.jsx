import React from 'react';
import { MoreHorizontal, Clock, History } from 'lucide-react';

export default function RecentActivity({ activities, onShowAll }) {
  return (
    <section className="ui-card mobile-activity-card" aria-label="Recent Security Activity">
      <div className="ui-card-header" style={{ marginBottom: '16px' }}>
        <div>
          <h2 className="ui-card-title">Recent Activity</h2>
          <p className="ui-card-subtitle">Real-time audit log of scans and resolved findings</p>
        </div>

        <button 
          className="mobile-icon-btn"
          onClick={onShowAll}
          aria-label="More actions"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="timeline-list" style={{ paddingLeft: '24px' }}>
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
    </section>
  );
}
