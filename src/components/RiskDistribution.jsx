import React, { useState } from 'react';

export default function RiskDistribution({ counts, onSelectSeverity }) {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const data = [
    { label: 'Critical', count: counts.critical, color: '#f43f5e', bg: '#fff1f3' },
    { label: 'High', count: counts.high, color: '#f97316', bg: '#fff7ed' },
    { label: 'Medium', count: counts.medium || 24, color: '#eab308', bg: '#fefce8' },
    { label: 'Low', count: counts.low || 42, color: '#7c5cfc', bg: '#f5f3ff' },
    { label: 'Resolved', count: counts.resolved, color: '#10b981', bg: '#ecfdf5' }
  ];

  const total = data.reduce((acc, item) => acc + item.count, 0);

  // Calculate SVG Donut chart segments
  const size = 140;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segments = data.map((item) => {
    const percent = item.count / total;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativePercent * circumference;
    cumulativePercent += percent;
    return {
      ...item,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <section className="ui-card" aria-label="Risk Distribution Chart">
      <div className="ui-card-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 className="ui-card-title">Risk Distribution</h2>
          <p className="ui-card-subtitle">Severity proportion across {total} logged findings</p>
        </div>
      </div>

      <div className="risk-chart-layout">
        {/* SVG Donut Chart */}
        <div className="donut-chart-wrapper">
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Colored Segments */}
            {segments.map((seg) => (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={hoveredSegment === seg.label ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                style={{ 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  filter: hoveredSegment === seg.label ? `drop-shadow(0 0 6px ${seg.color})` : 'none'
                }}
                onMouseEnter={() => setHoveredSegment(seg.label)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => onSelectSeverity && onSelectSeverity(seg.label)}
              />
            ))}
          </svg>

          {/* Center text stat */}
          <div className="donut-center-stat">
            <span className="donut-center-number">
              {hoveredSegment 
                ? data.find(d => d.label === hoveredSegment)?.count 
                : total}
            </span>
            <span className="donut-center-label">
              {hoveredSegment || 'Total'}
            </span>
          </div>
        </div>

        {/* Breakdown Horizontal Progress Bars */}
        <div className="risk-breakdown-list">
          {data.map((item) => {
            const pct = Math.round((item.count / total) * 100);
            const isHovered = hoveredSegment === item.label;
            return (
              <div 
                key={item.label} 
                className="risk-breakdown-item"
                onMouseEnter={() => setHoveredSegment(item.label)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => onSelectSeverity && onSelectSeverity(item.label)}
                style={{
                  cursor: 'pointer',
                  opacity: hoveredSegment && !isHovered ? 0.6 : 1,
                  transition: 'opacity 0.2s ease'
                }}
              >
                <div className="risk-item-label">
                  <span 
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: item.color,
                      display: 'inline-block' 
                    }} 
                  />
                  <span>{item.label}</span>
                </div>

                <div className="risk-progress-bar-bg">
                  <div 
                    className="risk-progress-fill"
                    style={{ 
                      width: `${pct}%`, 
                      backgroundColor: item.color 
                    }} 
                  />
                </div>

                <div className="risk-item-count">
                  {item.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
