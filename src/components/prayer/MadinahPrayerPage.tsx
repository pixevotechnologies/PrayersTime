import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  Compass,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  Printer,
  Download,
  Building2,
  Heart,
} from 'lucide-react';
import { AppSettings, LocationData } from '../../types';
import {
  calculateDailyPrayers,
  calculateLiveCountdown,
  calculateMonthlyTimetable,
  getHijriDate,
  getQiblaInfo,
  formatTime,
} from '../../services/prayerTimes';
import { updateSeoTags } from '../../services/seoManager';
import { SupportedLanguage, MULTILINGUAL_SEO_TEMPLATES } from '../../services/seoData';
import { useLanguage } from '../../services/i18n';
import { MADINAH_LOCALIZED_CONTENT } from '../../services/makkahMadinahContentI18n';

// Official Madinah Location & Geographic Coordinates
export const MADINAH_LOCATION: LocationData = {
  city: 'Madinah',
  country: 'Saudi Arabia',
  countryCode: 'SA',
  region: 'Al Madinah Province',
  latitude: 24.4672,
  longitude: 39.6111,
  timezone: 'Asia/Riyadh',
};

interface MadinahPrayerPageProps {
  settings: AppSettings;
  language?: SupportedLanguage;
  onSetAsCurrentLocation: (loc: LocationData) => void;
  onNavigate: (route: string) => void;
}

export const MadinahPrayerPage: React.FC<MadinahPrayerPageProps> = ({
  settings,
  language: propLanguage,
  onSetAsCurrentLocation,
  onNavigate,
}) => {
  const { t, language: ctxLanguage } = useLanguage();
  const language = propLanguage || ctxLanguage || 'en';

  // Force official Umm al-Qura calculation parameters for Madinah
  const madinahSettings: AppSettings = useMemo(
    () => ({
      ...settings,
      method: 'UmmAlQura', // Official Umm al-Qura University calculation
      madhab: 'shafi', // Standard 1x shadow length used in Saudi Arabia (Shafi/Hanbali/Maliki)
    }),
    [settings]
  );

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedMonthDate, setSelectedMonthDate] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Daily prayer calculations for today in Madinah
  const prayersData = useMemo(
    () => calculateDailyPrayers(MADINAH_LOCATION, currentDate, madinahSettings),
    [currentDate, madinahSettings]
  );

  const [countdown, setCountdown] = useState(() =>
    calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers)
  );

  const hijri = useMemo(
    () => getHijriDate(currentDate, madinahSettings.hijriAdjustment),
    [currentDate, madinahSettings.hijriAdjustment]
  );

  const qibla = useMemo(
    () => getQiblaInfo(MADINAH_LOCATION.latitude, MADINAH_LOCATION.longitude),
    []
  );

  // Monthly timetable for selected month
  const monthlyTimetable = useMemo(
    () =>
      calculateMonthlyTimetable(
        MADINAH_LOCATION,
        selectedMonthDate.getFullYear(),
        selectedMonthDate.getMonth(),
        madinahSettings
      ),
    [selectedMonthDate, madinahSettings]
  );

  // Weekly timetable (next 7 days starting today)
  const weeklyTimetable = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayPrayers = calculateDailyPrayers(MADINAH_LOCATION, d, madinahSettings);
      const dayHijri = getHijriDate(d, madinahSettings.hijriAdjustment);
      days.push({
        date: d,
        dayName: d.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' }),
        formattedDate: d.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
          month: 'short',
          day: 'numeric',
        }),
        hijriStr: `${dayHijri.day} ${language === 'ar' ? dayHijri.monthNameAr : dayHijri.monthNameEn}`,
        prayers: dayPrayers.prayers,
      });
    }
    return days;
  }, [madinahSettings, language]);

  // Tomorrow prayer calculations
  const tomorrowData = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return calculateDailyPrayers(MADINAH_LOCATION, tomorrow, madinahSettings);
  }, [madinahSettings]);

  // Prayer times shortcuts
  const fajrTime = prayersData.prayers.find((p) => p.name === 'Fajr')?.time || '05:05 AM';
  const sunriseTime = prayersData.prayers.find((p) => p.name === 'Sunrise')?.time || '06:25 AM';
  const dhuhrTime = prayersData.prayers.find((p) => p.name === 'Dhuhr')?.time || '12:20 PM';
  const asrTime = prayersData.prayers.find((p) => p.name === 'Asr')?.time || '03:45 PM';
  const maghribTime = prayersData.prayers.find((p) => p.name === 'Maghrib')?.time || '06:15 PM';
  const ishaTime = prayersData.prayers.find((p) => p.name === 'Isha')?.time || '07:45 PM';

  // Ishraq calculated ~18 minutes post-sunrise
  const ishraqTime = useMemo(() => {
    const sunriseObj = prayersData.prayers.find((p) => p.name === 'Sunrise')?.date;
    if (!sunriseObj) return '06:43 AM';
    const ishraqDate = new Date(sunriseObj.getTime() + 18 * 60 * 1000);
    return formatTime(ishraqDate, madinahSettings.timeFormat, MADINAH_LOCATION.timezone);
  }, [prayersData, madinahSettings.timeFormat]);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setCountdown(calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers));
    }, 1000);
    return () => clearInterval(timer);
  }, [prayersData]);

  // Localized editorial content & FAQs for Madinah
  const madinahContent = useMemo(() => {
    return MADINAH_LOCALIZED_CONTENT[language as SupportedLanguage] || MADINAH_LOCALIZED_CONTENT.en;
  }, [language]);

  // Comprehensive FAQs for Madinah
  const madinahFaqs = useMemo(
    () =>
      madinahContent.faqs({
        fajr: fajrTime,
        sunrise: sunriseTime,
        dhuhr: dhuhrTime,
        asr: asrTime,
        maghrib: maghribTime,
        isha: ishaTime,
      }),
    [madinahContent, fajrTime, sunriseTime, dhuhrTime, asrTime, maghribTime, ishaTime]
  );

  // Synchronize Technical SEO tags, canonical URL, and JSON-LD schema
  useEffect(() => {
    const langTemplates = MULTILINGUAL_SEO_TEMPLATES[language] || MULTILINGUAL_SEO_TEMPLATES.en;
    const cityTemplate = langTemplates.city;
    const title = madinahContent.pageTitle(fajrTime, dhuhrTime, asrTime, maghribTime, ishaTime);
    const description = madinahContent.metaDescription(fajrTime, dhuhrTime, asrTime, maghribTime, ishaTime);
    const canonicalPath = '/prayer-times/saudi-arabia/madinah/';

    updateSeoTags({
      title,
      description,
      canonicalPath,
      language: language as SupportedLanguage,
      ogType: 'website',
      breadcrumbs: [
        { name: cityTemplate?.breadcrumbs?.home || 'Home', path: '/' },
        { name: cityTemplate?.breadcrumbs?.prayerTimes || 'Prayer Times', path: '/prayer-times/' },
        { name: 'Saudi Arabia', path: '/prayer-times/saudi-arabia/' },
        { name: 'Madinah', path: canonicalPath },
      ],
      faqs: madinahFaqs,
    });
  }, [fajrTime, sunriseTime, dhuhrTime, asrTime, maghribTime, ishaTime, madinahFaqs, language, madinahContent]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Prayer Times in Madinah Today',
          text: `Today's prayer times in Madinah: Fajr ${fajrTime}, Dhuhr ${dhuhrTime}, Asr ${asrTime}, Maghrib ${maghribTime}, Isha ${ishaTime}.`,
          url: 'https://prayerstime.online/prayer-times/saudi-arabia/madinah/',
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText('https://prayerstime.online/prayer-times/saudi-arabia/madinah/');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = ['Date', 'Day', 'Hijri', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const rows = monthlyTimetable.map((row) => [
      row.date.toISOString().split('T')[0],
      row.date.toLocaleDateString('en-US', { weekday: 'short' }),
      row.hijriFormatted,
      row.fajr,
      row.sunrise,
      row.dhuhr,
      row.asr,
      row.maghrib,
      row.isha,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Madinah_Prayer_Times_${selectedMonthDate.getFullYear()}_${selectedMonthDate.getMonth() + 1}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className="space-y-8 print:space-y-4 max-w-5xl mx-auto">
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 dark:text-stone-400 print:hidden">
        <ol className="flex items-center flex-wrap gap-1.5">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a
              href="/prayer-times"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('prayer-times');
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              Prayer Times
            </a>
          </li>
          <li>/</li>
          <li>
            <span className="text-stone-600 dark:text-stone-300">Saudi Arabia</span>
          </li>
          <li>/</li>
          <li className="text-emerald-700 dark:text-emerald-400 font-semibold" aria-current="page">
            Madinah (Medina)
          </li>
        </ol>
      </nav>

      {/* 2. HERO & PRIMARY H1 SECTION */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-[#081512] text-white p-6 sm:p-8 lg:p-10 border border-emerald-800/40 shadow-xl print:bg-white print:text-black print:border-none">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/50">
              <Building2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{madinahContent.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-100">
              {madinahContent.h1}
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {madinahContent.subtitle}
            </p>

            {/* Date & Hijri Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>
                  {currentDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40">
                <Moon className="w-4 h-4 text-amber-400" />
                <span className="font-arabic font-semibold">
                  {hijri.day} {language === 'ar' ? hijri.monthNameAr : hijri.monthNameEn} {hijri.year} AH
                </span>
              </div>
            </div>
          </div>

          {/* Next Prayer Countdown Card */}
          <div className="w-full md:w-72 rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-emerald-700/50 p-5 flex flex-col justify-center items-center text-center shadow-lg">
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
              Next Prayer in Madinah
            </span>
            <span className="text-xl font-bold text-white mb-2">
              {prayersData.nextPrayer?.name || 'Fajr'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              {countdown.hours.toString().padStart(2, '0')}:
              {countdown.minutes.toString().padStart(2, '0')}:
              {countdown.seconds.toString().padStart(2, '0')}
            </div>
            <span className="text-xs text-stone-300 mt-2">
              Scheduled at{' '}
              <strong className="text-white">
                {prayersData.nextPrayer
                  ? prayersData.prayers.find((p) => p.name === prayersData.nextPrayer?.name)?.time || '--:--'
                  : '--:--'}
              </strong>
            </span>
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="mt-6 pt-6 border-t border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lat: 24.4672° N, Long: 39.6111° E</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Qibla: {qibla.bearing}° ({qibla.cardinal}) to Kaaba</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetAsCurrentLocation(MADINAH_LOCATION)}
              className="px-3 py-1.5 rounded-lg bg-emerald-800/70 hover:bg-emerald-700 text-stone-100 border border-emerald-600/50 font-medium transition-colors cursor-pointer"
            >
              Set Madinah as My Location
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-emerald-800/70 hover:bg-emerald-700 text-stone-100 border border-emerald-600/50 transition-colors cursor-pointer"
              title="Share Madinah Prayer Times"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-emerald-300">Copied!</span>}
          </div>
        </div>
      </header>

      {/* 3. TODAY'S PRAYER CARDS GRID */}
      <section aria-labelledby="today-madinah-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="today-madinah-heading" className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            Madinah Prayer Times Today
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Standard: Umm al-Qura University
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {prayersData.prayers.map((prayer) => {
            const isNext = prayer.isNext;
            const isPassed = prayer.isPassed;

            return (
              <div
                key={prayer.name}
                className={`relative rounded-2xl p-4 transition-all duration-200 border flex flex-col justify-between ${
                  isNext
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/50'
                    : isPassed
                    ? 'bg-stone-100/80 dark:bg-[#101917]/70 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-800/70'
                    : 'bg-white dark:bg-[#131f1c] text-stone-800 dark:text-stone-200 border-stone-200 dark:border-emerald-950/60 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className={isNext ? 'text-emerald-200' : 'text-stone-600 dark:text-stone-400'}>
                      {prayer.name}
                    </span>
                    <span className="font-arabic text-xs opacity-75">{prayer.arabic}</span>
                  </div>

                  <div className={`text-xl sm:text-2xl font-bold tracking-tight ${isNext ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
                    {prayer.time}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/50 dark:border-stone-700/40 text-[11px] flex items-center justify-between">
                  <span className="capitalize">{prayer.status}</span>
                  {isNext && <span className="font-bold text-amber-300">Upcoming</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ishraq, Duha & Tahajjud highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between">
            <div>
              <span className="font-semibold text-amber-900 dark:text-amber-200 block">Ishraq in Madinah</span>
              <span className="text-amber-700 dark:text-amber-400">~18 min post-sunrise</span>
            </div>
            <strong className="text-base font-bold text-amber-800 dark:text-amber-300">{ishraqTime}</strong>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
            <div>
              <span className="font-semibold text-blue-900 dark:text-blue-200 block">Duha (Chasht)</span>
              <span className="text-blue-700 dark:text-blue-400">Late forenoon Sunnah</span>
            </div>
            <strong className="text-base font-bold text-blue-800 dark:text-blue-300">08:00 AM – 12:05 PM</strong>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 flex items-center justify-between">
            <div>
              <span className="font-semibold text-purple-900 dark:text-purple-200 block">Tahajjud (Best Time)</span>
              <span className="text-purple-700 dark:text-purple-400">Last third of the night</span>
            </div>
            <strong className="text-base font-bold text-purple-800 dark:text-purple-300">02:30 AM – Fajr</strong>
          </div>
        </div>
      </section>

      {/* 4. TOMORROW PRAYER TIMES */}
      <section className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-950/60 shadow-xs space-y-3">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Tomorrow's Prayer Times in Madinah</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
          {tomorrowData.prayers.map((p) => (
            <div key={p.name} className="p-2.5 rounded-xl bg-stone-50 dark:bg-[#162320] border border-stone-200/60 dark:border-stone-800/60">
              <span className="text-stone-500 dark:text-stone-400 block font-medium">{p.name}</span>
              <strong className="text-sm font-bold text-stone-800 dark:text-stone-100">{p.time}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 7-DAY WEEKLY SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          Weekly Prayer Timetable for Madinah
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
          <table className="w-full text-left text-xs border-collapse bg-white dark:bg-[#111a18]">
            <thead>
              <tr className="bg-stone-100 dark:bg-[#15221f] text-stone-700 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800">
                <th className="p-3 font-semibold">Day &amp; Date</th>
                <th className="p-3 font-semibold">Hijri</th>
                <th className="p-3 font-semibold">Fajr</th>
                <th className="p-3 font-semibold">Sunrise</th>
                <th className="p-3 font-semibold">Dhuhr</th>
                <th className="p-3 font-semibold">Asr</th>
                <th className="p-3 font-semibold">Maghrib</th>
                <th className="p-3 font-semibold">Isha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {weeklyTimetable.map((day, idx) => (
                <tr
                  key={idx}
                  className={idx === 0 ? 'bg-emerald-50/60 dark:bg-emerald-950/20 font-semibold' : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'}
                >
                  <td className="p-3">
                    <span className="block text-stone-800 dark:text-stone-100">{day.dayName}, {day.formattedDate}</span>
                    {idx === 0 && <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">Today</span>}
                  </td>
                  <td className="p-3 text-stone-500 font-arabic">{day.hijriStr}</td>
                  <td className="p-3">{day.prayers.find((p) => p.name === 'Fajr')?.time}</td>
                  <td className="p-3 text-stone-500">{day.prayers.find((p) => p.name === 'Sunrise')?.time}</td>
                  <td className="p-3">{day.prayers.find((p) => p.name === 'Dhuhr')?.time}</td>
                  <td className="p-3">{day.prayers.find((p) => p.name === 'Asr')?.time}</td>
                  <td className="p-3">{day.prayers.find((p) => p.name === 'Maghrib')?.time}</td>
                  <td className="p-3">{day.prayers.find((p) => p.name === 'Isha')?.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. MONTHLY TIMETABLE WITH MONTH SELECTOR & EXPORT */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {madinahContent.monthlyHeading(selectedMonthDate.toLocaleString(language === 'ar' ? 'ar-SA' : 'default', { month: 'long', year: 'numeric' }))}
            </h2>
            <p className="text-xs text-stone-500">
              {madinahContent.monthlySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => {
                  const prev = new Date(selectedMonthDate);
                  prev.setMonth(prev.getMonth() - 1);
                  setSelectedMonthDate(prev);
                }}
                className="p-1 rounded-lg hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold">
                {selectedMonthDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
              </span>
              <button
                onClick={() => {
                  const next = new Date(selectedMonthDate);
                  next.setMonth(next.getMonth() + 1);
                  setSelectedMonthDate(next);
                }}
                className="p-1 rounded-lg hover:bg-white dark:hover:bg-stone-700 transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
              title="Print Monthly Schedule"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCsv}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse bg-white dark:bg-[#111a18]">
            <thead className="sticky top-0 z-10 bg-stone-100 dark:bg-[#15221f] text-stone-700 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Day</th>
                <th className="p-3 font-semibold">Hijri</th>
                <th className="p-3 font-semibold">Fajr</th>
                <th className="p-3 font-semibold">Sunrise</th>
                <th className="p-3 font-semibold">Dhuhr</th>
                <th className="p-3 font-semibold">Asr</th>
                <th className="p-3 font-semibold">Maghrib</th>
                <th className="p-3 font-semibold">Isha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {monthlyTimetable.map((row, idx) => {
                const isToday =
                  row.date.getDate() === new Date().getDate() &&
                  row.date.getMonth() === new Date().getMonth() &&
                  row.date.getFullYear() === new Date().getFullYear();

                return (
                  <tr
                    key={idx}
                    className={isToday ? 'bg-emerald-50/70 dark:bg-emerald-950/30 font-bold' : 'hover:bg-stone-50 dark:hover:bg-stone-800/30'}
                  >
                    <td className="p-3 text-stone-800 dark:text-stone-200 whitespace-nowrap">
                      {row.date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="p-3 text-stone-600 dark:text-stone-400">{row.date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' })}</td>
                    <td className="p-3 text-stone-500 font-arabic whitespace-nowrap">
                      {row.hijriFormatted}
                    </td>
                    <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">{row.fajr}</td>
                    <td className="p-3 text-stone-500">{row.sunrise}</td>
                    <td className="p-3">{row.dhuhr}</td>
                    <td className="p-3">{row.asr}</td>
                    <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">{row.maghrib}</td>
                    <td className="p-3">{row.isha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. MADINAH VISITOR & WORSHIPPER GUIDE */}
      <section className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
          {madinahContent.understandingTitle}
        </h2>
        <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-stone-700 dark:text-stone-300">
          {madinahContent.understandingParagraphs.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-950/60 shadow-xs space-y-3">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>Congregational Prayer at Al-Masjid an-Nabawi</span>
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Congregational prayers at the Prophet's Mosque ﷺ are attended by hundreds of thousands of
              worshippers daily. The Iqamah is typically called approximately 20 to 25 minutes after the Azan for
              Fajr, Dhuhr, Asr, and Isha, and approximately 10 minutes after Maghrib Azan.
            </p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Worshippers are advised to enter the courtyard at least 30 to 45 minutes prior to Azan,
              especially for Fajr and Jumu'ah (Friday) prayers, as interior prayer halls fill quickly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-950/60 shadow-xs space-y-3">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500" />
              <span>Rawdah ash-Sharifah (Riyad al-Jannah)</span>
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              The Rawdah is the blessed carpeted area between the sacred chamber where the Prophet ﷺ is buried
              and his Minbar (pulpit). Prayers performed here carry great spiritual significance as stated in Sahih
              al-Bukhari: <em>"Between my house and my minbar is a garden from the gardens of Paradise."</em>
            </p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Access to the Rawdah requires advance booking via the official Nusuk app to manage visitor capacity
              peacefully and respectfully.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-[#111c19] border border-stone-200 dark:border-stone-800 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
            Virtue of Praying in Masjid Quba
          </h3>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            Masjid Quba is the first mosque built in Islam. The Prophet Muhammad ﷺ used to visit Masjid Quba
            every Saturday, either riding or walking, and pray two rak'ahs there. He stated: <em>"Whoever purifies
            himself in his house, then comes to the Mosque of Quba and prays in it, will have the reward like that of
            an Umrah."</em> (Sunan Ibn Majah 1412).
          </p>
        </div>
      </section>

      {/* 8. CALCULATION METHODOLOGY EXPLANATION */}
      <section className="p-6 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-950/60 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{madinahContent.methodologyTitle}</span>
        </h2>

        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {madinahContent.methodologyText}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162320] border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Fajr Calculation</span>
            <span className="text-stone-600 dark:text-stone-300">
              18.5° solar depression angle below the eastern horizon, indicating true astronomical dawn (Al-Fajr As-Sadiq).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162320] border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Asr Juristic Standard</span>
            <span className="text-stone-600 dark:text-stone-300">
              Standard 1x shadow length (Shafi, Maliki, Hanbali), representing the consensus standard of Saudi Arabia.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#162320] border border-stone-200 dark:border-stone-800 space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Isha Calculation</span>
            <span className="text-stone-600 dark:text-stone-300">
              Fixed 90-minute interval after Maghrib sunset throughout the year (120 minutes during the holy month of Ramadan).
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Note: Minor variations of 1-2 minutes may occur depending on exact atmospheric refraction and local terrain elevation
          around Mount Uhud and southern volcanic fields (Harrat) surrounding Madinah.
        </p>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
          {madinahContent.faqHeading}
        </h2>

        <div className="space-y-3">
          {madinahFaqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c19] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. INTERNAL LINKING ARCHITECTURE */}
      <footer className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
          Related Holy City &amp; Islamic Prayer Pages
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <a
            href="/prayer-times/saudi-arabia/makkah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('city-makkah');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Makkah Prayer Times</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/ishraq-prayer-time/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-ishraq');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Ishraq in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/duha-prayer-time/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-duha');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Duha in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/tahajjud-time/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-tahajjud');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Tahajjud in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/awabeen-prayer-time/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-awabeen');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Awabeen in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/makruh-prayer-times/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-makruh');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Makruh Times in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/sunrise-time/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('intent-sunrise');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Sunrise in Madinah</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/qibla"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('qibla');
            }}
            className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
          >
            <span>Qibla to Kaaba (176.6°)</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </footer>
    </article>
  );
};
