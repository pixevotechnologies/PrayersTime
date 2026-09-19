import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  MapPin,
  ChevronDown,
  ChevronUp,
  Compass,
  Calendar,
  Share2,
  Sparkles,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { LocationData, AppSettings } from '../../types';
import { SPECIAL_PRAYER_INTENTS, MULTILINGUAL_SEO_TEMPLATES, SupportedLanguage } from '../../services/seoData';
import { calculateSpecialPrayerTiming } from '../../services/specialPrayerCalculator';
import { updateSeoTags } from '../../services/seoManager';
import { POPULAR_CITIES, EnrichedCity } from '../../services/citiesData';

interface SpecialPrayerPageProps {
  intentId: string; // 'ishraq' | 'duha' | 'chasht' | 'tahajjud' | 'awabeen' | 'fajr' | 'sunrise' | 'maghrib' | 'makruh'
  currentLocation: LocationData;
  settings: AppSettings;
  language?: SupportedLanguage;
  citySlug?: string | null;
  onNavigate: (route: string) => void;
  onSelectCity?: (city: EnrichedCity) => void;
}

export const SpecialPrayerPage: React.FC<SpecialPrayerPageProps> = ({
  intentId,
  currentLocation,
  settings,
  language = 'en',
  citySlug,
  onNavigate,
  onSelectCity,
}) => {
  const intent = SPECIAL_PRAYER_INTENTS[intentId] || SPECIAL_PRAYER_INTENTS.ishraq;
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  // Dynamic calculation
  const timing = calculateSpecialPrayerTiming(intent.id, currentLocation, new Date(), settings);

  // Multilingual SEO template lookup
  const langTemplates = MULTILINGUAL_SEO_TEMPLATES[language] || MULTILINGUAL_SEO_TEMPLATES.en;
  const seoTemplate = langTemplates[intent.id] || langTemplates.ishraq;

  // Update Dynamic SEO Tags & Schema.org JSON-LD
  useEffect(() => {
    const cityName = currentLocation.city;
    const countryName = currentLocation.country;
    const title = seoTemplate?.titleTemplate
      ? seoTemplate.titleTemplate(cityName, countryName)
      : `${intent.primaryName} Time in ${cityName} Today | Prayerstime`;
    const description = seoTemplate?.metaDescription
      ? seoTemplate.metaDescription(cityName, countryName)
      : `Today's accurate ${intent.primaryName} (${intent.arabicName}) in ${cityName}, ${countryName}. Verified timing window ${timing.windowStart} - ${timing.windowEnd}, authentic Hadith virtues, and prayer rules.`;
    
    // Exact canonical path with city if scoped to a city, always normalized with trailing slash
    const effectiveCitySlug = citySlug || (currentLocation.city && currentLocation.city !== 'London' ? currentLocation.city.toLowerCase().replace(/\s+/g, '-') : null);
    const canonicalPath = effectiveCitySlug
      ? `/${intent.routeSlug}/${effectiveCitySlug}/`
      : `/${intent.routeSlug}/`;

    updateSeoTags({
      title,
      description,
      canonicalPath,
      language: (language as SupportedLanguage) || 'en',
      ogType: 'article',
      breadcrumbs: [
        { name: seoTemplate?.breadcrumbs?.home || 'Home', path: '/' },
        { name: seoTemplate?.breadcrumbs?.prayerTimes || 'Prayer Times', path: '/prayer-times/' },
        { name: `${intent.primaryName} in ${cityName}`, path: canonicalPath },
      ],
      faqs: intent.faqs,
    });
  }, [intent, currentLocation, timing, language, citySlug, seoTemplate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${intent.primaryName} in ${currentLocation.city}`,
          text: `Today's ${intent.primaryName} in ${currentLocation.city}: ${timing.windowStart} - ${timing.windowEnd}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = () => {
    if (timing.status === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Active Now · {timing.countdownText}
        </span>
      );
    }
    if (timing.status === 'upcoming') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300/60 dark:border-sky-800">
          <Clock className="w-3.5 h-3.5" />
          Upcoming · {timing.countdownText}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
        <CheckCircle2 className="w-3.5 h-3.5 text-stone-500" />
        Passed for Today
      </span>
    );
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Breadcrumbs for SEO & UX */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 dark:text-stone-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              onClick={() => onNavigate('prayer-times')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Prayer Times
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-stone-800 dark:text-stone-200 truncate">
            {intent.primaryName} in {currentLocation.city}
          </li>
        </ol>
      </nav>

      {/* Hero Header Section */}
      <header className="space-y-4 border-b border-stone-200 dark:border-emerald-950/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Islamic Prayer Timings</span>
            <span>·</span>
            <span className="font-arabic font-normal text-sm text-stone-600 dark:text-stone-300">
              {intent.arabicName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors text-xs font-medium inline-flex items-center gap-1.5"
              title="Share this timing"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Copied URL!' : 'Share'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {seoTemplate?.h1 ? (
            seoTemplate.h1(currentLocation.city, currentLocation.country)
          ) : (
            <>
              {intent.primaryName} in{' '}
              <span className="text-emerald-700 dark:text-emerald-400 underline decoration-emerald-500/30">
                {currentLocation.city}
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
          {intent.briefDescription}
        </p>

        {/* City Location Pill Switcher */}
        <div className="pt-2 flex items-center gap-2 flex-wrap text-xs text-stone-500">
          <span className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {currentLocation.city}, {currentLocation.country} ({currentLocation.timezone})
          </span>
          <span className="text-stone-300 dark:text-stone-700">|</span>
          <span>Switch city:</span>
          {POPULAR_CITIES.slice(0, 6).map((c) => (
            <button
              key={c.city}
              onClick={() => {
                if (onSelectCity) onSelectCity(c);
              }}
              className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
                c.city === currentLocation.city
                  ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-emerald-500'
              }`}
            >
              {c.city}
            </button>
          ))}
        </div>
      </header>

      {/* Main Timing Hero Card */}
      <section className="bg-gradient-to-br from-emerald-900 via-[#0a382b] to-[#06241c] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Main Time Range */}
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-xs text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Today's Verified Time Window</span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {timing.windowStart}
              </span>
              <span className="text-2xl sm:text-3xl text-emerald-400 font-light">to</span>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-200">
                {timing.windowEnd}
              </span>
            </div>

            {timing.recommendedTime && (
              <p className="text-sm text-emerald-200/90 pt-1">
                ⭐ <strong className="text-white">Most Virtuous (Afdal) Time:</strong> around{' '}
                <span className="font-semibold text-amber-300 underline decoration-amber-400/40">
                  {timing.recommendedTime}
                </span>{' '}
                (when the morning sun is elevated).
              </p>
            )}
          </div>

          {/* Astronomical Reference Panel */}
          <div className="bg-black/25 backdrop-blur-xs rounded-xl p-4 border border-emerald-700/40 space-y-2 text-xs">
            <h2 className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" />
              Astronomical Solar Markers
            </h2>
            <div className="grid grid-cols-2 gap-2 text-stone-300 pt-1">
              <div>
                <span className="text-stone-400 block text-[10px]">Sunrise</span>
                <span className="font-semibold text-white">{timing.astronomicalContext.sunrise}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Solar Noon (Zawal)</span>
                <span className="font-semibold text-white">{timing.astronomicalContext.solarNoon}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Sunset (Maghrib)</span>
                <span className="font-semibold text-white">{timing.astronomicalContext.sunset}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Last Third Night</span>
                <span className="font-semibold text-white">{timing.astronomicalContext.lastThirdStart}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prophetic Hadith & Scholarly Evidence Section */}
      <section className="bg-white dark:bg-[#101b18] rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-emerald-950/60 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            Prophetic Hadith & Religious Significance
          </h2>
        </div>

        {/* Hadith Quote Card */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl p-5 border-l-4 border-emerald-600 dark:border-emerald-500 space-y-3">
          <blockquote className="text-sm sm:text-base text-stone-800 dark:text-stone-200 italic font-medium leading-relaxed">
            "{intent.hadithText}"
          </blockquote>
          <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Reference: {intent.hadithSource}</span>
          </div>
        </div>

        {/* Fiqh Rulings Breakdown */}
        <div className="space-y-3 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          <h3 className="text-base font-semibold text-stone-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600" />
            Juristic Consensus & Timing Boundaries
          </h3>
          <p>{intent.rulingsOverview}</p>

          {intent.commonConfusionNote && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
              <strong className="block font-semibold">Important Clarification:</strong>
              <p>{intent.commonConfusionNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* Practical Guide: How to Pray */}
      <section className="bg-stone-50 dark:bg-[#131f1c] rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-emerald-950/50 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
          How to Perform {intent.primaryName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0c1412] border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Number of Rak`ahs</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Offered as 2, 4, or up to 8 rak`ahs, prayed in units of two with salam at each pair.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0c1412] border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Recitation & Surahs</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Recite Surah Al-Fatihah followed by any portion of the Qur'an, such as Surah Ash-Shams, Ad-Duha, or Al-Kafirun.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0c1412] border border-stone-200/80 dark:border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Supplication & Gratitude</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Conclude with sincere du'a, seeking forgiveness (Istighfar) and expressing gratitude for bodily health and sustenance.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section with Accordion */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            Frequently Asked Questions About {intent.primaryName} in {currentLocation.city}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Answers grounded in authenticated Sunnah, classical fiqh consensus, and astronomical calculation.
          </p>
        </div>

        <div className="space-y-3">
          {intent.faqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-stone-200 dark:border-emerald-950/60 bg-white dark:bg-[#101b18] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Comprehensive Internal Linking Grid */}
      <section className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
          Explore Related Prayers & Services in {currentLocation.city}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(SPECIAL_PRAYER_INTENTS)
            .filter((p) => p.id !== intent.id)
            .slice(0, 6)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(`intent-${p.id}`)}
                className="p-3.5 rounded-xl text-left bg-stone-50 dark:bg-[#111b19] border border-stone-200 dark:border-emerald-950/40 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 block">
                    {p.primaryName}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    in {currentLocation.city}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
        </div>

        {/* Quick Hub Jump Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <button
            onClick={() => onNavigate('prayer-times')}
            className="p-4 rounded-xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 hover:shadow-md transition-all text-left space-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <Clock className="w-4 h-4" />
              <span>Full Daily Timetable</span>
            </div>
            <p className="text-xs text-stone-500">
              Fajr, Dhuhr, Asr, Maghrib, and Isha for {currentLocation.city}.
            </p>
          </button>

          <button
            onClick={() => onNavigate('qibla')}
            className="p-4 rounded-xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 hover:shadow-md transition-all text-left space-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <Compass className="w-4 h-4" />
              <span>Qibla Direction</span>
            </div>
            <p className="text-xs text-stone-500">
              Exact compass bearing from {currentLocation.city} to the Kaaba.
            </p>
          </button>

          <button
            onClick={() => onNavigate('islamic-calendar')}
            className="p-4 rounded-xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 hover:shadow-md transition-all text-left space-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <Calendar className="w-4 h-4" />
              <span>Hijri Calendar</span>
            </div>
            <p className="text-xs text-stone-500">
              Islamic lunar date and upcoming spiritual occasions.
            </p>
          </button>
        </div>
      </section>
    </article>
  );
};
