import React, { useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  FileText, 
  PieChart, 
  Home, 
  Folder, 
  Database, 
  History, 
  Settings, 
  Shield, 
  Check, 
  ChevronRight 
} from 'lucide-react';

export default function MobileSidebar({ isOpen, onClose, activeView, setActiveView, selectedDomain }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { id: 'alerts', label: 'Security Alerts', icon: ShieldAlert, badge: '3 Critical' },
    { id: 'report', label: 'Security Scan Report', icon: FileText },
    { id: 'scanner', label: 'Vulnerability Scanner', icon: PieChart },
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'projects', label: 'Projects & Folders', icon: Folder },
    { id: 'assets', label: 'Monitored Assets', icon: Database, badge: '141' },
    { id: 'history', label: 'Audit History', icon: History }
  ];

  return (
    <div className="mobile-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="mobile-brand-icon">
              <Shield size={16} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                nexusteam
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                {selectedDomain || 'nexusteam.com'}
              </div>
            </div>
          </div>

          <button 
            className="mobile-drawer-close-btn" 
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="mobile-drawer-nav">
          <div className="mobile-nav-section-title">MAIN NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveView(item.id);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
                  <span className="mobile-nav-label">{item.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.badge && (
                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '9999px',
                        backgroundColor: item.badge.includes('Critical') ? 'rgba(244, 63, 94, 0.2)' : 'rgba(124, 92, 252, 0.2)',
                        color: item.badge.includes('Critical') ? '#f43f5e' : '#c4b5fd'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="mobile-active-dot" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="mobile-drawer-footer">
          <button 
            className="mobile-nav-item" 
            onClick={() => {
              alert("Settings & API Integrations");
              onClose();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Settings size={19} strokeWidth={1.8} />
              <span className="mobile-nav-label">Settings</span>
            </div>
            <ChevronRight size={16} style={{ color: '#64748b' }} />
          </button>

          {/* User profile footer */}
          <div className="mobile-drawer-user">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Jany Alby" 
              className="user-avatar-img"
              style={{ width: '36px', height: '36px' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', truncate: true }}>
                Jany Alby
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                SecOps Lead
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
