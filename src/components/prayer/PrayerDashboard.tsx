import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  Calendar,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
  Sun,
  Moon,
  ChevronRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import {
  AppSettings,
  LocationData,
  PrayerTimeItem,
} from '../../types';
import {
  calculateDailyPrayers,
  calculateLiveCountdown,
  CountdownState,
  DayPrayerResults,
  getHijriDate,
  getQiblaInfo,
  CALCULATION_METHOD_LABELS,
} from '../../services/prayerTimes';
import { soundService } from '../../services/soundService';
import { updateSeoTags } from '../../services/seoManager';

interface PrayerDashboardProps {
  location: LocationData;
  settings: AppSettings;
  onOpenLocationModal: () => void;
  onOpenSettingsModal: () => void;
  onNavigate: (route: string) => void;
}

export const PrayerDashboard: React.FC<PrayerDashboardProps> = ({
  location,
  settings,
  onOpenLocationModal,
  onOpenSettingsModal,
  onNavigate,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [prayerData, setPrayerData] = useState<DayPrayerResults>(() =>
    calculateDailyPrayers(location, new Date(), settings)
  );
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateLiveCountdown(prayerData.nextPrayer, prayerData.prayers)
  );
  const [soundPlaying, setSoundPlaying] = useState(false);

  // Recalculate prayers when location, date, or settings change
  useEffect(() => {
    const data = calculateDailyPrayers(location, currentDate, settings);
    setPrayerData(data);
  }, [location, currentDate, settings]);

  // Live countdown ticker (updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setCountdown(calculateLiveCountdown(prayerData.nextPrayer, prayerData.prayers));
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerData]);

  // Update dynamic SEO tags for Dashboard
  useEffect(() => {
    updateSeoTags({
      title: `Prayer Times Today — ${location.city}, ${location.country} | Prayerstime`,
      description: `Accurate Islamic prayer times in ${location.city}: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, live next-prayer countdown, Qibla compass bearing, and Hijri calendar.`,
      canonicalPath: '/',
      breadcrumbs: [{ name: 'Home', path: '/' }],
    });
  }, [location.city, location.country]);

  const hijri = getHijriDate(currentDate, settings.hijriAdjustment);
  const qibla = getQiblaInfo(location.latitude, location.longitude);

  const formattedGregorian = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedLiveTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: settings.timeFormat === '12h',
  });

  // Determine time-of-day greeting
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour >= 4 && hour < 12) return { text: 'Good morning', icon: Sun };
    if (hour >= 12 && hour < 17) return { text: 'Good afternoon', icon: Sun };
    if (hour >= 17 && hour < 21) return { text: 'Good evening', icon: Moon };
    return { text: 'Peaceful night', icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const handleTestAthan = () => {
    if (soundPlaying) return;
    setSoundPlaying(true);
    if (settings.audioAthan === 'chime') {
      soundService.playChime(settings.audioVolume);
    } else {
      soundService.playAthanSample(settings.audioVolume);
    }
    setTimeout(() => {
      setSoundPlaying(false);
    }, 6500);
  };

  // Daily spiritual reflection (authentic Quran / Hadith quote)
  const dailyReflections = [
    {
      arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
      source: 'Surah An-Nisa (4:103)',
      text: 'Indeed, prayer has been decreed upon the believers a decree of specified times.',
    },
    {
      arabic: 'وَأَقِمِ الصَّلَاةَ لِذِكْرِي',
      source: 'Surah Ta-Ha (20:14)',
      text: 'And establish prayer for My remembrance.',
    },
    {
      arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ الصَّلَاةُ عَلَى وَقْتِهَا',
      source: 'Sahih al-Bukhari',
      text: 'The dearest deed to Allah is prayer offered on its due time.',
    },
    {
      arabic: 'فَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا',
      source: 'Surah Qaf (50:39)',
      text: 'So be patient over what they say and exalt with praise of your Lord before the rising of the sun and before its setting.',
    },
  ];

  const todayIndex = currentDate.getDate() % dailyReflections.length;
  const currentReflection = dailyReflections[todayIndex];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO HEADER: Product Title, Tagline & Location Banner */}
      <section className="pt-2 sm:pt-4 text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 font-sans">
          PRAYERS<span className="text-emerald-700 dark:text-emerald-400">TIME</span>
        </h1>
        <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300 max-w-xl mx-auto">
          "Your Daily Guide to Prayer & Faith."
        </p>

        {/* Location & Date Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          <button
            onClick={onOpenLocationModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold border border-emerald-200/60 dark:border-emerald-800/50 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {location.city}, {location.country}
            </span>
          </button>
          <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
          <span className="font-medium text-stone-700 dark:text-stone-200">{formattedGregorian}</span>
          <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
          <span className="font-semibold text-emerald-800 dark:text-emerald-400 font-arabic text-sm sm:text-base">
            {hijri.formatted}
          </span>
        </div>
      </section>

      {/* 2. NEXT PRAYER HERO CARD: Visual Dominance, Live Countdown, and Progress */}
      {prayerData.nextPrayer && (
        <section
          id="next-prayer-hero"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 via-[#064e3b] to-[#022c22] text-white p-6 sm:p-8 md:p-10 shadow-xl ring-1 ring-emerald-600/30"
        >
          {/* Subtle Islamic Geometric Motif Watermark */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left side: Next Prayer Focus */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                  NEXT PRAYER
                </span>
                <span className="text-xs text-emerald-200/70 font-mono">
                  · Local time {formattedLiveTime}
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  {prayerData.nextPrayer.name}
                </h2>
                <span className="text-2xl sm:text-3xl text-emerald-300 font-arabic font-bold">
                  {prayerData.nextPrayer.arabicName}
                </span>
              </div>

              <p className="text-2xl sm:text-3xl font-semibold text-emerald-100/90 font-mono">
                {prayerData.nextPrayer.time}
              </p>

              <div className="pt-1 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-amber-300 text-sm font-semibold tracking-wide">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{countdown.formattedRemaining}</span>
                </div>

                {/* Audio preview button */}
                <button
                  onClick={handleTestAthan}
                  disabled={soundPlaying}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 hover:text-white text-xs font-medium border border-emerald-700/40 transition-colors cursor-pointer"
                  title="Test prayer tone or Athan"
                >
                  {soundPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                      <span>Playing...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen Athan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right side: Countdown Digital Clock & Circular Progress */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-emerald-950/50 p-5 sm:p-6 rounded-2xl border border-emerald-700/30 backdrop-blur-xs">
              {/* Circular Progress Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#047857"
                    strokeWidth="6"
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="6"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * countdown.progressPercentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute text-center flex flex-col items-center">
                  <span className="text-xl font-bold font-mono text-white">
                    {Math.round(countdown.progressPercentage)}%
                  </span>
                  <span className="text-[10px] uppercase text-emerald-300 tracking-wider">
                    Cycle
                  </span>
                </div>
              </div>

              {/* Ticker units */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/30 min-w-[60px]">
                  <span className="block text-2xl font-black font-mono text-white">
                    {countdown.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300">Hours</span>
                </div>
                <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/30 min-w-[60px]">
                  <span className="block text-2xl font-black font-mono text-white">
                    {countdown.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300">Mins</span>
                </div>
                <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/30 min-w-[60px]">
                  <span className="block text-2xl font-black font-mono text-amber-300">
                    {countdown.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. PRAYER PROGRESS: Horizontal Day Progress Bar */}
      <section className="bg-[#f7f5f0] dark:bg-[#101a17] rounded-2xl p-4 sm:p-6 border border-stone-200 dark:border-emerald-950/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Today's Prayer Cycle Progress
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Current: <strong className="text-emerald-700 dark:text-emerald-400">{prayerData.currentPrayer?.name || 'Night / Tahajjud'}</strong>
          </span>
        </div>

        {/* The visual timeline representation */}
        <div className="relative pt-2 pb-1">
          {/* Connector line */}
          <div className="absolute top-5 left-4 right-4 h-1 bg-stone-200 dark:bg-stone-800 rounded-full" />

          {/* Stepped Prayer Nodes */}
          <div className="relative flex justify-between">
            {prayerData.prayers.map((prayer, idx) => {
              const isPassed = prayer.isPassed;
              const isNext = prayer.isNext;
              const isCurrent = prayer.isCurrent;

              return (
                <div
                  key={prayer.name}
                  className="flex flex-col items-center text-center group cursor-default"
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                      isNext
                        ? 'bg-amber-500 text-stone-900 ring-4 ring-amber-400/30 scale-110 shadow-md'
                        : isCurrent
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/30'
                        : isPassed
                        ? 'bg-emerald-800 text-emerald-200'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-semibold ${
                      isNext
                        ? 'text-amber-600 dark:text-amber-400 font-bold'
                        : isCurrent
                        ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                        : isPassed
                        ? 'text-stone-700 dark:text-stone-300'
                        : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {prayer.name}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    {prayer.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TODAY'S PRAYER TIMETABLE CARDS (Responsive: Horizontal on desktop, vertical on mobile) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Today's Prayer Times
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Calculated using {CALCULATION_METHOD_LABELS[settings.method]?.name} ({settings.madhab === 'hanafi' ? 'Hanafi' : 'Standard Asr'})
            </p>
          </div>
          <button
            onClick={() => onNavigate('prayer-times')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <span>Full Timetable</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* The prayer cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {prayerData.prayers.map((prayer) => {
            const isNext = prayer.isNext;
            const isCurrent = prayer.isCurrent;
            const isPassed = prayer.isPassed;

            return (
              <div
                key={prayer.name}
                className={`relative rounded-2xl p-4 transition-all duration-200 ${
                  isNext
                    ? 'bg-gradient-to-b from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-emerald-950/40 border-2 border-amber-500 shadow-md scale-[1.02]'
                    : isCurrent
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-500/60 shadow-xs'
                    : isPassed
                    ? 'bg-[#f5f3ee] dark:bg-[#101916] border border-stone-200/80 dark:border-emerald-950/50 opacity-80'
                    : 'bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30'
                }`}
              >
                {isNext && (
                  <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-md bg-amber-500 text-stone-900 text-[9px] font-black uppercase tracking-wider shadow-xs">
                    Next Prayer
                  </span>
                )}

                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-bold ${
                      isNext
                        ? 'text-amber-700 dark:text-amber-400'
                        : isCurrent
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {prayer.name}
                  </span>
                  <span className="text-sm font-arabic font-bold text-stone-400 dark:text-stone-500">
                    {prayer.arabicName}
                  </span>
                </div>

                <div className="mt-2">
                  <span
                    className={`text-lg sm:text-xl font-black font-mono tracking-tight block ${
                      isNext
                        ? 'text-amber-800 dark:text-amber-300'
                        : isCurrent
                        ? 'text-emerald-800 dark:text-emerald-300'
                        : 'text-stone-900 dark:text-stone-100'
                    }`}
                  >
                    {prayer.time}
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 truncate block mt-0.5">
                    {prayer.meaning}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. "YOUR DAY WITH PRAYERSTIME" (Connected Daily Islamic Guidance) */}
      <section
        id="your-day-companion"
        className="rounded-3xl bg-gradient-to-br from-[#f5f2ea] to-[#eeeae0] dark:from-[#111c19] dark:to-[#0b1311] p-6 sm:p-8 border border-stone-200 dark:border-emerald-950 shadow-sm"
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              <GreetingIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                {greeting.text} · Your Day with Prayerstime
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Spiritual rhythm and daily guidance for {hijri.formatted}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-700 text-white">
            Daily Companion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Quranic/Hadith Reflection */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ayah of Reflection</span>
            </div>
            <p className="font-arabic text-lg sm:text-xl text-stone-800 dark:text-stone-100 leading-relaxed font-bold text-right" dir="rtl">
              "{currentReflection.arabic}"
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-300 italic">
              "{currentReflection.text}"
            </p>
            <span className="text-xs font-medium text-stone-400 dark:text-stone-500 block">
              — {currentReflection.source}
            </span>
          </div>

          {/* Quick Context Card (Qibla & Tahajjud) */}
          <div className="space-y-3 bg-white/70 dark:bg-[#14221e]/80 p-4 rounded-2xl border border-stone-200/80 dark:border-emerald-900/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Qibla from {location.city}
              </span>
              <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
                {qibla.bearing}° ({qibla.cardinal})
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Kaaba is {qibla.distanceKm.toLocaleString()} km away.
            </p>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between">
              <span className="text-xs text-stone-600 dark:text-stone-400">
                Tahajjud / Qiyam Time:
              </span>
              <span className="text-xs font-semibold font-mono text-stone-900 dark:text-stone-200">
                {prayerData.qiyamTime}
              </span>
            </div>

            <button
              onClick={() => onNavigate('qibla')}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>Open Qibla Compass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5.5 SPECIAL & VOLUNTARY PRAYERS TODAY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Special & Voluntary Prayers in {location.city}
            </h3>
          </div>
          <span className="text-xs text-stone-500">Calculated for today</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('intent-ishraq')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 text-left transition-all group cursor-pointer shadow-2xs"
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
              Ishraq
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white block group-hover:text-emerald-600">
              Post-Sunrise
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              15-20 min after sunrise
            </span>
          </button>

          <button
            onClick={() => onNavigate('intent-duha')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 text-left transition-all group cursor-pointer shadow-2xs"
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
              Duha (Chasht)
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white block group-hover:text-emerald-600">
              Forenoon
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Mid-morning to Zawal
            </span>
          </button>

          <button
            onClick={() => onNavigate('intent-tahajjud')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 text-left transition-all group cursor-pointer shadow-2xs"
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
              Tahajjud
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white block group-hover:text-emerald-600">
              {prayerData.qiyamTime || '03:30 AM'}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Last third of night
            </span>
          </button>

          <button
            onClick={() => onNavigate('intent-awabeen')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 text-left transition-all group cursor-pointer shadow-2xs"
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
              Awabeen
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white block group-hover:text-emerald-600">
              Post-Maghrib
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              6 rak'ahs of return
            </span>
          </button>
        </div>
      </section>

      {/* 6. QUICK ISLAMIC TOOLS ECOSYSTEM DIRECTORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Essential Daily Tools
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Carefully designed, distraction-free Islamic utilities
            </p>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            View All Tools
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Tool 1: Daily Dhikr & Tracker */}
          <button
            onClick={() => onNavigate('tools-dhikr')}
            className="group text-left p-4 rounded-2xl bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer relative"
          >
            <span className="absolute top-2 right-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              New
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Daily Dhikr
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
              Curated Sunnah remembrances with interactive progress tracker.
            </p>
          </button>

          {/* Tool 2: Qibla */}
          <button
            onClick={() => onNavigate('qibla')}
            className="group text-left p-4 rounded-2xl bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Qibla Finder
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
              Live compass and direct bearing to Kaaba.
            </p>
          </button>

          {/* Tool 3: Calendar */}
          <button
            onClick={() => onNavigate('islamic-calendar')}
            className="group text-left p-4 rounded-2xl bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Islamic Calendar
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
              Hijri & Gregorian monthly dates and holidays.
            </p>
          </button>

          {/* Tool 4: Ramadan Mode */}
          <button
            onClick={() => onNavigate('ramadan')}
            className="group text-left p-4 rounded-2xl bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Ramadan Hub
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
              Imsak, Iftar countdown, and 30-day schedule.
            </p>
          </button>

          {/* Tool 5: Zakat Calculator */}
          <button
            onClick={() => onNavigate('tools-zakat')}
            className="group text-left p-4 rounded-2xl bg-[#fcfbf9] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <span className="font-bold text-sm">2.5%</span>
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Zakat Calculator
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
              Nisab comparison and clear asset calculation.
            </p>
          </button>
        </div>
      </section>
    </div>
  );
};
