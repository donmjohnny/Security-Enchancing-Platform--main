import React, { useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Terminal, 
  Clock, 
  ExternalLink,
  ShieldOff,
  Copy,
  Check
} from 'lucide-react';

export default function AlertDetailsDrawer({ 
  alert, 
  onClose, 
  onResolve, 
  onIgnore,
  onInvestigate 
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="drawer-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <span className={`badge-severity ${alert.severity.toLowerCase()}`}>
              {alert.severity}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {alert.id}
            </span>
          </div>

          <button 
            className="icon-btn-ghost" 
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {/* Main Title & Description */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {alert.title}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {alert.description}
            </p>
          </div>

          {/* Key Metadata Grid */}
          <div className="drawer-meta-grid">
            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Affected Asset</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)' }}>
                {alert.asset}
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Risk CVSS Score</span>
              <span className="drawer-meta-val" style={{ color: alert.cvssScore >= 8 ? 'var(--severity-critical)' : 'var(--severity-high)' }}>
                {alert.cvssScore || '7.5'} / 10.0
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Vulnerability / CVE</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)' }}>
                {alert.cve || 'N/A'}
              </span>
            </div>

            <div className="drawer-meta-item">
              <span className="drawer-meta-label">Detected Time</span>
              <span className="drawer-meta-val">
                {alert.detectedTime}
              </span>
            </div>

            <div className="drawer-meta-item" style={{ gridColumn: 'span 2' }}>
              <span className="drawer-meta-label">Source Location</span>
              <span className="drawer-meta-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                {alert.filePath || 'Repository Root'}
              </span>
            </div>
          </div>

          {/* Recommended Action / Remediation */}
          <div>
            <h4 className="drawer-section-title">Recommended Remediation</h4>
            <div 
              style={{
                backgroundColor: 'var(--primary-purple-light)',
                border: '1px solid var(--primary-purple-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                fontSize: '13.5px',
                color: '#334155',
                lineHeight: 1.5
              }}
            >
              {alert.remediation || "Review the affected code and update configuration parameters to comply with security baseline requirements."}
            </div>
          </div>

          {/* Code Snippet / Fix Command */}
          {alert.codeSnippet && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
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
                    fontWeight: 600,
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

          {/* Current Status Tracker */}
          <div>
            <h4 className="drawer-section-title">Current State</h4>
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

        {/* Footer Actions */}
        <div className="drawer-footer">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn-secondary"
              onClick={() => onIgnore(alert)}
            >
              <ShieldOff size={14} />
              <span>Ignore</span>
            </button>
            <button 
              className="btn-secondary"
              onClick={() => onInvestigate(alert)}
            >
              <Terminal size={14} />
              <span>Investigate</span>
            </button>
          </div>

          <button 
            className="btn-resolved-action"
            onClick={() => onResolve(alert)}
            style={{
              backgroundColor: isResolved ? '#64748b' : 'var(--severity-resolved)'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{isResolved ? 'Mark as Open' : 'Mark as Resolved'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
