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
import { SupportedLanguage } from '../../services/seoData';
import { useLanguage } from '../../services/i18n';

// Official Makkah Location & Coordinate Parameters
export const MAKKAH_LOCATION: LocationData = {
  city: 'Makkah',
  country: 'Saudi Arabia',
  countryCode: 'SA',
  region: 'Makkah Province',
  latitude: 21.4225,
  longitude: 39.8262,
  timezone: 'Asia/Riyadh',
};

interface MakkahPrayerPageProps {
  settings: AppSettings;
  language?: SupportedLanguage;
  onSetAsCurrentLocation: (loc: LocationData) => void;
  onNavigate: (route: string) => void;
}

export const MakkahPrayerPage: React.FC<MakkahPrayerPageProps> = ({
  settings,
  language: propLanguage,
  onSetAsCurrentLocation,
  onNavigate,
}) => {
  const { t, language: ctxLanguage } = useLanguage();
  const language = propLanguage || ctxLanguage || 'en';

  // Force official Umm al-Qura calculation parameters for Makkah
  const makkahSettings: AppSettings = useMemo(
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

  // Daily prayer calculations for today in Makkah
  const prayersData = useMemo(
    () => calculateDailyPrayers(MAKKAH_LOCATION, currentDate, makkahSettings),
    [currentDate, makkahSettings]
  );

  const [countdown, setCountdown] = useState(() =>
    calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers)
  );

  const hijri = useMemo(
    () => getHijriDate(currentDate, makkahSettings.hijriAdjustment),
    [currentDate, makkahSettings.hijriAdjustment]
  );

  const qibla = useMemo(
    () => getQiblaInfo(MAKKAH_LOCATION.latitude, MAKKAH_LOCATION.longitude),
    []
  );

  // Monthly timetable for selected month
  const monthlyTimetable = useMemo(
    () =>
      calculateMonthlyTimetable(
        MAKKAH_LOCATION,
        selectedMonthDate.getFullYear(),
        selectedMonthDate.getMonth(),
        makkahSettings
      ),
    [selectedMonthDate, makkahSettings]
  );

  // Extract individual prayer times for today
  const fajrTime = prayersData.prayers.find((p) => p.name === 'Fajr')?.time || '05:00 AM';
  const sunriseTime = prayersData.prayers.find((p) => p.name === 'Sunrise')?.time || '06:15 AM';
  const dhuhrTime = prayersData.prayers.find((p) => p.name === 'Dhuhr')?.time || '12:15 PM';
  const asrTime = prayersData.prayers.find((p) => p.name === 'Asr')?.time || '03:40 PM';
  const maghribTime = prayersData.prayers.find((p) => p.name === 'Maghrib')?.time || '06:25 PM';
  const ishaTime = prayersData.prayers.find((p) => p.name === 'Isha')?.time || '07:55 PM';

  // Live countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setCountdown(calculateLiveCountdown(prayersData.nextPrayer, prayersData.prayers));
    }, 1000);
    return () => clearInterval(timer);
  }, [prayersData]);

  // Comprehensive, human-written FAQs for Makkah
  const makkahFaqs = useMemo(
    () => [
      {
        q: 'What time is Fajr prayer in Makkah today?',
        a: `Fajr prayer in Makkah today begins at ${fajrTime} (true astronomical dawn), calculated at an 18.5° solar depression angle under the official Umm al-Qura University methodology. Congregational prayer at Masjid al-Haram takes place approximately 20 to 25 minutes after the Azan.`,
      },
      {
        q: 'What time is Maghrib and Iftar in Makkah today?',
        a: `Maghrib prayer in Makkah today begins at ${maghribTime} exactly at sunset. For Muslims observing voluntary fasts, Shawwal, Arafah, Ashura, or Ramadan, this marks the exact time of Iftar in Makkah.`,
      },
      {
        q: 'What is the difference between Makkah prayer times, namaz times, and salah times?',
        a: 'The terms "prayer time", "namaz time" (or "namaz timing"), and "salah time" refer to the exact same five obligatory acts of worship in Islam. "Salah" (صلاة) is the original Quranic Arabic term, "Namaz" (نماز) is the widely used term throughout Urdu, Hindi, Turkish, and Persian-speaking communities, and "Prayer" is the common English designation. All refer to the identical timetable for Fajr, Dhuhr, Asr, Maghrib, and Isha in Makkah.',
      },
      {
        q: 'Which calculation method is used for Makkah prayer times on this website?',
        a: 'This website calculates Makkah prayer times strictly using the official Umm al-Qura University, Makkah methodology. This is the authentic astronomical and religious standard established by the Kingdom of Saudi Arabia and adhered to by the General Presidency for the Affairs of the Grand Mosque (Masjid al-Haram) and the Prophet\'s Mosque.',
      },
      {
        q: 'What time is Isha prayer in Makkah and how is it calculated?',
        a: `Isha prayer in Makkah today begins at ${ishaTime}. According to the Umm al-Qura standard, Isha is set at precisely 90 minutes after Maghrib throughout the year, except during the holy month of Ramadan when it is scheduled 120 minutes after Maghrib to afford worshippers sufficient time for Iftar before Taraweeh prayers.`,
      },
      {
        q: 'How is Asr time calculated in Makkah?',
        a: `Asr prayer in Makkah begins at ${asrTime} using the standard juristic method (Shafi, Maliki, and Hanbali), which determines Asr when the length of an object\'s shadow equals the shadow at noon plus the object\'s height (shadow factor 1x). This is the standard followed across Saudi Arabia and the Holy Mosque.`,
      },
      {
        q: 'What is the reward for praying in Masjid al-Haram in Makkah?',
        a: 'The Prophet Muhammad (peace be upon him) said: "One prayer in this Mosque of mine (in Madinah) is better than a thousand prayers anywhere else, except the Sacred Mosque (Masjid al-Haram in Makkah), for one prayer in it is better than one hundred thousand prayers elsewhere." (Sunan Ibn Majah 1406, Sahih).',
      },
      {
        q: 'What is the Qibla direction while in Makkah?',
        a: 'While Muslims around the world must face toward Makkah to perform their prayers, worshippers inside Makkah face directly toward the Holy Kaaba located at the center of Masjid al-Haram. Inside the Haram, prayer rows form concentric circles surrounding the Kaaba in all 360 degrees.',
      },
    ],
    [fajrTime, maghribTime, ishaTime, asrTime]
  );

  // Synchronize Technical SEO tags, canonical URL, and JSON-LD schema
  useEffect(() => {
    const title = 'Prayer Times in Makkah Today – Namaz & Salah Times';
    const description = `Accurate today's prayer times in Makkah (Mecca), Saudi Arabia: Fajr ${fajrTime}, Dhuhr ${dhuhrTime}, Asr ${asrTime}, Maghrib ${maghribTime}, Isha ${ishaTime}. Official Umm al-Qura timetable, live countdown & monthly calendar.`;
    const canonicalPath = '/prayer-times/makkah/';

    updateSeoTags({
      title,
      description,
      canonicalPath,
      language: (language as SupportedLanguage) || 'en',
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Prayer Times', path: '/prayer-times' },
        { name: 'Saudi Arabia', path: '/prayer-times' },
        { name: 'Makkah', path: '/prayer-times/makkah/' },
      ],
      faqs: makkahFaqs,
    });
  }, [fajrTime, dhuhrTime, asrTime, maghribTime, ishaTime, language, makkahFaqs]);

  const handleShare = () => {
    const url = 'https://prayerstime.online/prayer-times/makkah/';
    if (navigator.share) {
      navigator
        .share({
          title: 'Prayer Times in Makkah Today – Namaz & Salah Times',
          text: `Today's prayer times in Makkah (Mecca): Fajr ${fajrTime}, Dhuhr ${dhuhrTime}, Asr ${asrTime}, Maghrib ${maghribTime}, Isha ${ishaTime}.`,
          url,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = ['Day', 'Date', 'Hijri', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const rows = (monthlyTimetable || []).map((d) => [
      d.dayNumber,
      d.dateFormatted,
      d.hijriFormatted,
      d.fajr,
      d.sunrise,
      d.dhuhr,
      d.asr,
      d.maghrib,
      d.isha,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Makkah_Prayer_Timetable_${selectedMonthDate.getFullYear()}_${selectedMonthDate.getMonth() + 1}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const selectedMonthName = selectedMonthDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = () => {
    const prev = new Date(selectedMonthDate);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedMonthDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(selectedMonthDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedMonthDate(next);
  };

  const handleResetMonth = () => {
    setSelectedMonthDate(new Date());
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-10">
      {/* 1. BREADCRUMB NAVIGATION (SEO & Crawling) */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 dark:text-stone-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Prayer Times
            </a>
          </li>
          <li>/</li>
          <li>
            <span className="text-stone-600 dark:text-stone-300">Saudi Arabia</span>
          </li>
          <li>/</li>
          <li aria-current="page" className="font-semibold text-emerald-700 dark:text-emerald-400">
            Makkah
          </li>
        </ol>
      </nav>

      {/* 2. HEADER & IMMEDIATE TODAY SUMMARY (Above the fold) */}
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
              <MapPin className="w-3.5 h-3.5" />
              <span>Makkah (Mecca), Saudi Arabia</span>
              <span className="text-emerald-500/80">·</span>
              <span>Umm al-Qura University Standard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              Prayer Times in Makkah Today
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl">
              Accurate daily Islamic prayer times, live next-prayer countdown, and monthly timetable
              for Makkah al-Mukarramah. Calculated using the official{' '}
              <strong className="font-semibold text-stone-900 dark:text-stone-100">
                Umm al-Qura
              </strong>{' '}
              calendar for Masjid al-Haram.
            </p>
          </div>

          {/* Quick Actions (Share & Set Location) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                onSetAsCurrentLocation(MAKKAH_LOCATION);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              title="Set Makkah as default location for Prayerstime"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Set as My Location</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121c19] text-xs font-semibold text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
              title="Share Makkah prayer times"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Date & Hijri Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-[#121c19] border border-stone-200/80 dark:border-stone-800">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/50 dark:border-emerald-800/30 font-medium">
            <Moon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {hijri.day} {hijri.monthNameEn} {hijri.year} AH ({hijri.monthNameAr})
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-[#121c19] border border-stone-200/80 dark:border-stone-800">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Qibla: Inside Holy Kaaba Sanctuary</span>
          </div>
        </div>
      </header>

      {/* 3. NEXT PRAYER LIVE COUNTDOWN HERO */}
      <section
        aria-label="Next prayer countdown in Makkah"
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-emerald-950 text-white p-6 sm:p-8 shadow-md border border-emerald-700/40"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Next Prayer in Makkah</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {prayersData.nextPrayer?.name || 'Fajr'}
              </h2>
              <span className="font-arabic text-2xl text-emerald-300">
                {prayersData.nextPrayer?.arabicName || 'الفجر'}
              </span>
            </div>
            <p className="text-sm text-emerald-100/90">
              Scheduled at{' '}
              <strong className="font-semibold text-white">
                {prayersData.nextPrayer?.time}
              </strong>{' '}
              (Makkah Local Time, UTC+3)
            </p>
          </div>

          {/* Countdown Display */}
          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-medium text-emerald-200 mb-1">Time Remaining</span>
            <div className="flex items-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-white bg-black/20 px-4 py-2 rounded-2xl border border-white/10">
              <span>{String(countdown.hours).padStart(2, '0')}</span>
              <span className="text-emerald-400 animate-pulse">:</span>
              <span>{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="text-emerald-400 animate-pulse">:</span>
              <span className="text-emerald-300">{String(countdown.seconds).padStart(2, '0')}</span>
            </div>
            <span className="text-[11px] text-emerald-300/80 mt-1.5">
              Live astronomical countdown · Updates every second
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-emerald-700/50 flex items-center justify-between text-xs text-emerald-200/90">
          <span>Official Umm al-Qura University Timetable</span>
          <span>Masjid al-Haram, Holy City of Makkah</span>
        </div>
      </section>

      {/* 4. TODAY'S PRAYER TIMES GRID (Immediate View without scrolling) */}
      <section aria-label="Today's prayer times in Makkah" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Today's Prayer Schedule in Makkah
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {formattedDate}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {prayersData.prayers.map((prayer) => {
            const isNext = prayer.isNext;
            const isPassed = prayer.isPassed;
            const isSunrise = prayer.name === 'Sunrise';

            return (
              <div
                key={prayer.name}
                className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  isNext
                    ? 'bg-emerald-50 dark:bg-[#152a22] border-emerald-500 dark:border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                    : isPassed
                    ? 'bg-stone-50/60 dark:bg-[#121c19]/60 border-stone-200 dark:border-emerald-950/40 opacity-80'
                    : 'bg-white dark:bg-[#121c19] border-stone-200 dark:border-emerald-900/30'
                }`}
              >
                {/* Header with Name & Badge */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isNext
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : isSunrise
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {prayer.name}
                  </span>

                  {isNext && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-600 text-white">
                      Next
                    </span>
                  )}
                  {isPassed && (
                    <span className="text-[10px] font-medium text-stone-400">
                      Passed
                    </span>
                  )}
                </div>

                {/* Arabic Name */}
                <div className="font-arabic text-sm text-stone-500 dark:text-stone-400 mb-1">
                  {prayer.arabicName}
                </div>

                {/* Time */}
                <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-stone-900 dark:text-stone-100">
                  {prayer.time}
                </div>

                {/* Context Description */}
                <div className="text-[11px] text-stone-400 dark:text-stone-500 mt-2 pt-2 border-t border-stone-200/50 dark:border-stone-800/60">
                  {prayer.name === 'Fajr' && 'Dawn (18.5°)'}
                  {prayer.name === 'Sunrise' && 'Ishraq start'}
                  {prayer.name === 'Dhuhr' && 'Zawal (Zenith)'}
                  {prayer.name === 'Asr' && 'Shadow 1x'}
                  {prayer.name === 'Maghrib' && 'Sunset / Iftar'}
                  {prayer.name === 'Isha' && '+90m standard'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculation Method Notice */}
        <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-[#121c19] border border-stone-200/80 dark:border-emerald-900/30 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-300">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p>
              <strong className="font-semibold text-stone-900 dark:text-stone-100">
                Official Umm al-Qura Calculation Method:
              </strong>{' '}
              Times for Makkah are calculated using the coordinates of the Kaaba (21.4225° N, 39.8262° E)
              following the Umm al-Qura University calendar. Fajr is calculated at an 18.5° solar
              depression angle, Asr follows the standard 1x shadow factor, and Isha is set 90 minutes
              after Maghrib (120 minutes during Ramadan).
            </p>
          </div>
        </div>
      </section>

      {/* 5. MONTHLY MAKKAH PRAYER TIMETABLE & CALENDAR NAVIGATION */}
      <section aria-label="Monthly prayer timetable for Makkah" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Monthly Makkah Prayer Timetable — {selectedMonthName}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Complete Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha timetable for Makkah
            </p>
          </div>

          {/* Month Navigation & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-xl bg-stone-100 dark:bg-[#121c19] p-1 border border-stone-200 dark:border-stone-800">
              <button
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetMonth}
                className="px-2.5 py-1 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-emerald-600"
              >
                Current Month
              </button>
              <button
                onClick={handleNextMonth}
                aria-label="Next month"
                className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#121c19] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              title="Download Makkah timetable as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#121c19] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              title="Print timetable"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Timetable Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c19] shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-[#15231f] text-stone-600 dark:text-stone-300 font-semibold border-b border-stone-200 dark:border-stone-800">
                <th scope="col" className="py-3 px-3.5 sm:px-4">Date</th>
                <th scope="col" className="py-3 px-2 sm:px-3">Day</th>
                <th scope="col" className="py-3 px-2 sm:px-3">Hijri</th>
                <th scope="col" className="py-3 px-2 sm:px-3 text-emerald-800 dark:text-emerald-300">Fajr</th>
                <th scope="col" className="py-3 px-2 sm:px-3 text-amber-800 dark:text-amber-400">Sunrise</th>
                <th scope="col" className="py-3 px-2 sm:px-3">Dhuhr</th>
                <th scope="col" className="py-3 px-2 sm:px-3">Asr</th>
                <th scope="col" className="py-3 px-2 sm:px-3 text-emerald-800 dark:text-emerald-300">Maghrib</th>
                <th scope="col" className="py-3 px-2 sm:px-3">Isha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/70 font-mono">
              {(monthlyTimetable || []).map((day) => {
                const now = new Date();
                const isTodayRow =
                  day.date.getFullYear() === now.getFullYear() &&
                  day.date.getMonth() === now.getMonth() &&
                  day.date.getDate() === now.getDate();
                const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' });

                return (
                  <tr
                    key={day.dayNumber}
                    className={`transition-colors ${
                      isTodayRow
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/50 font-bold text-stone-900 dark:text-white ring-1 ring-emerald-500/30'
                        : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/30 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <td className="py-2.5 px-3.5 sm:px-4 font-sans whitespace-nowrap">
                      {day.dateFormatted}
                      {isTodayRow && (
                        <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white font-sans">
                          Today
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 sm:px-3 font-sans">{dayName}</td>
                    <td className="py-2.5 px-2 sm:px-3 font-sans whitespace-nowrap text-stone-500">
                      {day.hijriFormatted}
                    </td>
                    <td className="py-2.5 px-2 sm:px-3 font-semibold text-emerald-700 dark:text-emerald-300">
                      {day.fajr}
                    </td>
                    <td className="py-2.5 px-2 sm:px-3 text-stone-500 dark:text-stone-400">{day.sunrise}</td>
                    <td className="py-2.5 px-2 sm:px-3">{day.dhuhr}</td>
                    <td className="py-2.5 px-2 sm:px-3">{day.asr}</td>
                    <td className="py-2.5 px-2 sm:px-3 font-semibold text-emerald-700 dark:text-emerald-300">
                      {day.maghrib}
                    </td>
                    <td className="py-2.5 px-2 sm:px-3">{day.isha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. IN-DEPTH HUMAN WRITTEN CONTENT: EXPLANATION OF MAKKAH PRAYER TIMES */}
      <section className="space-y-8 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
            Understanding Makkah Prayer Times, Namaz & Salah Timings
          </h2>
          <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-stone-700 dark:text-stone-300">
            <p>
              Whether you are searching for <strong>prayer times Makkah</strong>,{' '}
              <strong>Makkah namaz time today</strong>, <strong>Makkah namaz timing</strong>, or{' '}
              <strong>Makkah salah time</strong>, the daily prayer schedule for the holy city of{' '}
              <strong>Makkah (Mecca)</strong> is among the most revered and closely observed timetables
              in the world. Muslims globally face directly toward the Holy Kaaba in Makkah five times
              every single day to establish their obligatory Salah.
            </p>
            <p>
              Across different linguistic and cultural traditions, believers use varied terms for these
              sacred worship windows: Arabic-speaking communities refer to them as <em>Salah</em> (صلاة),
              millions of Muslims across Pakistan, India, Bangladesh, Turkey, and Central Asia refer to
              them as <em>Namaz</em> (نماز) or <em>Namaz timing</em> (sometimes written as <em>nimaz time Makkah today</em> or <em>Makkah nimaz timing</em>), and English speakers simply call them <em>Islamic prayer times</em>.
              Regardless of phrasing, all refer to the precise astronomical intervals ordained by Allah
              and exemplified by the Messenger of Allah (peace be upon him).
            </p>
            <p>
              Because Makkah al-Mukarramah is the spiritual anchor of the Muslim Ummah, live television
              broadcasts and international satellite feeds broadcast every prayer live from{' '}
              <strong>Masjid al-Haram</strong>. Pilgrims preparing for Hajj or Umrah, as well as Muslims
              tuning in from across the globe, rely on an exact, uncompromised schedule to synchronize
              their worship with the holy city.
            </p>
          </div>
        </div>

        {/* 7. INFORMATION ABOUT THE FIVE DAILY PRAYERS IN MAKKAH */}
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            The Five Daily Prayers in Makkah: Schedule & Astronomical Calculation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fajr */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Fajr Time Makkah (Dawn Prayer)
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {fajrTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Fajr in Makkah commences at the moment of true astronomical dawn (<em>al-Fajr al-Sadiq</em>),
                when light first appears horizontally across the eastern horizon over the Hijaz mountains.
                Under the official Umm al-Qura standard, this occurs when the sun reaches 18.5° below the
                horizon. Fajr ends when the sun begins to rise.
              </p>
            </div>

            {/* Sunrise / Ishraq */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Sunrise (Shuruq) & Ishraq in Makkah
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
                  {sunriseTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Sunrise marks the exact moment the upper edge of the sun crosses the horizon in Makkah.
                Obligatory prayer is prohibited during the sunrise transition (<em>makruh tahrimi</em>).
                Approximately 15 to 20 minutes after sunrise, the rewarding voluntary{' '}
                <a
                  href="/ishraq-prayer-time"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('intent-ishraq');
                  }}
                  className="text-emerald-700 dark:text-emerald-400 underline font-medium"
                >
                  Ishraq prayer
                </a>{' '}
                begins.
              </p>
            </div>

            {/* Dhuhr */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Dhuhr Time Makkah (Midday Prayer)
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {dhuhrTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Dhuhr begins when the sun passes the celestial meridian (<em>Zawal</em>) and starts its
                gradual descent westward. On Fridays, Dhuhr is replaced by the congregational Jumu'ah
                khutbah and prayer in Masjid al-Haram, attended by hundreds of thousands of worshippers.
              </p>
            </div>

            {/* Asr */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  Asr Time Makkah (Afternoon Prayer)
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {asrTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Asr prayer in Makkah is calculated according to the standard 1x shadow factor followed in
                Saudi Arabia and by the majority of jurists (Hanbali, Shafi, and Maliki), when the shadow
                of an object equals its noon shadow plus the object's height.
              </p>
            </div>

            {/* Maghrib */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
                  Maghrib Time Makkah (Sunset & Iftar)
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {maghribTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Maghrib begins the moment the sun completely disappears below the horizon. In Makkah,
                this moment is heralded by the call to prayer echoing from the minarets of the Holy Mosque,
                and marks the commencement of Iftar for those observing fasting.
              </p>
            </div>

            {/* Isha */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800"></span>
                  Isha Time Makkah (Night Prayer)
                </h4>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {ishaTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Under the official Umm al-Qura standard, Isha is set at a fixed 90 minutes after Maghrib
                throughout the year (and 120 minutes during Ramadan). This ensures consistency and
                ample time between sunset and the night prayer.
              </p>
            </div>
          </div>
        </div>

        {/* 8. VIRTUE OF PRAYER IN MASJID AL-HARAM */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-900/10 via-emerald-900/5 to-transparent border border-emerald-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            <Building2 className="w-4 h-4" />
            <span>Spiritual Significance & The 100,000x Reward</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            The Multiplied Reward of Praying in Masjid al-Haram, Makkah
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Performing Salah within the sanctuary of Makkah al-Mukarramah carries an incomparable
            spiritual reward. The Messenger of Allah (peace be upon him) explicitly stated:
          </p>
          <blockquote className="p-4 rounded-2xl bg-white dark:bg-[#121c19] border-l-4 border-emerald-600 text-sm font-medium text-stone-800 dark:text-stone-200 italic my-2">
            "One prayer in Masjid al-Haram is better than one hundred thousand prayers elsewhere."
            <span className="block text-xs font-normal text-stone-500 dark:text-stone-400 not-italic mt-1">
              — Sunan Ibn Majah (1406), Sahih
            </span>
          </blockquote>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Scholars note that establishing even a single prayer in congregation within the Sacred Mosque
            surpasses a lifetime of worship performed elsewhere, making knowledge of the exact Makkah
            prayer timetable vital for pilgrims and residents alike.
          </p>
        </div>

        {/* 9. MAKKAH PRAYER-TIME FAQS (Interactive Accordion & Visible Content) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Frequently Asked Questions About Makkah Prayer Times
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Answers to common questions regarding Makkah namaz times, calculations, and traditions
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {makkahFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c19] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 10. LINKS TO RELATED PRAYER TIME PAGES & ARCHITECTURE */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
            Explore Related Islamic Prayer Times & Tools
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <a
              href="/prayer-times"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('prayer-times');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Global Prayer Times</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/ishraq-prayer-time"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('intent-ishraq');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Ishraq Prayer Time</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/tahajjud-time"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('intent-tahajjud');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Tahajjud & Qiyam Time</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/duha-prayer-time"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('intent-duha');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Duha & Chasht Time</span>
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
              <span>Qibla Finder</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/islamic-calendar"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('islamic-calendar');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Hijri Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/ramadan"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('ramadan');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Ramadan Hub</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="/methodology"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('methodology');
              }}
              className="p-3 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:text-emerald-600 transition-all font-medium flex items-center justify-between"
            >
              <span>Calculation Methodology</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          {/* Architecture preparation for future holy cities */}
          <div className="pt-2 text-xs text-stone-500 dark:text-stone-400">
            <span>Also coming soon: </span>
            <span className="font-semibold text-stone-600 dark:text-stone-300">
              Prayer Times in Madinah, Jeddah, and Riyadh
            </span>
          </div>
        </div>
      </section>
    </article>
  );
};
