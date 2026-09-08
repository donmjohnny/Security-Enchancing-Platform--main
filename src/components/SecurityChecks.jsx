import React from 'react';
import { Check, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SecurityChecks({ checks }) {
  return (
    <section className="ui-card" aria-label="Validated Security Checks">
      <div className="ui-card-header" style={{ marginBottom: '16px' }}>
        <div>
          <h2 className="ui-card-title">Security Checks</h2>
          <p className="ui-card-subtitle">
            Systems and assets currently operating without detected security issues.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--severity-resolved)' }}>
            All 6 Baseline Systems Healthy
          </span>
        </div>
      </div>

      <div className="checks-grid">
        {checks.map((check) => (
          <div key={check.id} className="check-item-card">
            <div className="check-item-left">
              <div className="check-icon-circle">
                <Check size={18} strokeWidth={2.8} />
              </div>
              <div className="check-item-text">
                <h4>{check.title}</h4>
                <p>{check.description}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span className="badge-secure">
                <CheckCircle2 size={12} strokeWidth={2.5} />
                Secure
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
                {check.itemsChecked}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
