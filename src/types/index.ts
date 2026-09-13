export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Qiyam';

export interface PrayerTimeItem {
  id: string;
  name: PrayerName;
  arabicName: string;
  meaning: string;
  time: string; // e.g. "04:45 AM"
  dateObj: Date;
  isNext: boolean;
  isCurrent: boolean;
  isPassed: boolean;
}

export interface LocationData {
  city: string;
  country: string;
  countryCode: string;
  region?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isAutoDetected?: boolean;
}

export type CalculationMethodId =
  | 'MuslimWorldLeague'
  | 'Egyptian'
  | 'NorthAmerica'
  | 'UmmAlQura'
  | 'Dubai'
  | 'Qatar'
  | 'Kuwait'
  | 'MoonsightingCommittee'
  | 'Singapore'
  | 'Karachi'
  | 'Tehran';

export type MadhabId = 'shafi' | 'hanafi';
export type HighLatitudeRuleId = 'middleOfTheNight' | 'seventhOfTheNight' | 'twilightAngle';

export interface AppSettings {
  method: CalculationMethodId;
  madhab: MadhabId;
  highLatitudeRule: HighLatitudeRuleId;
  timeFormat: '12h' | '24h';
  hijriAdjustment: number; // -2, -1, 0, 1, 2
  audioAthan: 'athan' | 'chime' | 'mute';
  audioVolume: number; // 0 to 1
  notificationsEnabled: boolean;
}

export type CalculationMethodName = CalculationMethodId;
export type MadhabType = MadhabId;

export const DEFAULT_SETTINGS: AppSettings = {
  method: 'UmmAlQura',
  madhab: 'shafi',
  highLatitudeRule: 'middleOfTheNight',
  timeFormat: '12h',
  hijriAdjustment: 0,
  audioAthan: 'chime',
  audioVolume: 0.8,
  notificationsEnabled: false,
};

export interface HijriDateInfo {
  day: number;
  month: number;
  year: number;
  monthNameEn: string;
  monthNameAr: string;
  formatted: string; // e.g. "Rabi' II 2, 1448 AH"
}

export interface IslamicEvent {
  nameEn: string;
  nameAr: string;
  hijriMonth: number;
  hijriDay: number;
  description: string;
  isHoliday?: boolean;
}

export interface RamadanDaySchedule {
  dayNumber: number;
  gregorianDate: Date;
  hijriFormatted: string;
  imsak: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string; // Iftar
  isha: string;
}
