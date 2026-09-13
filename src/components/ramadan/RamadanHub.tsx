import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Moon,
  Sun,
  Clock,
  Printer,
  Download,
  BookOpen,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { AppSettings, LocationData } from '../../types';
import {
  calculateDailyPrayers,
  calculateMonthlyTimetable,
  getHijriDate,
} from '../../services/prayerTimes';

interface RamadanHubProps {
  location: LocationData;
  settings: AppSettings;
  onNavigate: (route: string) => void;
}

export const RamadanHub: React.FC<RamadanHubProps> = ({
  location,
  settings,
  onNavigate,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const todayPrayers = calculateDailyPrayers(location, currentDate, settings);
  const hijri = getHijriDate(currentDate, settings.hijriAdjustment);

  // Live countdown to Iftar or Imsak
  const [targetType, setTargetType] = useState<'iftar' | 'imsak'>('iftar');
  const [remainingText, setRemainingText] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      setCurrentDate(now);

      const imsakTime = todayPrayers.imsakTime; // Fajr - 10 mins approx
      const iftarTime = todayPrayers.iftarTime; // Maghrib

      if (now < iftarTime && now >= imsakTime) {
        // Daytime: fasting in progress, counting down to Iftar!
        setTargetType('iftar');
        const diffMs = iftarTime.getTime() - now.getTime();
        const hrs = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
        setRemainingText(`${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`);
      } else {
        // Nighttime: counting down to Imsak (Suhoor ends)
        setTargetType('imsak');
        let target = imsakTime;
        if (now >= iftarTime) {
          // Imsak tomorrow morning
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowPrayers = calculateDailyPrayers(location, tomorrow, settings);
          target = tomorrowPrayers.imsakTime;
        }
        const diffMs = Math.max(0, target.getTime() - now.getTime());
        const hrs = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
        setRemainingText(`${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [location, settings, todayPrayers]);

  // Ramadan 30-day schedule generator
  // We can calculate a 30-day Ramadan schedule based on the location
  const ramadanDays = Array.from({ length: 30 }).map((_, idx) => {
    const dayDate = new Date(currentDate);
    dayDate.setDate(currentDate.getDate() + idx);
    const p = calculateDailyPrayers(location, dayDate, settings);
    return {
      day: idx + 1,
      dateFormatted: dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
      imsak: p.imsakTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: settings.timeFormat === '12h' }),
      fajr: p.prayers.find((x) => x.name === 'Fajr')?.time || '',
      dhuhr: p.prayers.find((x) => x.name === 'Dhuhr')?.time || '',
      asr: p.prayers.find((x) => x.name === 'Asr')?.time || '',
      iftar: p.prayers.find((x) => x.name === 'Maghrib')?.time || '',
      isha: p.prayers.find((x) => x.name === 'Isha')?.time || '',
    };
  });

  const formattedImsak = todayPrayers.imsakTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h',
  });

  const formattedIftar = todayPrayers.iftarTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h',
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Ramadan Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Ramadan Mubarak Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
            Daily Imsak, Iftar, fasting countdown, and 30-day schedule for {location.city}, {location.country}.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold text-xs border border-amber-300/60">
          <Moon className="w-4 h-4 text-amber-600" />
          <span>Holy Month of Fasting</span>
        </div>
      </div>

      {/* Hero: Fasting Countdown Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#07382d] to-[#04241d] text-white p-6 sm:p-10 border border-emerald-700/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              {targetType === 'iftar' ? 'FASTING IN PROGRESS' : 'SUHOOR WINDOW'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {targetType === 'iftar' ? 'Countdown to Iftar' : 'Countdown to Imsak (Dawn)'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              {targetType === 'iftar'
                ? `Iftar is at Maghrib (${formattedIftar})`
                : `Imsak ends at ${formattedImsak} (10 mins before Fajr)`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-600/40 text-center min-w-[200px]">
            <span className="text-xs uppercase font-semibold text-emerald-300 block mb-1">
              Time Remaining
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-wider">
              {remainingText}
            </span>
          </div>
        </div>

        {/* Imsak & Iftar Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/60">
          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-700/30">
            <span className="text-[11px] text-emerald-300 uppercase tracking-wider block">
              Imsak (Suhoor Stops)
            </span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">
              {formattedImsak}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-700/30">
            <span className="text-[11px] text-emerald-300 uppercase tracking-wider block">
              Fajr Prayer
            </span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">
              {todayPrayers.prayers.find((x) => x.name === 'Fajr')?.time}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-700/30">
            <span className="text-[11px] text-amber-300 uppercase tracking-wider block">
              Iftar (Maghrib)
            </span>
            <span className="text-xl font-bold font-mono text-amber-300 mt-0.5 block">
              {formattedIftar}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-700/30">
            <span className="text-[11px] text-emerald-300 uppercase tracking-wider block">
              Taraweeh (Isha)
            </span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">
              {todayPrayers.prayers.find((x) => x.name === 'Isha')?.time}
            </span>
          </div>
        </div>
      </div>

      {/* Ramadan Duas for Fasting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dua at Iftar */}
        <div className="rounded-2xl bg-[#f7f5f0] dark:bg-[#121c19] p-5 border border-stone-200 dark:border-emerald-950 space-y-2">
          <span className="text-xs uppercase font-bold text-amber-600 dark:text-amber-400">
            Dua for Breaking the Fast (Iftar)
          </span>
          <p className="font-arabic text-lg font-bold text-stone-900 dark:text-stone-100 text-right leading-relaxed" dir="rtl">
            ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300 italic">
            "Dhahaba adh-dhama'u wabtallatil-'urooqu wa thabatal-ajru in sha Allah."
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills." (Abu Dawood)
          </p>
        </div>

        {/* Intention for Fasting */}
        <div className="rounded-2xl bg-[#f7f5f0] dark:bg-[#121c19] p-5 border border-stone-200 dark:border-emerald-950 space-y-2">
          <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">
            Intention for Fasting (Suhoor)
          </span>
          <p className="font-arabic text-lg font-bold text-stone-900 dark:text-stone-100 text-right leading-relaxed" dir="rtl">
            وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300 italic">
            "Wa bi sawmi ghadin nawaytu min shahri ramadan."
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            "I intend to keep the fast tomorrow in the holy month of Ramadan."
          </p>
        </div>
      </div>

      {/* 30-Day Ramadan Timetable Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              30-Day Ramadan Timetable ({location.city})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Calculated Imsak (Suhoor ending) and Iftar times for each day of Ramadan
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Schedule</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-emerald-950 bg-white dark:bg-[#101a17] shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f5f2ea] dark:bg-[#0c1412] uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 font-bold">
              <tr>
                <th className="py-3 px-3">Ramadan</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-emerald-700 dark:text-emerald-400">Imsak (Suhoor)</th>
                <th className="py-3 px-3">Fajr</th>
                <th className="py-3 px-3">Dhuhr</th>
                <th className="py-3 px-3">Asr</th>
                <th className="py-3 px-3 text-amber-600 dark:text-amber-400 font-bold">Iftar (Maghrib)</th>
                <th className="py-3 px-3">Isha / Taraweeh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 font-mono">
              {ramadanDays.map((item) => (
                <tr
                  key={item.day}
                  className={item.day === 1 ? 'bg-amber-50/70 dark:bg-amber-950/30 font-semibold' : 'hover:bg-stone-50 dark:hover:bg-stone-800/30'}
                >
                  <td className="py-2.5 px-3 font-sans font-bold">Day {item.day}</td>
                  <td className="py-2.5 px-3 font-sans">{item.dateFormatted}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-800 dark:text-emerald-400">{item.imsak}</td>
                  <td className="py-2.5 px-3">{item.fajr}</td>
                  <td className="py-2.5 px-3">{item.dhuhr}</td>
                  <td className="py-2.5 px-3">{item.asr}</td>
                  <td className="py-2.5 px-3 font-bold text-amber-700 dark:text-amber-400">{item.iftar}</td>
                  <td className="py-2.5 px-3">{item.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
