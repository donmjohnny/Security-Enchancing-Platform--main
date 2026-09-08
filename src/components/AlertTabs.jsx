import React from 'react';

export default function AlertTabs({ activeTab, onSelectTab, counts }) {
  const tabs = [
    { id: 'All', label: 'All', count: counts.total },
    { id: 'Critical', label: 'Critical', count: counts.critical },
    { id: 'High', label: 'High', count: counts.high },
    { id: 'Medium', label: 'Medium', count: counts.medium || 0 },
    { id: 'Low', label: 'Low', count: counts.low || 0 },
    { id: 'Resolved', label: 'Resolved', count: counts.resolved }
  ];

  return (
    <div className="mobile-tabs-scroll-wrapper" role="tablist" aria-label="Alert Severity Filter Tabs">
      <div className="mobile-tabs-container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`mobile-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="mobile-tab-count">{tab.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
