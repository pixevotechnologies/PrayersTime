import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Info,
} from 'lucide-react';
import { AppSettings, LocationData, IslamicEvent } from '../../types';
import {
  getHijriDate,
  getMajorIslamicEvents,
  calculateDailyPrayers,
} from '../../services/prayerTimes';
import { useLanguage } from '../../services/i18n';

interface IslamicCalendarViewProps {
  location: LocationData;
  settings: AppSettings;
  onNavigate: (route: string) => void;
}

export const IslamicCalendarView: React.FC<IslamicCalendarViewProps> = ({
  location,
  settings,
  onNavigate,
}) => {
  const { t, getPrayerName, language } = useLanguage();
  const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());

  const year = currentDisplayDate.getFullYear();
  const month = currentDisplayDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDisplayDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDisplayDate(new Date(year, month + 1, 1));
  };

  const handleCurrentMonth = () => {
    setCurrentDisplayDate(new Date());
    setSelectedDay(new Date());
  };

  const monthName = currentDisplayDate.toLocaleDateString(language === 'en' ? 'en-US' : language, {
    month: 'long',
    year: 'numeric',
  });

  // Generate grid days for the month
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun, 6 = Sat
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Selected day prayer times
  const selectedPrayers = selectedDay
    ? calculateDailyPrayers(location, selectedDay, settings)
    : null;
  const selectedHijri = selectedDay
    ? getHijriDate(selectedDay, settings.hijriAdjustment)
    : null;

  const islamicEvents = getMajorIslamicEvents(1448);

  // Check if a given date has an Islamic event
  const getEventForDate = (date: Date): IslamicEvent | undefined => {
    const h = getHijriDate(date, settings.hijriAdjustment);
    return islamicEvents.find(
      (ev) => ev.hijriMonth === h.month && ev.hijriDay === h.day
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t('nav.calendar')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">
            {t('cal.title')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
            {location.city}, {location.country} — {t('cal.gregorian')} & {t('cal.hijri')}
          </p>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleCurrentMonth}
            className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            {t('page.today')}
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Monthly Calendar Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {monthName}
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {t('cal.hijri')} / {t('cal.gregorian')}
            </span>
          </div>

          <div className="rounded-2xl border border-stone-200 dark:border-emerald-950/80 bg-white dark:bg-[#101a17] shadow-sm overflow-hidden">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 bg-[#f5f2ea] dark:bg-[#0c1412] text-center text-xs font-bold text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 py-3">
              <span>{new Date(2026, 2, 1).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span>{new Date(2026, 2, 2).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span>{new Date(2026, 2, 3).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span>{new Date(2026, 2, 4).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span>{new Date(2026, 2, 5).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span className="text-emerald-700 dark:text-emerald-400">{new Date(2026, 2, 6).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
              <span>{new Date(2026, 2, 7).toLocaleDateString(language === 'en' ? 'en-US' : language, { weekday: 'short' })}</span>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 text-center divide-y divide-x divide-stone-100 dark:divide-stone-800/80">
              {/* Empty leading cells */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 sm:p-3 bg-stone-50/50 dark:bg-stone-900/20 min-h-[68px] sm:min-h-[84px]" />
              ))}

              {/* Day cells */}
              {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const cellDate = new Date(year, month, dayNum);
                const isToday =
                  cellDate.getFullYear() === today.getFullYear() &&
                  cellDate.getMonth() === today.getMonth() &&
                  cellDate.getDate() === today.getDate();
                const isSelected =
                  selectedDay &&
                  cellDate.getFullYear() === selectedDay.getFullYear() &&
                  cellDate.getMonth() === selectedDay.getMonth() &&
                  cellDate.getDate() === selectedDay.getDate();

                const cellHijri = getHijriDate(cellDate, settings.hijriAdjustment);
                const event = getEventForDate(cellDate);

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(cellDate)}
                    className={`relative p-2 sm:p-3 flex flex-col items-center justify-between min-h-[68px] sm:min-h-[84px] transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-inner font-bold'
                        : isToday
                        ? 'bg-amber-100/70 dark:bg-amber-950/40 text-stone-900 dark:text-stone-100'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="w-full flex items-start justify-between">
                      <span className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : ''}`}>
                        {dayNum}
                      </span>
                      {event && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title={event.nameEn} />
                      )}
                    </div>

                    <div className="w-full text-right mt-1">
                      <span
                        className={`text-[11px] font-arabic font-semibold block leading-tight ${
                          isSelected ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-400'
                        }`}
                      >
                        {cellHijri.day}
                      </span>
                      <span
                        className={`text-[9px] truncate block ${
                          isSelected ? 'text-emerald-200' : 'text-stone-400'
                        }`}
                      >
                        {cellHijri.monthNameEn.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Selected Date Details & Major Islamic Events */}
        <div className="space-y-6">
          {/* Selected Day Schedule Box */}
          {selectedDay && selectedPrayers && selectedHijri && (
            <div className="rounded-3xl bg-[#f7f5f0] dark:bg-[#121c19] p-5 border border-stone-200 dark:border-emerald-950 space-y-4 shadow-sm">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400 block">
                  {t('cal.gregorian')} & {t('cal.hijri')}
                </span>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {selectedDay.toLocaleDateString(language === 'en' ? 'en-US' : language, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h3>
                <span className="text-xs text-emerald-800 dark:text-emerald-400 font-arabic font-bold block mt-0.5">
                  {selectedHijri.formatted}
                </span>
              </div>

              {/* Prayer list for selected date */}
              <div className="space-y-2">
                {selectedPrayers.prayers.map((prayer) => {
                  const localized = getPrayerName(prayer.name);
                  return (
                    <div
                      key={prayer.name}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-white dark:bg-[#172521] border border-stone-200/60 dark:border-stone-800"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-700 dark:text-stone-300">
                          {localized.name}
                        </span>
                        <span className="text-[10px] font-arabic text-emerald-700 dark:text-emerald-400">
                          {localized.arabic}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                        {prayer.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Major Islamic Holy Days List */}
          <div className="rounded-3xl bg-[#f7f5f0] dark:bg-[#121c19] p-5 border border-stone-200 dark:border-emerald-950 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {t('cal.events')}
              </h3>
            </div>

            <div className="space-y-3">
              {islamicEvents.slice(0, 6).map((ev) => (
                <div
                  key={ev.nameEn}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#172521] border border-stone-200/60 dark:border-stone-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {ev.nameEn}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {ev.hijriDay} {['', 'Muh', 'Saf', 'Rab I', 'Rab II', 'Jum I', 'Jum II', 'Raj', 'Sha', 'Ram', 'Shaw', 'Dhu Q', 'Dhu H'][ev.hijriMonth]}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
