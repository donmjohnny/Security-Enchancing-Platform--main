import React, { useState } from 'react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

export default function FilterSheet({ 
  isOpen, 
  onClose, 
  filters, 
  onApplyFilters, 
  onClearFilters 
}) {
  const [localSeverity, setLocalSeverity] = useState(filters.severity || 'All');
  const [localStatus, setLocalStatus] = useState(filters.status || 'All');
  const [localAsset, setLocalAsset] = useState(filters.asset || 'All');

  if (!isOpen) return null;

  const severityOptions = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const statusOptions = ['All', 'Open', 'Monitoring', 'Resolved'];
  const assetOptions = ['All Assets', 'react-scripts', 'lodash', 'express', 'Source Repository', 'jsonwebtoken', 'aws-s3-bucket'];

  const handleApply = () => {
    onApplyFilters({
      severity: localSeverity,
      status: localStatus,
      asset: localAsset === 'All Assets' ? 'All' : localAsset
    });
    onClose();
  };

  const handleReset = () => {
    setLocalSeverity('All');
    setLocalStatus('All');
    setLocalAsset('All Assets');
    onClearFilters();
    onClose();
  };

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bottom-sheet-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drag Handle */}
        <div className="bottom-sheet-handle-bar">
          <div className="bottom-sheet-drag-handle" />
        </div>

        {/* Header */}
        <div className="bottom-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} style={{ color: 'var(--primary-purple)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Filter Security Alerts
            </h3>
          </div>

          <button className="mobile-icon-btn" onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="bottom-sheet-body">
          {/* 1. Severity Filter */}
          <div>
            <label className="drawer-section-title">Severity Level</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {severityOptions.map((sev) => {
                const isSelected = localSeverity === sev;
                return (
                  <button
                    key={sev}
                    type="button"
                    className={`filter-choice-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setLocalSeverity(sev)}
                  >
                    <span>{sev}</span>
                    {isSelected && <Check size={13} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Status Filter */}
          <div>
            <label className="drawer-section-title">Alert Status</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {statusOptions.map((st) => {
                const isSelected = localStatus === st;
                return (
                  <button
                    key={st}
                    type="button"
                    className={`filter-choice-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setLocalStatus(st)}
                  >
                    <span>{st}</span>
                    {isSelected && <Check size={13} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Asset Target Filter */}
          <div>
            <label className="drawer-section-title">Monitored Asset / Package</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {assetOptions.map((ass) => {
                const isSelected = (localAsset === ass) || (localAsset === 'All' && ass === 'All Assets');
                return (
                  <button
                    key={ass}
                    type="button"
                    className={`filter-choice-btn font-mono ${isSelected ? 'active' : ''}`}
                    onClick={() => setLocalAsset(ass)}
                  >
                    <span>{ass}</span>
                    {isSelected && <Check size={13} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bottom-sheet-footer">
          <button className="btn-primary mobile-full-btn" onClick={handleApply}>
            Apply Filters
          </button>
          <button className="btn-secondary mobile-full-btn" onClick={handleReset}>
            <RotateCcw size={14} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
