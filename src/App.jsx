import React, { useState } from 'react';
import MobileHeader from './components/MobileHeader';
import BottomNavigation from './components/BottomNavigation';
import SummaryCards from './components/SummaryCards';
import AlertsList from './components/AlertsList';
import RecentActivity from './components/RecentActivity';
import AlertDetailsSheet from './components/AlertDetailsSheet';
import SkeletonLoader from './components/SkeletonLoader';
import OriginalScannerView from './components/OriginalScannerView';
import SecurityReportPage from './components/SecurityReportPage';
import PullToRefresh from './components/PullToRefresh';
import { 
  initialAlerts, 
  initialSummary, 
  recentActivityList 
} from './data/mockData';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('alerts'); // 'alerts' | 'report' | 'scanner' | 'home'
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState(recentActivityList);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compute live counts
  const counts = {
    critical: alerts.filter(a => a.severity === 'Critical' && a.status !== 'Resolved').length,
    high: alerts.filter(a => a.severity === 'High' && a.status !== 'Resolved').length,
    medium: alerts.filter(a => a.severity === 'Medium' && a.status !== 'Resolved').length,
    low: alerts.filter(a => a.severity === 'Low' && a.status !== 'Resolved').length,
    resolved: alerts.filter(a => a.severity === 'Resolved' || a.status === 'Resolved').length,
    total: alerts.length
  };

  // Handle Mark as Resolved
  const handleResolveAlert = (alertToResolve) => {
    const isAlreadyResolved = alertToResolve.status === 'Resolved' || alertToResolve.severity === 'Resolved';
    const newStatus = isAlreadyResolved ? 'Open' : 'Resolved';
    const newSeverity = isAlreadyResolved ? (alertToResolve.prevSeverity || 'High') : 'Resolved';

    setAlerts(prev => prev.map(item => {
      if (item.id === alertToResolve.id) {
        return {
          ...item,
          status: newStatus,
          prevSeverity: item.severity !== 'Resolved' ? item.severity : item.prevSeverity,
          severity: newSeverity
        };
      }
      return item;
    }));

    setSelectedAlert(prev => prev ? {
      ...prev,
      status: newStatus,
      severity: newSeverity
    } : null);

    const newAct = {
      id: `act-${Date.now()}`,
      text: isAlreadyResolved 
        ? `${alertToResolve.title} reopened`
        : `${alertToResolve.title} marked as resolved`,
      time: 'Just now',
      type: isAlreadyResolved ? 'info' : 'success',
      dotColor: isAlreadyResolved ? 'purple' : 'emerald'
    };
    setActivities(prev => [newAct, ...prev]);

    showToast(isAlreadyResolved ? `Alert reopened` : `${alertToResolve.title} marked as resolved — Just now`);
  };

  const handleIgnoreAlert = (alertToIgnore) => {
    setAlerts(prev => prev.filter(item => item.id !== alertToIgnore.id));
    setSelectedAlert(null);
    showToast(`Alert ${alertToIgnore.id} ignored`);
  };

  const handleInvestigate = (alert) => {
    showToast(`Investigation session initiated for ${alert.asset}`);
  };

  // Pull-to-refresh handler (no standalone button)
  const handlePullRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Security telemetry refreshed — Just now");
    }, 700);
  };

  const handleSelectVulnById = (id) => {
    const found = alerts.find(a => a.id === id);
    if (found) {
      setSelectedAlert(found);
    } else {
      showToast(`Selected vulnerability ${id}`);
    }
  };

  return (
    <div className="mobile-app-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status">
          <Sparkles size={15} style={{ color: 'var(--primary-purple)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Mobile Top Header (Logo on Left, Notifications & Avatar on Right) */}
      <MobileHeader 
        unreadCount={counts.critical}
        onOpenNotifications={() => showToast("3 high-priority notifications")}
      />

      {/* 2. Main Scrollable Content Area with Native Pull-To-Refresh */}
      <main className="mobile-main-container">
        <PullToRefresh onRefresh={handlePullRefresh} isRefreshing={isRefreshing}>
          {/* ====================================================================
              VIEW: SECURITY ALERTS (MAIN)
              ==================================================================== */}
          {activeView === 'alerts' && (
            <div className="mobile-view-stack">
              {/* Page Header (Title + Subtitle only, NO controls row) */}
              <div className="mobile-page-header">
                <h1>Security Alerts</h1>
                <p>Monitor vulnerabilities, security risks, and system health in real time.</p>
              </div>

              {/* Skeleton Loading State or Live Content */}
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {/* Security Summary Cards (2-Column Mobile Grid) */}
                  <SummaryCards 
                    counts={counts}
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                  />

                  {/* Simplified Active Security Alerts Section */}
                  <AlertsList 
                    alerts={alerts}
                    onSelectAlert={setSelectedAlert}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    counts={counts}
                  />

                  {/* Recent Security Activity Section */}
                  <RecentActivity 
                    activities={activities}
                    onShowAll={() => showToast("Showing all system audit events")}
                  />
                </>
              )}
            </div>
          )}

          {/* ====================================================================
              VIEW: SECURITY SCAN REPORT
              ==================================================================== */}
          {activeView === 'report' && (
            <SecurityReportPage 
              onViewAllVulnerabilities={() => setActiveView('alerts')}
              onSelectVulnerability={handleSelectVulnById}
              onShowToast={showToast}
            />
          )}

          {/* ====================================================================
              VIEW: VULNERABILITY SCANNER
              ==================================================================== */}
          {activeView === 'scanner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="mobile-page-header">
                <h1>Vulnerability Scanner</h1>
                <p>Deep file and dependency static analysis engine</p>
              </div>
              <OriginalScannerView 
                onNavigateToAlerts={() => setActiveView('alerts')}
              />
            </div>
          )}

          {/* ====================================================================
              VIEW: HOME / DASHBOARD OVERVIEW
              ==================================================================== */}
          {activeView === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="mobile-page-header">
                <h1>Dashboard Overview</h1>
                <p>Organization security posture across all monitored assets</p>
              </div>
              <SummaryCards 
                counts={counts}
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setActiveView('alerts');
                }}
              />
              <RecentActivity 
                activities={activities}
                onShowAll={() => showToast("Showing all system audit events")}
              />
            </div>
          )}
        </PullToRefresh>
      </main>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <BottomNavigation 
        activeView={activeView}
        setActiveView={setActiveView}
        counts={counts}
      />

      {/* Alert Details Mobile Bottom Sheet */}
      <AlertDetailsSheet 
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onResolve={handleResolveAlert}
        onIgnore={handleIgnoreAlert}
        onInvestigate={handleInvestigate}
      />
    </div>
  );
}
