import React from 'react';
import { 
  Home, 
  PieChart, 
  ShieldAlert, 
  FileText, 
  Settings 
} from 'lucide-react';

export default function BottomNavigation({ activeView, setActiveView, counts }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scanner', label: 'Scanner', icon: PieChart },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badge: counts?.critical > 0 ? counts.critical : null },
    { id: 'report', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-bottom-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'settings') {
                  alert("Settings configuration panel");
                } else {
                  setActiveView(item.id);
                }
              }}
              aria-label={item.label}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                {item.badge && (
                  <span className="mobile-nav-badge">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mobile-bottom-nav-label">
                {item.label}
              </span>
              {isActive && <span className="mobile-bottom-active-pill" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
