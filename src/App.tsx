import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/common/Header';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { Footer } from './components/common/Footer';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { PrayerDashboard } from './components/prayer/PrayerDashboard';
import { PrayerTimesPage } from './components/prayer/PrayerTimesPage';
import { CityPage } from './components/prayer/CityPage';
import { SpecialPrayerPage } from './components/prayer/SpecialPrayerPage';
import { MethodologyPage } from './components/legal/MethodologyPage';
import { EditorialPolicyPage } from './components/legal/EditorialPolicyPage';
import { QiblaCompass } from './components/qibla/QiblaCompass';
import { IslamicCalendarView } from './components/calendar/IslamicCalendarView';
import { RamadanHub } from './components/ramadan/RamadanHub';
import { ToolsHub } from './components/tools/ToolsHub';
import { LocationModal } from './components/modals/LocationModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { StaticPages } from './components/common/StaticPages';
import { DEFAULT_LOCATION, GLOBAL_CITIES, POPULAR_CITIES, EnrichedCity } from './services/citiesData';
import { AppSettings, DEFAULT_SETTINGS, LocationData } from './types';
import { SupportedLanguage, SPECIAL_PRAYER_INTENTS } from './services/seoData';
import { ThemeProvider, useTheme } from './services/themeContext';
import { LanguageProvider, useLanguage } from './services/i18n';

// Map of canonical URL path to internal route ID
const CANONICAL_ROUTE_MAP: Record<string, string> = {
  '/': 'home',
  '/prayer-times': 'prayer-times',
  '/ishraq-prayer-time': 'intent-ishraq',
  '/duha-prayer-time': 'intent-duha',
  '/chasht-prayer-time': 'intent-chasht',
  '/tahajjud-time': 'intent-tahajjud',
  '/awabeen-prayer-time': 'intent-awabeen',
  '/fajr-time': 'intent-fajr',
  '/sunrise-time': 'intent-sunrise',
  '/maghrib-time': 'intent-maghrib',
  '/methodology': 'methodology',
  '/editorial-policy': 'editorial-policy',
  '/qibla': 'qibla',
  '/islamic-calendar': 'islamic-calendar',
  '/ramadan': 'ramadan',
  '/tools': 'tools',
  '/tools/daily-dhikr': 'tools-dhikr',
  '/tools/zakat-calculator': 'tools-zakat',
  '/about': 'about',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/contact': 'contact',
};

function parseRouteFromUrl(): string {
  if (typeof window === 'undefined') return 'home';

  // Check hash first (e.g. #/ishraq-prayer-time or #/city-makkah)
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (hash) {
    if (hash.startsWith('city-') || hash.startsWith('intent-') || hash.startsWith('tools')) {
      return hash;
    }
    const cleanHash = `/${hash}`;
    if (CANONICAL_ROUTE_MAP[cleanHash]) {
      return CANONICAL_ROUTE_MAP[cleanHash];
    }
  }

  // Check clean browser pathname
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (CANONICAL_ROUTE_MAP[pathname]) {
    return CANONICAL_ROUTE_MAP[pathname];
  }

  // Check city route format: /prayer-times/:country/:city or /prayer-times/:city
  if (pathname.startsWith('/prayer-times/')) {
    const parts = pathname.replace('/prayer-times/', '').split('/').filter(Boolean);
    const citySlug = parts.length > 1 ? parts[1] : parts[0];
    if (citySlug) {
      const matchedCity = GLOBAL_CITIES.find(
        (c) =>
          c.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase() ||
          c.city.toLowerCase() === citySlug.toLowerCase()
      );
      if (matchedCity) {
        return `city-${matchedCity.city.toLowerCase().replace(/\s+/g, '-')}`;
      }
    }
  }

  // Check special prayer routes with city: e.g. /ishraq-prayer-time/:city
  for (const [slug, intent] of Object.entries(SPECIAL_PRAYER_INTENTS)) {
    if (pathname.startsWith(`/${intent.routeSlug}/`)) {
      return `intent-${intent.id}`;
    }
  }

  return 'home';
}

function getUrlForRoute(route: string, city?: LocationData): string {
  if (route === 'home') return '/';
  if (route === 'prayer-times') return '/prayer-times';

  if (route.startsWith('city-')) {
    const citySlug = route.replace('city-', '');
    const matched = GLOBAL_CITIES.find(
      (c) => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase()
    );
    if (matched) {
      return `/prayer-times/${matched.country.toLowerCase().replace(/\s+/g, '-')}/${matched.city.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return `/prayer-times/${citySlug}`;
  }

  if (route.startsWith('intent-')) {
    const intentId = route.replace('intent-', '');
    const intent = SPECIAL_PRAYER_INTENTS[intentId];
    if (intent) {
      return `/${intent.routeSlug}`;
    }
  }

  if (route === 'tools-dhikr') return '/tools/daily-dhikr';
  if (route === 'tools-zakat') return '/tools/zakat-calculator';
  if (route === 'methodology') return '/methodology';
  if (route === 'editorial-policy') return '/editorial-policy';

  return `/${route}`;
}

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, dir } = useLanguage();

  // 1. Location State
  const [location, setLocation] = useState<LocationData>(() => {
    if (typeof window !== 'undefined') {
      const savedLoc = localStorage.getItem('prayerstime_location');
      if (savedLoc) {
        try {
          return JSON.parse(savedLoc);
        } catch {
          // fallback to default
        }
      }
    }
    return DEFAULT_LOCATION;
  });

  const handleSelectLocation = (newLoc: LocationData) => {
    setLocation(newLoc);
    localStorage.setItem('prayerstime_location', JSON.stringify(newLoc));
  };

  // 2. Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('prayerstime_settings');
      if (savedSettings) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('prayerstime_settings', JSON.stringify(newSettings));
  };

  // 3. Modals State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // 4. Routing State (Path-based + Hash fallback for full SEO & browser compatibility)
  const [currentRoute, setCurrentRoute] = useState<string>(() => parseRouteFromUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentRoute(parseRouteFromUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = useCallback(
    (route: string) => {
      setCurrentRoute(route);
      const urlPath = getUrlForRoute(route, location);

      // Use HTML5 pushState to maintain clean, crawlable URLs
      try {
        window.history.pushState({ route }, '', urlPath);
      } catch {
        // Fallback for sandboxed iframes where pushState may be restricted
        window.location.hash = `#/${route}`;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [location]
  );

  // Derive city if currentRoute is a specific city page
  const matchedCity = currentRoute.startsWith('city-')
    ? GLOBAL_CITIES.find(
        (c) =>
          c.city.toLowerCase().replace(/\s+/g, '-') ===
          currentRoute.replace('city-', '').toLowerCase()
      )
    : null;

  // Derive special intent if currentRoute is a special prayer page
  const specialIntentId = currentRoute.startsWith('intent-')
    ? currentRoute.replace('intent-', '')
    : null;

  const handleSelectCityFromFooter = (cityName: string) => {
    const matched = GLOBAL_CITIES.find(
      (c) => c.city.toLowerCase() === cityName.toLowerCase()
    );
    if (matched) {
      navigateTo(`city-${matched.city.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigateTo('prayer-times');
    }
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#faf8f5] dark:bg-[#0c1412] text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 transition-colors"
    >
      {/* Top Navigation Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        location={location}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        darkMode={isDark}
        onToggleDarkMode={toggleTheme}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {/* Route View Dispatcher */}
        {currentRoute === 'home' && (
          <PrayerDashboard
            location={location}
            settings={settings}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'prayer-times' && (
          <PrayerTimesPage
            location={location}
            settings={settings}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {matchedCity && (
          <CityPage
            cityLocation={matchedCity}
            settings={settings}
            language={language}
            onSetAsCurrentLocation={(loc) => {
              handleSelectLocation(loc);
              navigateTo('home');
            }}
            onNavigate={navigateTo}
          />
        )}

        {specialIntentId && (
          <SpecialPrayerPage
            intentId={specialIntentId}
            currentLocation={location}
            settings={settings}
            language={language}
            onNavigate={navigateTo}
            onSelectCity={(c) => {
              handleSelectLocation(c);
            }}
          />
        )}

        {currentRoute === 'methodology' && (
          <MethodologyPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'editorial-policy' && (
          <EditorialPolicyPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'qibla' && (
          <QiblaCompass
            location={location}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'islamic-calendar' && (
          <IslamicCalendarView
            location={location}
            settings={settings}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'ramadan' && (
          <RamadanHub
            location={location}
            settings={settings}
            onNavigate={navigateTo}
          />
        )}

        {(currentRoute === 'tools' || currentRoute.startsWith('tools-')) && (
          <ToolsHub
            initialSubTab={currentRoute}
            onNavigate={navigateTo}
          />
        )}

        {(currentRoute === 'about' ||
          currentRoute === 'privacy' ||
          currentRoute === 'terms' ||
          currentRoute === 'contact') && (
          <StaticPages pageType={currentRoute} onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        location={location}
        settings={settings}
        language={language}
        onSelectCity={handleSelectCityFromFooter}
        onSelectLanguage={setLanguage}
      />

      {/* Mobile Bottom Bar for high-touch thumb-friendly UX */}
      <MobileBottomBar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onSelectLocation={handleSelectLocation}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        location={location}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
