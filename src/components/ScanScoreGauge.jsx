import React from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ScanScoreGauge({ scoreData }) {
  const { score, maxScore, riskLevel, description, trend, trendComparison } = scoreData;

  // SVG Circular Gauge calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / maxScore) * circumference;

  return (
    <section className="ui-card" aria-label="Overall Security Score Card">
      <div className="score-card-layout">
        {/* Left: Circular Security Gauge */}
        <div className="score-gauge-box">
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            style={{ transform: 'rotate(-90deg)' }}
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

            {/* Score progress fill */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="url(#scoreGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#7c5cfc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Score Numbers */}
          <div className="score-center-info">
            <span className="score-number-big">{score}</span>
            <span className="score-number-sub">/ {maxScore}</span>
          </div>
        </div>

        {/* Right: Score Analysis & Comparison */}
        <div className="score-details-right">
          <div>
            <span className="badge-risk-status moderate">
              <AlertTriangle size={15} />
              {riskLevel}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Overall Security Score
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '640px' }}>
              {description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span className="trend-pill-badge">
              <TrendingUp size={14} />
              <span>{trend}</span>
            </span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
              {trendComparison}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
