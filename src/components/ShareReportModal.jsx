import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Shield, Mail } from 'lucide-react';

export default function ShareReportModal({ isOpen, onClose, scanMeta }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://app.nexusteam.com/reports/${scanMeta?.scanId || 'SCAN-2026-0818-001'}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={20} style={{ color: 'var(--primary-purple)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Share Security Scan Report
            </h3>
          </div>
          <button className="icon-btn-ghost" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Anyone with this private link will have read-only access to the executive summary and remediation metrics for scan <strong>{scanMeta?.scanId}</strong>.
        </p>

        {/* Link box */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #eaedf5',
            borderRadius: '12px',
            padding: '8px 12px'
          }}
        >
          <input
            type="text"
            readOnly
            value={shareUrl}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />
          <button 
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '12.5px' }}
            onClick={handleCopy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Security options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
            <Shield size={15} style={{ color: 'var(--severity-resolved)' }} />
            <span>End-to-end encrypted payload with 7-day expiration</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
            <Globe size={15} style={{ color: 'var(--primary-purple)' }} />
            <span>Requires organization SSO login to view confidential code snippets</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <button className="btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
