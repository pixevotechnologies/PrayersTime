import { SupportedLanguage } from './seoData';

export interface PrayerDetailContent {
  title: string;
  tag: string;
  description: (time: string) => string;
}

export interface SanctuaryPageContent {
  pageTitle: (fajr: string, dhuhr: string, asr: string, maghrib: string, isha: string) => string;
  metaDescription: (fajr: string, dhuhr: string, asr: string, maghrib: string, isha: string) => string;
  h1: string;
  badge: string;
  subtitle: string;
  qiblaNote: string;
  methodologyTitle: string;
  methodologyText: string;
  monthlyHeading: (monthName: string) => string;
  monthlySubtitle: string;
  understandingTitle: string;
  understandingParagraphs: string[];
  prayersHeading: string;
  prayers: {
    fajr: PrayerDetailContent;
    sunrise: PrayerDetailContent;
    dhuhr: PrayerDetailContent;
    asr: PrayerDetailContent;
    maghrib: PrayerDetailContent;
    isha: PrayerDetailContent;
  };
  faqHeading: string;
  faqs: (times: { fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string }) => Array<{ q: string; a: string }>;
}

export const MAKKAH_LOCALIZED_CONTENT: Record<SupportedLanguage, SanctuaryPageContent> = {
  en: {
    pageTitle: (f, d, a, m, i) => 'Prayer Times in Makkah Today – Namaz & Salah Times',
    metaDescription: (f, d, a, m, i) =>
      `Accurate today's prayer times in Makkah (Mecca), Saudi Arabia: Fajr ${f}, Dhuhr ${d}, Asr ${a}, Maghrib ${m}, Isha ${i}. Official Umm al-Qura timetable, live countdown & monthly calendar.`,
    h1: 'Prayer Times in Makkah Today',
    badge: 'Makkah (Mecca), Saudi Arabia · Umm al-Qura University Standard',
    subtitle:
      'Accurate daily Islamic prayer times, live next-prayer countdown, and monthly timetable for Makkah al-Mukarramah. Calculated using the official Umm al-Qura calendar for Masjid al-Haram.',
    qiblaNote: 'Qibla: Inside Holy Kaaba Sanctuary',
    methodologyTitle: 'Official Umm al-Qura Calculation Method:',
    methodologyText:
      'Times for Makkah are calculated using the coordinates of the Kaaba (21.4225° N, 39.8262° E) following the Umm al-Qura University calendar. Fajr is calculated at an 18.5° solar depression angle, Asr follows the standard 1x shadow factor, and Isha is set 90 minutes after Maghrib (120 minutes during Ramadan).',
    monthlyHeading: (m) => `Monthly Makkah Prayer Timetable — ${m}`,
    monthlySubtitle: 'Complete Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha timetable for Makkah',
    understandingTitle: 'Understanding Makkah Prayer Times, Namaz & Salah Timings',
    understandingParagraphs: [
      'Whether you are searching for prayer times Makkah, Makkah namaz time today, Makkah namaz timing, or Makkah salah time, the daily prayer schedule for the holy city of Makkah (Mecca) is among the most revered and closely observed timetables in the world. Muslims globally face directly toward the Holy Kaaba in Makkah five times every single day to establish their obligatory Salah.',
      'Across different linguistic and cultural traditions, believers use varied terms for these sacred worship windows: Arabic-speaking communities refer to them as Salah (صلاة), millions of Muslims across Pakistan, India, Bangladesh, Turkey, and Central Asia refer to them as Namaz (نماز) or Namaz timing, and English speakers simply call them Islamic prayer times. Regardless of phrasing, all refer to the precise astronomical intervals ordained by Allah and exemplified by the Messenger of Allah ﷺ.',
      'Because Makkah al-Mukarramah is the spiritual anchor of the Muslim Ummah, live television broadcasts and international satellite feeds broadcast every prayer live from Masjid al-Haram. Pilgrims preparing for Hajj or Umrah, as well as Muslims tuning in from across the globe, rely on an exact, uncompromised schedule to synchronize their worship with the holy city.',
    ],
    prayersHeading: 'The Five Daily Prayers in Makkah: Schedule & Astronomical Calculation',
    prayers: {
      fajr: {
        title: 'Fajr Time Makkah (Dawn Prayer)',
        tag: 'Dawn (18.5°)',
        description: (t) =>
          `Fajr in Makkah commences at the moment of true astronomical dawn (al-Fajr al-Sadiq), when light first appears horizontally across the eastern horizon over the Hijaz mountains. Under the official Umm al-Qura standard, this occurs when the sun reaches 18.5° below the horizon. Today Fajr begins at ${t}.`,
      },
      sunrise: {
        title: 'Sunrise (Shuruq) & Ishraq in Makkah',
        tag: 'Ishraq start',
        description: (t) =>
          `Sunrise marks the exact moment the upper edge of the sun crosses the horizon in Makkah (${t}). Obligatory prayer is prohibited during sunrise (makruh tahrimi). Approximately 15 to 20 minutes after sunrise, the rewarding voluntary Ishraq prayer begins.`,
      },
      dhuhr: {
        title: 'Dhuhr Time Makkah (Midday Prayer)',
        tag: 'Zawal (Zenith)',
        description: (t) =>
          `Dhuhr begins when the sun passes the celestial meridian (Zawal) and begins its descent toward the west. In Masjid al-Haram, the Adhan for Dhuhr is proclaimed promptly at ${t}, calling worshippers to gather around the Kaaba for congregational prayer.`,
      },
      asr: {
        title: 'Asr Time Makkah (Afternoon Prayer)',
        tag: 'Shadow 1x',
        description: (t) =>
          `Asr in Makkah follows the standard majority (Jumhur) methodology followed in the Kingdom of Saudi Arabia, starting when the shadow of an object equals its length plus its initial noon shadow (${t}).`,
      },
      maghrib: {
        title: 'Maghrib Time Makkah (Sunset & Iftar)',
        tag: 'Sunset / Iftar',
        description: (t) =>
          `Maghrib begins at the exact second the upper limb of the sun dips completely beneath the western horizon (${t}). Fasting pilgrims and residents break their fast at this moment with dates and Zamzam water distributed across the courtyard of the Grand Mosque.`,
      },
      isha: {
        title: 'Isha Time Makkah (Night Prayer)',
        tag: '+90m standard',
        description: (t) =>
          `Under the official Umm al-Qura University calendar, Isha in Makkah starts precisely 90 minutes after Maghrib throughout the year (and 120 minutes during Ramadan), commencing today at ${t}.`,
      },
    },
    faqHeading: 'Frequently Asked Questions About Makkah Prayer Times',
    faqs: (times) => [
      {
        q: 'What time is Fajr prayer in Makkah today?',
        a: `Fajr prayer in Makkah today begins at ${times.fajr} (astronomical dawn), calculated at an 18.5° solar depression angle according to the official Umm al-Qura University methodology. Congregational prayer at Masjid al-Haram usually starts approximately 20 minutes after the Adhan.`,
      },
      {
        q: 'What time is Maghrib and Iftar in Makkah today?',
        a: `Maghrib prayer in Makkah today starts at ${times.maghrib} at astronomical sunset. Fasting pilgrims break their fast at this exact moment in Masjid al-Haram.`,
      },
      {
        q: 'What is the reward for praying in Masjid al-Haram in Makkah?',
        a: 'The Prophet Muhammad ﷺ said: "One prayer in Masjid al-Haram is better than one hundred thousand prayers elsewhere." (Sahih Ibn Majah 1406, Sahih al-Bukhari).',
      },
      {
        q: 'Which calculation method is used for Makkah prayer times?',
        a: 'Makkah uses the official Umm al-Qura University calculation method, which is the national standard of Saudi Arabia. Fajr is calculated at an 18.5° angle and Isha is fixed at 90 minutes after Maghrib (120 minutes during Ramadan).',
      },
      {
        q: 'Why is Isha prayer in Makkah 90 minutes after Maghrib?',
        a: 'The Umm al-Qura University calendar sets Isha at a fixed 90-minute interval after Maghrib to guarantee the disappearance of twilight (Shafaq Ahmar) throughout all seasons in the Hijaz climate.',
      },
      {
        q: 'What is the Qibla direction in Makkah?',
        a: 'In Makkah, worshippers face directly toward the physical structure of the Kaaba itself inside Masjid al-Haram. For those outside the sanctuary, the Qibla is the general direction of the Grand Mosque.',
      },
    ],
  },

  ar: {
    pageTitle: (f, d, a, m, i) => 'مواقيت الصلاة في مكة المكرمة اليوم – مواعيد الأذان والصلاة',
    metaDescription: (f, d, a, m, i) =>
      `مواقيت الصلاة الدقيقة اليوم في مكة المكرمة، المملكة العربية السعودية: الفجر ${f}، الظهر ${d}، العصر ${a}، المغرب ${m}، العشاء ${i}. تقويم أم القرى الرسمي، عداد الصلاة القادمة والجدول الشهري.`,
    h1: 'مواقيت الصلاة في مكة المكرمة اليوم',
    badge: 'مكة المكرمة، المملكة العربية السعودية · معيار تقويم أم القرى',
    subtitle:
      'مواقيت الصلاة الإسلامية اليومية بدقة، عداد تنازلي مباشر للصلاة القادمة، والجدول الشهري لمكة المكرمة محسوبة وفق تقويم أم القرى الرسمي للمسجد الحرام.',
    qiblaNote: 'القبلة: في محاذاة الكعبة المشرفة مباشرة',
    methodologyTitle: 'طريقة حساب تقويم أم القرى الرسمية:',
    methodologyText:
      'تُحسب مواقيت مكة المكرمة وفق إحداثيات الكعبة المشرفة (21.4225° شمالاً، 39.8262° شرقاً) وفق تقويم جامعة أم القرى. يُحسب الفجر عند زاوية انخفاض شمسي 18.5 درجة، والعصر بظل المثل الواحد، والعشاء بعد 90 دقيقة من المغرب (120 دقيقة في شهر رمضان المبارك).',
    monthlyHeading: (m) => `جدول مواقيت الصلاة لشهر ${m} في مكة المكرمة`,
    monthlySubtitle: 'جدول مواعيد الفجر والشروق والظهر والعصر والمغرب والعشاء في مكة المكرمة',
    understandingTitle: 'دليل مواقيت الصلاة والصلوات الخمس في مكة المكرمة',
    understandingParagraphs: [
      'تعد مواقيت الصلاة في مكة المكرمة أكثر المواقيت متابعة واهتماماً من قِبل المسلمين في شتى بقاع الأرض، حيث يتوجه أكثر من ملياري مسلم وجوههم شطر المسجد الحرام والكعبة المشرفة خمس مرات يومياً لأداء الفريضة.',
      'تختلف المسميات باختلاف لغات وثقافات الشعوب الإسلامية؛ فالناطقون بالعربية يسمونها "الصلاة" أو "مواقيت الصلاة"، وملايين المسلمين في باكستان والهند وبنغلاديش وتركيا يسمونها "نماز" (Namaz)، بينما يُشار إليها بالإنجليزية بـ "Islamic Prayer Times". وجميعها تشير إلى الأوقات الفلكية الشرعية التي حددها الله تعالى وسنّها رسول الله ﷺ.',
      'وبما أن مكة المكرمة هي مهبط الوحي والقلب النابض للعالم الإسلامي، فإن الصلوات تُنقل مباشرة عبر الأقمار الصناعية والإذاعات من المسجد الحرام، ويعتمد عليها حجاج بيت الله الحرام والمعتمرون والمتابعون حول العالم لضبط صلواتهم وتعبدهم.',
    ],
    prayersHeading: 'الصلوات الخمس في مكة المكرمة: أوقاتها وحسابها الفلكي',
    prayers: {
      fajr: {
        title: 'صلاة الفجر في مكة المكرمة',
        tag: 'الفجر الصادق (18.5°)',
        description: (t) =>
          `يبدأ الفجر الصادق بظهور البياض العرضي في الأفق الشرقي فوق جبال الحجاز عند وصول الشمس 18.5 درجة تحت الأفق، ويبدأ اليوم في تمام الساعة ${t}.`,
      },
      sunrise: {
        title: 'شروق الشمس والإشراق في مكة المكرمة',
        tag: 'بدء وقت الإشراق',
        description: (t) =>
          `الشروق هو لحظة طلوع الحافة العليا لقرص الشمس (${t})، وتحرم فيه الصلاة حتى ترتفع الشمس قيد رمح، لتبدأ بعد 15-20 دقيقة صلاة الإشراق.`,
      },
      dhuhr: {
        title: 'صلاة الظهر في مكة المكرمة',
        tag: 'زوال الشمس',
        description: (t) =>
          `يبدأ الظهر بزوال الشمس عن كبد السماء وميلها نحو الغرب. ويصدح أذان الظهر في المسجد الحرام اليوم في تمام الساعة ${t}.`,
      },
      asr: {
        title: 'صلاة العصر في مكة المكرمة',
        tag: 'ظل المثل الواحد',
        description: (t) =>
          `يُحسب العصر في مكة المكرمة وفق مذهب الجمهور المعتمد في المملكة، عندما يصبح ظل كل شيء مثله، ويبدأ اليوم عند ${t}.`,
      },
      maghrib: {
        title: 'صلاة المغرب والإفطار في مكة المكرمة',
        tag: 'غروب الشمس / الإفطار',
        description: (t) =>
          `يبدأ وقت المغرب لحظة غروب كامل قرص الشمس (${t})، وفيه يفطر الصائمون على التمر وماء زمزم المبارك في باحات الحرم المكي.`,
      },
      isha: {
        title: 'صلاة العشاء في مكة المكرمة',
        tag: '+90 دقيقة بعد المغرب',
        description: (t) =>
          `وفق تقويم أم القرى المعتمد، يُحدد أذان العشاء بعد 90 دقيقة من أذان المغرب طوال العام (و120 دقيقة في رمضان)، ويبدأ اليوم عند ${t}.`,
      },
    },
    faqHeading: 'الأسئلة الشائعة حول مواقيت الصلاة في مكة المكرمة',
    faqs: (times) => [
      {
        q: 'كم الساعة صلاة الفجر في مكة المكرمة اليوم؟',
        a: `يبدأ أذان الفجر في مكة المكرمة اليوم عند الساعة ${times.fajr} وفق تقويم أم القرى الرسمي (بزاوية 18.5 درجة). وتقام الصلاة في المسجد الحرام بعد الأذان بنحو 20 دقيقة.`,
      },
      {
        q: 'متى وقت صلاة المغرب والإفطار في مكة المكرمة اليوم؟',
        a: `يبدأ وقت المغرب والإفطار في مكة المكرمة اليوم في تمام الساعة ${times.maghrib} مع غروب قرص الشمس تماماً.`,
      },
      {
        q: 'ما هو فضل الصلاة في المسجد الحرام بمكة المكرمة؟',
        a: 'قال رسول الله ﷺ: "صلاة في المسجد الحرام أفضل من مائة ألف صلاة فيما سواه" (رواه أحمد وابن ماجه بإسناد صحيح).',
      },
      {
        q: 'ما هي طريقة الحساب المتبعة لمواقيت مكة المكرمة؟',
        a: 'تعتمد مكة المكرمة تقويم أم القرى الرسمي الصادر عن جامعة أم القرى، وهو المعيار الوطني المعتمد في جميع أرجاء المملكة العربية السعودية.',
      },
      {
        q: 'لماذا يبدأ وقت العشاء بعد 90 دقيقة من المغرب في مكة؟',
        a: 'حُددت 90 دقيقة في تقويم أم القرى لضمان مغيب الشفق الأحمر بالكامل في كافة فصول السنة وفق مناخ شبه الجزيرة العربية.',
      },
      {
        q: 'ما هو اتجاه القبلة في مكة المكرمة؟',
        a: 'في مكة المكرمة يتوجه المصلي مباشرة إلى عين الكعبة المشرفة داخل المسجد الحرام، وإلى جهة الحرم لمن كان بعيداً عنه داخل حدود المدينة.',
      },
    ],
  },

  ur: {
    pageTitle: (f, d, a, m, i) => 'مکہ مکرمہ میں آج نماز کے اوقات – سحر، افطار اور نماز کا ٹائم ٹیبل',
    metaDescription: (f, d, a, m, i) =>
      `مکہ مکرمہ، سعودی عرب میں آج کے مستند اوقات نماز: فجر ${f}، ظہر ${d}، عصر ${a}، مغرب ${m}، عشاء ${i}۔ ام القریٰ کیلنڈر، لائیو کاؤنٹ ڈاؤن اور ماہانہ شیڈول۔`,
    h1: 'مکہ مکرمہ میں نماز کے اوقات آج',
    badge: 'مکہ مکرمہ، سعودی عرب · ام القریٰ یونیورسٹی معیار',
    subtitle:
      'مکہ مکرمہ اور مسجد الحرام کے لیے روزانہ کے مستند اسلامی اوقات نماز، اگلی نماز کا لائیو کاؤنٹ ڈاؤن اور مکمل ماہانہ ٹائم ٹیبل۔',
    qiblaNote: 'قبلہ رخ: خانہ کعبہ کی براہ راست سمت',
    methodologyTitle: 'ام القریٰ فلکیاتی طریقہ کار:',
    methodologyText:
      'مکہ مکرمہ کے اوقات خانہ کعبہ کے جغرافیائی نقاط (21.4225° N, 39.8262° E) اور ام القریٰ یونیورسٹی کے مستند طریقہ کار پر مرتب کیے جاتے ہیں۔ فجر 18.5 ڈگری زاویہ انحطاط، عصر 1x سایہ اور عشاء مغرب کے ٹھیک 90 منٹ بعد (رمضان میں 120 منٹ) ہے۔',
    monthlyHeading: (m) => `مکہ مکرمہ ماہانہ ٹائم ٹیبل — ${m}`,
    monthlySubtitle: 'مکہ مکرمہ کے لیے فجر، طلوع آفتاب، ظہر، عصر، مغرب اور عشاء کا مکمل شیڈول',
    understandingTitle: 'مکہ مکرمہ میں نماز کے اوقات اور ان کی اہمیت',
    understandingParagraphs: [
      'مکہ مکرمہ میں نماز کے اوقات دنیا بھر کے مسلمانوں کے لیے انتہائی اہمیت کے حامل ہیں۔ دنیا بھر کے اربوں مسلمان روزانہ پانچ وقت خانہ کعبہ کی طرف رخ کر کے نماز ادا کرتے ہیں۔',
      'برصغیر پاک و ہند اور دیگر خطوں میں اسے "نماز کا وقت" یا "نماز ٹائمنگز" کہا جاتا ہے، عربی میں "صلاۃ" اور انگریزی میں "Prayer Times"۔ تمام اصطلاحات انہی شرعی و فلکیاتی اوقات کی عکاسی کرتی ہیں جو اللہ اور اس کے رسول ﷺ نے مقرر فرمائے۔',
      'مسجد الحرام سے براہ راست اذان اور نمازیں پوری دنیا میں نشر کی جاتی ہیں۔ حجاج کرام، معتمرین اور دنیا بھر کے مسلمان اپنے روزمرہ کے معمولات اور عبادات کے لیے اس شیڈول پر انحصار کرتے ہیں۔',
    ],
    prayersHeading: 'مکہ مکرمہ کی پانچوں نمازیں: اوقات اور فلکیاتی حساب',
    prayers: {
      fajr: {
        title: 'نماز فجر مکہ مکرمہ',
        tag: 'صبح صادق (18.5°)',
        description: (t) =>
          `مکہ میں فجر صبح صادق کے نمودار ہونے پر شروع ہوتی ہے جب سورج افق سے 18.5 ڈگری نیچے ہوتا ہے۔ آج فجر کا وقت ${t} پر شروع ہوتا ہے۔`,
      },
      sunrise: {
        title: 'طلوع آفتاب اور اشراق',
        tag: 'اشراق کا آغاز',
        description: (t) =>
          `طلوع آفتاب (${t}) کے وقت نماز پڑھنا ممنوع (مکروہ) ہے۔ طلوع کے تقریباً 15 سے 20 منٹ بعد نفل نماز اشراق کا وقت شروع ہو جاتا ہے۔`,
      },
      dhuhr: {
        title: 'نماز ظہر مکہ مکرمہ',
        tag: 'زوال آفتاب',
        description: (t) =>
          `ظہر کا وقت سورج کے نصف النہار سے ڈھلنے (زوال) پر شروع ہوتا ہے۔ مسجد الحرام میں ظہر کی اذان آج ${t} پر دی جاتی ہے۔`,
      },
      asr: {
        title: 'نماز عصر مکہ مکرمہ',
        tag: 'ایک مثل سایہ',
        description: (t) =>
          `سعودی عرب میں رائج جمہور کے اصول کے تحت عصر کا وقت ہر چیز کا سایہ ایک گنا ہونے پر شروع ہوتا ہے، جو آج ${t} پر ہے۔`,
      },
      maghrib: {
        title: 'نماز مغرب اور افطار',
        tag: 'غروب آفتاب / افطار',
        description: (t) =>
          `مغرب کا وقت آفتاب کے مکمل غروب ہونے پر ${t} پر شروع ہوتا ہے، جس لمحے روزہ دار زمزم اور کھجور سے روزہ افطار کرتے ہیں۔`,
      },
      isha: {
        title: 'نماز عشاء مکہ مکرمہ',
        tag: 'مغرب کے 90 منٹ بعد',
        description: (t) =>
          `ام القریٰ کیلنڈر کے تحت عشاء کا وقت مغرب کے 90 منٹ بعد شروع ہوتا ہے، جو آج رات ${t} پر ہے۔`,
      },
    },
    faqHeading: 'مکہ مکرمہ کے اوقات نماز کے بارے میں عمومی سوالات',
    faqs: (times) => [
      {
        q: 'آج مکہ مکرمہ میں فجر کی نماز کا کیا وقت ہے؟',
        a: `مکہ مکرمہ میں آج فجر کا وقت ${times.fajr} پر شروع ہوتا ہے۔ مسجد الحرام میں اذان کے بعد تقریباً 20 منٹ پر جماعت قائم ہوتی ہے۔`,
      },
      {
        q: 'مکہ مکرمہ میں آج مغرب اور افطار کا وقت کیا ہے؟',
        a: `مکہ مکرمہ میں مغرب اور افطار کا وقت غروب آفتاب کے وقت یعنی ٹھیک ${times.maghrib} پر ہوتا ہے۔`,
      },
      {
        q: 'مسجد الحرام میں نماز کا کیا ثواب ہے؟',
        a: 'رسول اللہ ﷺ نے ارشاد فرمایا: "مسجد الحرام میں ایک نماز کا ثواب دوسری مساجد کے مقابلے میں ایک لاکھ گنا زیادہ ہے" (صحیح ابن ماجہ)۔',
      },
      {
        q: 'مکہ مکرمہ میں نماز کے لیے کون سا طریقہ کار استعمال ہوتا ہے؟',
        a: 'مکہ مکرمہ میں سعودی عرب کا سرکاری اور مستند طریقہ کار یعنی ام القریٰ یونیورسٹی کیلنڈر رائج ہے۔',
      },
      {
        q: 'مکہ میں عشاء کا وقت مغرب کے 90 منٹ بعد کیوں مقرر ہے؟',
        a: 'ام القریٰ کیلنڈر میں شفق احمر کے مکمل غائب ہونے کو یقینی بنانے کے لیے مغرب کے بعد 90 منٹ کا وقفہ مقرر کیا گیا ہے۔',
      },
      {
        q: 'مکہ مکرمہ میں قبلہ رخ کیا ہے؟',
        a: 'مکہ مکرمہ میں نمازی براہ راست کعبہ شریف کی سمت رخ کرتے ہیں۔ مسجد الحرام کے اندر عین کعبہ اور شہر کے دیگر حصوں میں کعبہ کی سمت ہی قبلہ ہے۔',
      },
    ],
  },

  hi: {
    pageTitle: (f, d, a, m, i) => 'मक्का में आज नमाज़ का समय – नमाज़ टाइम टेबल मक्का',
    metaDescription: (f, d, a, m, i) =>
      `मक्का (सऊदी अरब) में आज के सही नमाज़ के औक़ात: फ़ज्र ${f}, ज़ुहर ${d}, अस्र ${a}, मग़रिब ${m}, इशा ${i}। उम्म अल-क़ुरा कैलेंडर, लाइव काउंटडाउन और मासिक समय सारणी।`,
    h1: 'मक्का में नमाज़ का समय आज',
    badge: 'मक्का (सऊदी अरब) · उम्म अल-क़ुरा विश्वविद्यालय मानक',
    subtitle:
      'मक्का अल-मुकर्रमा और मस्जिद अल-हराम के लिए आज की नमाज़ के सटीक औक़ात, अगली नमाज़ का लाइव काउंटडाउन और मासिक नमाज़ कैलेंडर।',
    qiblaNote: 'क़िबला: पवित्र काबा की सीधी दिशा',
    methodologyTitle: 'उम्म अल-क़ुरा आधिकारिक गणना विधि:',
    methodologyText:
      'मक्का के नमाज़ के समय काबा के निर्देशांक (21.4225° N, 39.8262° E) और उम्म अल-क़ुरा विश्वविद्यालय कैलेंडर के अनुसार निकाले जाते हैं। फ़ज्र 18.5° सूर्य झुकाव, अस्र 1x परछाई और इशा मग़रिब के 90 मिनट बाद होती है।',
    monthlyHeading: (m) => `मक्का मासिक नमाज़ टाइम टेबल — ${m}`,
    monthlySubtitle: 'मक्का के लिए फ़ज्र, सूर्योदय, ज़ुहर, अस्र, मग़रिब और इशा का पूरा टाइम टेबल',
    understandingTitle: 'मक्का में नमाज़ के समय और औक़ात की जानकारी',
    understandingParagraphs: [
      'मक्का मुकर्रमा में नमाज़ का समय दुनिया भर के मुसलमानों के लिए अत्यंत महत्वपूर्ण है। दुनिया भर के मुसलमान प्रतिदिन पाँच बार पवित्र काबा की ओर मुँह करके नमाज़ अदा करते हैं।',
      'विभिन्न भाषाओं में इसे नमाज़ का समय (Namaz Timing), सलात (Salah), या इस्लामिक प्रार्थना समय कहा जाता है। ये सभी समय अल्लाह और उसके रसूल ﷺ द्वारा बताए गए खगोलीय नियमों पर आधारित हैं।',
      'मस्जिद अल-हराम से सभी नमाज़ों का सीधा प्रसारण दुनिया भर में देखा जाता है। हज व उमराह के जायरीन और दुनिया भर के लोग अपने औक़ात मिलाने के लिए इस पर भरोसा करते हैं।',
    ],
    prayersHeading: 'मक्का में पाँच दैनिक नमाज़ें: समय और खगोलीय गणना',
    prayers: {
      fajr: {
        title: 'फ़ज्र नमाज़ का समय मक्का',
        tag: 'सुबह सादिक (18.5°)',
        description: (t) =>
          `मक्का में फ़ज्र सुबह सादिक पर शुरू होती है जब सूरज क्षितिज से 18.5° नीचे होता है। आज फ़ज्र ${t} पर शुरू होती है।`,
      },
      sunrise: {
        title: 'सूर्योदय और इशराक़',
        tag: 'इशराक़ की शुरुआत',
        description: (t) =>
          `सूर्योदय (${t}) के समय नमाज़ पढ़ना मना (मक़रूह) है। सूर्योदय के 15-20 मिनट बाद इशराक़ नमाज़ का समय शुरू होता है।`,
      },
      dhuhr: {
        title: 'ज़ुहर नमाज़ का समय मक्का',
        tag: 'ज़वाल (दोपहर)',
        description: (t) =>
          `ज़ुहर का समय दोपहर में सूरज के ढलने पर शुरू होता है। मस्जिद अल-हराम में ज़ुहर की अज़ान आज ${t} पर होती है।`,
      },
      asr: {
        title: 'अस्र नमाज़ का समय मक्का',
        tag: '1x परछाई',
        description: (t) =>
          `सऊदी अरब में अस्र का समय वस्तु की परछाई के एक गुना होने पर शुरू होता है, जो आज ${t} पर है।`,
      },
      maghrib: {
        title: 'मग़रिब नमाज़ और इफ़्तार',
        tag: 'सूर्यास्त / इफ़्तार',
        description: (t) =>
          `मग़रिब का समय सूरज पूरी तरह डूबने पर ${t} पर शुरू होता है, जब रोज़ेदार खजूर और ज़मज़म से रोज़ा खोलते हैं।`,
      },
      isha: {
        title: 'इशा नमाज़ का समय मक्का',
        tag: 'मग़रिब के 90 मिनट बाद',
        description: (t) =>
          `उम्म अल-क़ुरा कैलेंडर के अनुसार इशा का समय मग़रिब के ठीक 90 मिनट बाद शुरू होता है, जो आज ${t} पर है।`,
      },
    },
    faqHeading: 'मक्का में नमाज़ के समय के बारे में सामान्य प्रश्न',
    faqs: (times) => [
      {
        q: 'आज मक्का में फ़ज्र की नमाज़ का समय क्या है?',
        a: `मक्का में आज फ़ज्र का समय ${times.fajr} पर शुरू होता है। मस्जिद अल-हराम में अज़ान के लगभग 20 मिनट बाद जमात होती है।`,
      },
      {
        q: 'मक्का में मग़रिब और इफ़्तार का समय क्या है?',
        a: `मक्का में मग़रिब और इफ़्तार का समय सूर्यास्त के समय यानी ठीक ${times.maghrib} पर होता है।`,
      },
      {
        q: 'मस्जिद अल-हराम में नमाज़ पढ़ने का क्या सवाब है?',
        a: 'हदीस के अनुसार मस्जिद अल-हराम में एक नमाज़ का सवाब अन्य मस्जिदों से एक लाख गुना अधिक है (सहीह इब्न माजह)।',
      },
      {
        q: 'मक्का में कौन सी गणना पद्धति लागू है?',
        a: 'मक्का में सऊदी अरब का आधिकारिक उम्म अल-क़ुरा विश्वविद्यालय मानक लागू है।',
      },
      {
        q: 'मक्का में इशा नमाज़ मग़रिब के 90 मिनट बाद क्यों होती है?',
        a: 'उम्म अल-क़ुरा प्रणाली में लाली (शफ़क़ अह़मर) के पूरी तरह गायब होने के लिए 90 मिनट का मानक समय तय किया गया है।',
      },
      {
        q: 'मक्का में क़िबला किस दिशा में है?',
        a: 'मक्का के भीतर नमाज़ी सीधे काबा शरीफ़ की ओर रुख करते हैं।',
      },
    ],
  },

  id: {
    pageTitle: (f, d, a, m, i) => 'Jadwal Sholat di Makkah Hari Ini – Waktu Adzan & Sholat Masjidil Haram',
    metaDescription: (f, d, a, m, i) =>
      `Jadwal sholat akurat di Makkah (Mekkah), Arab Saudi hari ini: Subuh ${f}, Dzuhur ${d}, Ashar ${a}, Maghrib ${m}, Isya ${i}. Standar Ummul Qura, hitung mundur & kalender bulanan.`,
    h1: 'Jadwal Sholat di Makkah Hari Ini',
    badge: 'Makkah, Arab Saudi · Standar Universitas Ummul Qura',
    subtitle:
      'Jadwal sholat harian akurat, hitung mundur langsung waktu sholat berikutnya, dan jadwal bulanan untuk Makkah Al-Mukarramah berdasarkan kalender resmi Ummul Qura untuk Masjidil Haram.',
    qiblaNote: 'Kiblat: Langsung Menghadap Ka’bah Suci',
    methodologyTitle: 'Metode Perhitungan Resmi Ummul Qura:',
    methodologyText:
      'Waktu sholat untuk Makkah dihitung menggunakan koordinat Ka’bah (21.4225° LU, 39.8262° BT) menurut kalender Universitas Ummul Qura. Subuh dihitung pada sudut depresi matahari 18.5°, Ashar pada bayangan 1x, dan Isya ditetapkan 90 menit setelah Maghrib (120 menit saat Ramadhan).',
    monthlyHeading: (m) => `Jadwal Sholat Bulanan Makkah — ${m}`,
    monthlySubtitle: 'Jadwal lengkap waktu Subuh, Terbit, Dzuhur, Ashar, Maghrib, dan Isya untuk Makkah',
    understandingTitle: 'Memahami Waktu Sholat di Makkah & Masjidil Haram',
    understandingParagraphs: [
      'Jadwal sholat di kota suci Makkah Al-Mukarramah adalah salah satu jadwal ibadah yang paling banyak diperhatikan oleh umat Islam di seluruh dunia. Lebih dari dua miliar Muslim menghadap langsung ke arah Ka’bah lima kali sehari untuk mendirikan sholat fardhu.',
      'Dalam berbagai bahasa, ibadah ini disebut sebagai Sholat (bahasa Arab & Indonesia) atau Namaz di Asia Selatan. Semua istilah ini merujuk pada interval astronomi yang telah ditetapkan oleh syariat Islam.',
      'Sebagai pusat spiritual umat Islam, siaran langsung sholat dari Masjidil Haram disiarkan ke seluruh dunia. Jamaah haji dan umrah serta kaum muslimin di manapun berada memanfaatkan jadwal ini untuk menyelaraskan ibadah mereka.',
    ],
    prayersHeading: 'Lima Waktu Sholat di Makkah: Perhitungan & Waktu Masuk',
    prayers: {
      fajr: {
        title: 'Waktu Sholat Subuh Makkah',
        tag: 'Fajar Shadiq (18.5°)',
        description: (t) =>
          `Subuh di Makkah dimulai saat fajar shadiq tampak di ufuk timur pegunungan Hijaz dengan sudut 18.5° di bawah ufuk. Hari ini Subuh dimulai pukul ${t}.`,
      },
      sunrise: {
        title: 'Syuruq (Terbit) & Isyraq di Makkah',
        tag: 'Waktu Syuruq & Isyraq',
        description: (t) =>
          `Matahari terbit pada pukul ${t}. Sholat dilarang saat terbit matahari hingga 15-20 menit kemudian, ketika waktu sholat sunnah Isyraq dimulai.`,
      },
      dhuhr: {
        title: 'Waktu Sholat Dzuhur Makkah',
        tag: 'Zawal (Tergelincir Matahari)',
        description: (t) =>
          `Dzuhur dimulai ketika matahari tergelincir dari titik kulminasi (zawal). Adzan Dzuhur di Masjidil Haram berkumandang tepat pukul ${t}.`,
      },
      asr: {
        title: 'Waktu Sholat Ashar Makkah',
        tag: 'Panjang Bayangan 1x',
        description: (t) =>
          `Ashar di Makkah mengikuti mazhab jumhur yang berlaku di Arab Saudi, dimulai saat panjang bayangan sama dengan bendanya (${t}).`,
      },
      maghrib: {
        title: 'Waktu Sholat Maghrib & Buka Puasa',
        tag: 'Terbenam Matahari / Buka Puasa',
        description: (t) =>
          `Maghrib masuk saat piringan matahari terbenam sempurna (${t}). Jamaah berpuasa berbuka puasa dengan kurma dan air Zamzam di Masjidil Haram.`,
      },
      isha: {
        title: 'Waktu Sholat Isya Makkah',
        tag: 'Standar 90 Menit Pasca Maghrib',
        description: (t) =>
          `Menurut kalender Ummul Qura, Isya di Makkah dimulai tepat 90 menit setelah Maghrib, yaitu pukul ${t} hari ini.`,
      },
    },
    faqHeading: 'Tanya Jawab Seputar Jadwal Sholat Makkah',
    faqs: (times) => [
      {
        q: 'Pukul berapa sholat Subuh di Makkah hari ini?',
        a: `Sholat Subuh di Makkah hari ini dimulai pukul ${times.fajr} berdasarkan metode resmi Ummul Qura (sudut 18.5°). Sholat berjamaah di Masjidil Haram dimulai sekitar 20 menit setelah adzan.`,
      },
      {
        q: 'Pukul berapa waktu Maghrib dan buka puasa di Makkah hari ini?',
        a: `Waktu Maghrib dan buka puasa di Makkah hari ini masuk pukul ${times.maghrib} tepat saat matahari terbenam.`,
      },
      {
        q: 'Apa keutamaan sholat di Masjidil Haram Makkah?',
        a: 'Rasulullah ﷺ bersabda: "Satu sholat di Masjidil Haram lebih utama daripada seratus ribu sholat di tempat lainnya." (HR. Ibnu Majah & Ahmad, Shahih).',
      },
      {
        q: 'Metode hisab apa yang digunakan untuk jadwal sholat Makkah?',
        a: 'Makkah menggunakan metode resmi Universitas Ummul Qura yang merupakan standar nasional Kerajaan Arab Saudi.',
      },
      {
        q: 'Mengapa waktu Isya di Makkah berjarak 90 menit setelah Maghrib?',
        a: 'Kalender Ummul Qura menetapkan jarak 90 menit untuk memastikan hilangnya syafaq ahmar (mega merah) sepanjang tahun di iklim Hijaz.',
      },
      {
        q: 'Ke mana arah kiblat di kota Makkah?',
        a: 'Di dalam kota Makkah, jamaah menghadap langsung ke arah bangunan fisik Ka’bah di dalam Masjidil Haram.',
      },
    ],
  },

  tr: {
    pageTitle: (f, d, a, m, i) => 'Mekke Namaz Vakitleri Bugün – Kabe & Mescid-i Haram Ezan Vakitleri',
    metaDescription: (f, d, a, m, i) =>
      `Mekke (Suudi Arabistan) için bugünkü doğru namaz vakitleri: İmsak/Sabah ${f}, Öğle ${d}, İkindi ${a}, Akşam ${m}, Yatsı ${i}. Ümmü'l-Kura takvimi, geri sayım ve aylık imsakiye.`,
    h1: 'Mekke Namaz Vakitleri Bugün',
    badge: 'Mekke-i Mükerreme, Suudi Arabistan · Ümmü’l-Kura Üniversitesi Standardı',
    subtitle:
      'Mekke-i Mükerreme ve Mescid-i Haram için günlük doğru namaz vakitleri, sıradaki vakit geri sayımı ve resmi Ümmü’l-Kura takvimine göre aylık namaz tablosu.',
    qiblaNote: 'Kıble: Doğrudan Kabe-i Muazzama Yönü',
    methodologyTitle: 'Resmi Ümmü’l-Kura Hesaplama Yöntemi:',
    methodologyText:
      'Mekke vakitleri, Kabe koordinatları (21.4225° K, 39.8262° D) ve Ümmü’l-Kura Üniversitesi takvimine göre hesaplanır. İmsak 18.5° güneş açısıyla, İkindi standart gölge boyuyla ve Yatsı Akşamdan 90 dakika sonra (Ramazan’da 120 dakika) hesaplanır.',
    monthlyHeading: (m) => `Mekke Aylık Namaz Vakitleri — ${m}`,
    monthlySubtitle: 'Mekke için İmsak, Güneş, Öğle, İkindi, Akşam ve Yatsı vakitlerini içeren tam imsakiye',
    understandingTitle: 'Mekke ve Mescid-i Haram’da Namaz Vakitlerinin Önemi',
    understandingParagraphs: [
      'Mekke-i Mükerreme namaz vakitleri, tüm dünyadaki Müslümanlar için manevi yönden en kıymetli vakitlerdir. Yeryüzündeki tüm Müslümanlar günde beş vakit Kabe-i Muazzama’ya yönelerek namazlarını eda ederler.',
      'Türkçe ve Orta Asya dillerinde "Namaz Vakitleri", Arapçada "Salah", Batı dillerinde "Prayer Times" olarak anılan bu vakitler, Allah Teala ve Resulü ﷺ tarafından bildirilen astronomik sınırlara dayanır.',
      'Kabe’den canlı yayınlanan ezan ve namazlar, hac ve umre ibadetini yapanlar ile dünya genelindeki Müslümanların namazlarını takip etmesine olanak tanır.',
    ],
    prayersHeading: 'Mekke’de Beş Vakit Namaz: Vakitler ve Astronomik Hesap',
    prayers: {
      fajr: {
        title: 'Mekke Sabah Namazı (İmsak)',
        tag: 'Fecr-i Sadık (18.5°)',
        description: (t) =>
          `Mekke’de imsak ve sabah namazı vakti, güneş ufkun 18.5° altına ulaştığında başlar. Bugün imsak ${t} vaktindedir.`,
      },
      sunrise: {
        title: 'Güneş Doğumu ve İşrak',
        tag: 'İşrak Başlangıcı',
        description: (t) =>
          `Güneşin doğuş anı ${t} vaktidir. Bu anda namaz kılmak mekruhtur; 15-20 dakika sonra faziletli İşrak namazı vakti başlar.`,
      },
      dhuhr: {
        title: 'Mekke Öğle Namazı Vakti',
        tag: 'Zeval Vakti',
        description: (t) =>
          `Öğle vakti güneşin zeval vaktini geçmesiyle başlar. Mescid-i Haram’da öğle ezanı bugün tam ${t} saatinde okunur.`,
      },
      asr: {
        title: 'Mekke İkindi Namazı Vakti',
        tag: 'Asr-ı Evvel (1x Gölge)',
        description: (t) =>
          `Suudi Arabistan’da ikindi vakti cumhur ulemanın kavline göre cisimlerin gölgesinin bir misline ulaşmasıyla başlar (${t}).`,
      },
      maghrib: {
        title: 'Mekke Akşam Namazı ve İftar',
        tag: 'Gün Batımı / İftar',
        description: (t) =>
          `Akşam vakti güneşin tamamen batmasıyla (${t}) başlar. Oruçlu Müslümanlar bu anda Kabe avlusunda hurma ve zemzem ile iftar eder.`,
      },
      isha: {
        title: 'Mekke Yatsı Namazı Vakti',
        tag: 'Akşamdan 90 Dk Sonra',
        description: (t) =>
          `Ümmü’l-Kura takvimine göre Mekke’de yatsı ezanı akşamdan tam 90 dakika sonra okunur, bugün ${t} saatindedir.`,
      },
    },
    faqHeading: 'Mekke Namaz Vakitleri Hakkında Sıkça Sorulan Sorular',
    faqs: (times) => [
      {
        q: 'Mekke’de bugün sabah namazı (imsak) saat kaçta?',
        a: `Mekke’de bugün imsak vakti ${times.fajr} olarak hesaplanmıştır. Mescid-i Haram’da cemaatle namaz ezandan yaklaşık 20 dakika sonra kılınır.`,
      },
      {
        q: 'Mekke’de akşam namazı ve iftar vakti ne zaman?',
        a: `Mekke’de bugün akşam ezanı ve iftar vakti tam gün batımında, yani saat ${times.maghrib} vaktindedir.`,
      },
      {
        q: 'Mescid-i Haram’da namaz kılmanın fazileti nedir?',
        a: 'Peygamber Efendimiz ﷺ şöyle buyurmuştur: "Mescid-i Haram’da kılınan bir namaz, diğer mescitlerde kılınan yüz bin namazdan daha faziletlidir." (İbn Mace, Sahih).',
      },
      {
        q: 'Mekke namaz vakitleri hangi takvime göre hesaplanır?',
        a: 'Mekke-i Mükerreme vakitleri Suudi Arabistan’ın resmi standardı olan Ümmü’l-Kura Üniversitesi takvimine göre belirlenir.',
      },
      {
        q: 'Mekke’de yatsı namazı neden akşamdan 90 dakika sonradır?',
        a: 'Ümmü’l-Kura takviminde kırmızı şafağın kayboluşunu garanti etmek için tüm mevsimlerde 90 dakikalık sabit aralık benimsenmiştir.',
      },
      {
        q: 'Mekke’de kıble yönü nasıldır?',
        a: 'Mekke şehri sınırları içinde kıble doğrudan Mescid-i Haram içerisindeki Kabe-i Muazzama binasıdır.',
      },
    ],
  },

  bn: {
    pageTitle: (f, d, a, m, i) => 'মক্কার নামাজের সময়সূচি আজ – কাবার আজান ও নামাজের সময়',
    metaDescription: (f, d, a, m, i) =>
      `মক্কা মুকাররমা (সৌদি আরব) এর আজকের সঠিক নামাজের সময়: ফজর ${f}, যোহর ${d}, আসর ${a}, মাগরিব ${m}, এশা ${i}। উম্মুল কুরা ক্যালেন্ডার, লাইভ কাউন্টডাউন ও মাসিক সময়সূচি।`,
    h1: 'মক্কায় নামাজের সময়সূচি আজ',
    badge: 'মক্কা মুকাররমা, সৌদি আরব · উম্মুল কুরা বিশ্ববিদ্যালয় মানদণ্ড',
    subtitle:
      'মক্কা মুকাররমা ও মসজিদুল হারামের জন্য আজকের নামাজের সঠিক সময়, পরবর্তী নামাজের লাইভ কাউন্টডাউন এবং মাসিক ক্যালেন্ডার।',
    qiblaNote: 'কিবলা: সরাসরি পবিত্র কাবা শরিফের দিক',
    methodologyTitle: 'উম্মুল কুরা গণনা পদ্ধতি:',
    methodologyText:
      'মক্কার নামাজের সময় পবিত্র কাবার ভৌগোলিক অবস্থান (21.4225° N, 39.8262° E) এবং উম্মুল কুরা বিশ্ববিদ্যালয়ের ক্যালেন্ডার অনুযায়ী নির্ধারিত হয়। ফজর ১৮.৫° কোণে, আসর ১ গুণ ছায়ায় এবং এশা মাগরিবের ৯০ মিনিট পর অনুষ্ঠিত হয়।',
    monthlyHeading: (m) => `মক্কার মাসিক নামাজের সময়সূচি — ${m}`,
    monthlySubtitle: 'মক্কার ফজর, সূর্যোদয়, যোহর, আসর, মাগরিব ও এশার পূর্ণাঙ্গ মাসিক সময়সূচি',
    understandingTitle: 'মক্কা ও মসজিদুল হারামে নামাজের তাৎপর্য',
    understandingParagraphs: [
      'মক্কা মুকাররমার নামাজের সময়সূচি সমগ্র বিশ্বের মুসলিম উম্মাহর জন্য অত্যন্ত গুরুত্বপূর্ণ। সারা বিশ্বের মুসলমানরা প্রতিদিন পাঁচবার কাবার দিকে মুখ করে সালাত আদায় করেন।',
      'বাংলা ও অন্যান্য অঞ্চলে একে নামাজের সময় বলা হয়, আরবিতে সালাত এবং ইংরেজিতে Prayer Times। এই প্রতিটি সময় আল্লাহর নির্ধারিত সুনির্দিষ্ট জ্যোতির্বৈজ্ঞানিক নিয়মের অধীন।',
      'মসজিদুল হারাম থেকে প্রতিটি নামাজের আজান ও জামাত বিশ্বজুড়ে সরাসরি সম্প্রচার করা হয়। বিশ্বের নানা প্রান্তের হাজী এবং মুসলমানরা এর ওপর নির্ভর করেন।',
    ],
    prayersHeading: 'মক্কার পাঁচ ওয়াক্ত নামাজ: সময় ও জ্যোতির্বৈজ্ঞানিক গণনা',
    prayers: {
      fajr: {
        title: 'ফজর নামাজের সময় মক্কা',
        tag: 'সুবহে সাদিক (১৮.৫°)',
        description: (t) =>
          `মক্কায় সুবহে সাদিকের মাধ্যমে ফজর শুরু হয় যখন সূর্য দিগন্তের ১৮.৫° নিচে থাকে। আজ ফজর শুরু হয় ${t} মিনিটে।`,
      },
      sunrise: {
        title: 'সূর্যোদয় ও ইশরাক',
        tag: 'ইশরাক শুরু',
        description: (t) =>
          `সূর্যোদয়ের সময় (${t}) নামাজ পড়া নিষেধ (মাকরুহ)। সূর্যোদয়ের ১৫-২০ মিনিট পর নফল ইশরাক নামাজের সময় শুরু হয়।`,
      },
      dhuhr: {
        title: 'যোহর নামাজের সময় মক্কা',
        tag: 'সূর্য হেলে পড়া (জাওয়াল)',
        description: (t) =>
          `দুপুরে সূর্য পশ্চিমাকাশে ঢলে পড়ার সাথে সাথে যোহর শুরু হয়। মসজিদুল হারামে আজ যোহরের আজান হয় ${t} মিনিটে।`,
      },
      asr: {
        title: 'আসর নামাজের সময় মক্কা',
        tag: 'ছায়া ১ গুণ',
        description: (t) =>
          `সৌদি আরবে প্রচলিত নিয়ম অনুসারে কোনো বস্তুর ছায়া তার সমান হলে আসর শুরু হয়, যা আজ ${t} মিনিটে।`,
      },
      maghrib: {
        title: 'মাগরিব নামাজ ও ইফতার',
        tag: 'সূর্যাস্ত / ইফতার',
        description: (t) =>
          `সূর্য পুরোপুরি অস্ত যাওয়ার সাথে সাথে ${t} মিনিটে মাগরিব ও ইফতার শুরু হয়। মুসল্লিরা জমজম ও খেজুর দিয়ে ইফতার করেন।`,
      },
      isha: {
        title: 'এশা নামাজের সময় মক্কা',
        tag: 'মাগরিবের ৯০ মিনিট পর',
        description: (t) =>
          `উম্মুল কুরা নিয়মে মাগরিবের ঠিক ৯০ মিনিট পর এশার আজান দেওয়া হয়, যা আজ রাত ${t} মিনিটে।`,
      },
    },
    faqHeading: 'মক্কার নামাজের সময় সম্পর্কিত সাধারণ প্রশ্নোত্তর',
    faqs: (times) => [
      {
        q: 'মক্কায় আজ ফজরের নামাজের সময় কখন?',
        a: `মক্কায় আজ ফজরের সময় শুরু হয় ভোর ${times.fajr} মিনিটে। মসজিদুল হারামে আজানের প্রায় ২০ মিনিট পর জামাত অনুষ্ঠিত হয়।`,
      },
      {
        q: 'মক্কায় আজ মাগরিব ও ইফতারের সময় কখন?',
        a: `মক্কায় আজ মাগরিব ও ইফতারের সময় সূর্যাস্তের সাথে সাথে অর্থাৎ ঠিক ${times.maghrib} মিনিটে।`,
      },
      {
        q: 'মসজিদুল হারামে নামাজ পড়ার সওয়াব কত?',
        a: 'রাসুলুল্লাহ ﷺ বলেছেন: "মসজিদুল হারামে এক রাকাত নামাজ অন্য যেকোনো মসজিদের চেয়ে এক লক্ষ গুণ বেশি সওয়াবপূর্ণ।" (ইবনে মাজাহ, সহিহ)।',
      },
      {
        q: 'মক্কায় কোন হিসাব পদ্ধতি অনুসরণ করা হয়?',
        a: 'মক্কা মুকাররমায় সৌদি আরবের জাতীয় মানদণ্ড উম্মুল কুরা বিশ্ববিদ্যালয়ের হিসাব পদ্ধতি অনুসরণ করা হয়।',
      },
      {
        q: 'মক্কায় এশার নামাজ মাগরিবের ৯০ মিনিট পর কেন হয়?',
        a: 'উম্মুল কুরা পদ্ধতিতে সান্ধ্যকালীন রক্তিম আভা (শাফাকুল আহমার) সম্পূর্ণরূপে অন্তর্হিত হওয়ার নিশ্চয়তার জন্য ৯০ মিনিট নির্ধারিত।',
      },
      {
        q: 'মক্কায় কিবলার দিক কোনটি?',
        a: 'মক্কা নগরীর ভেতরে মুসল্লিরা সরাসরি মসজিদুল হারামের কাবা শরিফের দিকে মুখ করে নামাজ আদায় করেন।',
      },
    ],
  },

  fr: {
    pageTitle: (f, d, a, m, i) => 'Heures de Prière à La Mecque Aujourd’hui – Horaires Makkah & Masjid al-Haram',
    metaDescription: (f, d, a, m, i) =>
      `Horaires précis de prière à La Mecque (Makkah), Arabie Saoudite aujourd'hui: Fajr ${f}, Dhuhr ${d}, Asr ${a}, Maghrib ${m}, Isha ${i}. Calendrier officiel Umm al-Qura & compte à rebours en direct.`,
    h1: 'Heures de Prière à La Mecque Aujourd’hui',
    badge: 'La Mecque (Makkah), Arabie Saoudite · Norme Université Umm al-Qura',
    subtitle:
      'Horaires de prière islamique quotidiens précis, compte à rebours en direct et calendrier mensuel pour Makkah al-Mukarramah basés sur le calendrier officiel Umm al-Qura pour Masjid al-Haram.',
    qiblaNote: 'Qibla: Directement vers la Sainte Kaaba',
    methodologyTitle: 'Méthode Officielle Umm al-Qura:',
    methodologyText:
      'Les horaires pour La Mecque sont calculés selon les coordonnées de la Kaaba (21.4225° N, 39.8262° E) et le calendrier officiel de l’Université Umm al-Qura. Le Fajr est calculé avec un angle de 18.5°, le Asr avec un facteur d’ombre de 1x et l’Isha 90 minutes après le Maghrib (120 minutes pendant le Ramadan).',
    monthlyHeading: (m) => `Horaires Mensuels des Prières à La Mecque — ${m}`,
    monthlySubtitle: 'Horaires complets du Fajr, Lever du soleil, Dhuhr, Asr, Maghrib et Isha pour La Mecque',
    understandingTitle: 'Comprendre les Horaires de Prière à La Mecque et Masjid al-Haram',
    understandingParagraphs: [
      'Les horaires de prière pour la ville sainte de La Mecque (Makkah al-Mukarramah) comptent parmi les plus observés et vénérés au monde. Plus de deux milliards de musulmans se tournent directement vers la Sainte Kaaba cinq fois par jour.',
      'Dans différentes traditions linguistiques, ces temps sacrés sont appelés Salah en arabe, Namaz en Asie centrale et du Sud, et heures de prière en français. Tous désignent les intervalles astronomiques précis ordonnés par la loi divine.',
      'Depuis Masjid al-Haram, les appels à la prière et les offices sont retransmis en direct par satellite dans le monde entier. Les pèlerins accomplissant le Hajj ou la Omra s’y réfèrent quotidiennement.',
    ],
    prayersHeading: 'Les Cinq Prières Quotidiennes à La Mecque: Horaires et Calcul',
    prayers: {
      fajr: {
        title: 'Heure du Fajr à La Mecque (Prière de l’Aube)',
        tag: 'Aube Astronomique (18.5°)',
        description: (t) =>
          `Le Fajr à La Mecque débute à l'aube véritable (al-Fajr al-Sadiq) lorsque le soleil atteint 18.5° sous l'horizon. Aujourd'hui, le Fajr commence à ${t}.`,
      },
      sunrise: {
        title: 'Lever du Soleil (Chourouk) & Ishraq',
        tag: 'Début d’Ishraq',
        description: (t) =>
          `Le soleil se lève à ${t}. La prière rituelle est déconseillée pendant le lever du soleil ; 15 à 20 minutes après commence la prière surérogatoire d'Ishraq.`,
      },
      dhuhr: {
        title: 'Heure du Dhuhr à La Mecque (Midi)',
        tag: 'Zénith (Zawal)',
        description: (t) =>
          `Le Dhuhr débute lorsque le soleil quitte le zénith céleste (Zawal). L'Adhan résonne à Masjid al-Haram à ${t}.`,
      },
      asr: {
        title: 'Heure de l’Asr à La Mecque (Après-midi)',
        tag: 'Ombre 1x',
        description: (t) =>
          `L'Asr suit la méthode de la majorité en Arabie Saoudite, débutant lorsque l'ombre d'un objet égale sa taille (${t}).`,
      },
      maghrib: {
        title: 'Heure du Maghrib et Iftar à La Mecque',
        tag: 'Coucher du Soleil / Iftar',
        description: (t) =>
          `Le Maghrib commence à la disparition complète du disque solaire (${t}). Les fidèles rompent leur jeûne avec des dattes et de l'eau de Zamzam.`,
      },
      isha: {
        title: 'Heure de l’Isha à La Mecque (Nuit)',
        tag: '+90m après Maghrib',
        description: (t) =>
          `Selon le calendrier Umm al-Qura, l'Isha est fixé exactement 90 minutes après le Maghrib, commençant ce soir à ${t}.`,
      },
    },
    faqHeading: 'Foire Aux Questions sur les Horaires à La Mecque',
    faqs: (times) => [
      {
        q: 'À quelle heure est la prière du Fajr à La Mecque aujourd’hui ?',
        a: `Le Fajr à La Mecque aujourd'hui débute à ${times.fajr} (aube astronomique) selon la méthode officielle d’Umm al-Qura (angle de 18.5°). La prière en congrégation à Masjid al-Haram a lieu environ 20 minutes après l'appel.`,
      },
      {
        q: 'À quelle heure sont le Maghrib et l’Iftar à La Mecque aujourd’hui ?',
        a: `Le Maghrib et l'Iftar à La Mecque débutent à ${times.maghrib} au coucher précis du soleil.`,
      },
      {
        q: 'Quel est le mérite de prier à Masjid al-Haram à La Mecque ?',
        a: 'Le Prophète Muhammad ﷺ a dit : "Une prière dans la Mosquée sacrée (Masjid al-Haram) est meilleure que cent mille prières ailleurs." (Rapporté par Ibn Majah et Ahmad).',
      },
      {
        q: 'Quelle méthode de calcul est utilisée pour La Mecque ?',
        a: 'La Mecque applique le calendrier officiel de l’Université Umm al-Qura, qui constitue la norme nationale du Royaume d’Arabie Saoudite.',
      },
      {
        q: 'Pourquoi l’Isha est-il fixé 90 minutes après le Maghrib ?',
        a: 'Le calendrier Umm al-Qura prévoit un intervalle fixe de 90 minutes pour garantir la disparition totale du crépuscule rouge (Chafaq Ahmar).',
      },
      {
        q: 'Quelle est la direction de la Qibla à La Mecque ?',
        a: 'À La Mecque, les fidèles se tournent directement vers la structure physique de la Kaaba au sein de Masjid al-Haram.',
      },
    ],
  },
};

export const MADINAH_LOCALIZED_CONTENT: Record<SupportedLanguage, SanctuaryPageContent> = {
  en: {
    pageTitle: (f, d, a, m, i) => 'Prayer Times in Madinah Today – Salah & Namaz Schedule | Prayerstime',
    metaDescription: (f, d, a, m, i) =>
      `Accurate today's prayer times in Madinah (Medina), Saudi Arabia: Fajr ${f}, Sunrise, Dhuhr ${d}, Asr ${a}, Maghrib ${m}, Isha ${i}. Official Umm al-Qura timetable, live countdown & monthly schedule.`,
    h1: 'Prayer Times in Madinah Today',
    badge: 'Al-Madinah al-Munawwarah · Al-Masjid an-Nabawi Standard',
    subtitle:
      'Accurate daily Islamic prayer times, live next-prayer countdown, and monthly timetable for Al-Madinah al-Munawwarah. Calculated using the official Umm al-Qura calendar for Al-Masjid an-Nabawi (The Prophet’s Mosque).',
    qiblaNote: 'Qibla: 176.6° South toward the Holy Kaaba in Makkah',
    methodologyTitle: 'Official Umm al-Qura Method for Al-Madinah:',
    methodologyText:
      'Times for Al-Madinah are calculated using the precise coordinates of the Prophet’s Mosque (24.4672° N, 39.6111° E) in accordance with the Umm al-Qura University calendar. Fajr begins at an 18.5° solar depression angle, Asr is set at 1x shadow factor, and Isha starts 90 minutes after Maghrib (120 minutes in Ramadan).',
    monthlyHeading: (m) => `Monthly Madinah Prayer Timetable — ${m}`,
    monthlySubtitle: 'Complete Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha timetable for Madinah',
    understandingTitle: 'Understanding Madinah Prayer Times & Al-Masjid an-Nabawi',
    understandingParagraphs: [
      'Al-Madinah al-Munawwarah holds a deeply revered place in the hearts of Muslims as the city of the Prophet Muhammad ﷺ. Performing Salah in Al-Masjid an-Nabawi carries immense spiritual blessings.',
      'Whether referred to as Madinah prayer times, Madinah namaz timing, or Salah schedule, believers look to the sacred adhan sounding from the minarets of the Prophet’s Mosque to structure their day in worship.',
      'Pilgrims visiting the Prophet’s Mosque and the Rawdah ash-Sharifah observe this official timetable, which is synchronized with the Kingdom’s national Islamic standards.',
    ],
    prayersHeading: 'The Five Daily Prayers in Madinah: Timetable & Calculation',
    prayers: {
      fajr: {
        title: 'Fajr Time Madinah (Dawn Prayer)',
        tag: 'Dawn (18.5°)',
        description: (t) =>
          `Fajr in Madinah begins at true astronomical dawn when light spreads across the eastern sky over the volcanic plains of Madinah (${t}).`,
      },
      sunrise: {
        title: 'Sunrise (Shuruq) & Ishraq in Madinah',
        tag: 'Sunrise / Ishraq',
        description: (t) =>
          `Sunrise occurs at ${t}. Approximately 15-20 minutes later, the voluntary Ishraq prayer begins.`,
      },
      dhuhr: {
        title: 'Dhuhr Time Madinah (Midday Prayer)',
        tag: 'Zawal (Zenith)',
        description: (t) =>
          `Dhuhr begins when the sun passes the meridian. The adhan in Al-Masjid an-Nabawi is proclaimed at ${t}.`,
      },
      asr: {
        title: 'Asr Time Madinah (Afternoon Prayer)',
        tag: 'Shadow 1x',
        description: (t) =>
          `Asr in Madinah starts when an object’s shadow equals its length, commencing today at ${t}.`,
      },
      maghrib: {
        title: 'Maghrib Time Madinah (Sunset & Iftar)',
        tag: 'Sunset / Iftar',
        description: (t) =>
          `Maghrib begins at sunset (${t}), when fasting worshippers break their fast with dates and water in the Prophet’s Mosque.`,
      },
      isha: {
        title: 'Isha Time Madinah (Night Prayer)',
        tag: '+90m standard',
        description: (t) =>
          `Under Umm al-Qura rules, Isha begins 90 minutes after Maghrib, commencing today at ${t}.`,
      },
    },
    faqHeading: 'Frequently Asked Questions About Madinah Prayer Times',
    faqs: (times) => [
      {
        q: 'What time is Fajr prayer in Madinah today?',
        a: `Fajr prayer in Madinah today starts at ${times.fajr} (astronomical dawn), calculated at an 18.5° solar depression angle under the Umm al-Qura University methodology.`,
      },
      {
        q: 'What time is Maghrib and Iftar in Madinah today?',
        a: `Maghrib prayer in Madinah today begins at ${times.maghrib} at astronomical sunset. Fasting pilgrims break their fast at this moment.`,
      },
      {
        q: 'What is the reward for praying in Al-Masjid an-Nabawi in Madinah?',
        a: 'The Prophet Muhammad ﷺ said: "One prayer in this Mosque of mine is better than a thousand prayers anywhere else, except the Sacred Mosque (in Makkah)." (Sahih al-Bukhari 1190).',
      },
      {
        q: 'What is the Rawdah ash-Sharifah and its virtue?',
        a: 'The Prophet ﷺ said: "Between my house and my pulpit is a garden from the gardens of Paradise." (Sahih al-Bukhari 1196).',
      },
      {
        q: 'Which calculation method is followed for Madinah prayer times?',
        a: 'Madinah follows the official Umm al-Qura University methodology, observed by the Imams and Muadhins of Al-Masjid an-Nabawi.',
      },
      {
        q: 'What time is Isha prayer in Madinah?',
        a: `Isha prayer in Madinah today begins at ${times.isha} (90 minutes after Maghrib).`,
      },
      {
        q: 'What is the Qibla direction from Madinah?',
        a: 'The Qibla direction from Madinah points almost directly South at 176.6° toward the Holy Kaaba in Makkah.',
      },
      {
        q: 'What is the virtue of praying in Masjid Quba in Madinah?',
        a: 'The Prophet ﷺ stated: "Whoever purifies himself in his house, then comes to the Mosque of Quba and prays two rak`ahs in it, will have a reward like that of an Umrah." (Sunan Ibn Majah 1412, Sahih).',
      },
    ],
  },

  ar: {
    pageTitle: (f, d, a, m, i) => 'مواقيت الصلاة في المدينة المنورة اليوم – مواعيد الأذان والمسجد النبوي',
    metaDescription: (f, d, a, m, i) =>
      `مواقيت الصلاة الدقيقة اليوم في المدينة المنورة: الفجر ${f}، الظهر ${d}، العصر ${a}، المغرب ${m}، العشاء ${i}. تقويم أم القرى الرسمي، عداد الصلاة القادمة والجدول الشهري.`,
    h1: 'مواقيت الصلاة في المدينة المنورة اليوم',
    badge: 'المدينة المنورة · معيار المسجد النبوي الشريف',
    subtitle:
      'مواقيت الصلاة الإسلامية اليومية بدقة، والعد التنازلي المباشر، والجدول الشهري للمدينة المنورة ومسجد رسول الله ﷺ وفق تقويم أم القرى الرسمي.',
    qiblaNote: 'القبلة: 176.6° جنوباً باتجاه الكعبة المشرفة بمكة المكرمة',
    methodologyTitle: 'طريقة الحساب الرسمية للمدينة المنورة:',
    methodologyText:
      'تُحسب مواقيت المدينة المنورة وفق إحداثيات المسجد النبوي الشريف (24.4672° شمالاً، 39.6111° شرقاً) وفق تقويم جامعة أم القرى. زاوية الفجر 18.5 درجة، والعصر ظل المثل، والعشاء بعد 90 دقيقة من المغرب.',
    monthlyHeading: (m) => `جدول مواقيت الصلاة لشهر ${m} في المدينة المنورة`,
    monthlySubtitle: 'مواعيد الفجر والشروق والظهر والعصر والمغرب والعشاء في المدينة المنورة',
    understandingTitle: 'مكانة وفضل الصلاة في المدينة المنورة والمسجد النبوي',
    understandingParagraphs: [
      'تحتل المدينة المنورة مكانة خاصة في قلوب المسلمين باعتبارها دار الهجرة النبوية الشريفة. وللصلاة في المسجد النبوي فضل عظيم وأجر مضاعف.',
      'يتابع الزوار والمعتمرون أذان المسجد النبوي الشريف الشجي لمعرفة أوقات الصلوات والتقرب إلى الله في الروضة الشريفة.',
      'تتوافق مواقيت المدينة المنورة مع التقويم الوطني المعتمد بالمملكة العربية السعودية لضمان دقة العبادات.',
    ],
    prayersHeading: 'مواقيت الصلوات الخمس في المدينة المنورة',
    prayers: {
      fajr: {
        title: 'صلاة الفجر في المدينة المنورة',
        tag: 'الفجر الصادق (18.5°)',
        description: (t) =>
          `يبدأ وقت الفجر عند طلوع الفجر الصادق بزاوية 18.5 درجة تحت الأفق، ويبدأ اليوم عند الساعة ${t}.`,
      },
      sunrise: {
        title: 'شروق الشمس والإشراق',
        tag: 'وقت الشروق',
        description: (t) =>
          `تشرق الشمس في المدينة المنورة اليوم عند ${t}، وتبدأ صلاة الإشراق بعدها بربع ساعة.`,
      },
      dhuhr: {
        title: 'صلاة الظهر في المدينة المنورة',
        tag: 'زوال الشمس',
        description: (t) =>
          `يبدأ الظهر بزوال الشمس عن وسط السماء، ويؤذن له في المسجد النبوي عند الساعة ${t}.`,
      },
      asr: {
        title: 'صلاة العصر في المدينة المنورة',
        tag: 'ظل المثل الواحد',
        description: (t) =>
          `يبدأ وقت العصر عند صيرورة ظل الشيء مثله، وموعده اليوم عند الساعة ${t}.`,
      },
      maghrib: {
        title: 'صلاة المغرب والإفطار',
        tag: 'غروب الشمس',
        description: (t) =>
          `يبدأ وقت المغرب والإفطار عند غروب قرص الشمس كاملاً عند الساعة ${t}.`,
      },
      isha: {
        title: 'صلاة العشاء في المدينة المنورة',
        tag: 'بعد المغرب بـ 90 دقيقة',
        description: (t) =>
          `يؤذن للعشاء بعد 90 دقيقة من المغرب وفق تقويم أم القرى، وذلك عند الساعة ${t}.`,
      },
    },
    faqHeading: 'الأسئلة الشائعة حول مواقيت الصلاة في المدينة المنورة',
    faqs: (times) => [
      {
        q: 'كم الساعة صلاة الفجر في المدينة المنورة اليوم؟',
        a: `يبدأ أذان الفجر في المدينة المنورة اليوم عند الساعة ${times.fajr} وفق تقويم أم القرى.`,
      },
      {
        q: 'متى وقت صلاة المغرب والإفطار في المدينة المنورة اليوم؟',
        a: `يبدأ وقت صلاة المغرب والإفطار في المدينة المنورة اليوم عند الساعة ${times.maghrib}.`,
      },
      {
        q: 'ما هو فضل الصلاة في المسجد النبوي الشريف؟',
        a: 'قال النبي ﷺ: "صلاة في مسجدي هذا خير من ألف صلاة فيما سواه إلا المسجد الحرام" (صحيح البخاري).',
      },
      {
        q: 'ما هو فضل الروضة الشريفة في المسجد النبوي؟',
        a: 'قال رسول الله ﷺ: "ما بين بيتي ومنبري روضة من رياض الجنة" (صحيح البخاري ومسلم).',
      },
      {
        q: 'ما هي طريقة الحساب المعتمدة في المدينة المنورة؟',
        a: 'تعتمد المدينة تقويم أم القرى المعتمد في المملكة العربية السعودية.',
      },
      {
        q: 'متى موعد صلاة العشاء في المدينة المنورة؟',
        a: `يبدأ وقت صلاة العشاء اليوم في تمام الساعة ${times.isha}.`,
      },
      {
        q: 'ما هو اتجاه القبلة من المدينة المنورة؟',
        a: 'اتجاه القبلة من المدينة المنورة هو نحو الجنوب تماماً بزاوية 176.6 درجة باتجاه مكة المكرمة.',
      },
      {
        q: 'ما فضل الصلاة في مسجد قباء بالمدينة المنورة؟',
        a: 'قال النبي ﷺ: "من تطهر في بيته ثم أتى مسجد قباء فصلى فيه صلاة كان له كأجر عمرة" (صحيح ابن ماجه).',
      },
    ],
  },

  ur: {
    pageTitle: (f, d, a, m, i) => 'مدینہ منورہ میں آج نماز کے اوقات – مسجد نبوی ٹائم ٹیبل',
    metaDescription: (f, d, a, m, i) =>
      `مدینہ منورہ میں آج کے مستند اوقات نماز: فجر ${f}، ظہر ${d}، عصر ${a}، مغرب ${m}، عشاء ${i}۔ ام القریٰ کیلنڈر، لائیو کاؤنٹ ڈاؤن اور ماہانہ شیڈول۔`,
    h1: 'مدینہ منورہ میں نماز کے اوقات آج',
    badge: 'مدینہ منورہ · مسجد نبوی ﷺ معیار',
    subtitle:
      'مدینہ منورہ اور مسجد نبوی کے لیے روزانہ کے مستند اسلامی اوقات نماز، لائیو کاؤنٹ ڈاؤن اور مکمل ماہانہ ٹائم ٹیبل۔',
    qiblaNote: 'قبلہ رخ: 176.6° جنوب خانہ کعبہ کی سمت',
    methodologyTitle: 'مدینہ منورہ کے لیے ام القریٰ طریقہ کار:',
    methodologyText:
      'مدینہ منورہ کے اوقات مسجد نبوی کے نقاط (24.4672° N, 39.6111° E) اور ام القریٰ یونیورسٹی کے مطابق مرتب کیے جاتے ہیں۔',
    monthlyHeading: (m) => `مدینہ منورہ ماہانہ ٹائم ٹیبل — ${m}`,
    monthlySubtitle: 'مدینہ منورہ کے لیے فجر، طلوع، ظہر، عصر، مغرب اور عشاء کا مکمل شیڈول',
    understandingTitle: 'مدینہ منورہ اور مسجد نبوی میں نماز کی فضیلت',
    understandingParagraphs: [
      'مدینہ منورہ نبی کریم ﷺ کا مبارک شہر ہے۔ مسجد نبوی میں نماز ادا کرنا بے شمار برکتوں اور فضیلت کا حامل ہے۔',
      'حجاج، زائرین اور دنیا بھر کے مسلمان مسجد نبوی کے اوقات کے مطابق اپنے معمولات عبادات طے کرتے ہیں۔',
    ],
    prayersHeading: 'مدینہ منورہ کے پانچوں نمازوں کے اوقات',
    prayers: {
      fajr: {
        title: 'نماز فجر مدینہ منورہ',
        tag: 'صبح صادق (18.5°)',
        description: (t) => `مدینہ میں فجر کا وقت ${t} پر شروع ہوتا ہے۔`,
      },
      sunrise: {
        title: 'طلوع آفتاب و اشراق',
        tag: 'طلوع آفتاب',
        description: (t) => `مدینہ میں طلوع آفتاب ${t} پر ہوتا ہے۔`,
      },
      dhuhr: {
        title: 'نماز ظہر مدینہ منورہ',
        tag: 'زوال آفتاب',
        description: (t) => `مسجد نبوی میں ظہر کی اذان ${t} پر ہوتی ہے۔`,
      },
      asr: {
        title: 'نماز عصر مدینہ منورہ',
        tag: 'ایک مثل سایہ',
        description: (t) => `مدینہ میں عصر کا وقت ${t} پر شروع ہوتا ہے۔`,
      },
      maghrib: {
        title: 'نماز مغرب و افطار',
        tag: 'غروب آفتاب / افطار',
        description: (t) => `مغرب اور افطار کا وقت ٹھیک ${t} پر ہے۔`,
      },
      isha: {
        title: 'نماز عشاء مدینہ منورہ',
        tag: 'مغرب کے 90 منٹ بعد',
        description: (t) => `مدینہ میں عشاء کا وقت رات ${t} پر ہے۔`,
      },
    },
    faqHeading: 'مدینہ منورہ کے اوقات کے بارے میں اہم سوالات',
    faqs: (times) => [
      {
        q: 'مدینہ منورہ میں آج فجر کا وقت کیا ہے؟',
        a: `مدینہ منورہ میں آج فجر کا وقت ${times.fajr} پر شروع ہوتا ہے۔`,
      },
      {
        q: 'مدینہ میں مغرب اور افطار کا وقت کیا ہے؟',
        a: `مدینہ میں آج مغرب اور افطار کا وقت ${times.maghrib} پر ہے۔`,
      },
      {
        q: 'مسجد نبوی میں نماز کا کیا ثواب ہے؟',
        a: 'رسول اللہ ﷺ نے فرمایا: "میری اس مسجد میں ایک نماز دوسری مساجد کی ہزار نمازوں سے بہتر ہے سوائے مسجد حرام کے" (صحیح بخاری)۔',
      },
      {
        q: 'روضۂ رسول ﷺ اور ریاض الجنہ کی کیا فضیلت ہے؟',
        a: 'آپ ﷺ نے فرمایا: "میرے گھر اور منبر کے درمیان کا حصہ جنت کے باغوں میں سے ایک باغ ہے" (صحیح بخاری)۔',
      },
      {
        q: 'مدینہ منورہ میں کون سا طریقہ کار رائج ہے؟',
        a: 'سعودی عرب کا سرکاری ام القریٰ کیلنڈر رائج ہے۔',
      },
      {
        q: 'مدینہ میں عشاء کا وقت کیا ہے؟',
        a: `عشاء کا وقت رات ${times.isha} پر ہے۔`,
      },
      {
        q: 'مدینہ منورہ سے قبلہ کس سمت ہے؟',
        a: 'مدینہ سے قبلہ رخ جنوب کی جانب 176.6 ڈگری پر مکہ مکرمہ کی طرف ہے۔',
      },
      {
        q: 'مسجد قبا میں نماز کا کیا ثواب ہے؟',
        a: 'نبی ﷺ نے فرمایا: "جو شخص اپنے گھر میں وضو کرے پھر مسجد قبا جا کر دو رکعت نماز پڑھے، اسے ایک عمرہ کے برابر ثواب ملتا ہے" (ابن ماجہ)۔',
      },
    ],
  },

  hi: {
    pageTitle: (f, d, a, m, i) => 'मदीना में नमाज़ का समय आज – मस्जिद नबवी नमाज़ टाइम टेबल',
    metaDescription: (f, d, a, m, i) =>
      `मदीना (सऊदी अरब) में आज के सही नमाज़ के औक़ात: फ़ज्र ${f}, ज़ुहर ${d}, अस्र ${a}, मग़रिब ${m}, इशा ${i}। उम्म अल-क़ुरा कैलेंडर और लाइव काउंटडाउन।`,
    h1: 'मदीना में नमाज़ का समय आज',
    badge: 'मदीना मुनव्वरा · मस्जिद नबवी मानक',
    subtitle:
      'मदीना मुनव्वरा और मस्जिद-ए-नबवी ﷺ के लिए आज के सटीक नमाज़ के औक़ात और मासिक कैलेंडर।',
    qiblaNote: 'क़िबला: 176.6° दक्षिण मक्का शरीफ़ की ओर',
    methodologyTitle: 'मदीना गणना पद्धति:',
    methodologyText:
      'मदीना के औक़ात मस्जिद नबवी के निर्देशांक (24.4672° N, 39.6111° E) और उम्म अल-क़ुरा कैलेंडर के अनुसार निर्धारित होते हैं।',
    monthlyHeading: (m) => `मदीना मासिक नमाज़ टाइम टेबल — ${m}`,
    monthlySubtitle: 'मदीना के लिए फ़ज्र, सूर्योदय, ज़ुहर, अस्र, मग़रिब और इशा का पूरा टाइम टेबल',
    understandingTitle: 'मदीना मुनव्वरा और मस्जिद नबवी में नमाज़ का महत्व',
    understandingParagraphs: [
      'मदीना मुनव्वरा प्यारे नबी ﷺ का शहर है। यहाँ मस्जिद-ए-नबवी में नमाज़ अदा करना बेहद अफ़ज़ल और सवाब का काम है।',
      'जायरीन और मुसलमान मस्जिद नबवी के अज़ान के समय के अनुसार अपनी इबादत तय करते हैं।',
    ],
    prayersHeading: 'मदीना में पाँच नमाज़ों के समय',
    prayers: {
      fajr: {
        title: 'फ़ज्र नमाज़ का समय मदीना',
        tag: 'सुबह सादिक (18.5°)',
        description: (t) => `मदीना में फ़ज्र का समय आज ${t} पर शुरू होता है।`,
      },
      sunrise: {
        title: 'सूर्योदय व इशराक़',
        tag: 'सूर्योदय',
        description: (t) => `मदीना में सूर्योदय ${t} पर होता है।`,
      },
      dhuhr: {
        title: 'ज़ुहर नमाज़ का समय मदीना',
        tag: 'ज़वाल (दोपहर)',
        description: (t) => `मस्जिद नबवी में ज़ुहर की अज़ान ${t} पर होती है।`,
      },
      asr: {
        title: 'अस्र नमाज़ का समय मदीना',
        tag: '1x परछाई',
        description: (t) => `मदीना में अस्र का समय ${t} पर शुरू होता है।`,
      },
      maghrib: {
        title: 'मग़रिब नमाज़ व इफ़्तार',
        tag: 'सूर्यास्त / इफ़्तार',
        description: (t) => `मग़रिब और इफ़्तार का समय ठीक ${t} पर है।`,
      },
      isha: {
        title: 'इशा नमाज़ का समय मदीना',
        tag: 'मग़रिब के 90 मिनट बाद',
        description: (t) => `मदीना में इशा का समय ${t} पर है।`,
      },
    },
    faqHeading: 'मदीना नमाज़ समय से जुड़े सामान्य प्रश्न',
    faqs: (times) => [
      {
        q: 'मदीना में आज फ़ज्र का समय क्या है?',
        a: `मदीना में आज फ़ज्र का समय ${times.fajr} पर शुरू होता है।`,
      },
      {
        q: 'मदीना में मग़रिब और इफ़्तार का समय क्या है?',
        a: `मदीना में आज मग़रिब और इफ़्तार का समय ${times.maghrib} पर है।`,
      },
      {
        q: 'मस्जिद-ए-नबवी में नमाज़ पढ़ने का क्या सवाब है?',
        a: 'नबी ﷺ ने फ़रमाया: "मेरी इस मस्जिद में एक नमाज़ का सवाब अन्य मस्जिदों से एक हज़ार गुना अधिक है सिवाय मस्जिद अल-हराम के" (सहीह बुख़ारी)।',
      },
      {
        q: 'रियाज़ुल जन्नत (रौज़ा शरीफ़) की क्या फ़ज़ीलत है?',
        a: 'रसूलुल्लाह ﷺ ने फ़रमाया: "मेरे घर और मिम्बर के बीच का हिस्सा जन्नत के बाग़ों में से एक बाग़ है" (सहीह बुख़ारी)।',
      },
      {
        q: 'मदीना में कौन सी पद्धति लागू है?',
        a: 'सऊदी अरब का आधिकारिक उम्म अल-क़ुरा विश्वविद्यालय मानक लागू है।',
      },
      {
        q: 'मदीना में इशा का समय क्या है?',
        a: `इशा का समय आज रात ${times.isha} पर है।`,
      },
      {
        q: 'मदीना से क़िबला किस दिशा में है?',
        a: 'मदीना से क़िबला दक्षिण की ओर 176.6° पर मक्का शरीफ़ की दिशा में है।',
      },
      {
        q: 'मस्जिद क़ुबा में नमाज़ की क्या फ़ज़ीलत है?',
        a: 'हदीस में है कि जो घर से वुज़ू करके मस्जिद क़ुबा में दो रकअत पढ़े, उसे एक उमराह का सवाब मिलता है।',
      },
    ],
  },

  id: {
    pageTitle: (f, d, a, m, i) => 'Jadwal Sholat di Madinah Hari Ini – Waktu Adzan Masjid Nabawi',
    metaDescription: (f, d, a, m, i) =>
      `Jadwal sholat akurat di Madinah, Arab Saudi hari ini: Subuh ${f}, Dzuhur ${d}, Ashar ${a}, Maghrib ${m}, Isya ${i}. Standar resmi Ummul Qura & Masjid Nabawi.`,
    h1: 'Jadwal Sholat di Madinah Hari Ini',
    badge: 'Madinah Al-Munawwarah · Standar Masjid Nabawi',
    subtitle:
      'Jadwal sholat harian akurat, hitung mundur langsung sholat berikutnya, dan jadwal bulanan untuk Madinah Al-Munawwarah dan Masjid Nabawi.',
    qiblaNote: 'Kiblat: 176.6° Selatan menghadap Ka’bah di Makkah',
    methodologyTitle: 'Metode Ummul Qura untuk Madinah:',
    methodologyText:
      'Waktu sholat dihitung berdasarkan koordinat Masjid Nabawi (24.4672° LU, 39.6111° BT) sesuai kalender resmi Universitas Ummul Qura.',
    monthlyHeading: (m) => `Jadwal Sholat Bulanan Madinah — ${m}`,
    monthlySubtitle: 'Jadwal lengkap waktu Subuh, Terbit, Dzuhur, Ashar, Maghrib, dan Isya di Madinah',
    understandingTitle: 'Keutamaan Sholat di Kota Madinah & Masjid Nabawi',
    understandingParagraphs: [
      'Madinah Al-Munawwarah adalah kota Nabi Muhammad ﷺ yang penuh berkah. Melaksanakan sholat di Masjid Nabawi memiliki keutamaan pahala yang berlipat ganda.',
      'Jamaah haji dan umrah yang berziarah ke Masjid Nabawi dan Raudhah berpedoman pada jadwal resmi ini untuk mendirikan sholat berjamaah.',
    ],
    prayersHeading: 'Lima Waktu Sholat di Madinah',
    prayers: {
      fajr: {
        title: 'Waktu Sholat Subuh Madinah',
        tag: 'Fajar Shadiq (18.5°)',
        description: (t) => `Subuh di Madinah dimulai pukul ${t}.`,
      },
      sunrise: {
        title: 'Syuruq (Terbit) & Isyraq',
        tag: 'Terbit Matahari',
        description: (t) => `Matahari terbit di Madinah pukul ${t}.`,
      },
      dhuhr: {
        title: 'Waktu Sholat Dzuhur Madinah',
        tag: 'Zawal (Matahari Tergelincir)',
        description: (t) => `Adzan Dzuhur di Masjid Nabawi berkumandang pukul ${t}.`,
      },
      asr: {
        title: 'Waktu Sholat Ashar Madinah',
        tag: 'Panjang Bayangan 1x',
        description: (t) => `Ashar di Madinah dimulai pukul ${t}.`,
      },
      maghrib: {
        title: 'Waktu Sholat Maghrib & Buka Puasa',
        tag: 'Terbenam Matahari',
        description: (t) => `Waktu Maghrib dan berbuka puasa masuk pukul ${t}.`,
      },
      isha: {
        title: 'Waktu Sholat Isya Madinah',
        tag: '90 Menit Pasca Maghrib',
        description: (t) => `Isya di Madinah dimulai pukul ${t}.`,
      },
    },
    faqHeading: 'Pertanyaan Seputar Jadwal Sholat Madinah',
    faqs: (times) => [
      {
        q: 'Pukul berapa sholat Subuh di Madinah hari ini?',
        a: `Sholat Subuh di Madinah hari ini dimulai pukul ${times.fajr}.`,
      },
      {
        q: 'Pukul berapa waktu Maghrib dan buka puasa di Madinah?',
        a: `Waktu Maghrib dan buka puasa di Madinah hari ini masuk pukul ${times.maghrib}.`,
      },
      {
        q: 'Apa keutamaan sholat di Masjid Nabawi Madinah?',
        a: 'Rasulullah ﷺ bersabda: "Satu sholat di masjidku ini lebih utama dari seribu sholat di masjid lainnya, selain Masjidil Haram." (HR. Bukhari).',
      },
      {
        q: 'Apa keutamaan Raudhah Syarifah di Masjid Nabawi?',
        a: 'Rasulullah ﷺ bersabda: "Antara rumahku dan mimbarku terdapat taman di antara taman-taman surga." (HR. Bukhari & Muslim).',
      },
      {
        q: 'Metode hisab apa yang digunakan di Madinah?',
        a: 'Menggunakan standar resmi Ummul Qura dari Kerajaan Arab Saudi.',
      },
      {
        q: 'Pukul berapa sholat Isya di Madinah?',
        a: `Sholat Isya hari ini masuk pukul ${times.isha}.`,
      },
      {
        q: 'Ke mana arah kiblat dari kota Madinah?',
        a: 'Arah kiblat dari Madinah mengarah ke arah Selatan (176.6°) menuju Ka’bah di Makkah.',
      },
      {
        q: 'Apa keutamaan sholat di Masjid Quba Madinah?',
        a: 'Rasulullah ﷺ bersabda bahwa barangsiapa bersuci di rumahnya lalu sholat di Masjid Quba, ia mendapat pahala seperti pahala umrah (HR. Ibnu Majah).',
      },
    ],
  },

  tr: {
    pageTitle: (f, d, a, m, i) => 'Medine Namaz Vakitleri Bugün – Mescid-i Nebevi Ezan Saatleri',
    metaDescription: (f, d, a, m, i) =>
      `Medine (Suudi Arabistan) için bugünkü doğru namaz vakitleri: Sabah/İmsak ${f}, Öğle ${d}, İkindi ${a}, Akşam ${m}, Yatsı ${i}. Ümmü'l-Kura takvimi ve Mescid-i Nebevi imsakiyesi.`,
    h1: 'Medine Namaz Vakitleri Bugün',
    badge: 'Medine-i Münevvere · Mescid-i Nebevi Standardı',
    subtitle:
      'Medine-i Münevvere ve Mescid-i Nebevi için günlük doğru namaz vakitleri, sıradaki vakit sayacı ve resmi Ümmü’l-Kura takvimi.',
    qiblaNote: 'Kıble: 176.6° Güney Mekke’deki Kabe yönü',
    methodologyTitle: 'Medine İçin Ümmü’l-Kura Yöntemi:',
    methodologyText:
      'Medine vakitleri, Mescid-i Nebevi koordinatları (24.4672° K, 39.6111° D) ve Ümmü’l-Kura takvimine göre hesaplanır.',
    monthlyHeading: (m) => `Medine Aylık Namaz Vakitleri — ${m}`,
    monthlySubtitle: 'Medine için İmsak, Güneş, Öğle, İkindi, Akşam ve Yatsı vakitlerini içeren tam imsakiye',
    understandingTitle: 'Medine-i Münevvere ve Mescid-i Nebevi’de Namazın Fazileti',
    understandingParagraphs: [
      'Medine-i Münevvere, Peygamber Efendimiz ﷺ’in kutlu şehridir. Mescid-i Nebevi’de kılınan namaz bin kat daha sevaplıdır.',
      'Ravza-i Mutahhara’yı ziyaret eden müminler namazlarını bu mübarek vakitlere göre eda ederler.',
    ],
    prayersHeading: 'Medine’de Beş Vakit Namaz Saatleri',
    prayers: {
      fajr: {
        title: 'Medine Sabah Namazı (İmsak)',
        tag: 'Fecr-i Sadık (18.5°)',
        description: (t) => `Medine’de imsak ve sabah vakti ${t} saatindedir.`,
      },
      sunrise: {
        title: 'Güneş Doğumu ve İşrak',
        tag: 'Güneş Doğuşu',
        description: (t) => `Güneş ${t} vaktinde doğar.`,
      },
      dhuhr: {
        title: 'Medine Öğle Namazı Vakti',
        tag: 'Zeval Vakti',
        description: (t) => `Mescid-i Nebevi’de öğle ezanı ${t} saatinde okunur.`,
      },
      asr: {
        title: 'Medine İkindi Namazı Vakti',
        tag: '1x Gölge Boyu',
        description: (t) => `Medine’de ikindi vakti ${t} saatindedir.`,
      },
      maghrib: {
        title: 'Medine Akşam Namazı ve İftar',
        tag: 'Gün Batımı / İftar',
        description: (t) => `Akşam ve iftar vakti tam ${t} saatindedir.`,
      },
      isha: {
        title: 'Medine Yatsı Namazı Vakti',
        tag: 'Akşamdan 90 Dk Sonra',
        description: (t) => `Yatsı namazı vakti ${t} saatindedir.`,
      },
    },
    faqHeading: 'Medine Namaz Vakitleri Hakkında Sorular',
    faqs: (times) => [
      {
        q: 'Medine’de sabah namazı (imsak) saat kaçta?',
        a: `Medine’de bugün imsak vakti ${times.fajr} olarak hesaplanmıştır.`,
      },
      {
        q: 'Medine’de akşam ve iftar vakti ne zaman?',
        a: `Medine’de akşam ezanı ve iftar saati ${times.maghrib} vaktindedir.`,
      },
      {
        q: 'Mescid-i Nebevi’de namaz kılmanın sevabı nedir?',
        a: 'Resulullah ﷺ buyurdu: "Benim şu mescidimde kılınan bir namaz, Mescid-i Haram hariç diğer yerlerde kılınan bin namazdan daha hayırlıdır." (Buhari).',
      },
      {
        q: 'Ravza-i Mutahhara’nın fazileti nedir?',
        a: 'Peygamberimiz ﷺ: "Evimle minberimin arası cennet bahçelerinden bir bahçedir" buyurmuştur (Buhari).',
      },
      {
        q: 'Medine’de hangi hesap yöntemi uygulanır?',
        a: 'Suudi Arabistan resmi Ümmü’l-Kura takvimi uygulanır.',
      },
      {
        q: 'Medine’de yatsı namazı saat kaçta?',
        a: `Yatsı namazı vakti ${times.isha} saatindedir.`,
      },
      {
        q: 'Medine’den kıble yönü nasıldır?',
        a: 'Medine’den kıble doğrudan güneye doğru 176.6° ile Mekke yönündedir.',
      },
      {
        q: 'Kuba Mescidi’nde namaz kılmanın fazileti nedir?',
        a: 'Evinde abdest alıp Kuba Mescidi’ne gelip iki rekat namaz kılana umre sevabı verilir (İbn Mace).',
      },
    ],
  },

  bn: {
    pageTitle: (f, d, a, m, i) => 'মদিনার নামাজের সময়সূচি আজ – মসজিদে নববীর আজান ও নামাজের সময়',
    metaDescription: (f, d, a, m, i) =>
      `মদিনা মুনাওয়ারা (সৌদি আরব) এর আজকের সঠিক নামাজের সময়: ফজর ${f}, যোহর ${d}, আসর ${a}, মাগরিব ${m}, এশা ${i}। উম্মুল কুরা ক্যালেন্ডার ও মসজিদে নববী সময়সূচি।`,
    h1: 'মদিনায় নামাজের সময়সূচি আজ',
    badge: 'মদিনা মুনাওয়ারা · মসজিদে নববী মানদণ্ড',
    subtitle:
      'মদিনা মুনাওয়ারা এবং মসজিদে নববীর জন্য আজকের সঠিক নামাজের সময় ও মাসিক ক্যালেন্ডার।',
    qiblaNote: 'কিবলা: ১৭৬.৬° দক্ষিণে মক্কার কাবার দিক',
    methodologyTitle: 'মদিনার জন্য উম্মুল কুরা পদ্ধতি:',
    methodologyText:
      'মদিনার সময় মসজিদে নববীর অবস্থান (24.4672° N, 39.6111° E) এবং উম্মুল কুরা ক্যালেন্ডার অনুসারে নির্ধারিত হয়।',
    monthlyHeading: (m) => `মদিনার মাসিক নামাজের সময়সূচি — ${m}`,
    monthlySubtitle: 'মদিনার ফজর, সূর্যোদয়, যোহর, আসর, মাগরিব ও এশার পূর্ণাঙ্গ মাসিক সময়সূচি',
    understandingTitle: 'মদিনা মুনাওয়ারা ও মসজিদে নববীতে নামাজের ফজিলত',
    understandingParagraphs: [
      'মদিনা মুনাওয়ারা প্রিয় নবী ﷺ এর স্মৃতিবিজড়িত বরকতময় শহর। মসজিদে নববীতে নামাজ আদায় করার অপরিসীম ফজিলত রয়েছে।',
      'জিয়ারতকারী ও হাজীগণ মসজিদে নববীর আজানের সাথে তাদের নামাজ আদায় করেন।',
    ],
    prayersHeading: 'মদিনার পাঁচ ওয়াক্ত নামাজের সময়সূচি',
    prayers: {
      fajr: {
        title: 'ফজর নামাজের সময় মদিনা',
        tag: 'সুবহে সাদিক (১৮.৫°)',
        description: (t) => `মদিনায় ফজর শুরু হয় ভোর ${t} মিনিটে।`,
      },
      sunrise: {
        title: 'সূর্যোদয় ও ইশরাক',
        tag: 'সূর্যোদয়',
        description: (t) => `মদিনায় সূর্যোদয় হয় সকাল ${t} মিনিটে।`,
      },
      dhuhr: {
        title: 'যোহর নামাজের সময় মদিনা',
        tag: 'জাওয়াল (সূর্য ঢলে পড়া)',
        description: (t) => `মসজিদে নববীতে যোহরের আজান হয় দুপুর ${t} মিনিটে।`,
      },
      asr: {
        title: 'আসর নামাজের সময় মদিনা',
        tag: 'ছায়া ১ গুণ',
        description: (t) => `মদিনায় আসর শুরু হয় বিকেল ${t} মিনিটে।`,
      },
      maghrib: {
        title: 'মাগরিব নামাজ ও ইফতার',
        tag: 'সূর্যাস্ত / ইফতার',
        description: (t) => `মাগরিব ও ইফতারের সময় শুরু হয় সন্ধ্যা ${t} মিনিটে।`,
      },
      isha: {
        title: 'এশা নামাজের সময় মদিনা',
        tag: 'মাগরিবের ৯০ মিনিট পর',
        description: (t) => `এশা শুরু হয় রাত ${t} মিনিটে।`,
      },
    },
    faqHeading: 'মদিনার নামাজের সময় সংক্রান্ত প্রশ্নোত্তর',
    faqs: (times) => [
      {
        q: 'মদিনায় আজ ফজরের সময় কখন?',
        a: `মদিনায় আজ ফজর শুরু হয় ভোর ${times.fajr} মিনিটে।`,
      },
      {
        q: 'মদিনায় মাগরিব ও ইফতারের সময় কখন?',
        a: `মদিনায় আজ মাগরিব ও ইফতার শুরু হয় সন্ধ্যা ${times.maghrib} মিনিটে।`,
      },
      {
        q: 'মসজিদে নববীতে নামাজের সওয়াব কত?',
        a: 'নবীজি ﷺ বলেছেন: "আমার এই মসজিদে এক রাকাত নামাজ অন্য যেকোনো মসজিদের চেয়ে এক হাজার গুণ বেশি উত্তম, কেবল মসজিদুল হারাম ব্যতীত।" (সহিহ বুখারি)।',
      },
      {
        q: 'রওজা শরিফের মর্যাদা কী?',
        a: 'রাসুলুল্লাহ ﷺ বলেছেন: "আমার ঘর ও মিম্বরের মাঝের অংশ জান্নাতের বাগানসমূহের একটি বাগান।" (সহিহ বুখারি)।',
      },
      {
        q: 'মদিনায় কোন পদ্ধতি প্রযোজ্য?',
        a: 'সৌদি আরবের সরকারি উম্মুল কুরা বিশ্ববিদ্যালয়ের পদ্ধতি।',
      },
      {
        q: 'মদিনায় এশার নামাজের সময় কখন?',
        a: `এশা শুরু হয় রাত ${times.isha} মিনিটে।`,
      },
      {
        q: 'মদিনা থেকে কিবলার দিক কোনটি?',
        a: 'মদিনা থেকে কিবলার দিক ১৭৬.৬° দক্ষিণে মক্কার কাবার দিকে।',
      },
      {
        q: 'মসজিদে কুবার ফজিলত কী?',
        a: 'ঘরে অজু করে মসজিদে কুবায় দুই রাকাত নামাজ আদায়কারীকে একটি উমরার সমপরিমাণ সওয়াব দেওয়া হয়।',
      },
    ],
  },

  fr: {
    pageTitle: (f, d, a, m, i) => 'Heures de Prière à Médine Aujourd’hui – Horaires Madinah & Masjid an-Nabawi',
    metaDescription: (f, d, a, m, i) =>
      `Horaires précis de prière à Médine (Madinah), Arabie Saoudite aujourd'hui: Fajr ${f}, Dhuhr ${d}, Asr ${a}, Maghrib ${m}, Isha ${i}. Calendrier officiel Umm al-Qura & Masjid an-Nabawi.`,
    h1: 'Heures de Prière à Médine Aujourd’hui',
    badge: 'Al-Madinah al-Munawwarah · Norme Al-Masjid an-Nabawi',
    subtitle:
      'Horaires de prière islamique quotidiens précis, compte à rebours en direct et calendrier mensuel pour Médine et la Mosquée du Prophète ﷺ basés sur le calendrier officiel Umm al-Qura.',
    qiblaNote: 'Qibla: 176.6° Sud vers la Sainte Kaaba à La Mecque',
    methodologyTitle: 'Méthode Officielle pour Médine:',
    methodologyText:
      'Les horaires pour Médine sont calculés selon les coordonnées de la Mosquée du Prophète (24.4672° N, 39.6111° E) et le calendrier officiel Umm al-Qura.',
    monthlyHeading: (m) => `Horaires Mensuels des Prières à Médine — ${m}`,
    monthlySubtitle: 'Horaires complets du Fajr, Lever du soleil, Dhuhr, Asr, Maghrib et Isha pour Médine',
    understandingTitle: 'Importance Spirituelle de la Prière à Médine et Al-Masjid an-Nabawi',
    understandingParagraphs: [
      'Al-Madinah al-Munawwarah est la cité bénie du Prophète Muhammad ﷺ. Prier dans sa mosquée apporte des rétributions exceptionnelles.',
      'Les pèlerins visitant la Rawdah ash-Sharifah synchronisent leurs adorations selon cet appel officiel à la prière.',
    ],
    prayersHeading: 'Les Cinq Prières Quotidiennes à Médine',
    prayers: {
      fajr: {
        title: 'Heure du Fajr à Médine (Aube)',
        tag: 'Aube (18.5°)',
        description: (t) => `Le Fajr à Médine commence à ${t}.`,
      },
      sunrise: {
        title: 'Lever du Soleil & Ishraq',
        tag: 'Lever du Soleil',
        description: (t) => `Le soleil se lève à ${t} à Médine.`,
      },
      dhuhr: {
        title: 'Heure du Dhuhr à Médine (Midi)',
        tag: 'Zénith (Zawal)',
        description: (t) => `L’appel pour Dhuhr résonne à ${t} à la Mosquée du Prophète.`,
      },
      asr: {
        title: 'Heure de l’Asr à Médine (Après-midi)',
        tag: 'Ombre 1x',
        description: (t) => `L’Asr commence à ${t}.`,
      },
      maghrib: {
        title: 'Heure du Maghrib et Iftar à Médine',
        tag: 'Coucher du Soleil / Iftar',
        description: (t) => `Le Maghrib et l’Iftar commencent à ${t}.`,
      },
      isha: {
        title: 'Heure de l’Isha à Médine (Nuit)',
        tag: '+90m après Maghrib',
        description: (t) => `L’Isha commence à ${t}.`,
      },
    },
    faqHeading: 'Foire Aux Questions sur les Horaires à Médine',
    faqs: (times) => [
      {
        q: 'À quelle heure est la prière du Fajr à Médine aujourd’hui ?',
        a: `Le Fajr à Médine commence à ${times.fajr} selon la méthode officielle d’Umm al-Qura.`,
      },
      {
        q: 'À quelle heure sont le Maghrib et l’Iftar à Médine aujourd’hui ?',
        a: `Le Maghrib et l'Iftar à Médine ont lieu à ${times.maghrib}.`,
      },
      {
        q: 'Quel est le mérite de prier dans la Mosquée du Prophète à Médine ?',
        a: 'Le Prophète ﷺ a dit : "Une prière dans ma mosquée que voici est meilleure que mille prières ailleurs, sauf dans la Mosquée sacrée." (Sahih al-Bukhari).',
      },
      {
        q: 'Quelle est la vertu de la Rawdah ash-Sharifah ?',
        a: 'Le Prophète ﷺ a dit : "Ce qui est entre ma maison et mon minbar est un jardin parmi les jardins du Paradis." (Sahih al-Bukhari).',
      },
      {
        q: 'Quelle méthode de calcul est suivie à Médine ?',
        a: 'Médine suit le calendrier officiel Umm al-Qura du Royaume d’Arabie Saoudite.',
      },
      {
        q: 'À quelle heure est la prière de l’Isha à Médine ?',
        a: `L’Isha débute ce soir à ${times.isha}.`,
      },
      {
        q: 'Quelle est la direction de la Qibla depuis Médine ?',
        a: 'La Qibla pointe directement vers le Sud à 176.6° vers la Sainte Kaaba à La Mecque.',
      },
      {
        q: 'Quel est le mérite de prier dans la Mosquée de Quba à Médine ?',
        a: 'Le Prophète ﷺ a précisé que celui qui se purifie chez lui puis prie deux unités à la Mosquée de Quba reçoit la récompense d’une Omra.',
      },
    ],
  },
};
