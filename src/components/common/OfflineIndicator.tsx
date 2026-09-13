import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-banner"
      role="status"
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-700/95 text-white px-3.5 py-2 text-xs font-medium shadow-xl backdrop-blur-xs border border-amber-500/40"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
      <span>Offline Mode — Astronomical calculations active locally.</span>
    </div>
  );
};
