import React from 'react';
import { Shield, Bell } from 'lucide-react';

export default function MobileHeader({ unreadCount = 3, onOpenNotifications }) {
  return (
    <header className="mobile-header" aria-label="Mobile Application Header">
      {/* Left: Branding & Logo */}
      <div className="mobile-header-brand-wrap">
        <div className="mobile-brand-icon">
          <Shield size={16} strokeWidth={2.6} />
        </div>
        <span className="mobile-brand-text">nexus</span>
      </div>

      {/* Right: Notifications & User Avatar */}
      <div className="mobile-header-right">
        <button 
          className="mobile-icon-btn" 
          onClick={onOpenNotifications}
          aria-label="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={19} strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="mobile-bell-dot" />
          )}
        </button>

        <div className="mobile-avatar-wrap">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Jany Alby profile" 
            className="mobile-avatar-img"
          />
        </div>
      </div>
    </header>
  );
}
