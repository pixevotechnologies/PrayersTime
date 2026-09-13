import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Repeat,
  BookOpen,
  Calendar,
  Sparkles,
  Check,
  RotateCcw,
  Volume2,
  DollarSign,
  Share2,
  Heart,
} from 'lucide-react';
import { soundService } from '../../services/soundService';
import { DailyDhikr } from './DailyDhikr';

interface ToolsHubProps {
  initialSubTab?: string;
  onNavigate: (route: string) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({
  initialSubTab = 'dhikr',
  onNavigate,
}) => {
  const normalizeTab = (tab: string) => {
    const clean = tab.startsWith('tools-') ? tab.replace('tools-', '') : tab;
    if (clean === 'daily-dhikr' || clean === 'tools' || clean === '') return 'dhikr';
    return clean;
  };

  const [activeTab, setActiveTab] = useState<string>(normalizeTab(initialSubTab));

  useEffect(() => {
    setActiveTab(normalizeTab(initialSubTab));
  }, [initialSubTab]);

  // ----------------------------------------------------
  // TOOL 1: ZAKAT CALCULATOR STATE
  // ----------------------------------------------------
  const [cash, setCash] = useState<number>(5000);
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [debtsOwed, setDebtsOwed] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');

  // Approximate standard market rates per gram (can be customized)
  const goldPricePerGram = 75; // USD/g approx
  const silverPricePerGram = 0.95; // USD/g approx
  // Gold Nisab: 85g gold
  const goldNisabThreshold = 85 * goldPricePerGram; // $6,375

  const totalAssets =
    Number(cash || 0) +
    Number(goldGrams || 0) * goldPricePerGram +
    Number(silverGrams || 0) * silverPricePerGram +
    Number(investments || 0);

  const netZakatableWealth = Math.max(0, totalAssets - Number(debtsOwed || 0));
  const isEligibleForZakat = netZakatableWealth >= goldNisabThreshold;
  const zakatDue = isEligibleForZakat ? netZakatableWealth * 0.025 : 0;

  // ----------------------------------------------------
  // TOOL 2: DIGITAL TASBIH COUNTER STATE
  // ----------------------------------------------------
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [selectedDhikr, setSelectedDhikr] = useState<string>('SubhanAllah');

  const dhikrPresets = [
    { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', meaning: 'Glory be to Allah', target: 33 },
    { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'Praise be to Allah', target: 33 },
    { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', meaning: 'Allah is the Greatest', target: 34 },
    { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', meaning: 'I seek forgiveness from Allah', target: 100 },
    { name: 'La ilaha illa Allah', arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ', meaning: 'There is no god but Allah', target: 100 },
  ];

  const handleTasbihTap = () => {
    soundService.playClick(0.3);
    const newCount = tasbihCount + 1;
    setTasbihCount(newCount);
    if (newCount % tasbihTarget === 0) {
      soundService.playChime(0.4);
    }
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
  };

  // ----------------------------------------------------
  // TOOL 3: ISLAMIC DATE CONVERTER STATE
  // ----------------------------------------------------
  const [convGregDate, setConvGregDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [convResult, setConvResult] = useState<string>('Rabi’ II 2, 1448 AH');

  const handleConvertGregToHijri = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConvGregDate(val);
    if (!val) return;
    const d = new Date(val);
    // Rough astronomical calculation for preview
    const gregYear = d.getFullYear();
    const estHijriYear = Math.round((gregYear - 622) * (33 / 32));
    setConvResult(`Estimated Hijri Date: ${d.getDate()}th of Month, ${estHijriYear} AH`);
  };

  // ----------------------------------------------------
  // TOOL 4: ATHKAR & DUA REPERTOIRE
  // ----------------------------------------------------
  const athkarCategories = [
    {
      id: 'morning',
      title: 'Morning Remembrance',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: 'Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah.',
      translation: 'We have entered the morning and the kingdom belongs to Allah, and all praise is for Allah.',
      source: 'Muslim',
    },
    {
      id: 'evening',
      title: 'Evening Remembrance',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: 'Amsayna wa-amsal-mulku lillah, wal-hamdu lillah.',
      translation: 'We have entered the evening and the kingdom belongs to Allah, and all praise is for Allah.',
      source: 'Muslim',
    },
    {
      id: 'sleep',
      title: 'Before Sleeping',
      arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ',
      transliteration: 'Bismika Rabbi wada’tu janbi wa bika arfa’uh.',
      translation: 'In Your name, my Lord, I lay my side down, and in Your name I raise it up.',
      source: 'Bukhari & Muslim',
    },
    {
      id: 'waking',
      title: 'Upon Waking Up',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      transliteration: 'Alhamdu lillahil-ladhi ahyana ba’da ma amatana wa ilayhin-nushoor.',
      translation: 'Praise is to Allah Who gave us life after having given us death, and unto Him is the resurrection.',
      source: 'Bukhari',
    },
    {
      id: 'after_prayer',
      title: 'After Obligatory Prayer',
      arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ. اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ',
      transliteration: 'Astaghfirullah (3x). Allahumma Antas-Salam wa minkas-salam.',
      translation: 'I seek Allah’s forgiveness (3x). O Allah, You are Peace and from You comes peace.',
      source: 'Muslim',
    },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Islamic Daily Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50">
          Islamic Daily Tools Ecosystem
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
          Thoughtfully built, accurate spiritual utilities to accompany your daily life.
        </p>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex items-center justify-center overflow-x-auto py-1">
        <div className="inline-flex rounded-2xl bg-[#f2efe9] dark:bg-[#121c19] p-1 border border-stone-200 dark:border-emerald-950 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dhikr')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dhikr'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Dhikr & Tracker</span>
          </button>
          <button
            onClick={() => setActiveTab('tasbih')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tasbih'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Digital Tasbih
          </button>
          <button
            onClick={() => setActiveTab('zakat')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'zakat'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Zakat Calculator
          </button>
          <button
            onClick={() => setActiveTab('athkar')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'athkar'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Daily Athkar
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'converter'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Date Converter
          </button>
        </div>
      </div>

      {/* TAB 0: DAILY DHIKR & TRACKER */}
      {activeTab === 'dhikr' && <DailyDhikr />}

      {/* TAB 1: ZAKAT CALCULATOR */}
      {activeTab === 'zakat' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-8 border border-stone-200 dark:border-emerald-950 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Zakat al-Mal Calculator</span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Calculate your obligatory annual 2.5% Zakat on eligible savings and wealth above Nisab.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block">Gold Nisab (85g)</span>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                ${goldNisabThreshold.toLocaleString()} USD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Cash on Hand & Bank Balances ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={cash}
                  onChange={(e) => setCash(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#152420] text-stone-900 dark:text-stone-100 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Gold Owned (in Grams)
                </label>
                <input
                  type="number"
                  min="0"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#152420] text-stone-900 dark:text-stone-100 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-[11px] text-stone-400 mt-0.5 block">Estimated @ $75/g</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Stocks, Mutual Funds, Crypto ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={investments}
                  onChange={(e) => setInvestments(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#152420] text-stone-900 dark:text-stone-100 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                  Short-Term Debts & Liabilities Due ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={debtsOwed}
                  onChange={(e) => setDebtsOwed(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#152420] text-stone-900 dark:text-stone-100 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Zakat Result Summary Card */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#f5f2ea] dark:bg-[#14221e] border border-stone-200 dark:border-emerald-950 space-y-4">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-stone-500 dark:text-stone-400">
                  Total Zakatable Wealth
                </span>
                <p className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100">
                  ${netZakatableWealth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>

                <div className="pt-2">
                  {isEligibleForZakat ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      Above Nisab (${goldNisabThreshold.toLocaleString()}) — Zakat is Due
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold">
                      Below Nisab threshold — No Zakat obligatory
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Your Obligatory Zakat (2.5%)
                </span>
                <span className="text-3xl sm:text-4xl font-black font-mono text-stone-900 dark:text-stone-50">
                  ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                  Zakat purified wealth should be distributed to eligible beneficiaries (the poor, destitute, those in debt, etc.) as detailed in Surah At-Tawbah (9:60).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL TASBIH COUNTER */}
      {activeTab === 'tasbih' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-10 border border-stone-200 dark:border-emerald-950 text-center space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-2">
              <Repeat className="w-5 h-5 text-emerald-600" />
              <span>Digital Tasbih & Dhikr Counter</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Tap anywhere on the large counter button to record your remembrance with gentle sound feedback.
            </p>
          </div>

          {/* Dhikr Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {dhikrPresets.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedDhikr(item.name);
                  setTasbihTarget(item.target);
                  setTasbihCount(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDhikr === item.name
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-[#152320] text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {item.name} ({item.target})
              </button>
            ))}
          </div>

          {/* Large Dhikr Display */}
          <div className="space-y-1">
            <span className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-400 block">
              {dhikrPresets.find((x) => x.name === selectedDhikr)?.arabic}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {dhikrPresets.find((x) => x.name === selectedDhikr)?.meaning}
            </span>
          </div>

          {/* The Big Tap Counter Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={handleTasbihTap}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-emerald-700 via-emerald-800 to-[#022c22] text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer border-4 border-amber-400/80 group"
            >
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight group-hover:scale-105 transition-transform">
                {tasbihCount}
              </span>
              <span className="text-xs font-semibold text-emerald-200 mt-1">
                Target: {tasbihTarget} · Tap to Count
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handleResetTasbih}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Counter</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: DAILY ATHKAR */}
      {activeTab === 'athkar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Daily Athkar & Supplications</span>
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Authentic Sunnah Supplications
            </span>
          </div>

          <div className="space-y-3">
            {athkarCategories.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#fcfbf9] dark:bg-[#101a17] border border-stone-200 dark:border-emerald-950 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-stone-400">{item.source}</span>
                </div>

                <p className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100 text-right leading-relaxed" dir="rtl">
                  {item.arabic}
                </p>

                <p className="text-xs text-emerald-800 dark:text-emerald-300 italic font-medium">
                  {item.transliteration}
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-300">
                  "{item.translation}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DATE CONVERTER */}
      {activeTab === 'converter' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-8 border border-stone-200 dark:border-emerald-950 space-y-6 shadow-sm">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Gregorian ↔ Hijri Date Converter</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Accurately convert dates between the solar Gregorian calendar and the Islamic lunar calendar.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Select Gregorian Date
              </label>
              <input
                type="date"
                value={convGregDate}
                onChange={handleConvertGregToHijri}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#152420] text-stone-900 dark:text-stone-100 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="p-5 rounded-2xl bg-[#f5f2ea] dark:bg-[#14221e] border border-stone-200 dark:border-emerald-950 text-center space-y-1">
              <span className="text-xs uppercase font-bold text-stone-500 dark:text-stone-400 block">
                Islamic Lunar Date
              </span>
              <span className="text-xl font-bold text-emerald-800 dark:text-emerald-300 block">
                {convResult}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
