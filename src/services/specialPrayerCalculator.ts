import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes, Madhab, HighLatitudeRule } from 'adhan';
import { LocationData, AppSettings } from '../types';
import { formatTime, getCalculationParameters } from './prayerTimes';

export interface SpecialPrayerTimingResult {
  intentId: string;
  name: string;
  arabicName: string;
  primaryTime: string; // e.g. "06:22 AM"
  windowStart: string; // e.g. "06:22 AM"
  windowEnd: string; // e.g. "11:45 AM"
  recommendedTime?: string; // e.g. "09:30 AM"
  status: 'active' | 'upcoming' | 'passed';
  countdownText: string;
  astronomicalContext: {
    sunrise: string;
    sunset: string;
    solarNoon: string;
    dawnFajr: string;
    nightDurationHours: string;
    lastThirdStart: string;
  };
}

export function calculateSpecialPrayerTiming(
  intentId: string,
  location: LocationData,
  date: Date = new Date(),
  settings: AppSettings
): SpecialPrayerTimingResult {
  const coords = new Coordinates(location.latitude, location.longitude);
  const params = getCalculationParameters(settings.method, settings.madhab, settings.highLatitudeRule);
  const prayerTimes = new PrayerTimes(coords, date, params);
  const sunnah = new SunnahTimes(prayerTimes);

  const now = new Date();
  const formatT = (d: Date) => formatTime(d, settings.timeFormat, location.timezone);

  const fajr = prayerTimes.fajr;
  const sunrise = prayerTimes.sunrise;
  const dhuhr = prayerTimes.dhuhr;
  const maghrib = prayerTimes.maghrib;
  const isha = prayerTimes.isha;

  // Tomorrow times for night wrapping
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = new PrayerTimes(coords, tomorrow, params);
  const nextFajr = tomorrowTimes.fajr;

  // Night calculations: Maghrib to next day Fajr
  const nightMs = nextFajr.getTime() - maghrib.getTime();
  const nightDurationHours = (nightMs / (1000 * 60 * 60)).toFixed(1);
  const lastThirdStartDate = new Date(maghrib.getTime() + (nightMs * 2) / 3);
  const midnightDate = new Date(maghrib.getTime() + nightMs / 2);

  // Solar coordinates details
  const astronomicalContext = {
    sunrise: formatT(sunrise),
    sunset: formatT(maghrib),
    solarNoon: formatT(dhuhr),
    dawnFajr: formatT(fajr),
    nightDurationHours: `${nightDurationHours} hours`,
    lastThirdStart: formatT(lastThirdStartDate),
  };

  let name = 'Special Prayer';
  let arabicName = '';
  let startDate: Date = sunrise;
  let endDate: Date = dhuhr;
  let recommendedDate: Date | undefined;

  switch (intentId) {
    case 'ishraq': {
      name = 'Ishraq Prayer';
      arabicName = 'صلاة الإشراق';
      // 15 to 20 mins post-sunrise (when sun clears 1 spear length)
      startDate = new Date(sunrise.getTime() + 18 * 60 * 1000);
      // Ishraq window typically concludes about 1.5 - 2h after sunrise
      endDate = new Date(sunrise.getTime() + 105 * 60 * 1000);
      recommendedDate = new Date(sunrise.getTime() + 25 * 60 * 1000);
      break;
    }
    case 'duha':
    case 'chasht': {
      name = intentId === 'chasht' ? 'Chasht Namaz' : 'Salat al-Duha';
      arabicName = 'صلاة الضحى';
      startDate = new Date(sunrise.getTime() + 20 * 60 * 1000);
      // End: roughly 12 mins before Dhuhr (solar noon / Zawal)
      endDate = new Date(dhuhr.getTime() - 12 * 60 * 1000);
      // Afdal time is midway when sun is warm
      recommendedDate = new Date(sunrise.getTime() + (dhuhr.getTime() - sunrise.getTime()) * 0.55);
      break;
    }
    case 'tahajjud': {
      name = 'Tahajjud & Qiyam al-Layl';
      arabicName = 'صلاة التهجد';
      // Can begin after Isha
      startDate = isha;
      // Ends at Fajr
      endDate = now.getHours() < 12 ? fajr : nextFajr;
      // Best time is last third of night
      recommendedDate = lastThirdStartDate;
      break;
    }
    case 'awabeen': {
      name = 'Awabeen Prayer';
      arabicName = 'صلاة الأوابين';
      // Post-Maghrib 6 rak'ahs tradition
      startDate = new Date(maghrib.getTime() + 10 * 60 * 1000);
      endDate = isha;
      recommendedDate = new Date(maghrib.getTime() + 15 * 60 * 1000);
      break;
    }
    case 'fajr': {
      name = 'Fajr Prayer';
      arabicName = 'صلاة الفجر';
      startDate = fajr;
      endDate = sunrise;
      break;
    }
    case 'sunrise': {
      name = 'Sunrise (Shurooq)';
      arabicName = 'شروق الشمس';
      startDate = sunrise;
      endDate = new Date(sunrise.getTime() + 15 * 60 * 1000); // Karahah prohibited window
      break;
    }
    case 'maghrib': {
      name = 'Maghrib Prayer';
      arabicName = 'صلاة المغرب';
      startDate = maghrib;
      endDate = isha;
      break;
    }
    case 'makruh': {
      name = 'Makruh (Prohibited) Prayer Times';
      arabicName = 'الأوقات المكروهة';
      const m1Start = sunrise;
      const m1End = new Date(sunrise.getTime() + 18 * 60 * 1000);
      const m2Start = new Date(dhuhr.getTime() - 15 * 60 * 1000);
      const m2End = dhuhr;
      const m3Start = new Date(maghrib.getTime() - 20 * 60 * 1000);
      const m3End = maghrib;

      const nowTime = now.getTime();
      if (nowTime < m1End.getTime()) {
        startDate = m1Start;
        endDate = m1End;
      } else if (nowTime < m2End.getTime()) {
        startDate = m2Start;
        endDate = m2End;
      } else {
        startDate = m3Start;
        endDate = m3End;
      }
      break;
    }
    default: {
      name = 'Ishraq Prayer';
      arabicName = 'صلاة الإشراق';
      startDate = new Date(sunrise.getTime() + 18 * 60 * 1000);
      endDate = new Date(sunrise.getTime() + 105 * 60 * 1000);
    }
  }

  // Determine status and countdown
  let status: 'active' | 'upcoming' | 'passed' = 'upcoming';
  let countdownText = '';

  const nowMs = now.getTime();
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  if (nowMs >= startMs && nowMs <= endMs) {
    status = 'active';
    const remainingMins = Math.max(0, Math.floor((endMs - nowMs) / (1000 * 60)));
    const hours = Math.floor(remainingMins / 60);
    const mins = remainingMins % 60;
    countdownText = hours > 0 ? `Ends in ${hours}h ${mins}m` : `Ends in ${mins}m`;
  } else if (nowMs < startMs) {
    status = 'upcoming';
    const untilMins = Math.floor((startMs - nowMs) / (1000 * 60));
    const hours = Math.floor(untilMins / 60);
    const mins = untilMins % 60;
    countdownText = hours > 0 ? `Starts in ${hours}h ${mins}m` : `Starts in ${mins}m`;
  } else {
    status = 'passed';
    countdownText = 'Completed for today';
  }

  return {
    intentId,
    name,
    arabicName,
    primaryTime: formatT(startDate),
    windowStart: formatT(startDate),
    windowEnd: formatT(endDate),
    recommendedTime: recommendedDate ? formatT(recommendedDate) : undefined,
    status,
    countdownText,
    astronomicalContext,
  };
}
