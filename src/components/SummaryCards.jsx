import React from 'react';

export default function SummaryCards({ counts, activeTab, onSelectTab }) {
  // Reordered: 1. Total Alerts | 2. High Risks | 3. Resolved / Safe | 4. Critical Risks
  const cards = [
    {
      id: 'All',
      title: 'Total Alerts',
      value: counts?.total !== undefined ? counts.total : 12,
      indicatorClass: 'indicator-purple',
      description: 'Across all monitored assets',
      accentColor: 'var(--primary-purple)'
    },
    {
      id: 'High',
      title: 'High Risks',
      value: counts?.high !== undefined ? String(counts.high).padStart(2, '0') : '04',
      indicatorClass: 'indicator-high',
      description: 'High priority vulnerabilities',
      accentColor: 'var(--severity-high)',
      isHighlight: counts?.high > 0
    },
    {
      id: 'Resolved',
      title: 'Resolved / Safe',
      value: counts?.resolved !== undefined ? counts.resolved : 2,
      indicatorClass: 'indicator-resolved',
      description: 'No action required',
      accentColor: 'var(--severity-resolved)'
    },
    {
      id: 'Critical',
      title: 'Critical Risks',
      value: counts?.critical !== undefined ? String(counts.critical).padStart(2, '0') : '03',
      indicatorClass: 'indicator-critical',
      description: 'Require immediate attention',
      accentColor: 'var(--severity-critical)',
      isHighlight: counts?.critical > 0
    }
  ];

  return (
    <section className="summary-cards-grid mobile-summary-grid" aria-label="Security Risk Summary Metrics">
      {cards.map((card) => {
        const isSelected = activeTab === card.id;
        return (
          <div 
            key={card.id} 
            className={`summary-card ${card.isHighlight ? 'has-active-risk' : ''}`}
            onClick={() => onSelectTab && onSelectTab(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectTab && onSelectTab(card.id)}
            style={{
              borderColor: isSelected ? card.accentColor : undefined,
              boxShadow: isSelected ? `0 6px 20px ${card.accentColor}25` : undefined
            }}
          >
            <div className="summary-card-header">
              <span className="summary-card-title">{card.title}</span>
              <span className={`status-indicator-dot ${card.indicatorClass}`} />
            </div>

            <div className="summary-card-number">
              {card.value}
            </div>

            <div className="summary-card-desc">
              {card.description}
            </div>
          </div>
        );
      })}
    </section>
  );
}
