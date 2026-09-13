import { LocationData } from '../types';

export interface EnrichedCity extends LocationData {
  slug: string;
  countrySlug: string;
  aliases: string[];
  nativeNames?: {
    ar?: string;
    ur?: string;
    hi?: string;
    id?: string;
    tr?: string;
    bn?: string;
    fr?: string;
  };
}

export const POPULAR_CITIES: EnrichedCity[] = [
  {
    city: 'Makkah',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'Makkah Province',
    latitude: 21.4225,
    longitude: 39.8262,
    timezone: 'Asia/Riyadh',
    slug: 'makkah',
    countrySlug: 'saudi-arabia',
    aliases: ['Mecca', 'Makkah al-Mukarramah', 'Bakkah', 'مكة', 'مكة المكرمة', 'مکة', 'مکہ', 'मक्का'],
    nativeNames: {
      ar: 'مكة المكرمة',
      ur: 'مکہ مکرمہ',
      hi: 'मक्का',
      tr: 'Mekke',
      id: 'Makkah',
      bn: 'মক্কা',
    },
  },
  {
    city: 'Madinah',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'Al Madinah Province',
    latitude: 24.4672,
    longitude: 39.6111,
    timezone: 'Asia/Riyadh',
    slug: 'madinah',
    countrySlug: 'saudi-arabia',
    aliases: ['Medina', 'Madinah al-Munawwarah', 'المدينة', 'المدينة المنورة', 'مدینہ', 'مدینہ منورہ', 'मदीना'],
    nativeNames: {
      ar: 'المدينة المنورة',
      ur: 'مدینہ منورہ',
      hi: 'मदीना',
      tr: 'Medine',
      id: 'Madinah',
      bn: 'মদীনা',
    },
  },
  {
    city: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'Riyadh Province',
    latitude: 24.7136,
    longitude: 46.6753,
    timezone: 'Asia/Riyadh',
    slug: 'riyadh',
    countrySlug: 'saudi-arabia',
    aliases: ['الرياض', 'ریاض', 'रियाद', 'Riad'],
    nativeNames: {
      ar: 'الرياض',
      ur: 'ریاض',
      hi: 'रियाद',
      tr: 'Riyad',
    },
  },
  {
    city: 'Jeddah',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'Makkah Province',
    latitude: 21.4858,
    longitude: 39.1925,
    timezone: 'Asia/Riyadh',
    slug: 'jeddah',
    countrySlug: 'saudi-arabia',
    aliases: ['Jiddah', 'جدة', 'جدہ', 'जेद्दा'],
    nativeNames: {
      ar: 'جدة',
      ur: 'جدہ',
      hi: 'जेद्दा',
      tr: 'Cidde',
    },
  },
  {
    city: 'Dammam',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    region: 'Eastern Province',
    latitude: 26.4207,
    longitude: 50.0888,
    timezone: 'Asia/Riyadh',
    slug: 'dammam',
    countrySlug: 'saudi-arabia',
    aliases: ['الدمام', 'دمام', 'दम्माम'],
    nativeNames: {
      ar: 'الدمام',
      ur: 'دمام',
    },
  },
  {
    city: 'Jerusalem',
    country: 'Palestine',
    countryCode: 'PS',
    region: 'Al-Quds',
    latitude: 31.7767,
    longitude: 35.2342,
    timezone: 'Asia/Jerusalem',
    slug: 'jerusalem',
    countrySlug: 'palestine',
    aliases: ['Al-Quds', 'Quds', 'القدس', 'القدس الشريف', 'یروشلم', 'यरुशलम', 'Baitul Maqdis', 'Kudüs'],
    nativeNames: {
      ar: 'القدس الشريف',
      ur: 'بیت المقدس',
      hi: 'यरुशलम',
      tr: 'Kudüs',
      id: 'Yerusalem (Al-Quds)',
    },
  },
  {
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    region: 'Cairo Governorate',
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: 'Africa/Cairo',
    slug: 'cairo',
    countrySlug: 'egypt',
    aliases: ['القاهرة', 'قاہرہ', 'काहिरा', 'Al-Qahirah', 'Kahire'],
    nativeNames: {
      ar: 'القاهرة',
      ur: 'قاہرہ',
      hi: 'काहिरा',
      tr: 'Kahire',
    },
  },
  {
    city: 'Istanbul',
    country: 'Turkey',
    countryCode: 'TR',
    region: 'Marmara',
    latitude: 41.0082,
    longitude: 28.9784,
    timezone: 'Europe/Istanbul',
    slug: 'istanbul',
    countrySlug: 'turkey',
    aliases: ['Constantinople', 'إسطنبول', 'استانبول', 'इस्तांबुल', 'Stamboul'],
    nativeNames: {
      tr: 'İstanbul',
      ar: 'إسطنبول',
      ur: 'استنبول',
      hi: 'इस्तांबुल',
    },
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai',
    slug: 'dubai',
    countrySlug: 'united-arab-emirates',
    aliases: ['دبي', 'دبئی', 'दुबई'],
    nativeNames: {
      ar: 'دبي',
      ur: 'دبئی',
      hi: 'दुबई',
    },
  },
  {
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Abu Dhabi',
    latitude: 24.4539,
    longitude: 54.3773,
    timezone: 'Asia/Dubai',
    slug: 'abu-dhabi',
    countrySlug: 'united-arab-emirates',
    aliases: ['أبوظبي', 'ابوظہبی', 'अबू धाबी'],
    nativeNames: {
      ar: 'أبو ظبي',
      ur: 'ابو ظہبی',
    },
  },
  {
    city: 'Doha',
    country: 'Qatar',
    countryCode: 'QA',
    region: 'Ad-Dawhah',
    latitude: 25.2854,
    longitude: 51.531,
    timezone: 'Asia/Qatar',
    slug: 'doha',
    countrySlug: 'qatar',
    aliases: ['الدوحة', 'دوحہ', 'दोहा'],
    nativeNames: {
      ar: 'الدوحة',
      ur: 'دوحہ',
    },
  },
  {
    city: 'Kuwait City',
    country: 'Kuwait',
    countryCode: 'KW',
    region: 'Al Asimah',
    latitude: 29.3759,
    longitude: 47.9774,
    timezone: 'Asia/Kuwait',
    slug: 'kuwait-city',
    countrySlug: 'kuwait',
    aliases: ['مدينة الكويت', 'کویت سٹی', 'कुवैत सिटी', 'Kuwait'],
    nativeNames: {
      ar: 'الكويت',
      ur: 'کویت',
    },
  },
  {
    city: 'Muscat',
    country: 'Oman',
    countryCode: 'OM',
    region: 'Muscat Governorate',
    latitude: 23.588,
    longitude: 58.3829,
    timezone: 'Asia/Muscat',
    slug: 'muscat',
    countrySlug: 'oman',
    aliases: ['مسقط', 'मस्कट'],
    nativeNames: {
      ar: 'مسقط',
      ur: 'مسقط',
    },
  },
  {
    city: 'Amman',
    country: 'Jordan',
    countryCode: 'JO',
    region: 'Amman Governorate',
    latitude: 31.9454,
    longitude: 35.9284,
    timezone: 'Asia/Amman',
    slug: 'amman',
    countrySlug: 'jordan',
    aliases: ['عمان', 'عمان اردن', 'अम्मान'],
    nativeNames: {
      ar: 'عَمّان',
      ur: 'عمان',
    },
  },
  {
    city: 'Jakarta',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Special Capital Region',
    latitude: -6.2088,
    longitude: 106.8456,
    timezone: 'Asia/Jakarta',
    slug: 'jakarta',
    countrySlug: 'indonesia',
    aliases: ['جاكرتا', 'جکارتہ', 'जकार्ता', 'DKI Jakarta'],
    nativeNames: {
      id: 'Jakarta',
      ar: 'جاكرتا',
      ur: 'جکارتہ',
    },
  },
  {
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    countryCode: 'MY',
    region: 'Federal Territory',
    latitude: 3.139,
    longitude: 101.6869,
    timezone: 'Asia/Kuala_Lumpur',
    slug: 'kuala-lumpur',
    countrySlug: 'malaysia',
    aliases: ['كوالالمبور', 'کوالالمپور', 'कुआलालंपुर', 'KL'],
    nativeNames: {
      id: 'Kuala Lumpur',
      ar: 'كوالالمبور',
    },
  },
  {
    city: 'Karachi',
    country: 'Pakistan',
    countryCode: 'PK',
    region: 'Sindh',
    latitude: 24.8607,
    longitude: 67.0011,
    timezone: 'Asia/Karachi',
    slug: 'karachi',
    countrySlug: 'pakistan',
    aliases: ['کراچی', 'كراتشي', 'कराची'],
    nativeNames: {
      ur: 'کراچی',
      ar: 'كراتشي',
      hi: 'कराची',
    },
  },
  {
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    region: 'Punjab',
    latitude: 31.5204,
    longitude: 74.3587,
    timezone: 'Asia/Karachi',
    slug: 'lahore',
    countrySlug: 'pakistan',
    aliases: ['لاہور', 'لاهور', 'लाहौर'],
    nativeNames: {
      ur: 'لاہور',
      ar: 'لاهور',
      hi: 'लाहौर',
    },
  },
  {
    city: 'Islamabad',
    country: 'Pakistan',
    countryCode: 'PK',
    region: 'Federal Capital',
    latitude: 33.6844,
    longitude: 73.0479,
    timezone: 'Asia/Karachi',
    slug: 'islamabad',
    countrySlug: 'pakistan',
    aliases: ['اسلام آباد', 'إسلام آباد', 'इस्लामाबाद'],
    nativeNames: {
      ur: 'اسلام آباد',
      ar: 'إسلام آباد',
      hi: 'इस्लामाबाद',
    },
  },
  {
    city: 'Dhaka',
    country: 'Bangladesh',
    countryCode: 'BD',
    region: 'Dhaka Division',
    latitude: 23.8103,
    longitude: 90.4125,
    timezone: 'Asia/Dhaka',
    slug: 'dhaka',
    countrySlug: 'bangladesh',
    aliases: ['Dacca', 'دكا', 'ڈھاکہ', 'ঢাকা', 'ढाका'],
    nativeNames: {
      bn: 'ঢাকা',
      ur: 'ڈھاکہ',
      ar: 'دكا',
    },
  },
  {
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Greater London',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    slug: 'london',
    countrySlug: 'united-kingdom',
    aliases: ['لندن', 'لندن برطانیہ', 'लंदन', 'Londres'],
    nativeNames: {
      ar: 'لندن',
      ur: 'لندن',
      fr: 'Londres',
    },
  },
  {
    city: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'West Midlands',
    latitude: 52.4862,
    longitude: -1.8904,
    timezone: 'Europe/London',
    slug: 'birmingham',
    countrySlug: 'united-kingdom',
    aliases: ['برمنگھم', 'برمنغهام', 'बर्मिंघम'],
    nativeNames: {
      ur: 'برمنگھم',
      ar: 'برمنغهام',
    },
  },
  {
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Île-de-France',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris',
    slug: 'paris',
    countrySlug: 'france',
    aliases: ['باريس', 'پیرس', 'पेरिस'],
    nativeNames: {
      fr: 'Paris',
      ar: 'باريس',
      ur: 'پیرس',
    },
  },
  {
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Berlin',
    latitude: 52.52,
    longitude: 13.405,
    timezone: 'Europe/Berlin',
    slug: 'berlin',
    countrySlug: 'germany',
    aliases: ['برلين', 'برلن', 'बर्लिन'],
    nativeNames: {
      ar: 'برلين',
      ur: 'برلن',
    },
  },
  {
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    region: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
    slug: 'new-york',
    countrySlug: 'united-states',
    aliases: ['NYC', 'New York City', 'نيويورك', 'نیویارک', 'न्यूयॉर्क'],
    nativeNames: {
      ar: 'نيويورك',
      ur: 'نیویارک',
      hi: 'न्यूयॉर्क',
    },
  },
  {
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    region: 'Illinois',
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: 'America/Chicago',
    slug: 'chicago',
    countrySlug: 'united-states',
    aliases: ['شيكاغو', 'شکاگو', 'शिकागो'],
    nativeNames: {
      ar: 'شيكاغو',
      ur: 'شکاگو',
    },
  },
  {
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    region: 'California',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles',
    slug: 'los-angeles',
    countrySlug: 'united-states',
    aliases: ['LA', 'لوس أنجلوس', 'لاس اینجلس', 'लॉस एंजिल्स'],
    nativeNames: {
      ar: 'لوس أنجلوس',
      ur: 'لاس اینجلس',
    },
  },
  {
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    region: 'Ontario',
    latitude: 43.6532,
    longitude: -79.3832,
    timezone: 'America/Toronto',
    slug: 'toronto',
    countrySlug: 'canada',
    aliases: ['تورونتو', 'ٹورنٹو', 'टोरंटो'],
    nativeNames: {
      ar: 'تورونتو',
      ur: 'ٹورنٹو',
    },
  },
  {
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    region: 'New South Wales',
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: 'Australia/Sydney',
    slug: 'sydney',
    countrySlug: 'australia',
    aliases: ['سيدني', 'سڈنی', 'सिडनी'],
    nativeNames: {
      ar: 'سيدني',
      ur: 'سڈنی',
    },
  },
];

export const GLOBAL_CITIES: EnrichedCity[] = POPULAR_CITIES;

export const DEFAULT_LOCATION: EnrichedCity = POPULAR_CITIES[0]; // Makkah

/**
 * Normalizes text for multi-lingual search:
 * - strips Arabic diacritics (tashkeel)
 * - lowercases Latin strings
 * - normalizes common Urdu/Arabic variations
 */
export function normalizeSearchString(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    // Remove Arabic Tashkeel / Harakat
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef forms (أ, إ, آ -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Ta Marbuta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Normalize Ya forms (ى -> ي)
    .replace(/ى/g, 'ي')
    // Normalize Urdu Yeh forms (ے -> ی)
    .replace(/ے/g, 'ی')
    .replace(/ک/g, 'ك')
    .replace(/گ/g, 'ك');
}

export function searchCities(query: string): EnrichedCity[] {
  if (!query || !query.trim()) return GLOBAL_CITIES;
  const rawQ = query.trim().toLowerCase();
  const normQ = normalizeSearchString(query);

  return GLOBAL_CITIES.filter((c) => {
    // English city/country/region matches
    if (
      c.city.toLowerCase().includes(rawQ) ||
      c.country.toLowerCase().includes(rawQ) ||
      (c.region && c.region.toLowerCase().includes(rawQ)) ||
      c.slug.includes(rawQ)
    ) {
      return true;
    }

    // Check aliases
    if (
      c.aliases.some((alias) => {
        const normAlias = normalizeSearchString(alias);
        return alias.toLowerCase().includes(rawQ) || normAlias.includes(normQ);
      })
    ) {
      return true;
    }

    // Check native names
    if (c.nativeNames) {
      for (const val of Object.values(c.nativeNames)) {
        if (val && normalizeSearchString(val).includes(normQ)) {
          return true;
        }
      }
    }

    return false;
  });
}

export function getCityBySlug(slug: string): EnrichedCity | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase().trim().replace(/_/g, '-');
  return GLOBAL_CITIES.find(
    (c) =>
      c.slug === s ||
      c.city.toLowerCase() === s ||
      c.city.toLowerCase().replace(/\s+/g, '-') === s
  );
}
