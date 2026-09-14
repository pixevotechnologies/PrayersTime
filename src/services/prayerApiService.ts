import {
  AppSettings,
  CalculationMethodId,
  LocationData,
  PrayerName,
  PrayerTimeItem,
} from '../types';
import {
  calculateDailyPrayers,
  calculateMonthlyTimetable,
  DayPrayerResults,
  formatTime,
  getHijriDate,
} from './prayerTimes';

// Aladhan Calculation Method IDs
const METHOD_ID_MAP: Record<CalculationMethodId, number> = {
  Karachi: 1,
  NorthAmerica: 2,
  MuslimWorldLeague: 3,
  UmmAlQura: 4,
  Egyptian: 5,
  Tehran: 7,
  Kuwait: 9,
  Qatar: 10,
  Singapore: 11,
  MoonsightingCommittee: 15,
  Dubai: 16,
};

// Aladhan School IDs (0 = Shafi/Hanbali/Maliki, 1 = Hanafi)
const SCHOOL_ID_MAP: Record<'shafi' | 'hanafi', number> = {
  shafi: 0,
  hanafi: 1,
};

// Guarantee at least 30 days retention (we store for 35 days)
const CACHE_TTL_MS = 35 * 24 * 60 * 60 * 1000;
const CACHE_KEY_PREFIX = 'prayerstime_offline_api_v1_';

export interface AladhanApiDay {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset?: string;
    Maghrib: string;
    Isha: string;
    Imsak?: string;
    Midnight?: string;
    Firstthird?: string;
    Lastthird?: string;
  };
  date: {
    readable: string;
    timestamp: string;
    gregorian: {
      date: string; // DD-MM-YYYY
      day: string;
      month: { number: number; en: string };
      year: string;
    };
    hijri: {
      date: string;
      day: string;
      month: { number: number; en: string; ar: string };
      year: string;
    };
  };
}

export interface CachedMonthEntry {
  cacheKey: string;
  latitude: number;
  longitude: number;
  year: number;
  month: number; // 1-12
  method: CalculationMethodId;
  madhab: 'shafi' | 'hanafi';
  fetchedAt: number;
  expiresAt: number; // timestamp in ms (at least 30 days ahead)
  source: 'api' | 'local_astronomical';
  days: AladhanApiDay[];
}

export interface CacheStatus {
  isCached: boolean;
  daysCached: number;
  lastSynced: Date | null;
  expiresAt: Date | null;
  source: 'api' | 'local_astronomical' | 'none';
}

function cleanTimeStr(raw: string): string {
  if (!raw) return '00:00';
  // Remove timezone offsets e.g. "04:54 (+03)" -> "04:54"
  const match = raw.match(/(\d{1,2}:\d{2})/);
  return match ? match[1] : raw.trim();
}

function formatCleanTime(time24: string, format: '12h' | '24h'): string {
  const parts = time24.split(':');
  if (parts.length < 2) return time24;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  if (format === '24h') {
    return `${h.toString().padStart(2, '0')}:${m}`;
  }
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
}

function getCacheKey(
  lat: number,
  lng: number,
  year: number,
  month: number,
  method: CalculationMethodId,
  madhab: 'shafi' | 'hanafi'
): string {
  return `${CACHE_KEY_PREFIX}${lat.toFixed(2)}_${lng.toFixed(2)}_${year}_${month}_${method}_${madhab}`;
}

class PrayerApiService {
  private syncInProgress = false;

  /**
   * Reads a cached month entry from localStorage
   */
  public getCachedMonth(
    lat: number,
    lng: number,
    year: number,
    month: number,
    method: CalculationMethodId,
    madhab: 'shafi' | 'hanafi'
  ): CachedMonthEntry | null {
    try {
      const key = getCacheKey(lat, lng, year, month, method, madhab);
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const entry: CachedMonthEntry = JSON.parse(raw);
      const now = Date.now();

      // Ensure cache hasn't expired (guarantees 30+ days validity)
      if (entry.expiresAt && entry.expiresAt < now) {
        localStorage.removeItem(key);
        return null;
      }

      return entry;
    } catch {
      return null;
    }
  }

  /**
   * Retrieves cached day data for a given date, if available in the 30-day offline cache
   */
  public getCachedDay(
    location: LocationData,
    targetDate: Date,
    settings: AppSettings
  ): AladhanApiDay | null {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    const monthEntry = this.getCachedMonth(
      location.latitude,
      location.longitude,
      year,
      month,
      settings.method,
      settings.madhab
    );

    if (!monthEntry || !monthEntry.days) return null;

    const dayStr = day.toString().padStart(2, '0');
    return (
      monthEntry.days.find(
        (d) =>
          d.date?.gregorian?.day === dayStr ||
          parseInt(d.date?.gregorian?.day, 10) === day
      ) || null
    );
  }

  /**
   * Saves a month entry to localStorage
   */
  public saveCachedMonth(entry: CachedMonthEntry): void {
    try {
      const key = entry.cacheKey;
      localStorage.setItem(key, JSON.stringify(entry));
      this.dispatchCacheUpdate();
    } catch (err) {
      console.warn('[PrayerApiService] Failed to save offline cache to localStorage:', err);
    }
  }

  /**
   * Generates a synthetic month payload using local astronomical calculation (Adhan)
   * used as an offline/network fallback so that 30+ days are always guaranteed to be cached
   */
  private generateLocalMonthFallback(
    location: LocationData,
    year: number,
    month: number,
    settings: AppSettings
  ): CachedMonthEntry {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days: AladhanApiDay[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const targetDate = new Date(year, month - 1, d);
      const dayPrayers = calculateDailyPrayers(location, targetDate, settings);
      const hijri = getHijriDate(targetDate, settings.hijriAdjustment);

      const getTime = (name: PrayerName) => {
        const found = dayPrayers.prayers.find((p) => p.name === name);
        if (!found) return '00:00';
        return formatTime(found.dateObj, '24h', location.timezone);
      };

      const dayStr = d.toString().padStart(2, '0');
      const monthStr = month.toString().padStart(2, '0');

      days.push({
        timings: {
          Fajr: getTime('Fajr'),
          Sunrise: getTime('Sunrise'),
          Dhuhr: getTime('Dhuhr'),
          Asr: getTime('Asr'),
          Maghrib: getTime('Maghrib'),
          Isha: getTime('Isha'),
          Imsak: formatTime(dayPrayers.imsakTime, '24h', location.timezone),
          Lastthird: formatTime(dayPrayers.sunnahTimes.lastThirdOfTheNight, '24h', location.timezone),
        },
        date: {
          readable: targetDate.toDateString(),
          timestamp: Math.floor(targetDate.getTime() / 1000).toString(),
          gregorian: {
            date: `${dayStr}-${monthStr}-${year}`,
            day: dayStr,
            month: { number: month, en: targetDate.toLocaleString('en-US', { month: 'long' }) },
            year: year.toString(),
          },
          hijri: {
            date: `${hijri.day.toString().padStart(2, '0')}-${hijri.month.toString().padStart(2, '0')}-${hijri.year}`,
            day: hijri.day.toString(),
            month: { number: hijri.month, en: hijri.monthNameEn, ar: hijri.monthNameAr },
            year: hijri.year.toString(),
          },
        },
      });
    }

    const cacheKey = getCacheKey(
      location.latitude,
      location.longitude,
      year,
      month,
      settings.method,
      settings.madhab
    );

    const now = Date.now();
    return {
      cacheKey,
      latitude: location.latitude,
      longitude: location.longitude,
      year,
      month,
      method: settings.method,
      madhab: settings.madhab,
      fetchedAt: now,
      expiresAt: now + CACHE_TTL_MS, // 35 days (at least 30 days)
      source: 'local_astronomical',
      days,
    };
  }

  /**
   * Fetches a single month from Aladhan API or returns cached/fallback
   */
  public async fetchMonthData(
    location: LocationData,
    year: number,
    month: number,
    settings: AppSettings,
    forceRefresh: boolean = false
  ): Promise<CachedMonthEntry> {
    const lat = location.latitude;
    const lng = location.longitude;
    const methodId = METHOD_ID_MAP[settings.method] ?? 4;
    const schoolId = SCHOOL_ID_MAP[settings.madhab] ?? 0;

    // 1. Check local cache first unless forced
    if (!forceRefresh) {
      const cached = this.getCachedMonth(lat, lng, year, month, settings.method, settings.madhab);
      if (cached && cached.days && cached.days.length > 0) {
        return cached;
      }
    }

    // 2. Attempt fetching from Aladhan API (intercepted & cached by Service Worker PWA layer too)
    try {
      const apiUrl = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=${methodId}&school=${schoolId}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        if (json.code === 200 && Array.isArray(json.data) && json.data.length > 0) {
          const now = Date.now();
          const entry: CachedMonthEntry = {
            cacheKey: getCacheKey(lat, lng, year, month, settings.method, settings.madhab),
            latitude: lat,
            longitude: lng,
            year,
            month,
            method: settings.method,
            madhab: settings.madhab,
            fetchedAt: now,
            expiresAt: now + CACHE_TTL_MS, // 35 days (at least 30 days)
            source: 'api',
            days: json.data,
          };
          this.saveCachedMonth(entry);
          return entry;
        }
      }
    } catch (err) {
      console.info('[PrayerApiService] Network fetch bypassed or failed, using local astronomical fallback:', err);
    }

    // 3. Fallback: generate high-accuracy astronomical calculation and store locally
    const fallbackEntry = this.generateLocalMonthFallback(location, year, month, settings);
    this.saveCachedMonth(fallbackEntry);
    return fallbackEntry;
  }

  /**
   * Pre-fetches and synchronizes prayer times for at least 30 days (covers current month + next month = 30 to 60 days)
   */
  public async sync30DayCache(
    location: LocationData,
    settings: AppSettings,
    forceRefresh: boolean = false
  ): Promise<{ success: boolean; daysCached: number; fromApi: boolean; expiresAt: Date }> {
    if (this.syncInProgress) {
      const status = this.getCacheStatus(location, settings);
      return {
        success: true,
        daysCached: status.daysCached,
        fromApi: status.source === 'api',
        expiresAt: status.expiresAt || new Date(Date.now() + CACHE_TTL_MS),
      };
    }

    this.syncInProgress = true;
    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1; // 1-12

      // Next month calculation
      const nextMonthDate = new Date(currentYear, today.getMonth() + 1, 1);
      const nextYear = nextMonthDate.getFullYear();
      const nextMonth = nextMonthDate.getMonth() + 1;

      // Fetch both current month and next month in parallel
      const [m1, m2] = await Promise.all([
        this.fetchMonthData(location, currentYear, currentMonth, settings, forceRefresh),
        this.fetchMonthData(location, nextYear, nextMonth, settings, forceRefresh),
      ]);

      const totalDays = (m1.days?.length || 0) + (m2.days?.length || 0);
      const fromApi = m1.source === 'api' || m2.source === 'api';
      const expiresAt = new Date(Math.min(m1.expiresAt, m2.expiresAt));

      return {
        success: true,
        daysCached: totalDays,
        fromApi,
        expiresAt,
      };
    } catch (err) {
      console.warn('[PrayerApiService] 30-day sync encountered an error:', err);
      return {
        success: false,
        daysCached: 0,
        fromApi: false,
        expiresAt: new Date(Date.now() + CACHE_TTL_MS),
      };
    } finally {
      this.syncInProgress = false;
      this.dispatchCacheUpdate();
    }
  }

  /**
   * Checks the status of the local 30-day prayer cache
   */
  public getCacheStatus(location: LocationData, settings: AppSettings): CacheStatus {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const nextMonthDate = new Date(currentYear, today.getMonth() + 1, 1);
    const nextYear = nextMonthDate.getFullYear();
    const nextMonth = nextMonthDate.getMonth() + 1;

    const m1 = this.getCachedMonth(
      location.latitude,
      location.longitude,
      currentYear,
      currentMonth,
      settings.method,
      settings.madhab
    );
    const m2 = this.getCachedMonth(
      location.latitude,
      location.longitude,
      nextYear,
      nextMonth,
      settings.method,
      settings.madhab
    );

    if (!m1 && !m2) {
      return {
        isCached: false,
        daysCached: 0,
        lastSynced: null,
        expiresAt: null,
        source: 'none',
      };
    }

    const daysCount = (m1?.days?.length || 0) + (m2?.days?.length || 0);
    const lastSyncedTs = Math.max(m1?.fetchedAt || 0, m2?.fetchedAt || 0);
    const expiresAtTs = Math.max(m1?.expiresAt || 0, m2?.expiresAt || 0);
    const source = (m1?.source === 'api' || m2?.source === 'api') ? 'api' : 'local_astronomical';

    return {
      isCached: daysCount >= 28, // At least 28-30 days
      daysCached: daysCount,
      lastSynced: lastSyncedTs ? new Date(lastSyncedTs) : null,
      expiresAt: expiresAtTs ? new Date(expiresAtTs) : null,
      source,
    };
  }

  /**
   * Clears the prayer offline cache
   */
  public clearCache(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_KEY_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      this.dispatchCacheUpdate();
    } catch {
      // ignore
    }
  }

  /**
   * Dispatches a custom event to notify React components
   */
  private dispatchCacheUpdate(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prayerstime:cache-updated'));
    }
  }
}

export const prayerApiService = new PrayerApiService();
