import React, { useState } from 'react';
import { UploadCloud, Lock, ChevronDown, Check } from 'lucide-react';

export default function OriginalScannerView({ onNavigateToAlerts }) {
  const [activePackageTab, setActivePackageTab] = useState('react-scripts');
  const [isDragging, setIsDragging] = useState(false);
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'done'

  const handleSimulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('done');
      setTimeout(() => setScanState('idle'), 4000);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Start Vulnerability Scan Card */}
      <section className="ui-card">
        <h2 className="ui-card-title" style={{ marginBottom: '18px' }}>
          Start Vulnerability Scan
        </h2>

        <div 
          className={`scanner-dropzone ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleSimulateScan(); }}
          onClick={handleSimulateScan}
        >
          <div className="scanner-cloud-icon">
            <UploadCloud size={28} />
          </div>

          <h3>Drag & Drop Folder Here</h3>
          <p>or click to browse your local directories</p>

          <button 
            className="btn-black-pill"
            style={{ width: 'auto', padding: '12px 28px' }}
            onClick={(e) => { e.stopPropagation(); handleSimulateScan(); }}
          >
            {scanState === 'scanning' ? 'Scanning Directory...' : 'Select Directory'}
          </button>

          <div className="scanner-privacy-note">
            <Lock size={13} style={{ color: '#10b981' }} />
            <span>Scan is performed locally. Code is not uploaded.</span>
          </div>
        </div>
      </section>

      {/* Package Risk Trend Card */}
      <section className="ui-card">
        <div className="ui-card-header" style={{ marginBottom: '12px' }}>
          <h2 className="ui-card-title">Package Risk Trend</h2>

          {/* Package filter pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['react-scripts', 'lodash', 'express'].map((pkg) => (
              <button
                key={pkg}
                onClick={() => setActivePackageTab(pkg)}
                style={{
                  background: activePackageTab === pkg ? 'var(--primary-purple-tint)' : '#f8fafc',
                  color: activePackageTab === pkg ? 'var(--primary-purple-dark)' : '#64748b',
                  border: activePackageTab === pkg ? '1px solid var(--primary-purple-border)' : '1px solid #eaedf5',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Wave Chart matching screenshot */}
        <div style={{ width: '100%', position: 'relative', marginTop: '16px' }}>
          <svg 
            viewBox="0 0 700 180" 
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          >
            {/* Horizontal Grid lines */}
            <line x1="0" y1="50" x2="700" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="150" x2="700" y2="150" stroke="#f1f5f9" strokeWidth="1" />

            {/* Active Day Highlight Column (2 Nov in screenshot) */}
            <rect 
              x="285" 
              y="10" 
              width="45" 
              height="150" 
              rx="12" 
              fill="#f5f2ff" 
              opacity="0.8"
            />
            {/* Dot marker inside column */}
            <circle cx="307" cy="115" r="5" fill="#ffffff" stroke="var(--primary-purple)" strokeWidth="2.5" />

            {/* Purple Curve (react-scripts) */}
            <path
              d="M 10 145 C 80 140, 150 40, 230 40 C 310 40, 420 120, 520 120 C 600 120, 650 90, 690 80"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2.5"
            />

            {/* Green Curve */}
            <path
              d="M 10 130 C 90 125, 140 125, 190 125 C 260 125, 340 145, 450 140 C 540 135, 620 150, 690 140"
              fill="none"
              stroke="#86efac"
              strokeWidth="2.5"
            />

            {/* Green Dot marker with tooltip badge */}
            <circle cx="190" cy="125" r="5" fill="#ffffff" stroke="#86efac" strokeWidth="2.5" />
            
            {/* Purple Peak Text (7X react-scripts) */}
            <text x="230" y="32" fontSize="10" fill="#a78bfa" fontWeight="600" textAnchor="middle">
              react-scripts
            </text>
            <text x="230" y="55" fontSize="14" fill="#0f172a" fontWeight="800" textAnchor="middle">
              7X
            </text>

            {/* Green Badge (5,874) */}
            <g transform="translate(130, 95)">
              <rect x="0" y="0" width="46" height="20" rx="6" fill="#dcfce7" />
              <text x="23" y="14" fontSize="10" fill="#15803d" fontWeight="700" textAnchor="middle">
                5,874
              </text>
            </g>
          </svg>

          {/* Timeline labels at the bottom */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: '#94a3b8',
              fontWeight: 500,
              paddingTop: '8px',
              borderTop: '1px solid #f1f5f9'
            }}
          >
            <span>29 Oct</span>
            <span>30 Oct</span>
            <span>31 Oct</span>
            <span>1 Nov</span>
            <span style={{ color: 'var(--primary-purple)', fontWeight: 700 }}>2 Nov</span>
            <span>3 Nov</span>
            <span>4 Nov</span>
            <span>5 Nov</span>
            <span>6 Nov</span>
          </div>
        </div>
      </section>

      {/* Risk Vulnerabilities Overview Card */}
      <section className="ui-card">
        <div className="ui-card-header" style={{ marginBottom: '14px' }}>
          <h2 className="ui-card-title">Risk vulnerabilities</h2>
          <button 
            className="btn-secondary"
            onClick={onNavigateToAlerts}
          >
            View All Security Alerts →
          </button>
        </div>

        <div 
          className="alert-row is-low"
          onClick={onNavigateToAlerts}
          style={{ cursor: 'pointer' }}
        >
          <span className="badge-severity low">Low</span>
          <div className="alert-main-info">
            <div className="alert-title">Git Directory Exposure</div>
            <div className="alert-desc" style={{ fontFamily: 'var(--font-mono)' }}>react-scripts</div>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
            Source code & Credentials
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
            158
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b' }}>
            <span>Vulnerable Assets</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </section>
    </div>
  );
}
