import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCw
} from 'lucide-react';

export default function ScanResultsTable({ data }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortField, setSortField] = useState('completedTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const scanTypes = ['All', 'Dependency Scan', 'Source Code Scan', 'Configuration Scan', 'API Security Scan', 'Access Control Scan'];

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Type Filter
      if (typeFilter !== 'All' && item.scanType !== typeFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchScan = item.scanType.toLowerCase().includes(q);
        const matchTarget = item.target.toLowerCase().includes(q);
        if (!matchScan && !matchTarget) return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
  }, [data, typeFilter, searchQuery, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status, statusType) => {
    switch (statusType) {
      case 'completed':
        return <span className="badge-table-status completed"><CheckCircle2 size={12} /> {status}</span>;
      case 'warning':
        return <span className="badge-table-status warning"><AlertTriangle size={12} /> {status}</span>;
      case 'failed':
        return <span className="badge-table-status failed"><XCircle size={12} /> {status}</span>;
      case 'scanning':
        return <span className="badge-table-status scanning"><RotateCw size={12} className="is-spinning" /> {status}</span>;
      default:
        return <span className="badge-table-status completed">{status}</span>;
    }
  };

  return (
    <section className="ui-card" aria-label="Detailed Scan Results Section">
      <div className="ui-card-header">
        <div>
          <h2 className="ui-card-title">Detailed Scan Results</h2>
          <p className="ui-card-subtitle">Granular findings per audited component and subsystem</p>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="search-input-wrapper" style={{ maxWidth: '240px' }}>
            <Search size={14} />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search target or scan..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid #eaedf5',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#334155',
              background: '#ffffff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {scanTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="table-container">
        <table className="scan-results-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('scanType')} style={{ cursor: 'pointer' }}>
                Scan Type {sortField === 'scanType' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('target')} style={{ cursor: 'pointer' }}>
                Target {sortField === 'target' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="align-right" onClick={() => handleSort('itemsScanned')} style={{ cursor: 'pointer' }}>
                Items Scanned {sortField === 'itemsScanned' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="align-right" onClick={() => handleSort('issuesFound')} style={{ cursor: 'pointer' }}>
                Issues Found {sortField === 'issuesFound' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th className="align-right" onClick={() => handleSort('completedTime')} style={{ cursor: 'pointer' }}>
                Completed {sortField === 'completedTime' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {row.scanType}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: '#475569' }}>
                  {row.target}
                </td>
                <td className="align-right" style={{ fontWeight: 600 }}>
                  {row.itemsScanned}
                </td>
                <td className="align-right">
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: row.issuesFound > 5 ? '#ffe4e6' : (row.issuesFound > 0 ? '#ffedd5' : '#f1f5f9'),
                      color: row.issuesFound > 5 ? '#e11d48' : (row.issuesFound > 0 ? '#c2410c' : '#475569'),
                      fontWeight: 700,
                      fontSize: '12px'
                    }}
                  >
                    {row.issuesFound}
                  </span>
                </td>
                <td>
                  {getStatusBadge(row.status, row.statusType)}
                </td>
                <td className="align-right" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#64748b' }}>
                  {row.completedTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="table-pagination">
        <span>
          Showing {paginatedRows.length} of {filteredData.length} entries
        </span>

        <div className="pagination-btn-group">
          <button 
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft size={14} />
          </button>

          <span style={{ fontSize: '12.5px', fontWeight: 600, padding: '0 8px' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button 
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
