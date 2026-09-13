import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  Award,
  BookOpen,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { soundService } from '../../services/soundService';

export interface DhikrItem {
  id: string;
  category: 'morning_evening' | 'post_prayer' | 'forgiveness_praise';
  categoryLabel: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  virtue: string;
  source: string;
  target: number;
}

export const CURATED_DAILY_DHIKR: DhikrItem[] = [
  // Morning & Protection
  {
    id: 'ayat-kursi',
    category: 'morning_evening',
    categoryLabel: 'Morning & Protection',
    title: 'Ayat al-Kursi (The Throne Verse)',
    arabic: 'اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta’khudhuhu sinatuw-wa la nawm...',
    translation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep...',
    virtue: 'Whoever recites this when waking enters Allah’s divine protection until evening, and after every obligatory prayer nothing stands between them and Paradise except death.',
    source: 'Surah Al-Baqarah 2:255 · An-Nasa’i',
    target: 1,
  },
  {
    id: 'muawwidhat',
    category: 'morning_evening',
    categoryLabel: 'Morning & Protection',
    title: 'Al-Mu‘awwidhat (Protective Surahs: Ikhlas, Falaq, Nas)',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration: 'Qul Huwa Allahu Ahad... Qul a’oodhu bi Rabbil-falaq... Qul a’oodhu bi Rabbin-nas...',
    translation: 'Say: He is Allah, [who is] One... Say: I seek refuge in the Lord of daybreak... Say: I seek refuge in the Lord of mankind...',
    virtue: 'Reciting them three times in the morning and evening protects against all evil, envy, and harm.',
    source: 'Abu Dawud & Tirmidhi',
    target: 3,
  },
  {
    id: 'sayyid-istighfar',
    category: 'morning_evening',
    categoryLabel: 'Morning & Protection',
    title: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana ‘abduka, wa ana ‘ala ‘ahdika wa wa’dika mastata’tu, a’oodhu bika min sharri ma sana’tu, aboo’u laka bini’matika ‘alayya, wa aboo’u laka bidhanbi, faghfir li fa-innahu la yaghfirudh-dhunooba illa Ant.',
    translation: 'O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I remain upon Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessing upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    virtue: 'If anyone recites this during the day with conviction and dies that day before evening, they will be among the people of Paradise.',
    source: 'Sahih al-Bukhari (6306)',
    target: 1,
  },
  {
    id: 'bismillah-alladhi',
    category: 'morning_evening',
    categoryLabel: 'Morning & Protection',
    title: 'Supplication Against All Harm',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma’as-mihi shay’un fil-ardi wa la fis-sama’i wa Huwas-Sami’ul-‘Aleem.',
    translation: 'In the name of Allah, with whose name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    virtue: 'Whoever recites it three times in the morning and evening, nothing will harm them on that day or night.',
    source: 'Abu Dawud & At-Tirmidhi',
    target: 3,
  },
  {
    id: 'hasbiyallah',
    category: 'morning_evening',
    categoryLabel: 'Morning & Protection',
    title: 'HasbiyAllahu (Sufficiency of Allah)',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration: 'HasbiyAllahu la ilaha illa Huwa, ‘alayhi tawakkaltu wa Huwa Rabbul-‘Arshil-‘Azeem.',
    translation: 'Allah is sufficient for me; there is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.',
    virtue: 'Whoever recites it seven times morning and evening, Allah will relieve them of their grief and worries in this world and the next.',
    source: 'Abu Dawud (5081)',
    target: 7,
  },

  // Post-Prayer Remembrances
  {
    id: 'post-subhanallah',
    category: 'post_prayer',
    categoryLabel: 'Post-Prayer (Tasbih)',
    title: 'SubhanAllah (Tasbih)',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah (33 times)',
    translation: 'Glory be to Allah, free from all deficiency.',
    virtue: 'Recited 33 times following every obligatory prayer as instructed by the Prophet Muhammad ﷺ.',
    source: 'Sahih Muslim (597)',
    target: 33,
  },
  {
    id: 'post-alhamdulillah',
    category: 'post_prayer',
    categoryLabel: 'Post-Prayer (Tasbih)',
    title: 'Alhamdulillah (Tahmid)',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah (33 times)',
    translation: 'All praise and gratitude belong to Allah.',
    virtue: 'Fills the scale of good deeds with abundant blessings.',
    source: 'Sahih Muslim (597)',
    target: 33,
  },
  {
    id: 'post-allahu-akbar',
    category: 'post_prayer',
    categoryLabel: 'Post-Prayer (Tasbih)',
    title: 'Allahu Akbar (Takbir)',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar (34 times)',
    translation: 'Allah is the Greatest.',
    virtue: 'Completes the Sunnah post-prayer tasbih cycle of praise.',
    source: 'Sahih Muslim (597)',
    target: 34,
  },
  {
    id: 'la-ilaha-illallah-wahdahu',
    category: 'post_prayer',
    categoryLabel: 'Post-Prayer (Tasbih)',
    title: 'Tahlil Post-Prayer Seal',
    arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu, wa Huwa ‘ala kulli shay’in Qadeer.',
    translation: 'There is no god but Allah alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things competent.',
    virtue: 'Recited to seal 100 remembrances after prayer; sins are forgiven even if they were like the foam of the ocean.',
    source: 'Sahih Muslim (597)',
    target: 1,
  },

  // Forgiveness & High Reward
  {
    id: 'subhanallahi-wa-bihamdihi-100',
    category: 'forgiveness_praise',
    categoryLabel: 'Forgiveness & High Reward',
    title: 'SubhanAllahi wa bihamdihi (100 times)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'SubhanAllahi wa bihamdihi (100 times)',
    translation: 'Glory be to Allah and all praise is to Him.',
    virtue: 'Whoever says it 100 times a day, their sins will be wiped away even if they were equal to the foam of the sea.',
    source: 'Sahih al-Bukhari & Muslim',
    target: 100,
  },
  {
    id: 'astaghfirullah-100',
    category: 'forgiveness_praise',
    categoryLabel: 'Forgiveness & High Reward',
    title: 'Daily Istighfar (Seeking Forgiveness)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atoobu ilayh (100 times)',
    translation: 'I seek Allah’s forgiveness and repent to Him.',
    virtue: 'The Prophet ﷺ said: "By Allah, I seek forgiveness from Allah and turn to Him in repentance more than seventy [and a hundred] times a day."',
    source: 'Sahih al-Bukhari (6307) & Muslim',
    target: 100,
  },
  {
    id: 'adada-khalqihi',
    category: 'forgiveness_praise',
    categoryLabel: 'Forgiveness & High Reward',
    title: 'The Weight of Creation Dhikr (Juwairiyah Hadith)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    transliteration: 'SubhanAllahi wa bihamdihi, ‘adada khalqihi, wa rida nafsihi, wa zinata ‘arshihi, wa midada kalimatih.',
    translation: 'Glory be to Allah and praise be to Him, according to the number of His creation, according to His pleasure, according to the weight of His Throne, and according to the ink of His words.',
    virtue: 'Recited 3 times; the Prophet ﷺ told his wife Juwairiyah that reciting this outweighs hours of voluntary devotion.',
    source: 'Sahih Muslim (2726)',
    target: 3,
  },
  {
    id: 'la-hawla-quwwata',
    category: 'forgiveness_praise',
    categoryLabel: 'Forgiveness & High Reward',
    title: 'La hawla wa la quwwata illa billah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    transliteration: 'La hawla wa la quwwata illa billahil-‘Aliyyil-‘Azeem.',
    translation: 'There is no power nor might except with Allah, the Most High, the Supreme.',
    virtue: 'A treasure from the treasures of Paradise (Kanzun min kunooz al-Jannah).',
    source: 'Sahih al-Bukhari & Muslim',
    target: 10,
  },
  {
    id: 'salawat-prophet',
    category: 'forgiveness_praise',
    categoryLabel: 'Forgiveness & High Reward',
    title: 'Salawat upon Prophet Muhammad ﷺ',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    transliteration: 'Allahumma salli wa sallim ‘ala Nabiyyina Muhammad.',
    translation: 'O Allah, send peace and blessings upon our Prophet Muhammad.',
    virtue: 'Whoever sends blessings upon the Prophet ﷺ once, Allah sends ten blessings upon them and removes ten sins.',
    source: 'An-Nasa’i & At-Tirmidhi',
    target: 10,
  },
];

const LOCAL_STORAGE_KEY = 'prayerstime_daily_dhikr_progress';

interface StoredProgress {
  dateStr: string;
  counts: Record<string, number>;
}

export const DailyDhikr: React.FC = () => {
  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  // Today's Date String for daily reset / tracking
  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Load progress from localStorage
  const [progressCounts, setProgressCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed: StoredProgress = JSON.parse(saved);
          if (parsed.dateStr === getTodayString()) {
            return parsed.counts || {};
          }
        }
      } catch {
        // fallback
      }
    }
    return {};
  });

  // Save to localStorage when counts change
  useEffect(() => {
    try {
      const dataToSave: StoredProgress = {
        dateStr: getTodayString(),
        counts: progressCounts,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Ignore storage errors
    }
  }, [progressCounts]);

  // Handle Dhikr Tap (+1)
  const handleDhikrTap = (item: DhikrItem) => {
    const current = progressCounts[item.id] || 0;
    if (current >= item.target) {
      // Already completed, can still loop or increment if user desires
      return;
    }

    const nextVal = current + 1;
    setProgressCounts((prev) => ({
      ...prev,
      [item.id]: nextVal,
    }));

    if (soundEnabled) {
      soundService.playTasbihClick();
      if (nextVal === item.target) {
        soundService.playChime(0.5);
      }
    }
  };

  // Handle Quick Complete (mark entire item as completed)
  const handleQuickComplete = (item: DhikrItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgressCounts((prev) => ({
      ...prev,
      [item.id]: item.target,
    }));
    if (soundEnabled) {
      soundService.playChime(0.5);
    }
  };

  // Reset a single item
  const handleResetItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgressCounts((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  // Reset all progress
  const handleResetAll = () => {
    if (window.confirm('Reset all of today’s Dhikr progress to zero?')) {
      setProgressCounts({});
    }
  };

  // Toggle detail view
  const toggleDetails = (id: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculations
  const filteredList =
    selectedCategory === 'all'
      ? CURATED_DAILY_DHIKR
      : CURATED_DAILY_DHIKR.filter((x) => x.category === selectedCategory);

  const totalItems = CURATED_DAILY_DHIKR.length;
  const completedItems = CURATED_DAILY_DHIKR.filter(
    (item) => (progressCounts[item.id] || 0) >= item.target
  ).length;

  const totalTapsToday = Object.values(progressCounts).reduce<number>(
    (sum, val) => sum + Number(val || 0),
    0
  );
  const overallPercentage = Math.round((completedItems / totalItems) * 100);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Daily Summary Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-[#03231c] text-white p-6 sm:p-8 shadow-md border border-emerald-800/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Today's Daily Dhikr Progress</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Curated Daily Remembrances
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              {todayFormatted} · Authentic Sunnah supplications with personal progress tracking.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute sound feedback' : 'Enable click sound'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer text-xs flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-emerald-800/90 border-emerald-700 text-emerald-100 hover:bg-emerald-700'
                  : 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
            </button>

            <button
              onClick={handleResetAll}
              title="Reset all counts for today"
              className="p-2 rounded-xl border border-emerald-800/60 bg-emerald-950/50 hover:bg-rose-950/60 hover:border-rose-700/60 text-emerald-200 hover:text-rose-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Day</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Metric 1: Overall Completion */}
          <div className="p-4 rounded-2xl bg-white/5 border border-emerald-700/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                Completion Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-white">
                  {completedItems} / {totalItems}
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  ({overallPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Metric 2: Total Repetitions Done */}
          <div className="p-4 rounded-2xl bg-white/5 border border-emerald-700/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                Total Recitations Logged
              </span>
              <span className="text-2xl font-black font-mono text-white">
                {totalTapsToday.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Metric 3: Spiritual Goal Status */}
          <div className="p-4 rounded-2xl bg-white/5 border border-emerald-700/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                Goal Status
              </span>
              <span className="text-sm font-bold text-white">
                {overallPercentage === 100
                  ? 'All Remembrances Fulfilled!'
                  : overallPercentage >= 50
                  ? 'Halfway There — Keep Going'
                  : 'Daily Routine in Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs text-emerald-200">
            <span>Overall Routine Progress</span>
            <span className="font-mono font-bold">{overallPercentage}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-emerald-950 overflow-hidden border border-emerald-800/50">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#142320] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#1c302c]'
            }`}
          >
            All Remembrances ({CURATED_DAILY_DHIKR.length})
          </button>
          <button
            onClick={() => setSelectedCategory('morning_evening')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'morning_evening'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#142320] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#1c302c]'
            }`}
          >
            Morning & Protection (5)
          </button>
          <button
            onClick={() => setSelectedCategory('post_prayer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'post_prayer'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#142320] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#1c302c]'
            }`}
          >
            Post-Prayer Tasbih (4)
          </button>
          <button
            onClick={() => setSelectedCategory('forgiveness_praise')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'forgiveness_praise'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#142320] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#1c302c]'
            }`}
          >
            Forgiveness & Praise (5)
          </button>
        </div>

        <span className="text-xs text-stone-400">
          Showing {filteredList.length} items
        </span>
      </div>

      {/* 3. Interactive Dhikr List with Counter Cards */}
      <div className="space-y-4">
        {filteredList.map((item) => {
          const count = progressCounts[item.id] || 0;
          const isDone = count >= item.target;
          const progressPercent = Math.min(100, Math.round((count / item.target) * 100));
          const isExpanded = !!expandedDetails[item.id];

          return (
            <div
              key={item.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isDone
                  ? 'bg-[#f7faf8] dark:bg-[#0e1c18] border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                  : 'bg-[#fcfbf9] dark:bg-[#101a17] border-stone-200 dark:border-emerald-950/70 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-800'
              }`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header Row: Title, Target Badge, and Category */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">
                        {item.categoryLabel}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-[11px] text-stone-400">{item.source}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                      <span>{item.title}</span>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                          <Check className="w-3 h-3" /> Done
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Target Pill */}
                  <div className="self-start sm:self-auto flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-[#162723] text-stone-700 dark:text-stone-300 font-mono font-bold">
                      Goal: {item.target}x
                    </span>
                  </div>
                </div>

                {/* Arabic Script Display */}
                <div className="py-2 px-3 rounded-2xl bg-[#faf7f0] dark:bg-[#0a1412] border border-stone-100 dark:border-emerald-950/40">
                  <p
                    className="font-arabic text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed text-right select-text"
                    dir="rtl"
                  >
                    {item.arabic}
                  </p>
                </div>

                {/* Transliteration & English Translation */}
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-emerald-800 dark:text-emerald-300 italic font-medium leading-relaxed">
                    {item.transliteration}
                  </p>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    "{item.translation}"
                  </p>
                </div>

                {/* Collapsible Virtues and Hadith Reference */}
                {isExpanded && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1 text-stone-700 dark:text-stone-300 animate-in fade-in duration-200">
                    <span className="font-bold text-amber-800 dark:text-amber-400 block uppercase tracking-wider text-[10px]">
                      Spiritual Virtue & Hadith
                    </span>
                    <p className="leading-relaxed">{item.virtue}</p>
                  </div>
                )}

                {/* Bottom Interactive Row: Counter Controls & Progress */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Progress Indicator */}
                  <div className="space-y-1.5 flex-1 max-w-xs">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-500 dark:text-stone-400">Personal Progress</span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        {count} / {item.target} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ${
                          isDone ? 'bg-emerald-500' : 'bg-emerald-700 dark:bg-emerald-400'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Buttons: Tap Counter, Quick Done, Reset, Details */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDetails(item.id)}
                      className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      title="Read virtues and background"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Virtues</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {count > 0 && (
                      <button
                        onClick={(e) => handleResetItem(item.id, e)}
                        className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Reset this item"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    {!isDone && (
                      <button
                        onClick={(e) => handleQuickComplete(item, e)}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Mark as completed"
                      >
                        Done
                      </button>
                    )}

                    {/* Primary Tap Counter Button */}
                    <button
                      onClick={() => handleDhikrTap(item)}
                      disabled={isDone}
                      className={`px-5 py-2.5 rounded-2xl font-mono text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer ${
                        isDone
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-default'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/20'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <span>Tap +1</span>
                          <span className="bg-emerald-800/80 px-2 py-0.5 rounded-lg text-xs font-normal text-emerald-100">
                            {count}/{item.target}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
