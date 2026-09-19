import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sun,
  Moon,
  AlertTriangle,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';
import { useLanguage } from '../../services/i18n';

interface PrayerKnowledgeHubProps {
  onNavigate: (route: string) => void;
}

interface ArticleItem {
  id: string;
  title: string;
  category: 'Voluntary (Nafl)' | 'Obligatory (Fard)' | 'Prohibitions (Makruh)' | 'Travel & Exceptions';
  summary: string;
  hadithSource: string;
  timingRule: string;
  fullContent: string[];
  faqs: { q: string; a: string }[];
  routeLink?: string;
  linkText?: string;
}

const KNOWLEDGE_ARTICLES: ArticleItem[] = [
  {
    id: 'ishraq',
    title: 'What is Ishraq Prayer and When Does It Begin?',
    category: 'Voluntary (Nafl)',
    summary:
      'Ishraq (صلاة الإشراق) is an esteemed voluntary post-dawn prayer offered when the sun has fully risen above the horizon by the length of a spear (approximately 15 to 20 minutes after astronomical sunrise).',
    hadithSource: 'Jami` at-Tirmidhi (586) from Anas ibn Malik (RA)',
    timingRule:
      'Commences roughly 15-20 minutes after sunrise (once the prohibited Makruh period passes) and extends until the sun warms higher in the morning (about 1.5 to 2 hours post-sunrise).',
    fullContent: [
      'Ishraq prayer is rooted in the authentic Sunnah of the Prophet Muhammad ﷺ. Anas ibn Malik narrated that the Messenger of Allah ﷺ said: "Whoever prays Fajr in congregation, then sits remembering Allah until the sun rises, then prays two rak`ahs, will have a reward like that of a complete Hajj and Umrah — complete, complete, complete."',
      'Jurists clarify that one must not begin praying at the exact instant of sunrise, as praying while the sun is visibly ascending on the horizon is strictly prohibited (Makruh Tahrimi). Once 15 to 20 minutes have passed and the sun has risen above the horizon by the measure of a spear (qayd rumh), Ishraq time enters.',
      'Scholars such as Imam al-Ghazali and Imam an-Nawawi note that while Ishraq is essentially the earliest part of Salat al-Duha, it holds a distinct virtue when preceded by remaining in the place of Fajr engaged in dhikr.',
    ],
    faqs: [
      {
        q: 'What is the exact difference between Sunrise and Ishraq?',
        a: 'Sunrise is the astronomical moment the top of the sun disk crosses the horizon. Voluntary prayer is forbidden at sunrise. Ishraq is the prayer performed 15 to 20 minutes after sunrise once the prohibited period has concluded.',
      },
      {
        q: 'How many rak`ahs is Ishraq prayer?',
        a: 'The standard Ishraq prayer consists of 2 rak`ahs, though one may continue praying further units as part of Duha.',
      },
    ],
    routeLink: 'intent-ishraq',
    linkText: 'Check Ishraq Prayer Times Today',
  },
  {
    id: 'duha',
    title: 'What is Salat al-Duha (Chasht Namaz)?',
    category: 'Voluntary (Nafl)',
    summary:
      'Salat al-Duha (صلاة الضحى), frequently termed Chasht in South Asia and Turkey, is the forenoon voluntary prayer recommended by the Prophet ﷺ to give charity for every joint in the human body.',
    hadithSource: 'Sahih Muslim (720) from Abu Dharr (RA)',
    timingRule:
      'Starts roughly 20 minutes post-sunrise and extends until approximately 10-15 minutes before the Dhuhr Azan (solar noon / Istiwa). The most virtuous time (Afdal) is mid-morning when the sand feels hot.',
    fullContent: [
      'In Sahih Muslim, the Prophet ﷺ informed us that every morning, charity is due on behalf of every joint of the body (all 360 joints). Glorifying Allah (Tasbih), praising Him (Tahmid), and enjoining good all count as charity, "and two rak`ahs offered in the forenoon (Duha) suffices for all of that."',
      'The minimum number of rak`ahs for Duha is two, while the common practice of the Prophet ﷺ was four, six, or eight rak`ahs, performed in pairs of two.',
      'The preferred (Afdal) time for Duha is described in the Hadith: "The prayer of the penitent (Salat al-Awwabin) is when the young camels feel the heat of the sun on their hooves" (Sahih Muslim 748), which occurs around 9:30 AM to 11:00 AM in most latitudes.',
    ],
    faqs: [
      {
        q: 'Can Duha be prayed right up to Dhuhr time?',
        a: 'No. You must finish your Duha prayer at least 10 to 15 minutes before Dhuhr to avoid the prohibited period of solar zenith (Istiwa / Zawal).',
      },
    ],
    routeLink: 'intent-duha',
    linkText: 'Check Duha & Chasht Times Today',
  },
  {
    id: 'tahajjud',
    title: 'What is Tahajjud and Qiyam al-Layl?',
    category: 'Voluntary (Nafl)',
    summary:
      'Tahajjud (صلاة التهجد) and Qiyam al-Layl (قيام الليل) constitute the night vigil prayers performed after Isha until the true dawn of Fajr, with the final third of the night being the most spiritually potent time.',
    hadithSource: 'Sahih al-Bukhari (1145) & Sahih Muslim (758)',
    timingRule:
      'Begins after the obligatory Isha prayer and ends at the break of Fajr dawn. The supreme third is calculated by dividing the duration between Maghrib and Fajr into three equal portions.',
    fullContent: [
      'Allah the Almighty commanded His Prophet in the Holy Quran: "And from the night, arise from sleep for prayer with it as additional worship for you; it is expected that your Lord will resurrect you to a praised station" (Surah Al-Isra 17:79).',
      'The Prophet ﷺ said: "Our Lord, the Blessed and Exalted, descends every night to the nearest heaven during the last third of the night, asking: Who is calling upon Me so that I may answer him? Who is asking Me so that I may give him? Who is seeking My forgiveness so that I may forgive him?"',
      'Classical scholars define Qiyam al-Layl as any night prayer offered between Isha and Fajr, while Tahajjud specifically denotes prayer offered after waking up from sleep during the night.',
    ],
    faqs: [
      {
        q: 'How do you calculate the last third of the night?',
        a: 'Calculate the total hours between sunset (Maghrib) and true dawn (Fajr), divide that time by 3, and add two-thirds to the Maghrib time. Our calculator does this automatically for every city.',
      },
      {
        q: 'Should Witr be prayed before or after Tahajjud?',
        a: 'If you plan to wake up for Tahajjud, it is Sunnah to delay Witr to be the final prayer of the night.',
      },
    ],
    routeLink: 'intent-tahajjud',
    linkText: 'Calculate Tonight`s Tahajjud Hours',
  },
  {
    id: 'makruh',
    title: 'What are the Prohibited (Makruh) Prayer Times?',
    category: 'Prohibitions (Makruh)',
    summary:
      'Islamic jurisprudence identifies three distinct intervals during the solar day during which unprompted voluntary prayers (Nafl Mutlaq) are strictly prohibited or intensely disliked (Makruh Tahrimi).',
    hadithSource: 'Sahih Muslim (831) from `Uqbah ibn `Amir (RA)',
    timingRule:
      '1) During sunrise until the sun clears 1 spear length (~15-20 min); 2) Solar noon zenith (Istiwa) ~10-12 min before Dhuhr; 3) Late afternoon when the sun pales (~20 min before Maghrib) until sunset.',
    fullContent: [
      'Uqbah ibn `Amir (RA) said: "There were three times at which Allah`s Messenger ﷺ forbade us to pray or bury our dead: when the sun begins to rise until it is elevated; when the sun is at its zenith at midday until it passes the meridian; and when the sun turns toward setting until it has set."',
      'Wisdom behind the prohibition: Polytheists and pagan sun-worshippers historically prostrated to the sun at its rising, zenith, and setting. The Islamic Shariah strictly prohibited believers from mirroring any resemblance to sun worship.',
      'School Differences: Hanafi jurists hold that NO voluntary prayer or Janazah prayer may begin during these three intervals. Shafi`i jurists permit prayers that possess an established preceding cause (such as Tahiyyat al-Masjid, prayer of Eclipse, or Janazah) and make an absolute exception for the Sacred Mosque (Masjid al-Haram) in Makkah.',
    ],
    faqs: [
      {
        q: 'Is there an exception for Masjid al-Haram in Makkah?',
        a: 'Yes, according to the Shafi`i and Hanbali schools, one may perform Tawaf and the two rak`ahs of Tawaf at any time of day or night in Makkah without prohibition.',
      },
      {
        q: 'What if I haven`t prayed Asr and the sun is setting?',
        a: 'You MUST pray the obligatory Asr of that day even if the sun has begun setting, rather than allowing the prayer to be completely missed, as the obligatory duty overrides the dislike in cases of severe necessity.',
      },
    ],
    routeLink: 'intent-makruh',
    linkText: 'Check Today`s Makruh Times',
  },
  {
    id: 'awabeen',
    title: 'What is Salat al-Awabeen (Prayer of the Penitents)?',
    category: 'Voluntary (Nafl)',
    summary:
      'Salat al-Awabeen (صلاة الأوابين) refers in common traditional practice to the voluntary rak`ahs offered between Maghrib and Isha, as well as the mid-forenoon prayer of Duha.',
    hadithSource: 'Sunan at-Tirmidhi (435) & Sahih Muslim (748)',
    timingRule: 'Offered in the quiet interval following the Sunnah of Maghrib until the call to Isha prayer.',
    fullContent: [
      'The term "Awwab" in the Arabic language signifies one who frequently returns to Allah in sincere repentance. In classical texts, two prayers bear this noble title: the late Duha prayer when the day becomes hot, and the voluntary prayers offered between Maghrib and Isha.',
      'Imam at-Tirmidhi recorded from Abu Hurairah (RA) that whoever prays six rak`ahs after Maghrib without uttering harmful speech between them will have a reward equivalent to twelve years of worship.',
      'While scholars evaluate the specific chain regarding the twelve years as weak (Da`if), the general recommendation of occupying the quiet interval between Maghrib and Isha with prayer and Quranic recitation is widely affirmed by the four Madhabs.',
    ],
    faqs: [
      {
        q: 'How many rak`ahs is Awabeen prayer?',
        a: 'Traditionally prayed as six rak`ahs in units of two, following the two emphasized Sunnah rak`ahs of Maghrib.',
      },
    ],
    routeLink: 'intent-awabeen',
    linkText: 'Check Awabeen Window Today',
  },
  {
    id: 'fajr-maghrib-boundaries',
    title: 'How are the Beginning and Ending Times of Fajr and Maghrib Determined?',
    category: 'Obligatory (Fard)',
    summary:
      'Understanding the exact astronomical boundaries for Fajr (true dawn vs false dawn) and Maghrib (astronomical sunset vs dusk disappearance).',
    hadithSource: 'Sahih Muslim (612) & Sahih al-Bukhari (543)',
    timingRule:
      'Fajr begins at astronomical dawn (18° or 18.5° sun depression) and ends at sunrise. Maghrib begins at sunset and ends when the twilight red afterglow disappears at Isha.',
    fullContent: [
      'True Dawn (Al-Fajr As-Sadiq) vs False Dawn (Al-Fajr Al-Kadhib): The false dawn is a vertical pillar of light that extends upwards in the sky like the tail of a wolf, followed by darkness. The true dawn is a horizontal ribbon of light that spreads across the eastern horizon. The obligation of Fajr and the start of the fast enter ONLY with the true dawn.',
      'Astronomical Calculation Angles: Most modern Islamic astronomical authorities calculate Fajr at either 18° (Islamic Society of North America / Muslim World League) or 18.5° (Umm al-Qura University, Makkah) or 19.5° (Egyptian General Authority of Survey).',
      'Maghrib: Enters the moment the upper limb of the sun completely sinks beneath the astronomical horizon. It is disliked to delay Maghrib until the stars become dense in the sky.',
    ],
    faqs: [
      {
        q: 'Does Fajr end at Sunrise or Ishraq?',
        a: 'Fajr ends strictly at Sunrise. Once the edge of the sun is visible, Fajr time has expired.',
      },
    ],
    routeLink: 'prayer-times',
    linkText: 'View Today`s Prayer Timetable',
  },
  {
    id: 'travel-qasr',
    title: 'Prayer for the Traveller (Qasr and Jam`)',
    category: 'Travel & Exceptions',
    summary:
      'The rulings on shortening four-rak`ah obligatory prayers to two rak`ahs (Qasr) and combining Dhuhr with Asr, or Maghrib with Isha while on a journey.',
    hadithSource: 'Sahih al-Bukhari (1082) & Sahih Muslim (686)',
    timingRule:
      'Applicable when travelling beyond the recognized travel distance (approximately 77 to 88 km / 48 miles) from one`s city limits.',
    fullContent: [
      'The Holy Quran states: "And when you travel throughout the land, there is no blame upon you for shortening the prayer" (Surah An-Nisa 4:101). The Prophet ﷺ accepted this as a gift of mercy from Allah.',
      'Shortening (Qasr): Applies to Dhuhr, Asr, and Isha, which are each shortened from 4 rak`ahs to 2 rak`ahs. Fajr (2 rak`ahs) and Maghrib (3 rak`ahs) are never shortened.',
      'Combining (Jam`): According to the Shafi`i, Maliki, and Hanbali schools, travellers may combine Dhuhr with Asr, and Maghrib with Isha, either at the time of the earlier prayer (Jam` Taqdim) or delayed to the later prayer (Jam` Ta`khir). Hanafi jurists maintain that actual combination is reserved for Hajj (at Arafat and Muzdalifah), while on regular journeys they perform apparent combination (Jam` Suri).',
    ],
    faqs: [
      {
        q: 'How long can a visitor shorten prayers in Makkah or Madinah?',
        a: 'If a pilgrim intends to stay less than 4 days (according to the majority of scholars: Shafi`i, Maliki, Hanbali) or less than 15 days (according to the Hanafi school), they shorten their individual prayers. However, if praying behind a resident Imam at Masjid al-Haram or the Prophet`s Mosque, the traveller must follow the Imam and pray the full 4 rak`ahs.',
      },
    ],
    routeLink: 'city-makkah',
    linkText: 'Check Makkah Prayer Times for Pilgrims',
  },
];

export const PrayerKnowledgeHub: React.FC<PrayerKnowledgeHubProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedArticle, setExpandedArticle] = useState<string | null>('ishraq');

  React.useEffect(() => {
    updateSeoTags({
      title: 'Islamic Prayer Knowledge & Guide – Ishraq, Duha, Tahajjud & Rules | Prayerstime',
      description:
        'Comprehensive, authentic guide to Islamic prayers: when Ishraq starts, rulings on Duha & Chasht, calculating Tahajjud, prohibited Makruh prayer times, and prayers for travellers.',
      canonicalPath: '/prayer-times/guide',
      language: 'en',
      ogType: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Prayer Times', path: '/prayer-times' },
        { name: 'Islamic Prayer Guide', path: '/prayer-times/guide' },
      ],
    });
  }, []);

  const categories = ['All', 'Voluntary (Nafl)', 'Obligatory (Fard)', 'Prohibitions (Makruh)', 'Travel & Exceptions'];

  const filteredArticles =
    selectedCategory === 'All'
      ? KNOWLEDGE_ARTICLES
      : KNOWLEDGE_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <article className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 dark:text-stone-400">
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
          <li className="text-emerald-700 dark:text-emerald-400 font-semibold" aria-current="page">
            Islamic Prayer Knowledge Hub
          </li>
        </ol>
      </nav>

      {/* Header Banner */}
      <header className="rounded-3xl bg-gradient-to-br from-emerald-900 via-[#0d231e] to-stone-900 text-white p-6 sm:p-8 lg:p-10 border border-emerald-800/50 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/50">
          <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
          <span>Authentic Islamic Jurisprudence &amp; Timing Principles</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Islamic Prayer Knowledge &amp; Timing Guide
        </h1>

        <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
          Clear, authentic, and scholarly explanations of Islamic prayer intervals: voluntary Sunnah
          prayers (Ishraq, Duha, Tahajjud, Awabeen), the three prohibited (Makruh) periods, and prayer
          rules during travel and pilgrimage.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-emerald-950/60 text-stone-300 border border-emerald-800/60 hover:bg-emerald-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => {
          const isExpanded = expandedArticle === article.id;

          return (
            <section
              key={article.id}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c19] overflow-hidden transition-all shadow-xs hover:border-stone-300 dark:hover:border-stone-700"
            >
              <div
                onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {article.category}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {article.hadithSource}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs text-stone-400 hidden sm:inline">
                    {isExpanded ? 'Collapse' : 'Read Guide'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 border-t border-stone-100 dark:border-stone-800/80 pt-4 space-y-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {/* Timing rule banner */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block mb-0.5">Timing Rule:</strong>
                      <span>{article.timingRule}</span>
                    </div>
                  </div>

                  {/* Body paragraphs */}
                  <div className="space-y-3">
                    {article.fullContent.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* FAQs */}
                  {article.faqs.length > 0 && (
                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider">
                        Common Questions &amp; Rulings
                      </h3>
                      <div className="space-y-2 text-xs">
                        {article.faqs.map((faq, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-3 rounded-xl bg-stone-50 dark:bg-[#162320] border border-stone-200/70 dark:border-stone-800"
                          >
                            <span className="font-semibold text-stone-900 dark:text-stone-100 block mb-1">
                              {faq.q}
                            </span>
                            <span className="text-stone-600 dark:text-stone-300">{faq.a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Action Link */}
                  {article.routeLink && (
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate(article.routeLink!)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                      >
                        <span>{article.linkText || 'Calculate Times for Your City'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Cross-linking to Makkah & Madinah Hubs */}
      <footer className="p-6 rounded-2xl bg-stone-50 dark:bg-[#121c19] border border-stone-200 dark:border-stone-800 space-y-3">
        <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
          Explore Holy Sanctuary Prayer Timetables
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="/prayer-times/saudi-arabia/makkah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('city-makkah');
            }}
            className="p-3.5 rounded-xl bg-white dark:bg-[#162320] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 transition-colors font-medium flex items-center justify-between"
          >
            <div>
              <strong className="block text-stone-900 dark:text-stone-100">Makkah Prayer Times Today</strong>
              <span className="text-stone-500">Masjid al-Haram • Kaaba Qibla • Umm al-Qura</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </a>

          <a
            href="/prayer-times/saudi-arabia/madinah/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('city-madinah');
            }}
            className="p-3.5 rounded-xl bg-white dark:bg-[#162320] border border-stone-200 dark:border-stone-800 hover:border-emerald-500 transition-colors font-medium flex items-center justify-between"
          >
            <div>
              <strong className="block text-stone-900 dark:text-stone-100">Madinah Prayer Times Today</strong>
              <span className="text-stone-500">Al-Masjid an-Nabawi • Rawdah Guide</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </a>
        </div>
      </footer>
    </article>
  );
};
