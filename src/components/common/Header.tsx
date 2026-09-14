import React, { useState } from 'react';
import {
  MapPin,
  Moon,
  Sun,
  Monitor,
  Settings,
  Menu,
  X,
  Compass,
  Calendar,
  Sparkles,
  Clock,
  Wrench,
  Globe,
  Check,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { LocationData } from '../../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES, useLanguage } from '../../services/i18n';
import { useTheme, ThemeMode } from '../../services/themeContext';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  location: LocationData;
  onOpenLocationModal: () => void;
  onOpenSettingsModal: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  language?: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  location,
  onOpenLocationModal,
  onOpenSettingsModal,
  darkMode: propDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
  language: propLanguage,
  onSelectLanguage: propOnSelectLanguage,
}) => {
  const { language: ctxLanguage, setLanguage: ctxSetLanguage, t } = useLanguage();
  const { theme, actualTheme, isDark, setTheme } = useTheme();

  const currentLanguage = propLanguage || ctxLanguage;
  const handleSelectLanguage = (l: SupportedLanguage) => {
    if (propOnSelectLanguage) {
      propOnSelectLanguage(l);
    } else {
      ctxSetLanguage(l);
    }
  };

  const handleCycleTheme = () => {
    if (propOnToggleDarkMode) {
      propOnToggleDarkMode();
    } else {
      if (theme === 'light') {
        setTheme('dark');
      } else if (theme === 'dark') {
        setTheme('system');
      } else {
        setTheme('light');
      }
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.dashboard'), icon: Clock },
    { id: 'prayer-times', label: t('nav.prayerTimes'), icon: Clock },
    { id: 'qibla', label: t('nav.qibla'), icon: Compass },
    { id: 'islamic-calendar', label: t('nav.calendar'), icon: Calendar },
    { id: 'ramadan', label: t('nav.ramadan'), icon: Sparkles },
    { id: 'tools', label: t('nav.tools'), icon: Wrench },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#0c1412]/90 border-b border-stone-200/80 dark:border-emerald-900/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <BrandLogo
            size="md"
            onClick={() => handleNavClick('home')}
            showTagline={false}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(1).map((item) => {
              const isActive = currentRoute === item.id || (item.id === 'tools' && currentRoute.startsWith('tools'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-switcher-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-[#131f1c] text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer"
              title="Change Language"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold">{currentLangObj.nativeName}</span>
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span>{t('footer.selectLanguage')}</span>
                    <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((l) => {
                      const isSelected = currentLanguage === l.code;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            handleSelectLanguage(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer transition-colors ${
                            isSelected
                              ? 'text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50/60 dark:bg-emerald-950/40'
                              : 'text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{l.nativeName}</span>
                            <span className="text-[10px] text-stone-400">{l.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Location Trigger Pill */}
          <button
            id="header-location-btn"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-[#131f1c] text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer shadow-2xs"
            title="Change city location"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="max-w-[100px] sm:max-w-[140px] truncate font-semibold">
              {location.city}
            </span>
            <span className="hidden sm:inline text-stone-400 dark:text-stone-500">
              · {location.countryCode}
            </span>
          </button>

          {/* PWA Install Button */}
          <div className="hidden sm:block">
            <PWAInstallButton />
          </div>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={handleCycleTheme}
            aria-label={`Theme: ${theme}. Click to switch between Light, Dark, and System.`}
            title={`Current: ${theme === 'light' ? t('theme.light') : theme === 'dark' ? t('theme.dark') : t('theme.system')} (Click to cycle)`}
            className="p-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#131f1c] transition-colors cursor-pointer border border-stone-200/60 dark:border-emerald-900/30"
          >
            {theme === 'system' ? (
              <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : isDark ? (
              <Moon className="w-4 h-4 text-emerald-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Settings Trigger */}
          <button
            id="header-settings-btn"
            onClick={onOpenSettingsModal}
            aria-label="Open Prayer Settings"
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#131f1c] transition-colors cursor-pointer border border-transparent dark:border-emerald-900/20"
            title="Calculation and juristic settings"
          >
            <Settings className="w-4 h-4 text-stone-600 dark:text-stone-300" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#131f1c] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-emerald-950 bg-[#faf8f5] dark:bg-[#0e1715] px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          <div className="pb-2 mb-2 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Navigation
            </span>
            <div className="sm:hidden">
              <PWAInstallButton />
            </div>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === 'tools' && currentRoute.startsWith('tools'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-950/40'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 mt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Location: <strong className="text-stone-800 dark:text-stone-200">{location.city}</strong></span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="text-emerald-700 dark:text-emerald-400 font-semibold underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Theme switcher in mobile drawer */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                {t('theme.appearance')}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    theme === 'light'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{t('theme.light')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    theme === 'dark'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{t('theme.dark')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    theme === 'system'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t('theme.system')}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                {t('footer.selectLanguage')}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {SUPPORTED_LANGUAGES.map((l) => {
                  const isSelected = currentLanguage === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        handleSelectLanguage(l.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`py-1 px-1.5 rounded-lg text-center text-xs transition-colors ${
                        isSelected
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-100'
                      }`}
                    >
                      <span className="block truncate">{l.nativeName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
