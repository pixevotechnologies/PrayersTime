import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { AppSettings, LocationData } from '../../types';
import {
  calculateDailyPrayers,
  calculateLiveCountdown,
  getHijriDate,
  getQiblaInfo,
  CALCULATION_METHOD_LABELS,
} from '../../services/prayerTimes';
import { updateSeoTags } from '../../services/seoManager';
import { SupportedLanguage } from '../../services/seoData';

interface CityPageProps {
  cityLocation: LocationData;
  settings: AppSettings;
  language?: SupportedLanguage;
  onSetAsCurrentLocation: (loc: LocationData) => void;
  onNavigate: (route: string) => void;
}

export const CityPage: React.FC<CityPageProps> = ({
  cityLocation,
  settings,
  language = 'en',
  onSetAsCurrentLocation,
  onNavigate,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const prayersData = calculateDailyPrayers(cityLocation, currentDate, settings);
  const [countdown, setCountdown] = useState(() =>
    calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers)
  );
  const hijri = getHijriDate(currentDate, settings.hijriAdjustment);
  const qibla = getQiblaInfo(cityLocation.latitude, cityLocation.longitude);

  const fajrTime = prayersData.prayers.find((p) => p.name === 'Fajr')?.time || '05:00 AM';
  const maghribTime = prayersData.prayers.find((p) => p.name === 'Maghrib')?.time || '06:30 PM';
  const dhuhrTime = prayersData.prayers.find((p) => p.name === 'Dhuhr')?.time || '12:15 PM';

  const cityFaqs = [
    {
      q: `What time is Fajr in ${cityLocation.city} today?`,
      a: `Fajr prayer starts at ${fajrTime} in ${cityLocation.city} today, based on astronomical dawn twilight calculated via the ${CALCULATION_METHOD_LABELS[settings.method]?.name || settings.method} method.`,
    },
    {
      q: `What time is Maghrib (Iftar) in ${cityLocation.city}?`,
      a: `Maghrib begins at ${maghribTime} in ${cityLocation.city}, which is the exact moment of sunset and the start of Iftar for fasting Muslims.`,
    },
    {
      q: `How is Asr time calculated in ${cityLocation.city}?`,
      a: `Asr time is calculated using the ${settings.madhab === 'hanafi' ? 'Hanafi (shadow ratio 2x)' : 'Standard Shafi/Maliki/Hanbali (shadow ratio 1x)'} juristic convention. You can toggle this anytime in Prayer Settings.`,
    },
    {
      q: `What is the Qibla direction from ${cityLocation.city}?`,
      a: `The Qibla direction from ${cityLocation.city} is ${qibla.bearing}° (${qibla.cardinal}) with an approximate distance of ${qibla.distanceKm.toLocaleString()} km to the Holy Kaaba in Makkah.`,
    },
  ];

  // Update dynamic SEO tags & JSON-LD
  useEffect(() => {
    const title = `Prayer Times in ${cityLocation.city}, ${cityLocation.country} Today | Prayerstime`;
    const description = `Accurate Islamic prayer times in ${cityLocation.city}, ${cityLocation.country} today: Fajr ${fajrTime}, Dhuhr ${dhuhrTime}, Maghrib ${maghribTime}, Qibla bearing ${qibla.bearing}°, and Hijri date.`;
    const canonicalPath = `/prayer-times/${cityLocation.country.toLowerCase().replace(/\s+/g, '-')}/${cityLocation.city.toLowerCase().replace(/\s+/g, '-')}`;

    updateSeoTags({
      title,
      description,
      canonicalPath,
      language: (language as SupportedLanguage) || 'en',
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Prayer Times', path: '/prayer-times' },
        { name: cityLocation.country, path: `/prayer-times/${cityLocation.country.toLowerCase().replace(/\s+/g, '-')}` },
        { name: cityLocation.city, path: canonicalPath },
      ],
      faqs: cityFaqs,
    });
  }, [cityLocation, fajrTime, maghribTime, dhuhrTime, qibla.bearing, language, settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setCountdown(calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers));
    }, 1000);
    return () => clearInterval(timer);
  }, [prayersData]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Prayer Times in ${cityLocation.city}`,
          text: `Today's prayer times in ${cityLocation.city}: Fajr ${fajrTime}, Maghrib ${maghribTime}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 dark:text-stone-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors">
              Home
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button onClick={() => onNavigate('prayer-times')} className="hover:text-emerald-600 transition-colors">
              Prayer Times
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <span>{cityLocation.country}</span>
          <li aria-hidden="true">/</li>
          <li className="text-emerald-700 dark:text-emerald-400 font-semibold">{cityLocation.city}</li>
        </ol>
      </nav>

      {/* City Header */}
      <header className="pb-4 border-b border-stone-200 dark:border-emerald-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {cityLocation.city}, {cityLocation.country} · {cityLocation.timezone}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Prayer Times in {cityLocation.city}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl">
            Verified Islamic prayer timetable, solar countdown, Qibla compass bearing, and Hijri calendar for believers in {cityLocation.city}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetAsCurrentLocation(cityLocation)}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Set as Default City
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c19] text-stone-600 dark:text-stone-300 hover:bg-stone-50 text-xs font-medium transition-colors cursor-pointer"
            title="Share or Copy Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copied && <span className="text-xs text-emerald-600 font-medium">Copied!</span>}
        </div>
      </header>

      {/* Hero Overview Box for City */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Next prayer in city */}
        <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#032e24] text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Next Prayer in {cityLocation.city}
            </span>
            <span className="text-xs font-arabic text-emerald-200">{hijri.formatted}</span>
          </div>

          <div className="mt-4 flex items-baseline justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold">{prayersData.nextPrayer?.name}</h2>
              <span className="text-2xl sm:text-3xl font-mono text-emerald-100 font-semibold mt-1 block">
                {prayersData.nextPrayer?.time}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-200 uppercase tracking-wider">Remaining</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-amber-300 block">
                {countdown.formattedRemaining}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-700/40 flex flex-wrap items-center justify-between text-xs text-emerald-100/80 gap-2">
            <span>Date: {formattedDate}</span>
            <span>Method: {CALCULATION_METHOD_LABELS[settings.method]?.name}</span>
          </div>
        </div>

        {/* Right Col: Qibla for this city */}
        <div className="rounded-3xl bg-[#f7f5f0] dark:bg-[#101a17] p-6 border border-stone-200 dark:border-emerald-950/60 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Compass className="w-4 h-4" />
              <span>Qibla Direction</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {qibla.bearing}° ({qibla.cardinal})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Direct compass bearing from {cityLocation.city} toward the Holy Kaaba. Distance: ~{qibla.distanceKm.toLocaleString()} km.
            </p>
          </div>

          <button
            onClick={() => onNavigate('qibla')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Qibla Compass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Complete Timetable Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          Today's 5 Daily Prayers & Sunrise in {cityLocation.city}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {prayersData.prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`rounded-2xl p-4 border transition-all ${
                prayer.isNext
                  ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-[#101a17] border-stone-200 dark:border-emerald-950/60'
              }`}
            >
              <div className="flex items-center justify-between text-sm font-bold">
                <span
                  className={
                    prayer.isNext
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-stone-800 dark:text-stone-200'
                  }
                >
                  {prayer.name}
                </span>
                <span className="font-arabic text-stone-400 dark:text-stone-500">
                  {prayer.arabicName}
                </span>
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-stone-900 dark:text-stone-100">
                {prayer.time}
              </div>
              <span className="text-[11px] text-stone-400 block mt-0.5">{prayer.meaning}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Special Prayers in this City (SEO & Intent Links) */}
      <section className="bg-emerald-50/50 dark:bg-[#0e1916] rounded-2xl p-6 sm:p-8 border border-emerald-200/60 dark:border-emerald-900/40 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg sm:text-xl font-bold">
            Special & Voluntary Prayers in {cityLocation.city}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          Access verified start and end times for non-obligatory Sunnah and Nafl prayers in {cityLocation.city}:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <button
            onClick={() => onNavigate('intent-ishraq')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#13221e] border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500 text-left transition-all group cursor-pointer"
          >
            <span className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 block">
              Ishraq Prayer Time
            </span>
            <span className="text-xs text-stone-500">15-20 min post-sunrise</span>
          </button>

          <button
            onClick={() => onNavigate('intent-duha')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#13221e] border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500 text-left transition-all group cursor-pointer"
          >
            <span className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 block">
              Duha (Chasht) Time
            </span>
            <span className="text-xs text-stone-500">Forenoon until Zawal</span>
          </button>

          <button
            onClick={() => onNavigate('intent-tahajjud')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#13221e] border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500 text-left transition-all group cursor-pointer"
          >
            <span className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 block">
              Tahajjud & Qiyam
            </span>
            <span className="text-xs text-stone-500">Last third of the night</span>
          </button>

          <button
            onClick={() => onNavigate('intent-awabeen')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#13221e] border border-stone-200 dark:border-emerald-900/40 hover:border-emerald-500 text-left transition-all group cursor-pointer"
          >
            <span className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 block">
              Awabeen Prayer
            </span>
            <span className="text-xs text-stone-500">Post-Maghrib 6 rak'ahs</span>
          </button>
        </div>
      </section>

      {/* City FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          Frequently Asked Questions About Prayer Times in {cityLocation.city}
        </h2>
        <div className="space-y-3">
          {cityFaqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-stone-200 dark:border-emerald-950/60 bg-white dark:bg-[#101b18] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-900 dark:text-white hover:text-emerald-700 cursor-pointer"
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
                  <div className="px-4 pb-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Calculation Details and Transparency */}
      <section className="rounded-2xl p-6 bg-[#f7f5f0] dark:bg-[#101a17] border border-stone-200 dark:border-emerald-950/60 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2>Astronomical Calculation & Juristic Parameters for {cityLocation.city}</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Prayer times for {cityLocation.city} (Latitude: {cityLocation.latitude.toFixed(4)}°, Longitude: {cityLocation.longitude.toFixed(4)}°) are derived using precise solar position formulas. The calculation convention applied is <strong>{CALCULATION_METHOD_LABELS[settings.method]?.name}</strong> with the <strong>{settings.madhab === 'hanafi' ? 'Hanafi' : 'Standard (Shafi/Maliki/Hanbali)'}</strong> Asr shadow rule.
        </p>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('methodology')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50"
          >
            <span>Read Calculation Methodology</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => onNavigate('islamic-calendar')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Monthly Hijri Calendar</span>
          </button>
          <button
            onClick={() => onNavigate('ramadan')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Ramadan Timetable</span>
          </button>
        </div>
      </section>
    </article>
  );
};
