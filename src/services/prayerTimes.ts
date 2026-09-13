import {
  CalculationMethod,
  CalculationParameters,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PrayerTimes,
  Prayer,
  Qibla,
  SunnahTimes,
} from 'adhan';
import {
  AppSettings,
  CalculationMethodId,
  HijriDateInfo,
  IslamicEvent,
  LocationData,
  PrayerName,
  PrayerTimeItem,
  RamadanDaySchedule,
} from '../types';

export const CALCULATION_METHOD_LABELS: Record<CalculationMethodId, { name: string; region: string }> = {
  UmmAlQura: { name: 'Umm al-Qura University', region: 'Saudi Arabia & Arabian Peninsula' },
  MuslimWorldLeague: { name: 'Muslim World League (MWL)', region: 'Europe, Far East, Parts of US' },
  Egyptian: { name: 'Egyptian General Authority of Survey', region: 'Egypt, Africa, Levant' },
  NorthAmerica: { name: 'Islamic Society of North America (ISNA)', region: 'North America (US & Canada)' },
  Dubai: { name: 'Dubai Authority (Awqaf)', region: 'United Arab Emirates' },
  Qatar: { name: 'Qatar Calendar House', region: 'Qatar & Arabian Gulf' },
  Kuwait: { name: 'Ministry of Awqaf Kuwait', region: 'Kuwait' },
  Singapore: { name: 'MUIS Singapore', region: 'Singapore, Malaysia, SE Asia' },
  Karachi: { name: 'University of Islamic Sciences, Karachi', region: 'Pakistan, India, Bangladesh' },
  Tehran: { name: 'Institute of Geophysics, Tehran', region: 'Iran & Shia Communities' },
  MoonsightingCommittee: { name: 'Moonsighting Committee Worldwide', region: 'Worldwide Moon Sighting' },
};

export function getCalculationParameters(
  methodId: CalculationMethodId,
  madhabId: 'shafi' | 'hanafi',
  highLatRule: 'middleOfTheNight' | 'seventhOfTheNight' | 'twilightAngle'
): CalculationParameters {
  let params: CalculationParameters;

  switch (methodId) {
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'MuslimWorldLeague':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'NorthAmerica':
      params = CalculationMethod.NorthAmerica();
      break;
    case 'Dubai':
      params = CalculationMethod.Dubai();
      break;
    case 'Qatar':
      params = CalculationMethod.Qatar();
      break;
    case 'Kuwait':
      params = CalculationMethod.Kuwait();
      break;
    case 'Singapore':
      params = CalculationMethod.Singapore();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'Tehran':
      params = CalculationMethod.Tehran();
      break;
    case 'MoonsightingCommittee':
      params = CalculationMethod.MoonsightingCommittee();
      break;
    default:
      params = CalculationMethod.UmmAlQura();
  }

  // Set Madhab for Asr shadow ratio
  params.madhab = madhabId === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

  // Set High Latitude Rule
  if (highLatRule === 'middleOfTheNight') {
    params.highLatitudeRule = HighLatitudeRule.MiddleOfTheNight;
  } else if (highLatRule === 'seventhOfTheNight') {
    params.highLatitudeRule = HighLatitudeRule.SeventhOfTheNight;
  } else {
    params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
  }

  return params;
}

export function formatTime(date: Date, format: '12h' | '24h', timezone?: string): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: format === '12h',
      timeZone: timezone,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if (format === '24h') {
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }
}

export interface DayPrayerResults {
  prayers: PrayerTimeItem[];
  nextPrayer: PrayerTimeItem | null;
  currentPrayer: PrayerTimeItem | null;
  qiyamTime: string;
  imsakTime: Date;
  iftarTime: Date;
  sunnahTimes: {
    middleOfTheNight: Date;
    lastThirdOfTheNight: Date;
  };
  rawTimes: PrayerTimes;
}

export function calculateDailyPrayers(
  location: LocationData,
  targetDate: Date = new Date(),
  settings: AppSettings
): DayPrayerResults {
  const coords = new Coordinates(location.latitude, location.longitude);
  const params = getCalculationParameters(settings.method, settings.madhab, settings.highLatitudeRule);
  const prayerTimes = new PrayerTimes(coords, targetDate, params);
  const sunnah = new SunnahTimes(prayerTimes);

  const now = new Date();
  const isToday =
    targetDate.getFullYear() === now.getFullYear() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getDate() === now.getDate();

  const currentPrayerCode = isToday ? prayerTimes.currentPrayer() : Prayer.None;
  const nextPrayerCode = isToday ? prayerTimes.nextPrayer() : Prayer.None;

  const prayerDefs: Array<{
    name: PrayerName;
    arabicName: string;
    meaning: string;
    date: Date;
    code: (typeof Prayer)[keyof typeof Prayer];
  }> = [
    {
      name: 'Fajr',
      arabicName: 'الفجر',
      meaning: 'Dawn Prayer',
      date: prayerTimes.fajr,
      code: Prayer.Fajr,
    },
    {
      name: 'Sunrise',
      arabicName: 'الشروق',
      meaning: 'Sunrise (Ishraq)',
      date: prayerTimes.sunrise,
      code: Prayer.Sunrise,
    },
    {
      name: 'Dhuhr',
      arabicName: 'الظهر',
      meaning: 'Noon Prayer',
      date: prayerTimes.dhuhr,
      code: Prayer.Dhuhr,
    },
    {
      name: 'Asr',
      arabicName: 'العصر',
      meaning: 'Afternoon Prayer',
      date: prayerTimes.asr,
      code: Prayer.Asr,
    },
    {
      name: 'Maghrib',
      arabicName: 'المغرب',
      meaning: 'Sunset Prayer',
      date: prayerTimes.maghrib,
      code: Prayer.Maghrib,
    },
    {
      name: 'Isha',
      arabicName: 'العشاء',
      meaning: 'Night Prayer',
      date: prayerTimes.isha,
      code: Prayer.Isha,
    },
  ];

  // If next prayer is none today, it wraps around to tomorrow's Fajr
  let nextPrayerItem: PrayerTimeItem | null = null;
  let currentPrayerItem: PrayerTimeItem | null = null;

  const prayers: PrayerTimeItem[] = prayerDefs.map((def) => {
    const isPassed = isToday ? now.getTime() > def.date.getTime() : targetDate < now;
    const isNext = isToday && def.code === nextPrayerCode;
    const isCurrent = isToday && def.code === currentPrayerCode;

    const item: PrayerTimeItem = {
      id: def.name.toLowerCase(),
      name: def.name,
      arabicName: def.arabicName,
      meaning: def.meaning,
      time: formatTime(def.date, settings.timeFormat, location.timezone),
      dateObj: def.date,
      isNext,
      isCurrent,
      isPassed,
    };

    if (isNext) nextPrayerItem = item;
    if (isCurrent) currentPrayerItem = item;

    return item;
  });

  // If today after Isha, next prayer is tomorrow Fajr
  if (isToday && (!nextPrayerItem || nextPrayerCode === Prayer.None)) {
    const tomorrow = new Date(targetDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimes = new PrayerTimes(coords, tomorrow, params);
    nextPrayerItem = {
      id: 'fajr-tomorrow',
      name: 'Fajr',
      arabicName: 'الفجر',
      meaning: 'Dawn Prayer (Tomorrow)',
      time: formatTime(tomorrowTimes.fajr, settings.timeFormat, location.timezone),
      dateObj: tomorrowTimes.fajr,
      isNext: true,
      isCurrent: false,
      isPassed: false,
    };
  }

  const imsakTime = new Date(prayerTimes.fajr.getTime() - 10 * 60 * 1000);
  const iftarTime = prayerTimes.maghrib;

  return {
    prayers,
    nextPrayer: nextPrayerItem,
    currentPrayer: currentPrayerItem,
    qiyamTime: formatTime(sunnah.lastThirdOfTheNight, settings.timeFormat, location.timezone),
    imsakTime,
    iftarTime,
    sunnahTimes: {
      middleOfTheNight: sunnah.middleOfTheNight,
      lastThirdOfTheNight: sunnah.lastThirdOfTheNight,
    },
    rawTimes: prayerTimes,
  };
}

export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  formattedRemaining: string; // e.g. "01h 24m 32s remaining"
  shortFormatted: string; // e.g. "01h 24m"
  totalRemainingSeconds: number;
  progressPercentage: number; // 0-100% of the active interval
}

export function calculateLiveCountdown(
  nextPrayerItem: PrayerTimeItem | null,
  allPrayers: PrayerTimeItem[]
): CountdownState {
  if (!nextPrayerItem) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      formattedRemaining: '00h 00m remaining',
      shortFormatted: '00h 00m',
      totalRemainingSeconds: 0,
      progressPercentage: 100,
    };
  }

  const now = new Date();
  const diffMs = nextPrayerItem.dateObj.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const shortFormatted = `${pad(hours)}h ${pad(minutes)}m`;
  const formattedRemaining = `${shortFormatted} remaining`;

  // Calculate progress in current prayer window
  let progressPercentage = 0;
  const currentIndex = allPrayers.findIndex((p) => p.name === nextPrayerItem.name);
  if (currentIndex > 0) {
    const prevPrayer = allPrayers[currentIndex - 1];
    const totalIntervalMs = nextPrayerItem.dateObj.getTime() - prevPrayer.dateObj.getTime();
    const elapsedMs = now.getTime() - prevPrayer.dateObj.getTime();
    if (totalIntervalMs > 0) {
      progressPercentage = Math.min(100, Math.max(0, (elapsedMs / totalIntervalMs) * 100));
    }
  } else {
    // If next is Fajr, interval started from Isha yesterday
    const fajrTime = nextPrayerItem.dateObj.getTime();
    const approxInterval = 8 * 3600 * 1000; // 8 hours
    const elapsed = Math.max(0, approxInterval - diffMs);
    progressPercentage = Math.min(100, Math.max(0, (elapsed / approxInterval) * 100));
  }

  return {
    hours,
    minutes,
    seconds,
    formattedRemaining,
    shortFormatted,
    totalRemainingSeconds: totalSeconds,
    progressPercentage,
  };
}

/**
 * Astronomical Hijri Date converter with day adjustment
 */
export function getHijriDate(gregorianDate: Date = new Date(), adjustment: number = 0): HijriDateInfo {
  const date = new Date(gregorianDate);
  if (adjustment !== 0) {
    date.setDate(date.getDate() + adjustment);
  }

  // Use Intl with islamic-umalqura calendar
  try {
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    let day = 1;
    let month = 1;
    let year = 1448;

    parts.forEach((p) => {
      if (p.type === 'day') day = parseInt(p.value, 10);
      if (p.type === 'month') month = parseInt(p.value, 10);
      if (p.type === 'year') year = parseInt(p.value, 10);
    });

    const monthNamesEn = [
      'Muharram',
      'Safar',
      "Rabi' I",
      "Rabi' II",
      'Jumada I',
      'Jumada II',
      'Rajab',
      "Sha'ban",
      'Ramadan',
      'Shawwal',
      "Dhu al-Qi'dah",
      'Dhu al-Hijjah',
    ];

    const monthNamesAr = [
      'محرم',
      'صفر',
      'ربيع الأول',
      'ربيع الثاني',
      'جمادى الأولى',
      'جمادى الآخرة',
      'رجب',
      'شعبان',
      'رمضان',
      'شوال',
      'ذو القعدة',
      'ذو الحجة',
    ];

    const monthIndex = Math.max(0, Math.min(11, month - 1));
    const monthNameEn = monthNamesEn[monthIndex];
    const monthNameAr = monthNamesAr[monthIndex];

    return {
      day,
      month,
      year,
      monthNameEn,
      monthNameAr,
      formatted: `${monthNameEn} ${day}, ${year} AH`,
    };
  } catch {
    return {
      day: 2,
      month: 4,
      year: 1448,
      monthNameEn: "Rabi' II",
      monthNameAr: 'ربيع الثاني',
      formatted: `Rabi' II 2, 1448 AH`,
    };
  }
}

/**
 * Great-circle distance and bearing to Kaaba
 */
export function getQiblaInfo(
  latitude: number,
  longitude: number
): { bearing: number; distanceKm: number; cardinal: string } {
  const coords = new Coordinates(latitude, longitude);
  const bearing = Qibla(coords);

  // Haversine distance to Kaaba (21.4225, 39.8262)
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  const R = 6371; // Earth's radius in km

  const dLat = ((kaabaLat - latitude) * Math.PI) / 180;
  const dLon = ((kaabaLng - longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((kaabaLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const cardinalIndex = Math.round(bearing / 45) % 8;
  const cardinal = cardinals[cardinalIndex];

  return {
    bearing: Math.round(bearing * 10) / 10,
    distanceKm,
    cardinal,
  };
}

export function getMajorIslamicEvents(hijriYear: number = 1448): IslamicEvent[] {
  return [
    {
      nameEn: 'Islamic New Year (1st Muharram)',
      nameAr: 'رأس السنة الهجرية',
      hijriMonth: 1,
      hijriDay: 1,
      description: 'The beginning of the new Islamic Hijri lunar year.',
      isHoliday: true,
    },
    {
      nameEn: 'Day of Ashura',
      nameAr: 'يوم عاشوراء',
      hijriMonth: 1,
      hijriDay: 10,
      description: 'Commemoration of the deliverance of Prophet Musa (Moses) and his followers.',
    },
    {
      nameEn: "Mawlid al-Nabi (Prophet's Birthday)",
      nameAr: 'المولد النبوي الشريف',
      hijriMonth: 3,
      hijriDay: 12,
      description: 'Observance of the birth of the Islamic Prophet Muhammad (peace be upon him).',
    },
    {
      nameEn: "Isra and Mi'raj",
      nameAr: 'الإسراء والمعراج',
      hijriMonth: 7,
      hijriDay: 27,
      description: "The miraculous Night Journey and Heavenly Ascension of Prophet Muhammad.",
    },
    {
      nameEn: "Laylat al-Bara'at (Mid-Sha'ban)",
      nameAr: 'ليلة النصف من شعبان',
      hijriMonth: 8,
      hijriDay: 15,
      description: 'A night of devotion, seeking forgiveness and spiritual renewal.',
    },
    {
      nameEn: 'First Day of Ramadan',
      nameAr: 'بداية شهر رمضان',
      hijriMonth: 9,
      hijriDay: 1,
      description: 'The start of the blessed holy month of fasting from dawn to sunset.',
      isHoliday: true,
    },
    {
      nameEn: 'Laylat al-Qadr (Night of Power)',
      nameAr: 'ليلة القدر',
      hijriMonth: 9,
      hijriDay: 27,
      description: 'The night when the first verses of the Holy Quran were revealed, better than a thousand months.',
    },
    {
      nameEn: 'Eid al-Fitr',
      nameAr: 'عيد الفطر المبارك',
      hijriMonth: 10,
      hijriDay: 1,
      description: 'Joyful celebration marking the conclusion of the holy month of Ramadan.',
      isHoliday: true,
    },
    {
      nameEn: 'Day of Arafah',
      nameAr: 'يوم عرفة',
      hijriMonth: 12,
      hijriDay: 9,
      description: 'The pinnacle day of the Hajj pilgrimage when pilgrims gather at Mount Arafat.',
      isHoliday: true,
    },
    {
      nameEn: 'Eid al-Adha (Feast of Sacrifice)',
      nameAr: 'عيد الأضحى المبارك',
      hijriMonth: 12,
      hijriDay: 10,
      description: 'Major Islamic celebration honoring the devotion of Prophet Ibrahim (Abraham).',
      isHoliday: true,
    },
  ];
}

/**
 * Calculates a complete monthly timetable for any specified month
 */
export function calculateMonthlyTimetable(
  location: LocationData,
  year: number,
  monthIndex: number, // 0 = Jan, 11 = Dec
  settings: AppSettings
): Array<{
  dayNumber: number;
  date: Date;
  dateFormatted: string;
  hijriFormatted: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}> {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const timetable = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const targetDate = new Date(year, monthIndex, d);
    const dayPrayers = calculateDailyPrayers(location, targetDate, settings);
    const hijri = getHijriDate(targetDate, settings.hijriAdjustment);

    const getPrayerTime = (name: PrayerName) => {
      const found = dayPrayers.prayers.find((p) => p.name === name);
      return found ? found.time : '--:--';
    };

    timetable.push({
      dayNumber: d,
      date: targetDate,
      dateFormatted: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
      hijriFormatted: `${hijri.day} ${hijri.monthNameEn}`,
      fajr: getPrayerTime('Fajr'),
      sunrise: getPrayerTime('Sunrise'),
      dhuhr: getPrayerTime('Dhuhr'),
      asr: getPrayerTime('Asr'),
      maghrib: getPrayerTime('Maghrib'),
      isha: getPrayerTime('Isha'),
    });
  }

  return timetable;
}
