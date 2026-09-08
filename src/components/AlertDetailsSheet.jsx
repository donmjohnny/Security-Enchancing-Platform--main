import React, { useEffect, useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldOff, 
  Terminal, 
  Copy, 
  Check, 
  Clock, 
  AlertTriangle,
  FolderLock,
  ArrowDown
} from 'lucide-react';

export default function AlertDetailsSheet({ 
  alert, 
  onClose, 
  onResolve, 
  onIgnore, 
  onInvestigate 
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (alert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [alert, onClose]);

  if (!alert) return null;

  const isResolved = alert.severity === 'Resolved' || alert.status === 'Resolved';

  const copySnippet = () => {
    if (alert.codeSnippet) {
      navigator.clipboard.writeText(alert.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bottom-sheet-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="bottom-sheet-handle-bar">
          <div className="bottom-sheet-drag-handle" />
        </div>

        {/* Header */}
        <div className="bottom-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge-severity ${alert.severity.toLowerCase()}`}>
              {alert.severity.toUpperCase()}
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {alert.id}
            </span>
          </div>

          <button 
            className="mobile-icon-btn" 
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="bottom-sheet-body">
          {/* Title & Description */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {alert.title}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {alert.description}
            </p>
          </div>

          {/* Key Metadata 2-Column Grid */}
          <div className="drawer-meta-grid">
            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Asset</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)' }}>
                {alert.asset}
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Risk Score</span>
              <span 
                className="drawer-meta-val" 
                style={{ 
                  color: alert.cvssScore >= 8 ? 'var(--severity-critical)' : 'var(--severity-high)' 
                }}
              >
                {alert.cvssScore ? `${alert.cvssScore} / 10.0` : '92 / 100'}
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">CVE / CWE ID</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)' }}>
                {alert.cve || 'CVE-2026-XXXX'}
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Detected</span>
              <span className="drawer-meta-val">
                {alert.detectedTime}
              </span>
            </div>

            <div className="drawer-meta-item" style={{ gridColumn: 'span 2' }}>
              <span className="drawer-meta-label">Location</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                {alert.filePath || 'Repository Root'}
              </span>
            </div>
          </div>

          {/* Recommended Action */}
          <div>
            <h4 className="drawer-section-title">Recommended Action</h4>
            <div 
              style={{
                backgroundColor: 'var(--primary-purple-light)',
                border: '1px solid var(--primary-purple-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                fontSize: '13px',
                color: '#334155',
                lineHeight: 1.5
              }}
            >
              {alert.remediation || "Remove exposed credentials and rotate affected secrets immediately."}
            </div>
          </div>

          {/* Code Snippet / Fix Command */}
          {alert.codeSnippet && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 className="drawer-section-title" style={{ margin: 0 }}>
                  Fix Snippet / Verification
                </h4>
                <button
                  onClick={copySnippet}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary-purple)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="code-snippet-box">
                {alert.codeSnippet}
              </div>
            </div>
          )}

          {/* Current Status */}
          <div>
            <h4 className="drawer-section-title">Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`alert-status-badge ${isResolved ? 'status-resolved' : 'status-open'}`}>
                Status: {alert.status}
              </span>
              <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                Category: {alert.category || 'Vulnerability'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Full-Width Actions Footer */}
        <div className="bottom-sheet-footer">
          <button 
            className="btn-resolved-action mobile-full-btn"
            onClick={() => {
              onResolve(alert);
              onClose();
            }}
            style={{
              backgroundColor: isResolved ? '#64748b' : 'var(--severity-resolved)'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{isResolved ? 'Mark as Open' : 'Mark as Resolved'}</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
            <button 
              className="btn-secondary mobile-full-btn"
              onClick={() => {
                onIgnore(alert);
                onClose();
              }}
            >
              <ShieldOff size={14} />
              <span>Ignore</span>
            </button>
            <button 
              className="btn-secondary mobile-full-btn"
              onClick={() => {
                onInvestigate(alert);
                onClose();
              }}
            >
              <Terminal size={14} />
              <span>Investigate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
