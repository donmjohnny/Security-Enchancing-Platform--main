import React, { useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  FileCode, 
  Package, 
  Sliders, 
  Network, 
  Lock, 
  Radio, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Layers,
  FileCheck
} from 'lucide-react';

export default function ScanCoverageDetailDrawer({ coverage, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!coverage) return null;

  // Detailed coverage datasets tailored to each scan type
  const coverageDetailsMap = {
    'cov-source': {
      scanType: 'Source Code Scan',
      target: 'Main Repository',
      icon: <FileCode size={20} />,
      metrics: [
        { label: 'Target Repository', val: 'Main Repository' },
        { label: 'Files Scanned', val: '5,874' },
        { label: 'Files With Issues', val: '12' },
        { label: 'Vulnerabilities Found', val: '12' },
        { label: 'Scan Started', val: '09:24 AM' },
        { label: 'Scan Completed', val: '09:27 AM' },
        { label: 'Scan Duration', val: '3 minutes' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 1, high: 3, medium: 5, low: 3 },
      recommendedAction: 'Review and fix the detected vulnerabilities across source files, especially the exposed AWS credentials and SQL query concatenation.',
      itemsListTitle: 'Detected Code Issues & Findings',
      items: [
        { id: 'SRC-01', title: 'Hardcoded AWS IAM secret key in aws-credentials.js', severity: 'Critical', loc: 'src/config/aws-credentials.js:14' },
        { id: 'SRC-02', title: 'SQL Query string concatenation in search controller', severity: 'Critical', loc: 'server/controllers/search.js:55' },
        { id: 'SRC-03', title: 'Unsanitized HTML rendering (XSS vulnerability)', severity: 'High', loc: 'src/components/MarkdownViewer.jsx:22' },
        { id: 'SRC-04', title: 'Weak random number generation in session generator', severity: 'High', loc: 'server/utils/token.js:11' },
        { id: 'SRC-05', title: 'Unescaped regex pattern in input validation', severity: 'Medium', loc: 'server/validators/user.js:38' }
      ]
    },
    'cov-dependencies': {
      scanType: 'Dependency Scan',
      target: 'Package dependencies',
      icon: <Package size={20} />,
      metrics: [
        { label: 'Target', val: 'Package dependencies (package.json)' },
        { label: 'Packages Scanned', val: '38' },
        { label: 'Vulnerable Packages', val: '15' },
        { label: 'Total Dependencies', val: '1,420 (incl. transitive)' },
        { label: 'Scan Started', val: '09:24 AM' },
        { label: 'Scan Completed', val: '09:25 AM' },
        { label: 'Scan Duration', val: '1 minute' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 1, high: 4, medium: 6, low: 4 },
      recommendedAction: 'Upgrade vulnerable dependencies to safe patched releases immediately using npm update / package lock upgrade.',
      itemsListTitle: 'Vulnerable Packages & Recommended Fixes',
      items: [
        { id: 'DEP-01', title: 'react-scripts — Exposed credentials & build injection', severity: 'Critical', loc: 'Upgrade to react-scripts@5.0.1+' },
        { id: 'DEP-02', title: 'lodash — Prototype pollution & command injection (CVE-2021-23337)', severity: 'High', loc: 'Upgrade to lodash@^4.17.21' },
        { id: 'DEP-03', title: 'jsonwebtoken — Insecure signature verification (CVE-2022-23529)', severity: 'High', loc: 'Upgrade to jsonwebtoken@^9.0.0' },
        { id: 'DEP-04', title: 'qs — Object prototype override vulnerability (CVE-2022-24999)', severity: 'High', loc: 'Upgrade to qs@^6.11.0' },
        { id: 'DEP-05', title: 'axios — SSRF bypass via relative URL redirection', severity: 'Medium', loc: 'Upgrade to axios@^1.7.4' }
      ]
    },
    'cov-config': {
      scanType: 'Configuration Scan',
      target: 'Production Configuration',
      icon: <Sliders size={20} />,
      metrics: [
        { label: 'Target', val: 'Production Configuration (Docker / Terraform / Nginx)' },
        { label: 'Configuration Files Scanned', val: '24' },
        { label: 'Issues Found', val: '4' },
        { label: 'Baseline Standard', val: 'CIS Benchmarks v2.4' },
        { label: 'Scan Started', val: '09:27 AM' },
        { label: 'Scan Completed', val: '09:28 AM' },
        { label: 'Scan Duration', val: '1 minute' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 0, high: 1, medium: 2, low: 1 },
      recommendedAction: 'Enable strict HTTP headers with Helmet, restrict S3 bucket ACLs, and enforce secure cookie parameters across staging & production.',
      itemsListTitle: 'Detected Configuration Issues & Remediation',
      items: [
        { id: 'CFG-01', title: 'Open S3 Bucket public read permissions in Terraform', severity: 'High', loc: 'terraform/s3.tf:12 — Enable block_public_acls' },
        { id: 'CFG-02', title: 'Missing Helmet security headers (HSTS / X-Frame-Options)', severity: 'Medium', loc: 'server/app.js:42 — Enable helmet middleware' },
        { id: 'CFG-03', title: 'Insecure cookie flags (HttpOnly & Secure missing)', severity: 'Medium', loc: 'server/session.js:18 — Set secure: true' },
        { id: 'CFG-04', title: 'Docker container running as root user', severity: 'Low', loc: 'Dockerfile:18 — Add USER node directive' }
      ]
    },
    'cov-apis': {
      scanType: 'API Security Scan',
      target: 'REST APIs & Endpoints',
      icon: <Network size={20} />,
      metrics: [
        { label: 'Target', val: 'OpenAPI 3.0 / REST Endpoints' },
        { label: 'Endpoints Scanned', val: '86' },
        { label: 'Issues Found', val: '2' },
        { label: 'Authentication Checked', val: 'Bearer JWT / OAuth2' },
        { label: 'Scan Started', val: '09:28 AM' },
        { label: 'Scan Completed', val: '09:29 AM' },
        { label: 'Scan Duration', val: '1 minute' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 0, high: 1, medium: 1, low: 0 },
      recommendedAction: 'Implement express-rate-limit on authentication endpoints and restrict CORS wildcard origins to trusted domain whitelist.',
      itemsListTitle: 'Affected Endpoints & Remediation',
      items: [
        { id: 'API-01', title: 'Missing Rate Limiting on authentication route', severity: 'High', loc: 'POST /api/v1/auth/login — Add 5 req/15min limiter' },
        { id: 'API-02', title: 'Permissive CORS policy allows wildcard origins (*)', severity: 'Medium', loc: 'ALL /api/v1/* — Restrict to nexusteam.com' }
      ]
    },
    'cov-auth': {
      scanType: 'Access Control Scan',
      target: 'User Permissions & Authentication',
      icon: <Lock size={20} />,
      metrics: [
        { label: 'Target', val: 'User Permissions & Role Policies' },
        { label: 'Security Checks', val: '42' },
        { label: 'Issues Found', val: '1' },
        { label: 'MFA Status', val: 'Enforced for Admin Roles' },
        { label: 'Scan Started', val: '09:29 AM' },
        { label: 'Scan Completed', val: '09:30 AM' },
        { label: 'Scan Duration', val: '1 minute' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 0, high: 0, medium: 1, low: 0 },
      recommendedAction: 'Enforce inactivity session termination after 30 minutes for privileged organization roles.',
      itemsListTitle: 'Affected Permission Controls',
      items: [
        { id: 'AUTH-01', title: 'Session lifetime exceeding 24h without re-authentication', severity: 'Medium', loc: 'IAM Policy: Set MaxSessionDuration to 1800s' }
      ]
    },
    'cov-exposed': {
      scanType: 'Exposed Assets Scan',
      target: 'Public Assets & Repositories',
      icon: <Radio size={20} />,
      metrics: [
        { label: 'Target', val: 'Public DNS, Subdomains & Repositories' },
        { label: 'Assets Scanned', val: '141' },
        { label: 'Issues Found', val: '1' },
        { label: 'Exposed Endpoints', val: '1 directory' },
        { label: 'Scan Started', val: '09:30 AM' },
        { label: 'Scan Completed', val: '09:31 AM' },
        { label: 'Scan Duration', val: '1 minute' },
        { label: 'Scan Status', val: 'Completed' }
      ],
      severityCounts: { critical: 0, high: 0, medium: 1, low: 0 },
      recommendedAction: 'Block web server access to .git metadata and hidden directories using Nginx rule or Cloudflare WAF.',
      itemsListTitle: 'Affected Assets & Public Exposure',
      items: [
        { id: 'EXP-01', title: 'Public Git Directory exposure on web root', severity: 'Medium', loc: 'https://nexusteam.com/.git/config' }
      ]
    }
  };

  const details = coverageDetailsMap[coverage.id] || {
    scanType: coverage.title,
    target: 'General Target',
    icon: <FileCode size={20} />,
    metrics: [
      { label: 'Scan Type', val: coverage.title },
      { label: 'Items Scanned', val: coverage.scannedCount },
      { label: 'Issues Found', val: String(coverage.issuesCount) },
      { label: 'Status', val: coverage.status }
    ],
    severityCounts: { critical: 0, high: 0, medium: coverage.issuesCount, low: 0 },
    recommendedAction: 'Review and remediate any anomalies identified during this scan.',
    itemsListTitle: 'Findings',
    items: []
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-purple-light)',
                color: 'var(--primary-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {details.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {details.scanType}
              </h3>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                Target: {details.target}
              </span>
            </div>
          </div>

          <button className="icon-btn-ghost" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {/* Status & Severity Summary Pills */}
          <div>
            <h4 className="drawer-section-title">Severity Breakdown</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              <span className="badge-severity critical">
                Critical: {details.severityCounts.critical}
              </span>
              <span className="badge-severity high">
                High: {details.severityCounts.high}
              </span>
              <span className="badge-severity medium">
                Medium: {details.severityCounts.medium}
              </span>
              <span className="badge-severity low">
                Low: {details.severityCounts.low}
              </span>
              <span className="badge-secure" style={{ marginLeft: 'auto' }}>
                <CheckCircle2 size={12} />
                Status: Completed
              </span>
            </div>
          </div>

          {/* Metric Grid */}
          <div>
            <h4 className="drawer-section-title">Scan Telemetry & Execution</h4>
            <div className="drawer-meta-grid" style={{ marginTop: '6px' }}>
              {details.metrics.map((m, idx) => (
                <div key={idx} className="drawer-meta-item">
                  <span className="drawer-meta-label">{m.label}</span>
                  <span className="drawer-meta-val" style={{ fontFamily: m.label.includes('Started') || m.label.includes('Completed') ? 'var(--font-mono)' : undefined }}>
                    {m.val}
                  </span>
                </div>
              ))}
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
                padding: '14px 16px',
                fontSize: '13px',
                color: '#334155',
                lineHeight: 1.5,
                marginTop: '6px'
              }}
            >
              {details.recommendedAction}
            </div>
          </div>

          {/* Specific Findings List */}
          {details.items.length > 0 && (
            <div>
              <h4 className="drawer-section-title">{details.itemsListTitle}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {details.items.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #eaedf5',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                      <span className={`badge-severity ${item.severity.toLowerCase()}`} style={{ minWidth: '60px', padding: '2px 8px', fontSize: '11px' }}>
                        {item.severity}
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                      {item.loc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="drawer-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn-primary"
            onClick={onClose}
          >
            <span>Acknowledge Findings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
