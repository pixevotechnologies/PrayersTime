import React, { useEffect } from 'react';
import {
  Compass,
  Sun,
  Moon,
  Clock,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';
import { CALCULATION_METHOD_LABELS } from '../../services/prayerTimes';

interface MethodologyPageProps {
  onNavigate: (route: string) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updateSeoTags({
      title: 'Prayer Calculation Methodology & Astronomical Standards | Prayerstime',
      description:
        'Complete transparency into the mathematical, solar, and juristic standards used by Prayerstime. Explore Umm Al-Qura, MWL, ISNA, Karachi, Asr shadow ratios, and high latitude adjustments.',
      canonicalPath: '/methodology',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Methodology & Standards', path: '/methodology' },
      ],
    });
  }, []);

  const methodsList = Object.entries(CALCULATION_METHOD_LABELS);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-stone-200 dark:border-emerald-950/60 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Scientific & Religious Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Prayer Calculation Methodology & Astronomical Standards
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Prayerstime applies verified celestial mechanics and recognized Islamic juristic consensus to compute precise prayer times worldwide. Here is complete transparency into how every prayer and prohibition window is calculated.
        </p>
      </header>

      {/* Core Astronomical Formulas */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Sun className="w-6 h-6 text-amber-500" />
          Astronomical Basis of Daily Prayers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Fajr (Subh Sadiq)</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">15° — 19.5°</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Begins at astronomical true dawn (al-Fajr as-Sadiq), when horizontal sunlight spreads across the horizon. Calculated when the center of the sun is between 15° and 19.5° below the horizon, depending on your selected regional authority.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Sunrise (Shurooq)</span>
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400">-0.833°</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Occurs when the upper limb of the sun appears over the apparent horizon. The solar altitude is calculated at -0.833° to account for 34 arcminutes of atmospheric refraction and 16 arcminutes of semidiameter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Dhuhr (Zawal)</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Transit + Buffer</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Begins immediately after solar noon (Zawal), when the sun passes the meridian line and begins descending toward the west. A standard safety margin is added to ensure transit has concluded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Asr (Afternoon)</span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">1x or 2x Shadow</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Standard juristic opinion (Shafi'i, Maliki, Hanbali) begins when an object's shadow equals its height plus the shadow at noon. The Hanafi opinion begins when the shadow equals twice the object's height plus noon shadow.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Maghrib (Sunset & Iftar)</span>
              <span className="text-xs font-mono text-rose-600 dark:text-rose-400">-0.833°</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Commences at sunset when the full solar disk drops below the western horizon. This instantaneously marks the conclusion of the day's fast (Iftar) and the start of the Islamic night.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-2">
            <h3 className="font-bold text-stone-900 dark:text-white flex items-center justify-between">
              <span>Isha (Nightfall)</span>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">14° — 18.5° / Fixed</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Begins upon the disappearance of evening twilight (al-Shafaq). Calculated via solar depression angle (e.g. 17.5° in MWL, 15° in ISNA) or a fixed interval (e.g. 90 minutes after Maghrib in Umm Al-Qura).
            </p>
          </div>
        </div>
      </section>

      {/* Prohibited Times (Awqat al-Karahah) */}
      <section className="bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl p-6 sm:p-8 border border-amber-200 dark:border-amber-900/40 space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          Prohibited Times for Voluntary Prayer (Awqat al-Karahah)
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          Authentic traditions in Sahih Muslim (832) specify three moments during the solar cycle where offering voluntary (Nafl) prayers is prohibited:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
          <li>
            <strong>From Sunrise until the sun rises a spear's length:</strong> Approximately 15 to 20 minutes after sunrise. Once this passes, <em>Ishraq</em> and <em>Duha</em> begin.
          </li>
          <li>
            <strong>During exact solar noon (Istiwa / Zawal):</strong> From roughly 10–15 minutes prior to Dhuhr prayer until the sun begins to decline.
          </li>
          <li>
            <strong>During Sunset:</strong> As the sun turns red and begins setting into the horizon until it is completely submerged.
          </li>
        </ul>
      </section>

      {/* Supported Regional Calculation Authorities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-emerald-600" />
          Supported Calculation Conventions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methodsList.map(([key, info]) => (
            <div
              key={key}
              className="p-4 rounded-xl bg-white dark:bg-[#101b18] border border-stone-200 dark:border-emerald-950/60 space-y-1"
            >
              <span className="font-semibold text-stone-900 dark:text-white text-sm block">
                {info.name}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 block">
                Region: {info.region}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* High Latitude Adjustments */}
      <section className="p-6 rounded-2xl bg-stone-50 dark:bg-[#111c19] border border-stone-200 dark:border-emerald-950/60 space-y-3">
        <h2 className="text-lg font-bold text-stone-900 dark:text-white">
          High Latitude Adjustments (Extreme Latitudes)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          In extreme northern and southern regions during summer months, astronomical twilight may persist throughout the entire night without the sun dipping below the Fajr threshold. Prayerstime supports three internationally recognized resolutions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-[#0c1412] border border-stone-200 dark:border-stone-800">
            <strong className="block font-semibold text-stone-900 dark:text-white">
              Middle of the Night
            </strong>
            <span>Fajr does not exceed the midpoint between sunset and sunrise.</span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-[#0c1412] border border-stone-200 dark:border-stone-800">
            <strong className="block font-semibold text-stone-900 dark:text-white">
              Seventh of the Night
            </strong>
            <span>Night is split into seven parts; Fajr is placed at 1/7 before sunrise.</span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-[#0c1412] border border-stone-200 dark:border-stone-800">
            <strong className="block font-semibold text-stone-900 dark:text-white">
              Twilight Angle
            </strong>
            <span>Proportional scaling based on the sun's maximum solar depression angle.</span>
          </div>
        </div>
      </section>

      {/* Quick Navigation Footer */}
      <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={() => onNavigate('prayer-times')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>View Today's Prayer Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onNavigate('editorial-policy')}
          className="text-xs text-stone-500 hover:text-emerald-600 underline cursor-pointer"
        >
          Read our Editorial & Sourcing Policy →
        </button>
      </div>
    </article>
  );
};
