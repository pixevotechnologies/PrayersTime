import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-banner"
      role="status"
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-[#1c1917]/95 dark:bg-[#0c1412]/95 text-stone-100 px-3.5 py-2.5 text-xs font-medium shadow-2xl backdrop-blur-md border border-amber-500/50 animate-in slide-in-from-bottom-3 duration-300"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
      </span>
      <div className="flex items-center gap-1.5">
        <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Offline Mode</span>
        <span className="text-stone-400">·</span>
        <span className="text-amber-300 font-semibold inline-flex items-center gap-1">
          <Database className="w-3 h-3" />
          30-Day Prayer Cache Active
        </span>
      </div>
    </div>
  );
};

