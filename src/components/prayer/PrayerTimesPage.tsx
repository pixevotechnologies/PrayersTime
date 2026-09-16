import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Printer,
  Download,
  Clock,
  MapPin,
  Sliders,
  Sparkles,
  Database,
} from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';
import {
  AppSettings,
  LocationData,
  PrayerTimeItem,
} from '../../types';
import {
  calculateDailyPrayers,
  calculateMonthlyTimetable,
  getHijriDate,
  CALCULATION_METHOD_LABELS,
} from '../../services/prayerTimes';
import { useLanguage } from '../../services/i18n';
import { usePrayerCache } from '../../hooks/usePrayerCache';

interface PrayerTimesPageProps {
  location: LocationData;
  settings: AppSettings;
  onOpenLocationModal: () => void;
  onOpenSettingsModal: () => void;
  onNavigate: (route: string) => void;
}

export const PrayerTimesPage: React.FC<PrayerTimesPageProps> = ({
  location,
  settings,
  onOpenLocationModal,
  onOpenSettingsModal,
  onNavigate,
}) => {
  const { t, getPrayerName, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const { status: cacheStatus } = usePrayerCache(location, settings);

  useEffect(() => {
    updateSeoTags({
      title: `Prayer Times Today & Monthly Timetable — ${location.city} | Prayerstime`,
      description: `Accurate daily prayer times and monthly timetable for ${location.city}, ${location.country}. Includes Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha with astronomical precision.`,
      canonicalPath: '/prayer-times',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Prayer Times', path: '/prayer-times' },
      ],
    });
  }, [location.city, location.country]);

  // Daily prayer calculations for selected date
  const dayPrayers = calculateDailyPrayers(location, selectedDate, settings);
  const hijri = getHijriDate(selectedDate, settings.hijriAdjustment);

  // Monthly timetable for the month of selectedDate
  const monthlyTimetable = calculateMonthlyTimetable(
    location,
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    settings
  );

  const monthName = selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : language, {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handlePrevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedDate(next);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Day', 'Date', 'Hijri', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const rows = monthlyTimetable.map((row) => [
      row.dayNumber,
      `"${row.dateFormatted}"`,
      `"${row.hijriFormatted}"`,
      row.fajr,
      row.sunrise,
      row.dhuhr,
      row.asr,
      row.maghrib,
      row.isha,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Prayer_Times_${location.city}_${monthName.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">{t('nav.prayerTimes')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            {t('page.prayerTimes')} — {location.city}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Accurate astronomical calculations for {location.region || location.city}, {location.country} ({location.timezone})
          </p>
        </div>

        {/* Action buttons: Switch city, Settings, Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenLocationModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-[#121c19] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('dash.changeLocation')}</span>
          </button>

          <button
            onClick={onOpenSettingsModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-[#121c19] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('dash.settings')}</span>
          </button>

          <button
            onClick={onOpenSettingsModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-[#121c19] text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-stone-200 dark:border-emerald-900/30 hover:border-emerald-500/50 transition-colors cursor-pointer"
            title="30-day offline cache status — Click to view in Settings"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>30-Day Offline Cached</span>
          </button>

          {/* Daily vs Monthly Switcher */}
          <div className="flex items-center rounded-xl bg-stone-200/80 dark:bg-stone-800/80 p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'daily'
                  ? 'bg-white dark:bg-emerald-800 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              {t('page.daily')}
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'monthly'
                  ? 'bg-white dark:bg-emerald-800 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              {t('page.monthly')}
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'daily' ? (
        /* DAILY VIEW */
        <div className="space-y-6">
          {/* Day Navigation Bar */}
          <div className="flex items-center justify-between bg-[#f7f5f0] dark:bg-[#101a17] p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-emerald-950/80 shadow-2xs">
            <button
              onClick={handlePrevDay}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="text-center">
              <div className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                {selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : language, {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="text-xs text-emerald-800 dark:text-emerald-400 font-arabic font-bold mt-0.5">
                {hijri.formatted}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToday}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                {t('page.today')}
              </button>
              <button
                onClick={handleNextDay}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Full Daily Timetable Detailed Table */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-emerald-950 bg-white dark:bg-[#101a17] shadow-sm">
            <table className="w-full text-left rtl:text-right text-sm">
              <thead className="bg-[#f5f2ea] dark:bg-[#0c1412] text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">{t('table.prayer')}</th>
                  <th className="py-3.5 px-4 font-bold text-right sm:text-left rtl:text-left rtl:sm:text-right">{t('table.arabic')}</th>
                  <th className="py-3.5 px-4 font-bold">{t('table.time')}</th>
                  <th className="hidden sm:table-cell py-3.5 px-4 font-bold">{t('table.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                {dayPrayers.prayers.map((prayer) => {
                  const localized = getPrayerName(prayer.name);
                  return (
                    <tr
                      key={prayer.name}
                      className={`transition-colors ${
                        prayer.isNext
                          ? 'bg-amber-50/80 dark:bg-amber-950/30 font-semibold'
                          : prayer.isCurrent
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 font-semibold'
                          : 'hover:bg-stone-50/80 dark:hover:bg-stone-800/30'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 dark:text-stone-100">
                            {localized.name}
                          </span>
                          {prayer.isNext && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-stone-900">
                              {t('status.nextPrayer')}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-400 dark:text-stone-500">
                          {prayer.meaning}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right sm:text-left rtl:text-left rtl:sm:text-right font-arabic text-lg font-bold text-emerald-800 dark:text-emerald-400">
                        {localized.arabic}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-base text-stone-900 dark:text-stone-100">
                        {prayer.time}
                      </td>
                      <td className="hidden sm:table-cell py-4 px-4 text-xs">
                        {prayer.isPassed ? (
                          <span className="text-stone-400 dark:text-stone-500">{t('status.passed')}</span>
                        ) : prayer.isCurrent ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t('status.current')}</span>
                        ) : (
                          <span className="text-stone-600 dark:text-stone-300">{t('status.upcoming')}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sunnah & Night Times (Midnight, Last Third of Night) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#f7f5f0] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Midnight (Nisf al-Layl)
              </span>
              <p className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100">
                {dayPrayers.sunnahTimes.middleOfTheNight.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: settings.timeFormat === '12h',
                })}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                The midpoint between Maghrib and Fajr. Isha should be prayed before this time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7f5f0] dark:bg-[#121c19] border border-stone-200 dark:border-emerald-900/30 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Last Third of the Night (Qiyam / Tahajjud)
              </span>
              <p className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100">
                {dayPrayers.qiyamTime}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                The most blessed time for voluntary prayer (Tahajjud) and Istighfar before dawn.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* MONTHLY VIEW */
        <div className="space-y-6">
          {/* Month Navigator and Export Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f7f5f0] dark:bg-[#101a17] p-4 rounded-2xl border border-stone-200 dark:border-emerald-950/80 shadow-2xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg bg-white dark:bg-[#152320] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 min-w-[140px] text-center">
                {monthName}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg bg-white dark:bg-[#152320] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#152320] text-xs font-semibold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-stone-500" />
                <span>{t('ram.print')}</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('ram.download')}</span>
              </button>
            </div>
          </div>

          {/* Full Monthly Timetable */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-emerald-950 bg-white dark:bg-[#101a17] shadow-sm">
            <table className="w-full text-left rtl:text-right text-xs whitespace-nowrap">
              <thead className="bg-[#f5f2ea] dark:bg-[#0c1412] uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 font-bold">
                <tr>
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">{t('cal.gregorian')}</th>
                  <th className="py-3 px-3">{t('cal.hijri')}</th>
                  <th className="py-3 px-3">{getPrayerName('Fajr').name}</th>
                  <th className="py-3 px-3">{getPrayerName('Sunrise').name}</th>
                  <th className="py-3 px-3">{getPrayerName('Dhuhr').name}</th>
                  <th className="py-3 px-3">{getPrayerName('Asr').name}</th>
                  <th className="py-3 px-3">{getPrayerName('Maghrib').name}</th>
                  <th className="py-3 px-3">{getPrayerName('Isha').name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 font-mono">
                {monthlyTimetable.map((row) => {
                  const now = new Date();
                  const isToday =
                    row.date.getFullYear() === now.getFullYear() &&
                    row.date.getMonth() === now.getMonth() &&
                    row.date.getDate() === now.getDate();

                  return (
                    <tr
                      key={row.dayNumber}
                      className={
                        isToday
                          ? 'bg-amber-50/90 dark:bg-amber-950/40 font-bold text-amber-950 dark:text-amber-200'
                          : 'hover:bg-stone-50 dark:hover:bg-stone-800/30'
                      }
                    >
                      <td className="py-2.5 px-3">{row.dayNumber}</td>
                      <td className="py-2.5 px-3 font-sans font-medium">{row.dateFormatted}</td>
                      <td className="py-2.5 px-3 font-arabic font-semibold">{row.hijriFormatted}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-800 dark:text-emerald-400">{row.fajr}</td>
                      <td className="py-2.5 px-3 text-stone-500">{row.sunrise}</td>
                      <td className="py-2.5 px-3 font-semibold">{row.dhuhr}</td>
                      <td className="py-2.5 px-3 font-semibold">{row.asr}</td>
                      <td className="py-2.5 px-3 font-semibold text-amber-700 dark:text-amber-400">{row.maghrib}</td>
                      <td className="py-2.5 px-3 font-semibold">{row.isha}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculation Transparency Disclaimer Banner */}
      <div className="rounded-2xl p-4 bg-[#f5f2ea]/80 dark:bg-[#111b19] border border-stone-200 dark:border-emerald-950 text-xs text-stone-600 dark:text-stone-300 space-y-1">
        <span className="font-bold text-stone-900 dark:text-stone-100 block">
          Calculation Transparency Notice:
        </span>
        <p>
          Times are computed using {CALCULATION_METHOD_LABELS[settings.method]?.name} ({settings.madhab === 'hanafi' ? 'Hanafi Asr shadow ratio' : 'Standard Asr shadow ratio'}). Local religious authorities or mosque committees may apply minor rounding or sight adjustments.
        </p>
      </div>
    </div>
  );
};
