import React, { useState } from 'react';
import { 
  ChevronDown, 
  Calendar, 
  RotateCw, 
  SlidersHorizontal,
  ShieldAlert,
  CheckCircle2,
  Check
} from 'lucide-react';

export default function Header({ 
  vulnerableAssetsCount = 141, 
  onRefresh, 
  isRefreshing,
  onOpenFilter,
  selectedDomain,
  setSelectedDomain
}) {
  const [showDomainMenu, setShowDomainMenu] = useState(false);
  const [dateRange, setDateRange] = useState("29 Oct - 11 Nov");
  const [showDateMenu, setShowDateMenu] = useState(false);

  const domains = [
    "nexusteam.com",
    "apple.com",
    "dribbble.com/nexusteam",
    "cloud.nexus.io"
  ];

  const dateRanges = [
    "29 Oct - 11 Nov",
    "Last 24 Hours",
    "Last 7 Days",
    "Last 30 Days",
    "Year to Date"
  ];

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Domain Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="team-dropdown-btn"
            onClick={() => setShowDomainMenu(!showDomainMenu)}
            aria-haspopup="true"
            aria-expanded={showDomainMenu}
          >
            <span>{selectedDomain}</span>
            <ChevronDown size={16} strokeWidth={2.2} style={{ color: '#64748b' }} />
          </button>

          {showDomainMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '6px',
                background: '#ffffff',
                border: '1px solid #eaedf5',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '6px',
                zIndex: 50,
                minWidth: '210px'
              }}
            >
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => {
                    setSelectedDomain(dom);
                    setShowDomainMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: dom === selectedDomain ? '#f5f2ff' : 'transparent',
                    color: dom === selectedDomain ? 'var(--primary-purple)' : 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: dom === selectedDomain ? 600 : 500,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{dom}</span>
                  {dom === selectedDomain && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vulnerable Assets indicator */}
        <div className="vulnerable-assets-pill">
          Vulnerable Assets: <strong>{vulnerableAssetsCount}</strong>
        </div>
      </div>

      <div className="header-right">
        {/* Date / Time Range Selector */}
        <div style={{ position: 'relative' }}>
          <button 
            className="date-range-badge"
            onClick={() => setShowDateMenu(!showDateMenu)}
            aria-label="Select date range"
          >
            <span>{dateRange}</span>
            <Calendar size={15} strokeWidth={2} style={{ color: '#64748b' }} />
          </button>

          {showDateMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '6px',
                background: '#ffffff',
                border: '1px solid #eaedf5',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '6px',
                zIndex: 50,
                minWidth: '170px'
              }}
            >
              {dateRanges.map((rng) => (
                <button
                  key={rng}
                  onClick={() => {
                    setDateRange(rng);
                    setShowDateMenu(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: rng === dateRange ? '#f5f2ff' : 'transparent',
                    color: rng === dateRange ? 'var(--primary-purple)' : 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: rng === dateRange ? 600 : 500,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {rng}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button 
          className={`header-btn ${isRefreshing ? 'is-spinning' : ''}`}
          onClick={onRefresh}
          title="Refresh security telemetry"
          aria-label="Refresh telemetry"
        >
          <RotateCw size={15} strokeWidth={2.2} />
        </button>

        {/* Quick Filter Button */}
        <button 
          className="header-btn"
          onClick={onOpenFilter}
          title="Filter alerts & risks"
          aria-label="Filter"
        >
          <SlidersHorizontal size={15} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}
