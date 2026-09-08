import React, { useState, useRef, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children, isRefreshing }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startYRef = useRef(0);
  const containerRef = useRef(null);
  const maxPull = 80;
  const threshold = 55;

  const handleTouchStart = (e) => {
    // Only allow pull to refresh when scrolled to top
    if (window.scrollY <= 5 || (containerRef.current && containerRef.current.scrollTop <= 5)) {
      startYRef.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;

    if (diff > 0) {
      // Apply resistance curve
      const distance = Math.min(diff * 0.45, maxPull);
      setPullDistance(distance);
    } else {
      setPullDistance(0);
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling) return;
    setIsPulling(false);

    if (pullDistance >= threshold && !isRefreshing) {
      setPullDistance(threshold);
      onRefresh();
    } else {
      setPullDistance(0);
    }
  };

  useEffect(() => {
    if (!isRefreshing) {
      setPullDistance(0);
    }
  }, [isRefreshing]);

  return (
    <div 
      ref={containerRef}
      className="pull-to-refresh-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Pull Indicator */}
      <div 
        className={`pull-indicator-box ${isRefreshing ? 'is-refreshing' : ''}`}
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 10 ? Math.min(pullDistance / threshold, 1) : 0,
          transform: `translateY(${Math.min(pullDistance - 35, 0)}px)`
        }}
        aria-hidden="true"
      >
        <div className="pull-spinner-circle">
          <RotateCw 
            size={16} 
            className={isRefreshing ? 'is-spinning' : ''} 
            style={{ 
              transform: isRefreshing ? undefined : `rotate(${pullDistance * 4}deg)` 
            }}
          />
        </div>
        <span className="pull-text-label">
          {isRefreshing ? 'Refreshing telemetry...' : (pullDistance >= threshold ? 'Release to refresh' : 'Pull down to refresh')}
        </span>
      </div>

      {children}
    </div>
  );
}
