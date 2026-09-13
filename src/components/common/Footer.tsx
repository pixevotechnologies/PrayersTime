import React from 'react';
import { BrandLogo } from './BrandLogo';
import { LocationData, AppSettings } from '../../types';
import { CALCULATION_METHOD_LABELS } from '../../services/prayerTimes';
import { ShieldCheck, Sparkles, Heart, Globe, BookOpen } from 'lucide-react';
import { POPULAR_CITIES, EnrichedCity } from '../../services/citiesData';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../services/seoData';

interface FooterProps {
  onNavigate: (route: string) => void;
  location: LocationData;
  settings: AppSettings;
  language?: SupportedLanguage;
  onSelectCity?: (cityName: string) => void;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  location,
  settings,
  language = 'en',
  onSelectCity,
  onSelectLanguage,
}) => {
  const currentYear = new Date().getFullYear();
  const methodLabel = CALCULATION_METHOD_LABELS[settings.method]?.name || settings.method;

  const popularCityLinks = [
    { name: 'Makkah', route: 'city-makkah' },
    { name: 'Madinah', route: 'city-madinah' },
    { name: 'Riyadh', route: 'city-riyadh' },
    { name: 'Jeddah', route: 'city-jeddah' },
    { name: 'Jerusalem', route: 'city-jerusalem' },
    { name: 'Cairo', route: 'city-cairo' },
    { name: 'Istanbul', route: 'city-istanbul' },
    { name: 'Dubai', route: 'city-dubai' },
    { name: 'Karachi', route: 'city-karachi' },
    { name: 'Lahore', route: 'city-lahore' },
    { name: 'London', route: 'city-london' },
    { name: 'New York', route: 'city-new-york' },
  ];

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-emerald-950/60 bg-[#f7f5f0] dark:bg-[#09100e] text-stone-600 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={false} onClick={() => onNavigate('home')} />
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              Prayerstime is an independent, distraction-free Islamic platform providing verified prayer calculations, astronomical sunrise/sunset markers, Qibla compass bearings, and daily spiritual companions for the global Ummah.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40 text-[11px] font-medium text-emerald-900 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Astronomically Calculated</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/50 dark:bg-[#131f1c] border border-stone-300/40 dark:border-emerald-900/30 text-[11px] font-medium text-stone-700 dark:text-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ad-Free & Private</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-stone-200/50 dark:bg-[#131f1c] text-xs text-stone-500 dark:text-stone-400 border border-stone-300/40 dark:border-emerald-900/30">
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  Calculation Standard:
                </span>
                <span className="truncate block font-medium">{methodLabel}</span>
                <span className="block mt-1 text-[11px] text-stone-400">
                  Asr: {settings.madhab === 'hanafi' ? 'Hanafi (2x Shadow)' : 'Standard (1x Shadow)'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Special & Voluntary Prayers (SEO Intents) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              Special Prayers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('intent-ishraq')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Ishraq Prayer Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-duha')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Duha & Chasht Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-tahajjud')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Tahajjud & Night Vigil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-awabeen')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Awabeen Prayer Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-fajr')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Fajr Dawn Twilight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-sunrise')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Sunrise & Prohibited Times
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-maghrib')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Maghrib Sunset & Iftar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              City Prayer Times
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              {popularCityLinks.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    if (onSelectCity) onSelectCity(city.name);
                    else onNavigate('prayer-times');
                  }}
                  className="text-left py-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Authority, Methodology & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
              Authority & Standards
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium text-emerald-800 dark:text-emerald-400"
                >
                  Calculation Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editorial-policy')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Editorial & Hadith Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  About Prayerstime
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Multilingual Strip for SEO & Users */}
        <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">Languages:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    if (onSelectLanguage) onSelectLanguage(l.code);
                  }}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    language === l.code
                      ? 'bg-emerald-100 text-emerald-900 font-bold dark:bg-emerald-950 dark:text-emerald-300'
                      : 'hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div>
            © {currentYear} Prayerstime.online — All rights reserved. Dedicated to accurate, accessible Islamic worship.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Verified Celestial Mechanics</span>
            <span>·</span>
            <span>Global Ummah Coverage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
