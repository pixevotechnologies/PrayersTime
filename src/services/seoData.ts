import { LocationData } from '../types';

export type SupportedLanguage = 'en' | 'ar' | 'ur' | 'hi' | 'id' | 'tr' | 'bn' | 'fr';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
];

export interface PrayerIntentDef {
  id: string;
  routeSlug: string;
  primaryName: string;
  arabicName: string;
  category: 'fard' | 'nafl_morning' | 'nafl_night' | 'astronomical';
  timingType: 'solar' | 'relative_to_sunrise' | 'relative_to_sunset' | 'night_division';
  briefDescription: string;
  hadithSource: string;
  hadithText: string;
  rulingsOverview: string;
  commonConfusionNote?: string;
  faqs: Array<{ q: string; a: string }>;
}

export const SPECIAL_PRAYER_INTENTS: Record<string, PrayerIntentDef> = {
  ishraq: {
    id: 'ishraq',
    routeSlug: 'ishraq-prayer-time',
    primaryName: 'Ishraq Prayer',
    arabicName: 'صلاة الإشراق',
    category: 'nafl_morning',
    timingType: 'relative_to_sunrise',
    briefDescription:
      'Ishraq is a voluntary (Nafl) prayer performed shortly after sunrise once the sun has ascended above the horizon by the height of a spear (approximately 15 to 20 minutes after astronomical sunrise).',
    hadithSource: 'Jami` at-Tirmidhi (586), graded Hasan',
    hadithText:
      'The Messenger of Allah ﷺ said: "Whoever prays Fajr in congregation then sits remembering Allah until the sun rises, then prays two rak`ahs, will have a reward like that of Hajj and `Umrah — complete, complete, complete."',
    rulingsOverview:
      'Jurists across all major schools (Hanafi, Shafi`i, Maliki, Hanbali) agree that prayer is strictly makruh (disliked or prohibited) during the exact moments of sunrise until the disk has fully cleared the horizon. Once approximately 15–20 minutes have elapsed (when the solar altitude reaches approximately 3° to 4°), Ishraq becomes permissible and highly recommended.',
    commonConfusionNote:
      'Many scholars consider Ishraq to be the earliest portion of Salat al-Duha, while others classify it as a distinct post-Fajr devotion specifically tied to staying in remembrance after dawn prayer.',
    faqs: [
      {
        q: 'What time is Ishraq prayer today?',
        a: 'Ishraq begins approximately 15 to 20 minutes after sunrise in your local city, once the sun has completely risen above the horizon, and continues until mid-morning.',
      },
      {
        q: 'Can I pray Ishraq immediately at sunrise?',
        a: 'No. Performing voluntary prayer during exact sunrise is strictly prohibited according to authentic prophetic Hadiths. You must wait approximately 15–20 minutes until the prohibited time (Waqt al-Karahah) has passed.',
      },
      {
        q: 'How many rak`ahs is Ishraq prayer?',
        a: 'Ishraq is traditionally prayed as two rak`ahs (units), though it may also be extended to four rak`ahs.',
      },
      {
        q: 'What is the difference between Ishraq and Duha (Chasht)?',
        a: 'Ishraq is prayed right after the sun rises (15-20 minutes post-sunrise), especially after sitting in remembrance from Fajr. Duha (also known as Chasht) encompasses the wider morning period up until just before solar noon (Zawal).',
      },
    ],
  },
  duha: {
    id: 'duha',
    routeSlug: 'duha-prayer-time',
    primaryName: 'Duha Prayer (Chasht)',
    arabicName: 'صلاة الضحى',
    category: 'nafl_morning',
    timingType: 'relative_to_sunrise',
    briefDescription:
      'Salat al-Duha (commonly known as Chasht in South Asia) is an established Sunnah prayer performed between sunrise (after the prohibited window) and solar noon (Zawal), offering immense spiritual virtue for daily gratitude.',
    hadithSource: 'Sahih Muslim (720 & 748)',
    hadithText:
      'The Prophet ﷺ said: "In the morning, charity is due for every joint of each one of you... and two rak`ahs offered in the forenoon (Duha) is sufficient for all of that." He also said: "The prayer of the penitent (Salat al-Awwabin) is when the young camels feel the heat of the sun."',
    rulingsOverview:
      'Salat al-Duha may be prayed from approximately 20 minutes after sunrise until roughly 10–15 minutes before the Dhuhr prayer begins (before Zawal). The most virtuous time (Afdal) is during the second half of the morning when the sun’s warmth becomes pronounced.',
    commonConfusionNote:
      'In Urdu and South Asian Islamic literature, Salat al-Duha is almost universally referred to as "Chasht namaz" (چاشت). They refer to the same beloved prophetic forenoon prayer.',
    faqs: [
      {
        q: 'When does Duha (Chasht) prayer start and end?',
        a: 'Duha starts roughly 15-20 minutes after sunrise and ends approximately 10-15 minutes before Dhuhr prayer (when the sun reaches its celestial meridian).',
      },
      {
        q: 'What is the best time to pray Chasht / Duha?',
        a: 'The most virtuous time is late morning, roughly halfway between sunrise and Dhuhr, when the sun is strong, as described in Sahih Muslim 748.',
      },
      {
        q: 'How many rak`ahs should I pray for Duha?',
        a: 'The minimum is 2 rak`ahs. The Prophet ﷺ frequently prayed 4, 8, or up to 12 rak`ahs in units of two.',
      },
    ],
  },
  chasht: {
    id: 'chasht',
    routeSlug: 'chasht-prayer-time',
    primaryName: 'Chasht Namaz',
    arabicName: 'صلاة الضحى (چاشت)',
    category: 'nafl_morning',
    timingType: 'relative_to_sunrise',
    briefDescription:
      'Chasht is the traditional Urdu and Persian term for Salat al-Duha. It is the voluntary forenoon prayer performed when the sun has climbed high in the sky before mid-day.',
    hadithSource: 'Sahih al-Bukhari (1981) & Sahih Muslim (721)',
    hadithText:
      'Abu Hurairah (may Allah be pleased with him) reported: "My beloved friend (the Prophet ﷺ) advised me to do three things: to fast three days of every month, to pray the two rak`ahs of Duha (Chasht), and to pray Witr before going to sleep."',
    rulingsOverview:
      'Chasht namaz begins when the sun is bright and elevated (about 20 minutes post-sunrise) and lasts until just before Zawal (solar noon). Jurists emphasize that observing Chasht brings spiritual peace, forgiveness, and fulfillment of daily bodily gratitude.',
    commonConfusionNote:
      'Some South Asian scholars distinguish "Ishraq" (early morning, 15 min after sunrise) from "Chasht" (mid-morning when the sun heats up). Jurisprudentially, both fall within the overarching category of Duha, with Chasht representing its ideal late-morning portion.',
    faqs: [
      {
        q: 'What is Chasht prayer time in my city?',
        a: 'Chasht time starts about 20 minutes after local sunrise and lasts until about 15 minutes before Dhuhr prayer.',
      },
      {
        q: 'Is Chasht namaz compulsory (Fard)?',
        a: 'No, Chasht is a Sunnah Mu`akkadah / Nafl prayer that carries immense rewards but is not obligatory.',
      },
      {
        q: 'Can I pray Chasht at home or work?',
        a: 'Yes, voluntary prayers like Chasht are praiseworthy when prayed in the home or workplace without causing disturbance.',
      },
    ],
  },
  tahajjud: {
    id: 'tahajjud',
    routeSlug: 'tahajjud-time',
    primaryName: 'Tahajjud & Qiyam al-Layl',
    arabicName: 'صلاة التهجد وقيام الليل',
    category: 'nafl_night',
    timingType: 'night_division',
    briefDescription:
      'Tahajjud is the supreme voluntary night prayer performed after waking from sleep during the night. The most virtuous and spiritually potent window is the final third of the night before Fajr.',
    hadithSource: 'Sahih al-Bukhari (1145) & Sahih Muslim (758)',
    hadithText:
      'The Messenger of Allah ﷺ said: "Our Lord, the Blessed and Exalted, descends every night to the lowest heaven when the last third of the night remains, saying: `Who is calling upon Me that I may answer him? Who is asking of Me that I may give him? Who is seeking My forgiveness that I may forgive him?`"',
    rulingsOverview:
      'The Islamic night begins at Maghrib (sunset) and concludes at Fajr (true dawn). Tahajjud can be performed any time after Isha until Fajr, but mathematically dividing the night into thirds reveals that the last third (Thuluth al-Akhir) is the preeminent period for supplication and Qiyam.',
    commonConfusionNote:
      'While general Qiyam al-Layl (night vigil) can be prayed before sleeping, classical lexicographers and scholars define Tahajjud specifically as praying after having slept, even if for a short period.',
    faqs: [
      {
        q: 'What time is Tahajjud tonight?',
        a: 'Tahajjud can be prayed after Isha until Fajr. The best time — the last third of the night — is calculated by dividing the interval between sunset (Maghrib) and dawn (Fajr) into three equal parts.',
      },
      {
        q: 'Do I have to sleep before praying Tahajjud?',
        a: 'According to the majority of scholars, true Tahajjud is prayer performed after waking from sleep. However, if one stays awake praying night prayers, it is still rewarded as Qiyam al-Layl.',
      },
      {
        q: 'When does Tahajjud time end?',
        a: 'Tahajjud ends exactly at the start of Fajr prayer (true dawn). Once the Fajr adhan or time arrives, night prayer concludes and only the two Sunnah of Fajr are offered.',
      },
    ],
  },
  awabeen: {
    id: 'awabeen',
    routeSlug: 'awabeen-prayer-time',
    primaryName: 'Awabeen Prayer',
    arabicName: 'صلاة الأوابين',
    category: 'nafl_night',
    timingType: 'relative_to_sunset',
    briefDescription:
      'Salat al-Awabeen (the prayer of the frequently repentant) has two documented usages in Islamic tradition: the forenoon prayer when the sun heats up (per Sahih Muslim), and the six voluntary rak`ahs prayed between Maghrib and Isha (popularized in classical fiqh).',
    hadithSource: 'Sahih Muslim (748) & Sunan at-Tirmidhi (435)',
    hadithText:
      'Prophet Muhammad ﷺ stated: "The prayer of the Awabin (the penitent) is when the hooves of the young camels are burnt by the scorching ground." In addition, classical jurists record traditions regarding 6 rak`ahs between Maghrib and Isha for the preservation of faith.',
    rulingsOverview:
      'Because the title "Awabeen" is used in authentic Hadith for late-morning Duha, scholars note that both practices are grounded in Sunnah. For those seeking the post-Maghrib prayer, the window is from the conclusion of Maghrib prayer until the entry of Isha time.',
    commonConfusionNote:
      'Scholarly transparency is essential: while some Hadiths explicitly designating the 6 post-Maghrib rak`ahs as "Awabeen" possess weak (Da`if) chains, engaging in voluntary prayers between Maghrib and Isha is authentically praised under general Qiyam and Sunnah encouragement.',
    faqs: [
      {
        q: 'What time is Awabeen prayer?',
        a: 'In common devotional practice, Awabeen is prayed between Maghrib and Isha prayer. In strict prophetic Hadith terminology (Sahih Muslim), Salat al-Awwabin also refers to the late-morning Duha prayer.',
      },
      {
        q: 'How many rak`ahs is post-Maghrib Awabeen?',
        a: 'Commonly 6 rak`ahs, prayed in sets of two units, offered after the two obligatory Sunnah of Maghrib.',
      },
    ],
  },
  fajr: {
    id: 'fajr',
    routeSlug: 'fajr-time',
    primaryName: 'Fajr Prayer',
    arabicName: 'صلاة الفجر',
    category: 'fard',
    timingType: 'solar',
    briefDescription:
      'Fajr marks the onset of true dawn (Al-Fajr As-Sadiq), when horizontal light begins to spread across the eastern horizon before sunrise.',
    hadithSource: 'Sahih Muslim (612)',
    hadithText:
      'The Messenger of Allah ﷺ said: "The time for the morning prayer is from the appearance of dawn until the sun has not yet risen."',
    rulingsOverview:
      'Calculated based on solar depression angle (typically between 15° and 19.5° below the horizon depending on calculation convention such as Umm Al-Qura, MWL, or ISNA).',
    faqs: [
      {
        q: 'When does Fajr time start and end?',
        a: 'Fajr begins at true astronomical dawn and ends when the top edge of the sun appears on the eastern horizon (sunrise).',
      },
    ],
  },
  sunrise: {
    id: 'sunrise',
    routeSlug: 'sunrise-time',
    primaryName: 'Sunrise (Shurooq)',
    arabicName: 'شروق الشمس',
    category: 'astronomical',
    timingType: 'solar',
    briefDescription:
      'Astronomical sunrise marks the conclusion of Fajr prayer and the start of the brief prohibited prayer window (Waqt al-Karahah) until the sun has risen above the horizon.',
    hadithSource: 'Sahih Muslim (832)',
    hadithText:
      'The Prophet ﷺ prohibited praying at sunrise until the sun has fully ascended, at solar noon until the sun declines, and at sunset until the sun has set.',
    rulingsOverview:
      'Sunrise occurs when the upper limb of the sun appears over the local horizon, accounting for atmospheric refraction and elevation.',
    faqs: [
      {
        q: 'Can I pray Fajr after sunrise?',
        a: 'If Fajr was missed due to sleep or forgetfulness, it should be made up (Qada) once you remember, ideally waiting 15 minutes after sunrise until the prohibited window elapses.',
      },
    ],
  },
  maghrib: {
    id: 'maghrib',
    routeSlug: 'maghrib-time',
    primaryName: 'Maghrib Prayer & Iftar',
    arabicName: 'صلاة المغرب',
    category: 'fard',
    timingType: 'solar',
    briefDescription:
      'Maghrib commences at sunset when the entire solar disk has dipped below the horizon, marking the conclusion of the daily fast for fasting believers.',
    hadithSource: 'Sahih al-Bukhari (1954)',
    hadithText:
      'The Prophet ﷺ said: "When night approaches from here, and day departs from there, and the sun sets, then the fasting person breaks their fast."',
    rulingsOverview:
      'Astronomical sunset is calculated when the sun reaches 0.833° below the horizon, allowing for refraction and solar radius.',
    faqs: [
      {
        q: 'When is Iftar time?',
        a: 'Iftar coincides exactly with the start of Maghrib prayer when the sun has completely set.',
      },
    ],
  },
};

export interface LocalizedSeoContent {
  titleTemplate: (city: string, country?: string) => string;
  metaDescription: (city: string, country?: string) => string;
  h1: (city: string, country?: string) => string;
  h2Schedule: (city: string) => string;
  h2Method: (city: string) => string;
  h2Faq: string;
  breadcrumbs: {
    home: string;
    prayerTimes: string;
    specialPrayers: string;
  };
}

export const MULTILINGUAL_SEO_TEMPLATES: Record<SupportedLanguage, Record<string, LocalizedSeoContent>> = {
  en: {
    city: {
      titleTemplate: (c, k) => `Prayer Times in ${c}${k ? `, ${k}` : ''} Today | Prayerstime`,
      metaDescription: (c, k) =>
        `Today's accurate Islamic prayer times in ${c}${k ? `, ${k}` : ''}: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Qibla compass bearing, and Hijri calendar.`,
      h1: (c, k) => `Prayer Times in ${c}${k ? `, ${k}` : ''}`,
      h2Schedule: (c) => `Today's Verified Prayer Schedule in ${c}`,
      h2Method: (c) => `Astronomical Calculation Methodology for ${c}`,
      h2Faq: 'Frequently Asked Questions',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Islamic Prayers' },
    },
    ishraq: {
      titleTemplate: (c) => `Ishraq Prayer Time in ${c} Today | Prayerstime`,
      metaDescription: (c) =>
        `Accurate Ishraq prayer time in ${c} today. Calculated 15-20 minutes post-sunrise with authentic Hadith virtues, timing window, and prayer rules.`,
      h1: (c) => `Ishraq Prayer Time in ${c}`,
      h2Schedule: (c) => `Today's Ishraq Time Window in ${c}`,
      h2Method: (c) => `How Ishraq Time Is Calculated in ${c}`,
      h2Faq: 'Ishraq Prayer Questions & Fiqh Guidance',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Ishraq Prayer' },
    },
    duha: {
      titleTemplate: (c) => `Duha & Chasht Prayer Time in ${c} Today | Prayerstime`,
      metaDescription: (c) =>
        `Salat al-Duha (Chasht) prayer time in ${c} today. Accurate morning start and end times, virtues from Sahih Hadiths, and scholarly guidelines.`,
      h1: (c) => `Duha Prayer Time in ${c}`,
      h2Schedule: (c) => `Today's Duha (Chasht) Timing in ${c}`,
      h2Method: (c) => `Determining Forenoon Prayer Times in ${c}`,
      h2Faq: 'Duha Prayer Questions & Scholarly Consensus',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Duha Prayer' },
    },
    chasht: {
      titleTemplate: (c) => `Chasht Namaz Time in ${c} Today | Prayerstime`,
      metaDescription: (c) =>
        `Accurate Chasht namaz time in ${c} today. Verified forenoon timing window, Sunnah virtues, and how it aligns with Salat al-Duha.`,
      h1: (c) => `Chasht Namaz Time in ${c}`,
      h2Schedule: (c) => `Today's Chasht Namaz Window in ${c}`,
      h2Method: (c) => `Calculation of Chasht Time in ${c}`,
      h2Faq: 'Chasht Namaz Rules & Common Questions',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Chasht Namaz' },
    },
    tahajjud: {
      titleTemplate: (c) => `Tahajjud Time in ${c} Tonight | Prayerstime`,
      metaDescription: (c) =>
        `Accurate Tahajjud time in ${c} tonight. Calculated last third of the night (Thuluth al-Akhir), night division methodology, and authentic Hadith guidance.`,
      h1: (c) => `Tahajjud Time in ${c} Tonight`,
      h2Schedule: (c) => `Tonight's Night Prayer & Tahajjud Timing in ${c}`,
      h2Method: (c) => `How the Last Third of the Night Is Calculated in ${c}`,
      h2Faq: 'Tahajjud Prayer Guidance & Night Vigil Rulings',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Tahajjud Time' },
    },
    awabeen: {
      titleTemplate: (c) => `Awabeen Prayer Time in ${c} Today | Prayerstime`,
      metaDescription: (c) =>
        `Awabeen prayer time in ${c} today. Post-Maghrib nafl prayer window and late-morning prophetic Awabeen timing with transparent scholarly analysis.`,
      h1: (c) => `Awabeen Prayer Time in ${c}`,
      h2Schedule: (c) => `Awabeen Timing Windows in ${c}`,
      h2Method: (c) => `Scholarly Definitions & Calculation in ${c}`,
      h2Faq: 'Awabeen Prayer Questions & Hadith Analysis',
      breadcrumbs: { home: 'Home', prayerTimes: 'Prayer Times', specialPrayers: 'Awabeen Prayer' },
    },
  },
  ar: {
    city: {
      titleTemplate: (c) => `مواقيت الصلاة في ${c} اليوم | Prayerstime`,
      metaDescription: (c) =>
        `مواقيت الصلاة الدقيقة اليوم في ${c}: الفجر، الشروق، الظهر، العصر، المغرب، العشاء، مع اتجاه القبلة والتقويم الهجري.`,
      h1: (c) => `مواقيت الصلاة في ${c}`,
      h2Schedule: (c) => `جدول مواقيت الصلاة اليوم في ${c}`,
      h2Method: (c) => `طريقة الحساب الفلكي لمواقيت الصلاة في ${c}`,
      h2Faq: 'الأسئلة الشائعة حول مواقيت الصلاة',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'الصلوات' },
    },
    ishraq: {
      titleTemplate: (c) => `وقت صلاة الإشراق في ${c} اليوم | Prayerstime`,
      metaDescription: (c) =>
        `وقت صلاة الإشراق اليوم في ${c}. محسوب بدقة بعد شروق الشمس بـ 15 إلى 20 دقيقة مع الأحاديث النبوية وفضلها.`,
      h1: (c) => `وقت صلاة الإشراق في ${c}`,
      h2Schedule: (c) => `فترة صلاة الإشراق اليوم في ${c}`,
      h2Method: (c) => `كيف يتم حساب وقت الإشراق في ${c}`,
      h2Faq: 'أسئلة شائعة وأحكام صلاة الإشراق',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'صلاة الإشراق' },
    },
    duha: {
      titleTemplate: (c) => `وقت صلاة الضحى في ${c} اليوم | Prayerstime`,
      metaDescription: (c) =>
        `وقت صلاة الضحى اليوم في ${c}. الموعد المستحب وأفضل أوقاتها حتى الزوال مع الأحاديث الصحيحة.`,
      h1: (c) => `وقت صلاة الضحى في ${c}`,
      h2Schedule: (c) => `فترة صلاة الضحى اليوم في ${c}`,
      h2Method: (c) => `تحديد أوقات الضحى فلكياً في ${c}`,
      h2Faq: 'أحكام وفضل صلاة الضحى',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'صلاة الضحى' },
    },
    chasht: {
      titleTemplate: (c) => `وقت صلاة الضحى (الجاشت) في ${c} | Prayerstime`,
      metaDescription: (c) =>
        `وقت صلاة الضحى في ${c} مع التوقيت الدقيق وفضلها وأحكامها الفقهية المعتمدة.`,
      h1: (c) => `وقت صلاة الضحى في ${c}`,
      h2Schedule: (c) => `موعد الصلاة اليوم في ${c}`,
      h2Method: (c) => `حساب وقت الضحى في ${c}`,
      h2Faq: 'الأسئلة الشائعة',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'صلاة الضحى' },
    },
    tahajjud: {
      titleTemplate: (c) => `وقت صلاة التهجد في ${c} الليلة | Prayerstime`,
      metaDescription: (c) =>
        `وقت صلاة التهجد وقيام الليل الليلة في ${c}. حساب الثلث الأخير من الليل بدقة فلكية مع فضل قيام الليل.`,
      h1: (c) => `وقت صلاة التهجد في ${c} الليلة`,
      h2Schedule: (c) => `توقيت قيام الليل والثلث الأخير في ${c}`,
      h2Method: (c) => `كيفية حساب الثلث الأخير من الليل في ${c}`,
      h2Faq: 'أحكام صلاة التهجد وقيام الليل',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'صلاة التهجد' },
    },
    awabeen: {
      titleTemplate: (c) => `وقت صلاة الأوابين في ${c} اليوم | Prayerstime`,
      metaDescription: (c) =>
        `وقت صلاة الأوابين اليوم في ${c}، بين المغرب والعشاء ووقت الضحى مع التوضيح الفقهي والأحاديث.`,
      h1: (c) => `وقت صلاة الأوابين في ${c}`,
      h2Schedule: (c) => `توقيت صلاة الأوابين في ${c}`,
      h2Method: (c) => `أقوال الفقهاء في تحديد صلاة الأوابين في ${c}`,
      h2Faq: 'الأسئلة والأحكام حول صلاة الأوابين',
      breadcrumbs: { home: 'الرئيسية', prayerTimes: 'مواقيت الصلاة', specialPrayers: 'صلاة الأوابين' },
    },
  },
  ur: {
    city: {
      titleTemplate: (c) => `${c} میں نماز کے اوقات آج | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں آج کے درست اسلامی نماز کے اوقات: فجر، طلوع آفتاب، ظہر، عصر، مغرب، عشاء، قبلہ رخ اور ہجری کیلنڈر۔`,
      h1: (c) => `${c} میں نماز کے اوقات`,
      h2Schedule: (c) => `${c} میں آج کا تصدیق شدہ ٹائم ٹیبل`,
      h2Method: (c) => `${c} میں فلکیاتی حساب کا طریقہ کار`,
      h2Faq: 'نماز کے اوقات کے بارے میں عام سوالات',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'نمازیں' },
    },
    ishraq: {
      titleTemplate: (c) => `${c} میں نماز اشراق کا وقت آج | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں آج نماز اشراق کا درست وقت۔ طلوع آفتاب کے 15 سے 20 منٹ بعد کا دورانیہ، احادیث کی روشنی میں فضائل اور احکام۔`,
      h1: (c) => `${c} میں نماز اشراق کا وقت`,
      h2Schedule: (c) => `${c} میں اشراق کا وقت اور دورانیہ`,
      h2Method: (c) => `${c} میں اشراق کا وقت کیسے معلوم کیا جاتا ہے`,
      h2Faq: 'نماز اشراق کے اہم مسائل اور سوالات',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'نماز اشراق' },
    },
    duha: {
      titleTemplate: (c) => `${c} میں نماز چاشت (ضحیٰ) کا وقت آج | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں نماز چاشت کا وقت، آغاز و اختتام، احادیث مبارکہ کی روشنی میں فضیلت اور مسنون طریقہ۔`,
      h1: (c) => `${c} میں نماز چاشت کا وقت`,
      h2Schedule: (c) => `${c} میں چاشت کا بہترین وقت`,
      h2Method: (c) => `${c} میں چاشت کے وقت کا تعین`,
      h2Faq: 'نماز چاشت کے فضائل اور مسائل',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'نماز چاشت' },
    },
    chasht: {
      titleTemplate: (c) => `${c} میں چاشت کی نماز کا وقت آج | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں چاشت کی نماز کا صحیح وقت۔ صحیح احادیث کی روشنی میں رکعات کی تعداد اور زوال سے پہلے کا وقت۔`,
      h1: (c) => `${c} میں چاشت کی نماز کا وقت`,
      h2Schedule: (c) => `${c} میں چاشت کا ٹائم ٹیبل`,
      h2Method: (c) => `${c} میں چاشت کا فلکیاتی حساب`,
      h2Faq: 'چاشت کی نماز کے متعلق عام سوالات',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'چاشت کی نماز' },
    },
    tahajjud: {
      titleTemplate: (c) => `${c} میں تہجد کا وقت آج رات | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں آج رات نماز تہجد کا درست وقت۔ رات کا آخری تہائی حصہ (ثلث اخیر) اور فضائل قيام الليل۔`,
      h1: (c) => `${c} میں تہجد کا وقت آج رات`,
      h2Schedule: (c) => `${c} میں تہجد اور قیام اللیل کا وقت`,
      h2Method: (c) => `${c} میں رات کے آخری تہائی حصے کا حساب`,
      h2Faq: 'نماز تہجد کے مسائل اور فضائل',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'نماز تہجد' },
    },
    awabeen: {
      titleTemplate: (c) => `${c} میں نماز اوابین کا وقت آج | Prayerstime`,
      metaDescription: (c) =>
        `${c} میں نماز اوابین کا وقت۔ مغرب کے بعد 6 رکعات نفل اور ضحیٰ کے وقت کے بارے میں مستند وضاحت۔`,
      h1: (c) => `${c} میں نماز اوابین کا وقت`,
      h2Schedule: (c) => `${c} میں اوابین کا دورانیہ`,
      h2Method: (c) => `${c} میں اوابین کی شرعی و فلکیاتی حیثیت`,
      h2Faq: 'نماز اوابین کے متعلق سوال و جواب',
      breadcrumbs: { home: 'ہوم', prayerTimes: 'نماز کے اوقات', specialPrayers: 'نماز اوابین' },
    },
  },
  hi: {
    city: {
      titleTemplate: (c) => `${c} में नमाज़ का समय आज | Prayerstime`,
      metaDescription: (c) =>
        `${c} में आज के सटीक इस्लामिक नमाज़ के औक़ात: फ़ज्र, सूर्योदय, ज़ुहर, अस्र, मग़रिब, इशा, क़िबला रुख और हिजरी कैलेंडर।`,
      h1: (c) => `${c} में नमाज़ का समय`,
      h2Schedule: (c) => `${c} में आज की नमाज़ का समय`,
      h2Method: (c) => `${c} में गणना विधि`,
      h2Faq: 'अक्सर पूछे जाने वाले सवाल',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'नमाज़ें' },
    },
    ishraq: {
      titleTemplate: (c) => `${c} में इशराक नमाज़ का समय आज | Prayerstime`,
      metaDescription: (c) =>
        `${c} में इशराक नमाज़ का सही समय आज। सूर्योदय के 15-20 मिनट बाद की समय-सीमा, हदीस के हवाले से फ़ज़ीलत।`,
      h1: (c) => `${c} में इशराक नमाज़ का समय`,
      h2Schedule: (c) => `${c} में इशराक का समय`,
      h2Method: (c) => `${c} में इशराक समय की गणना`,
      h2Faq: 'इशराक नमाज़ के नियम और सवाल',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'इशराक नमाज़' },
    },
    duha: {
      titleTemplate: (c) => `${c} में चाश्त (ज़ुहा) नमाज़ का समय आज | Prayerstime`,
      metaDescription: (c) =>
        `${c} में सलात-उल-ज़ुहा (चाश्त) का समय। हदीस की रोशनी में महत्व और सटीक समय-सीमा।`,
      h1: (c) => `${c} में चाश्त नमाज़ का समय`,
      h2Schedule: (c) => `${c} में चाश्त का समय`,
      h2Method: (c) => `${c} में समय की गणना`,
      h2Faq: 'चाश्त नमाज़ के फ़ज़ाइल और सवाल',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'चाश्त नमाज़' },
    },
    chasht: {
      titleTemplate: (c) => `${c} में चाश्त नमाज़ का समय आज | Prayerstime`,
      metaDescription: (c) =>
        `${c} में चाश्त नमाज़ का समय। सुबह सूरज चढ़ने के बाद और ज़वाल से पहले का सुन्नत समय।`,
      h1: (c) => `${c} में चाश्त नमाज़ का समय`,
      h2Schedule: (c) => `${c} में चाश्त का समय`,
      h2Method: (c) => `${c} में चाश्त समय की गणना`,
      h2Faq: 'चाश्त नमाज़ से जुड़े सवाल',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'चाश्त नमाज़' },
    },
    tahajjud: {
      titleTemplate: (c) => `${c} में तहज्जुद का समय आज रात | Prayerstime`,
      metaDescription: (c) =>
        `${c} में तहज्जुद नमाज़ का समय आज रात। रात का तीसरा पहर (सुलुस-ए-अख़ीर) और क़ियामुल-लैल।`,
      h1: (c) => `${c} में तहज्जुद का समय आज रात`,
      h2Schedule: (c) => `${c} में रात की नमाज़ का समय`,
      h2Method: (c) => `${c} में रात के तीसरे हिस्से की गणना`,
      h2Faq: 'तहज्जुद नमाज़ के नियम और फ़ज़ीलत',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'तहज्जुद नमाज़' },
    },
    awabeen: {
      titleTemplate: (c) => `${c} में अव्वाबीन नमाज़ का समय | Prayerstime`,
      metaDescription: (c) =>
        `${c} में मग़रिब के बाद अव्वाबीन नमाज़ का समय और सुन्नत की रौशनी में इसकी तफ़सील।`,
      h1: (c) => `${c} में अव्वाबीन नमाज़ का समय`,
      h2Schedule: (c) => `${c} में अव्वाबीन का समय`,
      h2Method: (c) => `${c} में अव्वाबीन की गणना`,
      h2Faq: 'अव्वाबीन नमाज़ से जुड़े सवाल',
      breadcrumbs: { home: 'होम', prayerTimes: 'नमाज़ का समय', specialPrayers: 'अव्वाबीन नमाज़' },
    },
  },
  id: {
    city: {
      titleTemplate: (c) => `Jadwal Sholat ${c} Hari Ini | Prayerstime`,
      metaDescription: (c) =>
        `Jadwal sholat akurat hari ini di ${c}: Subuh, Terbit, Dzuhur, Ashar, Maghrib, Isya, arah kiblat dan kalender Hijriah.`,
      h1: (c) => `Jadwal Sholat di ${c}`,
      h2Schedule: (c) => `Jadwal Sholat Hari Ini di ${c}`,
      h2Method: (c) => `Metode Hisab dan Perhitungan di ${c}`,
      h2Faq: 'Pertanyaan yang Sering Diajukan',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat' },
    },
    ishraq: {
      titleTemplate: (c) => `Waktu Sholat Isyraq di ${c} Hari Ini | Prayerstime`,
      metaDescription: (c) =>
        `Waktu sholat Isyraq di ${c} hari ini. Dimulai 15-20 menit setelah terbit matahari sesuai sunnah Nabi ﷺ.`,
      h1: (c) => `Waktu Sholat Isyraq di ${c}`,
      h2Schedule: (c) => `Jadwal Waktu Isyraq di ${c}`,
      h2Method: (c) => `Perhitungan Waktu Isyraq di ${c}`,
      h2Faq: 'Tanya Jawab Seputar Sholat Isyraq',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat Isyraq' },
    },
    duha: {
      titleTemplate: (c) => `Waktu Sholat Dhuha di ${c} Hari Ini | Prayerstime`,
      metaDescription: (c) =>
        `Jadwal dan waktu sholat Dhuha di ${c} hari ini. Waktu terbaik beserta dalil hadits shahih.`,
      h1: (c) => `Waktu Sholat Dhuha di ${c}`,
      h2Schedule: (c) => `Jadwal Sholat Dhuha Hari Ini di ${c}`,
      h2Method: (c) => `Penentuan Waktu Sholat Dhuha di ${c}`,
      h2Faq: 'Keutamaan dan Hukum Sholat Dhuha',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat Dhuha' },
    },
    chasht: {
      titleTemplate: (c) => `Waktu Sholat Dhuha di ${c} Hari Ini | Prayerstime`,
      metaDescription: (c) => `Waktu sholat Dhuha di ${c} hari ini secara akurat.`,
      h1: (c) => `Waktu Sholat Dhuha di ${c}`,
      h2Schedule: (c) => `Jadwal Sholat Dhuha di ${c}`,
      h2Method: (c) => `Perhitungan Waktu di ${c}`,
      h2Faq: 'Pertanyaan Umum',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat Dhuha' },
    },
    tahajjud: {
      titleTemplate: (c) => `Waktu Sholat Tahajud di ${c} Malam Ini | Prayerstime`,
      metaDescription: (c) =>
        `Waktu sholat Tahajud di ${c} malam ini. Perhitungan sepertiga malam terakhir (sepertiga akhir) yang mustajab.`,
      h1: (c) => `Waktu Sholat Tahajud di ${c} Malam Ini`,
      h2Schedule: (c) => `Jadwal Waktu Tahajud Malam Ini di ${c}`,
      h2Method: (c) => `Cara Menghitung Sepertiga Malam di ${c}`,
      h2Faq: 'Tata Cara dan Keutamaan Sholat Tahajud',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat Tahajud' },
    },
    awabeen: {
      titleTemplate: (c) => `Waktu Sholat Awwabin di ${c} Hari Ini | Prayerstime`,
      metaDescription: (c) =>
        `Waktu sholat Awwabin di ${c} hari ini antara Maghrib dan Isya dengan penjelasan sunnah.`,
      h1: (c) => `Waktu Sholat Awwabin di ${c}`,
      h2Schedule: (c) => `Jadwal Sholat Awwabin di ${c}`,
      h2Method: (c) => `Penjelasan Fiqih Sholat Awwabin di ${c}`,
      h2Faq: 'Tanya Jawab Sholat Awwabin',
      breadcrumbs: { home: 'Beranda', prayerTimes: 'Jadwal Sholat', specialPrayers: 'Sholat Awwabin' },
    },
  },
  tr: {
    city: {
      titleTemplate: (c) => `${c} Namaz Vakitleri Bugün | Prayerstime`,
      metaDescription: (c) =>
        `${c} için bugünkü doğru namaz vakitleri: İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı, Kıble pusulası ve Hicri takvim.`,
      h1: (c) => `${c} Namaz Vakitleri`,
      h2Schedule: (c) => `${c} Günlük Namaz Vakitleri`,
      h2Method: (c) => `${c} Namaz Vakti Hesaplama Yöntemi`,
      h2Faq: 'Sıkça Sorulan Sorular',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'Namazlar' },
    },
    ishraq: {
      titleTemplate: (c) => `${c} İşrak Namazı Vakti Bugün | Prayerstime`,
      metaDescription: (c) =>
        `${c} için İşrak namazı vakti. Güneş doğumundan 15-20 dakika sonra başlayan kerahat sonrası faziletli nafile vakti.`,
      h1: (c) => `${c} İşrak Namazı Vakti`,
      h2Schedule: (c) => `${c} İşrak Vakti Aralığı`,
      h2Method: (c) => `${c} İşrak Vakti Nasıl Hesaplanır`,
      h2Faq: 'İşrak Namazı Hükmü ve Fazileti',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'İşrak Namazı' },
    },
    duha: {
      titleTemplate: (c) => `${c} Kuşluk (Duha) Namazı Vakti Bugün | Prayerstime`,
      metaDescription: (c) =>
        `${c} için Kuşluk (Duha) namazı vakti. Güneşin yükselişinden zeval vaktine kadar olan sünnet namaz vakti.`,
      h1: (c) => `${c} Kuşluk Namazı Vakti`,
      h2Schedule: (c) => `${c} Kuşluk Namazı Zamanı`,
      h2Method: (c) => `${c} Kuşluk Vakti Hesabı`,
      h2Faq: 'Kuşluk Namazı Hakkında Sorular',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'Kuşluk Namazı' },
    },
    chasht: {
      titleTemplate: (c) => `${c} Kuşluk Namazı Vakti Bugün | Prayerstime`,
      metaDescription: (c) => `${c} için kuşluk namazı vakti ve faziletleri.`,
      h1: (c) => `${c} Kuşluk Namazı Vakti`,
      h2Schedule: (c) => `${c} Kuşluk Vakti`,
      h2Method: (c) => `${c} Hesaplama Yöntemi`,
      h2Faq: 'Sık Sorulan Sorular',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'Kuşluk Namazı' },
    },
    tahajjud: {
      titleTemplate: (c) => `${c} Teheccüd Vakti Bu Gece | Prayerstime`,
      metaDescription: (c) =>
        `${c} için bu gece Teheccüd namazı vakti. Gecenin son üçte birinin astronomik hesabı ve fazileti.`,
      h1: (c) => `${c} Teheccüd Vakti Bu Gece`,
      h2Schedule: (c) => `${c} Gece Namazı ve Teheccüd Vakti`,
      h2Method: (c) => `${c} Gecenin Son Üçte Birinin Hesabı`,
      h2Faq: 'Teheccüd Namazı Hükümleri ve Fazileti',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'Teheccüd Namazı' },
    },
    awabeen: {
      titleTemplate: (c) => `${c} Evvabin Namazı Vakti Bugün | Prayerstime`,
      metaDescription: (c) =>
        `${c} için Evvabin namazı vakti. Akşam namazından sonra yatsıya kadar kılınan nafile namazı.`,
      h1: (c) => `${c} Evvabin Namazı Vakti`,
      h2Schedule: (c) => `${c} Evvabin Namazı Vakti`,
      h2Method: (c) => `${c} Hesaplama`,
      h2Faq: 'Evvabin Namazı Soruları',
      breadcrumbs: { home: 'Ana Sayfa', prayerTimes: 'Namaz Vakitleri', specialPrayers: 'Evvabin Namazı' },
    },
  },
  bn: {
    city: {
      titleTemplate: (c) => `${c} নামাজের সময়সূচি আজ | Prayerstime`,
      metaDescription: (c) =>
        `${c} শহরের জন্য আজকের সঠিক নামাজের সময়: ফজর, সূর্যোদয়, যোহর, আসর, মাগরিব, এশা, কিবলা দিক ও হিজরি ক্যালেন্ডার।`,
      h1: (c) => `${c} নামাজের সময়সূচি`,
      h2Schedule: (c) => `${c} আজকের নামাজের সময়সূচি`,
      h2Method: (c) => `${c} নামাজের সময় গণনার পদ্ধতি`,
      h2Faq: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'নামাজ' },
    },
    ishraq: {
      titleTemplate: (c) => `${c} ইশরাক নামাজের সময় আজ | Prayerstime`,
      metaDescription: (c) =>
        `${c} শহরে আজকের ইশরাক নামাজের সঠিক সময়। সূর্যোদয়ের ১৫-২০ মিনিট পরের মোস্তাহাব সময় এবং হাদিসের ফজিলত।`,
      h1: (c) => `${c} ইশরাক নামাজের সময়`,
      h2Schedule: (c) => `${c} ইশরাকের সময়সীমা`,
      h2Method: (c) => `${c} ইশরাকের সময় গণনার পদ্ধতি`,
      h2Faq: 'ইশরাক নামাজ সম্পর্কিত প্রশ্ন ও বিধান',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'ইশরাক নামাজ' },
    },
    duha: {
      titleTemplate: (c) => `${c} চাশত (দুহা) নামাজের সময় আজ | Prayerstime`,
      metaDescription: (c) =>
        `${c} চাশত নামাজের সঠিক সময় আজ। হাদিস অনুযায়ী দুহা নামাজের মর্যাদা ও নিয়মাবলী।`,
      h1: (c) => `${c} চাশত নামাজের সময়`,
      h2Schedule: (c) => `${c} চাশত নামাজের উত্তম সময়`,
      h2Method: (c) => `${c} সময় নির্ধারণ পদ্ধতি`,
      h2Faq: 'চাশত নামাজের ফজিলত',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'চাশত নামাজ' },
    },
    chasht: {
      titleTemplate: (c) => `${c} চাশত নামাজের সময় আজ | Prayerstime`,
      metaDescription: (c) => `${c} চাশত নামাজের সময় ও নিয়মাবলী।`,
      h1: (c) => `${c} চাশত নামাজের সময়`,
      h2Schedule: (c) => `${c} চাশত নামাজের সময়`,
      h2Method: (c) => `${c} গণনা পদ্ধতি`,
      h2Faq: 'সাধারণ প্রশ্নাবলী',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'চাশত নামাজ' },
    },
    tahajjud: {
      titleTemplate: (c) => `${c} তাহাজ্জুদ নামাজের সময় আজ রাতে | Prayerstime`,
      metaDescription: (c) =>
        `${c} শহরে আজ রাতে তাহাজ্জুদ নামাজের সময়। রাতের শেষ তৃতীয়াংশ এবং কিয়ামুল লাইলের ফজিলত।`,
      h1: (c) => `${c} তাহাজ্জুদ নামাজের সময় আজ রাতে`,
      h2Schedule: (c) => `${c} তাহাজ্জুদ ও রাতের শেষ তৃতীয়াংশ`,
      h2Method: (c) => `${c} রাতের শেষ তৃতীয়াংশ গণনার নিয়ম`,
      h2Faq: 'তাহাজ্জুদ নামাজের নিয়ম ও ফজিলত',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'তাহাজ্জুদ নামাজ' },
    },
    awabeen: {
      titleTemplate: (c) => `${c} আওয়াবিন নামাজের সময় আজ | Prayerstime`,
      metaDescription: (c) =>
        `${c} মাগরিবের পর আওয়াবিন নামাজের সময় ও হাদিসের বর্ণনা।`,
      h1: (c) => `${c} আওয়াবিন নামাজের সময়`,
      h2Schedule: (c) => `${c} আওয়াবিনের সময়`,
      h2Method: (c) => `${c} গণনা`,
      h2Faq: 'আওয়াবিন নামাজের বিধান',
      breadcrumbs: { home: 'হোম', prayerTimes: 'নামাজের সময়সূচি', specialPrayers: 'আওয়াবিন নামাজ' },
    },
  },
  fr: {
    city: {
      titleTemplate: (c) => `Heures de Prière à ${c} Aujourd'hui | Prayerstime`,
      metaDescription: (c) =>
        `Heures de prière islamique précises aujourd'hui à ${c}: Fajr, Chourouk, Dhuhr, Asr, Maghrib, Isha, direction de la Qibla et calendrier hégirien.`,
      h1: (c) => `Heures de Prière à ${c}`,
      h2Schedule: (c) => `Horaires des Prières Aujourd'hui à ${c}`,
      h2Method: (c) => `Méthodologie de Calcul Astronomique à ${c}`,
      h2Faq: 'Foire Aux Questions',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Prières' },
    },
    ishraq: {
      titleTemplate: (c) => `Heure de la Prière d'Ishraq à ${c} | Prayerstime`,
      metaDescription: (c) =>
        `Heure de la prière d'Ishraq à ${c} aujourd'hui. Calculée 15 à 20 minutes après le lever du soleil selon la Sunna prophétique.`,
      h1: (c) => `Heure d'Ishraq à ${c}`,
      h2Schedule: (c) => `Créneau Horaire d'Ishraq à ${c}`,
      h2Method: (c) => `Calcul Astronomique d'Ishraq à ${c}`,
      h2Faq: 'Questions Fréquentes et Règles Fiqh',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Prière Ishraq' },
    },
    duha: {
      titleTemplate: (c) => `Heure de la Prière de Duha à ${c} | Prayerstime`,
      metaDescription: (c) =>
        `Heure de Salat al-Duha à ${c} aujourd'hui. Moment idéal en milieu de matinée avec hadiths authentiques.`,
      h1: (c) => `Heure de Salat al-Duha à ${c}`,
      h2Schedule: (c) => `Créneau de Duha à ${c}`,
      h2Method: (c) => `Calcul des Heures de Duha à ${c}`,
      h2Faq: 'Mérites et Pratique de la Prière de Duha',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Prière Duha' },
    },
    chasht: {
      titleTemplate: (c) => `Heure de la Prière de Duha (Chasht) à ${c} | Prayerstime`,
      metaDescription: (c) => `Heure précise de la prière matinale à ${c}.`,
      h1: (c) => `Heure de Prière à ${c}`,
      h2Schedule: (c) => `Horaires à ${c}`,
      h2Method: (c) => `Méthodologie`,
      h2Faq: 'Questions fréquentes',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Prière Duha' },
    },
    tahajjud: {
      titleTemplate: (c) => `Heure de Tahajjud à ${c} cette Nuit | Prayerstime`,
      metaDescription: (c) =>
        `Heure de Tahajjud et Qiyam al-Layl à ${c} cette nuit. Calcul précis du dernier tiers de la nuit (Thuluth al-Akhir).`,
      h1: (c) => `Heure de Tahajjud à ${c} cette Nuit`,
      h2Schedule: (c) => `Créneau de Tahajjud et Dernier Tiers de la Nuit à ${c}`,
      h2Method: (c) => `Calcul Astronomique du Dernier Tiers de la Nuit à ${c}`,
      h2Faq: 'Règles et Mérites de Tahajjud',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Tahajjud' },
    },
    awabeen: {
      titleTemplate: (c) => `Heure de la Prière des Awabeen à ${c} | Prayerstime`,
      metaDescription: (c) =>
        `Heure de la prière d'Awabeen à ${c} entre Maghrib et Isha avec analyse jurisprudentielle.`,
      h1: (c) => `Heure d'Awabeen à ${c}`,
      h2Schedule: (c) => `Créneau d'Awabeen à ${c}`,
      h2Method: (c) => `Calcul et Règles à ${c}`,
      h2Faq: 'Questions sur la Prière des Awabeen',
      breadcrumbs: { home: 'Accueil', prayerTimes: 'Heures de Prière', specialPrayers: 'Awabeen' },
    },
  },
};
