import React from 'react';
import { 
  Home, 
  PieChart, 
  Folder, 
  ShieldAlert, 
  FileText,
  Database, 
  History, 
  Settings
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView }) {
  const navItems = [
    { id: 'report', label: 'Security Scan Report', icon: FileText },
    { id: 'alerts', label: 'Security Alerts', icon: ShieldAlert },
    { id: 'scanner', label: 'Vulnerability Scanner', icon: PieChart },
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'projects', label: 'Projects & Repositories', icon: Folder },
    { id: 'assets', label: 'Monitored Assets', icon: Database },
    { id: 'history', label: 'Audit History', icon: History }
  ];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-nav-group">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
              {isActive && <span className="active-indicator-pill" />}
              <span className="sidebar-tooltip">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="sidebar-nav-group">
        <button 
          className="sidebar-btn" 
          aria-label="Settings"
          title="Settings"
          onClick={() => alert("Security settings & API integrations")}
        >
          <Settings size={20} strokeWidth={1.8} />
          <span className="sidebar-tooltip">Settings</span>
        </button>
      </div>
    </aside>
  );
}
