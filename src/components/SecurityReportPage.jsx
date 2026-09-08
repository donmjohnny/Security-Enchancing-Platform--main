import React, { useState } from 'react';
import { 
  Download, 
  FileDown, 
  Share2, 
  Clock, 
  Calendar, 
  Hash, 
  CheckCircle2, 
  FileCode, 
  Package, 
  Sliders, 
  Network, 
  Lock, 
  Radio, 
  ShieldAlert, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronRight,
  Eye,
  Sparkles,
  Globe
} from 'lucide-react';
import ScanScoreGauge from './ScanScoreGauge';
import ScanResultsTable from './ScanResultsTable';
import ShareReportModal from './ShareReportModal';
import ScanCoverageDetailDrawer from './ScanCoverageDetailDrawer';
import { 
  scanReportMeta, 
  scanScoreData, 
  scanSummaryCardsData, 
  scanCoverageRows, 
  reportVulnerabilityCounts, 
  detailedScanResultsData, 
  topVulnerabilitiesReport, 
  passedChecksReport, 
  remediationStatusData, 
  scanTimelineEvents, 
  assessmentSummaryText 
} from '../data/mockData';

export default function SecurityReportPage({ 
  onViewAllVulnerabilities, 
  onSelectVulnerability,
  onShowToast
}) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCoverage, setSelectedCoverage] = useState(null);

  // Map icons dynamically
  const getIcon = (name) => {
    switch (name) {
      case 'FileCode': return <FileCode size={18} />;
      case 'Package': return <Package size={18} />;
      case 'Sliders': return <Sliders size={18} />;
      case 'Network': return <Network size={18} />;
      case 'Lock': return <Lock size={18} />;
      case 'Radio': return <Radio size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'ShieldAlert': return <ShieldAlert size={18} />;
      default: return <CheckCircle2 size={18} />;
    }
  };

  // Handle Download JSON / CSV summary
  const handleDownloadReport = () => {
    const reportData = {
      meta: scanReportMeta,
      score: scanScoreData,
      summary: scanSummaryCardsData,
      coverage: scanCoverageRows,
      vulnerabilities: reportVulnerabilityCounts,
      remediation: remediationStatusData,
      results: detailedScanResultsData
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Security-Scan-Report-${scanReportMeta.scanId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast("Security Scan Report downloaded as JSON");
  };

  // Handle Print / PDF Export
  const handleExportPDF = () => {
    window.print();
    if (onShowToast) onShowToast("Print / PDF Export dialog opened");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ====================================================================
          PAGE HEADER
          ==================================================================== */}
      <div className="page-title-banner">
        <div>
          <h1>Security Scan Report</h1>
          <p>Complete overview of the security scan, scanned assets, vulnerabilities, and remediation status.</p>
        </div>

        <div className="page-title-actions">
          <button className="btn-secondary" onClick={handleDownloadReport}>
            <Download size={15} />
            <span>Download Report</span>
          </button>
          <button className="btn-secondary" onClick={handleExportPDF}>
            <FileDown size={15} />
            <span>Export PDF</span>
          </button>
          <button className="btn-primary" onClick={() => setIsShareModalOpen(true)}>
            <Share2 size={15} />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {/* Scan Meta Banner */}
      <div className="scan-meta-banner">
        <div className="scan-meta-item">
          <Hash size={15} style={{ color: 'var(--primary-purple)' }} />
          <span>Scan ID:</span>
          <code>{scanReportMeta.scanId}</code>
        </div>
        <div className="scan-meta-item">
          <Calendar size={15} style={{ color: '#64748b' }} />
          <span>Scan Date:</span>
          <strong>{scanReportMeta.scanDate}</strong>
        </div>
        <div className="scan-meta-item">
          <Clock size={15} style={{ color: '#64748b' }} />
          <span>Scan Duration:</span>
          <strong>{scanReportMeta.scanDuration}</strong>
        </div>
        <div className="scan-meta-item">
          <CheckCircle2 size={15} style={{ color: 'var(--severity-resolved)' }} />
          <span>Scan Status:</span>
          <span className="badge-secure">
            {scanReportMeta.scanStatus}
          </span>
        </div>
      </div>

      {/* ====================================================================
          1. OVERALL SECURITY SCORE
          ==================================================================== */}
      <ScanScoreGauge scoreData={scanScoreData} />

      {/* ====================================================================
          2. SCAN SUMMARY (5 summary cards in one row)
          ==================================================================== */}
      <section className="summary-cards-grid-5" aria-label="Scan Summary Metrics">
        {scanSummaryCardsData.map((card) => (
          <div key={card.id} className="summary-card">
            <div className="summary-card-header">
              <span className="summary-card-title">{card.title}</span>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #eaedf5',
                  color: card.accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {getIcon(card.iconName)}
              </div>
            </div>

            <div className="summary-card-number">
              {card.value}
            </div>

            <div className="summary-card-desc">
              {card.subtitle}
            </div>
          </div>
        ))}
      </section>

      {/* ====================================================================
          3. WHAT WAS SCANNED (SCAN COVERAGE)
          ==================================================================== */}
      <section className="ui-card" aria-label="Scan Coverage">
        <div className="ui-card-header">
          <div>
            <h2 className="ui-card-title">Scan Coverage</h2>
            <p className="ui-card-subtitle">Audited surfaces, components, and telemetry scope</p>
          </div>
        </div>

        <div className="coverage-list">
          {scanCoverageRows.map((row) => (
            <div key={row.id} className="coverage-row">
              <div className="coverage-icon-box">
                {getIcon(row.icon)}
              </div>

              <div className="coverage-info">
                <h4>{row.title}</h4>
                <p>{row.details}</p>
              </div>

              <div>
                <span className="coverage-count-tag">
                  {row.scannedCount} {row.scannedLabel}
                </span>
              </div>

              <div>
                <span className="badge-secure">
                  <CheckCircle2 size={12} />
                  {row.status}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span 
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: row.issuesCount > 5 ? 'var(--severity-critical-text)' : '#c2410c',
                    backgroundColor: row.issuesCount > 5 ? 'var(--severity-critical-badge)' : 'var(--severity-high-badge)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-pill)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {row.issuesCount} Issues
                </span>

                <button 
                  className="btn-action-sm"
                  onClick={() => setSelectedCoverage(row)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          4. VULNERABILITY SUMMARY + 8. REMEDIATION STATUS (Two-column layout)
          ==================================================================== */}
      <div className="two-col-grid">
        {/* 4. Vulnerability Summary */}
        <section className="ui-card" aria-label="Vulnerability Summary">
          <div className="ui-card-header" style={{ marginBottom: '12px' }}>
            <div>
              <h2 className="ui-card-title">Vulnerability Summary</h2>
              <p className="ui-card-subtitle">Breakdown by severity score</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '12px 0 20px' }}>
            {[
              { label: 'Critical', count: reportVulnerabilityCounts.critical, color: 'var(--severity-critical)', bg: 'var(--severity-critical-bg)' },
              { label: 'High', count: reportVulnerabilityCounts.high, color: 'var(--severity-high)', bg: 'var(--severity-high-bg)' },
              { label: 'Medium', count: reportVulnerabilityCounts.medium, color: 'var(--severity-medium)', bg: 'var(--severity-medium-bg)' },
              { label: 'Low', count: reportVulnerabilityCounts.low, color: 'var(--severity-low)', bg: 'var(--severity-low-bg)' }
            ].map((sev) => {
              const pct = Math.round((sev.count / reportVulnerabilityCounts.total) * 100);
              return (
                <div key={sev.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ width: '70px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sev.label}
                  </span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: sev.color, borderRadius: '9999px' }} />
                  </div>
                  <span style={{ minWidth: '24px', textAlign: 'right', fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {sev.count}
                  </span>
                </div>
              );
            })}
          </div>

          <div 
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {reportVulnerabilityCounts.total} Total Vulnerabilities
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--severity-critical-text)', fontWeight: 600, marginTop: '2px' }}>
                {reportVulnerabilityCounts.immediateAttention} require immediate attention
              </div>
            </div>
            <button className="btn-secondary" onClick={onViewAllVulnerabilities}>
              Inspect All →
            </button>
          </div>
        </section>

        {/* 8. Remediation Status */}
        <section className="ui-card" aria-label="Remediation Status">
          <div className="ui-card-header" style={{ marginBottom: '12px' }}>
            <div>
              <h2 className="ui-card-title">Remediation Status</h2>
              <p className="ui-card-subtitle">Patching & resolution pipeline progress</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
            <div style={{ background: '#ecfdf5', padding: '14px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#047857' }}>
                {remediationStatusData.resolved}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#065f46', marginTop: '2px' }}>
                Resolved
              </div>
            </div>

            <div style={{ background: '#fff7ed', padding: '14px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#c2410c' }}>
                {remediationStatusData.inProgress}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#9a3412', marginTop: '2px' }}>
                In Progress
              </div>
            </div>

            <div style={{ background: '#fff1f3', padding: '14px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#e11d48' }}>
                {remediationStatusData.open}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#9f1239', marginTop: '2px' }}>
                Open
              </div>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="remediation-bar-wrapper">
            <div 
              className="remediation-fill-resolved" 
              style={{ width: `${(remediationStatusData.resolved / 35) * 100}%` }}
              title={`Resolved: ${remediationStatusData.resolved}`}
            />
            <div 
              className="remediation-fill-inprogress" 
              style={{ width: `${(remediationStatusData.inProgress / 35) * 100}%` }}
              title={`In Progress: ${remediationStatusData.inProgress}`}
            />
            <div 
              className="remediation-fill-open" 
              style={{ width: `${(remediationStatusData.open / 35) * 100}%` }}
              title={`Open: ${remediationStatusData.open}`}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {remediationStatusData.text}
            </span>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 16px', fontSize: '13px' }}
              onClick={() => onShowToast && onShowToast("Opening remediation sprint roadmap")}
            >
              View Remediation Plan
            </button>
          </div>
        </section>
      </div>

      {/* ====================================================================
          5. DETAILED SCAN RESULTS (INTERACTIVE TABLE)
          ==================================================================== */}
      <ScanResultsTable data={detailedScanResultsData} />

      {/* ====================================================================
          6. TOP VULNERABILITIES DETECTED
          ==================================================================== */}
      <section className="ui-card" aria-label="Top Vulnerabilities Detected">
        <div className="ui-card-header">
          <div>
            <h2 className="ui-card-title">Top Vulnerabilities Detected</h2>
            <p className="ui-card-subtitle">Highest severity issues requiring engineering review</p>
          </div>
          <button className="btn-secondary" onClick={onViewAllVulnerabilities}>
            View All Vulnerabilities ({reportVulnerabilityCounts.total}) →
          </button>
        </div>

        <div className="top-vulns-grid">
          {topVulnerabilitiesReport.map((vuln) => (
            <div key={vuln.id} className="top-vuln-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className={`badge-severity ${vuln.severity.toLowerCase()}`}>
                    {vuln.severity}
                  </span>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#64748b', fontWeight: 600 }}>
                    {vuln.cve}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {vuln.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
                  {vuln.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12.5px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Asset: </span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{vuln.asset}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Risk Score: </span>
                    <strong style={{ color: vuln.riskScore >= 9 ? 'var(--severity-critical)' : 'var(--severity-high)' }}>
                      {vuln.riskScore} / 10.0
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                <span className="alert-status-badge status-open">
                  Status: {vuln.status}
                </span>
                <button 
                  className="btn-action-sm"
                  onClick={() => onSelectVulnerability(vuln.id)}
                >
                  View Vulnerability
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          7. PASSED SECURITY CHECKS (GREEN THEMED)
          ==================================================================== */}
      <section className="passed-checks-container" aria-label="Passed Security Checks">
        <div className="passed-checks-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={22} style={{ color: 'var(--severity-resolved)' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#14532d' }}>
                Passed Security Checks
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#166534', marginTop: '2px' }}>
              Core system baselines validated without integrity anomalies
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#14532d' }}>
              5,839 Checks Passed
            </div>
            <span className="badge-secure" style={{ marginTop: '4px' }}>
              <CheckCircle2 size={12} />
              No action required
            </span>
          </div>
        </div>

        <div className="passed-checks-list">
          {passedChecksReport.map((chk, i) => (
            <div key={i} className="passed-check-item">
              <div 
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <span>{chk}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          9. SCAN TIMELINE
          ==================================================================== */}
      <section className="ui-card" aria-label="Scan Timeline">
        <div className="ui-card-header" style={{ marginBottom: '16px' }}>
          <div>
            <h2 className="ui-card-title">Scan Timeline</h2>
            <p className="ui-card-subtitle">Execution sequence of telemetry pipelines</p>
          </div>
        </div>

        <div className="timeline-list" style={{ paddingLeft: '24px' }}>
          {scanTimelineEvents.map((ev, index) => (
            <div key={index} className="timeline-item">
              <span 
                className={`timeline-dot ${
                  ev.status === 'success' 
                    ? 'dot-emerald' 
                    : (ev.status === 'warning' ? 'dot-rose' : (ev.status === 'complete' ? 'dot-black' : 'dot-purple'))
                }`} 
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--primary-purple)' }}>
                  {ev.time}
                </span>
                <span className="timeline-content-text" style={{ margin: 0 }}>
                  — {ev.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          10. FINAL REPORT SUMMARY
          ==================================================================== */}
      <section className="assessment-summary-card" aria-label="Security Assessment Summary">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Sparkles size={20} style={{ color: 'var(--primary-purple)' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Security Assessment Summary
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {assessmentSummaryText}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Overall Status:
              </span>
              <span className="badge-risk-status moderate" style={{ margin: 0 }}>
                <AlertTriangle size={14} />
                Moderate Risk
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
            <button className="btn-secondary" onClick={handleDownloadReport}>
              <Download size={14} />
              <span>Download Full Report</span>
            </button>
            <button className="btn-primary" onClick={onViewAllVulnerabilities}>
              <span>View All Vulnerabilities</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      <ShareReportModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        scanMeta={scanReportMeta} 
      />

      {/* Scan Coverage View Details Drawer */}
      <ScanCoverageDetailDrawer 
        coverage={selectedCoverage} 
        onClose={() => setSelectedCoverage(null)} 
      />
    </div>
  );
}
