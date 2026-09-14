import { useCallback, useEffect, useState } from 'react';
import { AppSettings, LocationData } from '../types';
import { CacheStatus, prayerApiService } from '../services/prayerApiService';

export function usePrayerCache(location: LocationData, settings: AppSettings) {
  const [status, setStatus] = useState<CacheStatus>(() =>
    prayerApiService.getCacheStatus(location, settings)
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const refreshStatus = useCallback(() => {
    setStatus(prayerApiService.getCacheStatus(location, settings));
  }, [location, settings]);

  const syncCache = useCallback(
    async (force: boolean = false) => {
      setIsSyncing(true);
      setSyncMessage(null);
      try {
        const result = await prayerApiService.sync30DayCache(location, settings, force);
        refreshStatus();
        if (result.success) {
          setSyncMessage(
            `${result.daysCached} days cached for offline use (${result.fromApi ? 'Aladhan API' : 'Astronomical'})`
          );
        } else {
          setSyncMessage('Sync completed with local calculations');
        }
      } catch {
        setSyncMessage('Failed to sync cache');
      } finally {
        setIsSyncing(false);
      }
    },
    [location, settings, refreshStatus]
  );

  // Auto-sync in background on mount or when location/settings change
  useEffect(() => {
    refreshStatus();
    // Background sync to ensure at least 30 days are cached
    const timer = setTimeout(() => {
      syncCache(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.latitude, location.longitude, settings.method, settings.madhab, syncCache, refreshStatus]);

  // Listen to custom cache updates or online events
  useEffect(() => {
    const handleUpdate = () => refreshStatus();
    const handleOnline = () => {
      // Re-sync with API when returning online
      syncCache(true);
    };

    window.addEventListener('prayerstime:cache-updated', handleUpdate);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('prayerstime:cache-updated', handleUpdate);
      window.removeEventListener('online', handleOnline);
    };
  }, [refreshStatus, syncCache]);

  return {
    status,
    isSyncing,
    syncMessage,
    syncCache,
    refreshStatus,
    clearCache: () => {
      prayerApiService.clearCache();
      refreshStatus();
    },
  };
}
