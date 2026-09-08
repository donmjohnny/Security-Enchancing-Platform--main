import React, { useState, useMemo } from 'react';
import AlertCard from './AlertCard';
import AlertTabs from './AlertTabs';
import EmptyState from './EmptyState';

export default function AlertsList({ 
  alerts, 
  onSelectAlert, 
  activeTab, 
  setActiveTab,
  counts,
  appliedFilters = { severity: 'All', status: 'All', asset: 'All' }
}) {
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      // 1. Tab filter
      if (activeTab === 'Resolved') {
        if (alert.severity !== 'Resolved' && alert.status !== 'Resolved') return false;
      } else if (activeTab !== 'All') {
        if (alert.severity !== activeTab) return false;
      }

      // 2. Extra Sheet Filters (if applied)
      if (appliedFilters.severity && appliedFilters.severity !== 'All') {
        if (alert.severity !== appliedFilters.severity) return false;
      }
      if (appliedFilters.status && appliedFilters.status !== 'All') {
        if (alert.status !== appliedFilters.status) return false;
      }
      if (appliedFilters.asset && appliedFilters.asset !== 'All') {
        if (alert.asset !== appliedFilters.asset) return false;
      }

      return true;
    }).sort((a, b) => {
      const rank = { Critical: 4, High: 3, Medium: 2, Low: 1, Resolved: 0 };
      return (rank[b.severity] || 0) - (rank[a.severity] || 0);
    });
  }, [alerts, activeTab, appliedFilters]);

  const clearAllFilters = () => {
    setActiveTab('All');
  };

  return (
    <section className="ui-card compact-alerts-section" aria-label="Active Security Alerts Section">
      {/* Section Title */}
      <div className="ui-card-header" style={{ marginBottom: '12px' }}>
        <h2 className="ui-card-title">Active Security Alerts</h2>
      </div>

      {/* Horizontally Scrollable Severity Filter Tabs */}
      <AlertTabs 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        counts={counts} 
      />

      {/* Compact Alert Cards Stream */}
      {filteredAlerts.length > 0 ? (
        <div className="compact-alerts-stream">
          {filteredAlerts.map((alert) => (
            <AlertCard 
              key={alert.id}
              alert={alert}
              onClick={onSelectAlert}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          activeTab={activeTab}
          onClearFilters={activeTab !== 'All' ? clearAllFilters : undefined}
        />
      )}
    </section>
  );
}
