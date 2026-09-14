import React from 'react';
import { BrandLogo } from './BrandLogo';
import { LocationData, AppSettings } from '../../types';
import { CALCULATION_METHOD_LABELS } from '../../services/prayerTimes';
import { ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../services/seoData';
import { useLanguage } from '../../services/i18n';

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
  language: propLanguage,
  onSelectCity,
  onSelectLanguage,
}) => {
  const { t, language, setLanguage } = useLanguage();
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

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    if (onSelectLanguage) {
      onSelectLanguage(langCode);
    }
  };

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-emerald-950/60 bg-[#f7f5f0] dark:bg-[#09100e] text-stone-600 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={false} onClick={() => onNavigate('home')} />
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              {t('footer.mission')}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40 text-[11px] font-medium text-emerald-900 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{t('footer.astronomical')}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/50 dark:bg-[#131f1c] border border-stone-300/40 dark:border-emerald-900/30 text-[11px] font-medium text-stone-700 dark:text-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('footer.adFree')}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-stone-200/50 dark:bg-[#131f1c] text-xs text-stone-500 dark:text-stone-400 border border-stone-300/40 dark:border-emerald-900/30">
                <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                  {t('dash.calculationMethod')}:
                </span>
                <span className="truncate block font-medium">{methodLabel}</span>
                <span className="block mt-1 text-[11px] text-stone-400">
                  {t('prayer.asr')}: {settings.madhab === 'hanafi' ? 'Hanafi' : 'Standard'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Special & Voluntary Prayers (SEO Intents) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              {t('dash.specialPrayers')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('intent-ishraq')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.ishraq')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-duha')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.duha')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-tahajjud')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.tahajjud')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-awabeen')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.awabeen')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-fajr')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.fajr')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-sunrise')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.sunrise')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intent-maghrib')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('prayer.maghrib')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
              {t('footer.cityPrayers')}
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              {popularCityLinks.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    if (onSelectCity) onSelectCity(city.name);
                    else onNavigate('prayer-times');
                  }}
                  className="text-left rtl:text-right py-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Authority, Methodology & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-1">
              {t('footer.authority')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right font-medium text-emerald-800 dark:text-emerald-400"
                >
                  {t('footer.methodology')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editorial-policy')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('footer.editorial')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('footer.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('footer.contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {t('footer.terms')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Multilingual Strip for SEO & Users */}
        <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">{t('nav.language')}:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
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
            © {currentYear} Prayerstime.online — {t('footer.rights')}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>{t('footer.astronomical')}</span>
            <span>·</span>
            <span>Global Ummah</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
