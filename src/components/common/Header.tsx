import React, { useState } from 'react';
import {
  MapPin,
  Moon,
  Sun,
  Settings,
  Menu,
  X,
  Compass,
  Calendar,
  Sparkles,
  Clock,
  Wrench,
  Globe,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { LocationData } from '../../types';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../services/seoData';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  location: LocationData;
  onOpenLocationModal: () => void;
  onOpenSettingsModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  language?: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  location,
  onOpenLocationModal,
  onOpenSettingsModal,
  darkMode,
  onToggleDarkMode,
  language = 'en',
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Clock },
    { id: 'prayer-times', label: 'Prayer Times', icon: Clock },
    { id: 'qibla', label: 'Qibla', icon: Compass },
    { id: 'islamic-calendar', label: 'Calendar', icon: Calendar },
    { id: 'ramadan', label: 'Ramadan', icon: Sparkles },
    { id: 'tools', label: 'Daily Tools', icon: Wrench },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

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
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-[#131f1c] text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer"
              title="Change Language"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{currentLangObj.name.substring(0, 2).toUpperCase()}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 dark:border-stone-800">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      if (onSelectLanguage) onSelectLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer ${
                      language === l.code
                        ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-stone-400 font-arabic text-[11px]">{l.nativeName}</span>
                  </button>
                ))}
              </div>
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
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-[#131f1c] transition-colors cursor-pointer border border-transparent dark:border-emerald-900/20"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
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
          <div className="pt-2 mt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
            <span>Location: {location.city}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocationModal();
              }}
              className="text-emerald-700 dark:text-emerald-400 font-semibold underline"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
