import { SupportedLanguage, SUPPORTED_LANGUAGES } from './seoData';

export interface SeoMetaConfig {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/prayer-times/makkah"
  language?: SupportedLanguage;
  ogType?: 'website' | 'article';
  breadcrumbs?: Array<{ name: string; path: string }>;
  faqs?: Array<{ q: string; a: string }>;
}

const BASE_URL = 'https://prayerstime.online';

export function updateSeoTags(config: SeoMetaConfig): void {
  const {
    title,
    description,
    canonicalPath,
    language = 'en',
    ogType = 'website',
    breadcrumbs = [],
    faqs = [],
  } = config;

  // 1. Update Title
  document.title = title;

  // 2. Set HTML Lang and Direction
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';

  // 3. Update or create Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 4. Update Canonical with proper language prefix and trailing slash
  let cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  // Strip any existing language prefix from cleanPath (e.g. /ar/prayer-times -> /prayer-times)
  for (const lang of SUPPORTED_LANGUAGES) {
    if (cleanPath === `/${lang.code}` || cleanPath === `/${lang.code}/`) {
      cleanPath = '/';
      break;
    } else if (cleanPath.startsWith(`/${lang.code}/`)) {
      cleanPath = cleanPath.replace(`/${lang.code}`, '');
      break;
    }
  }
  if (cleanPath !== '/' && !cleanPath.endsWith('/')) {
    cleanPath = `${cleanPath}/`;
  }

  const canonicalUrl =
    language === 'en'
      ? (cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`)
      : (cleanPath === '/' ? `${BASE_URL}/${language}/` : `${BASE_URL}/${language}${cleanPath}`);

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 5. Update Open Graph Tags
  const ogImageUrl = `${BASE_URL}/pwa-512x512.png`;
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', canonicalUrl);
  setMetaProperty('og:type', ogType);
  setMetaProperty('og:site_name', 'Prayerstime');
  setMetaProperty('og:image', ogImageUrl);
  setMetaProperty('og:locale', getLocaleCode(language));

  // 6. Update Twitter Card Tags
  setMetaProperty('twitter:title', title);
  setMetaProperty('twitter:description', description);
  setMetaProperty('twitter:card', 'summary_large_image');
  setMetaProperty('twitter:image', ogImageUrl);

  // 7. Update Hreflang Alternates (Path-based URLs)
  updateHreflangTags(cleanPath);

  // 8. Injected JSON-LD Schema
  updateJsonLd(canonicalUrl, title, description, breadcrumbs, faqs, language);
}

function setMetaProperty(nameOrProp: string, content: string): void {
  let el =
    document.querySelector(`meta[property="${nameOrProp}"]`) ||
    document.querySelector(`meta[name="${nameOrProp}"]`);
  if (!el) {
    el = document.createElement('meta');
    if (nameOrProp.startsWith('og:')) {
      el.setAttribute('property', nameOrProp);
    } else {
      el.setAttribute('name', nameOrProp);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function getLocaleCode(lang: SupportedLanguage): string {
  switch (lang) {
    case 'ar':
      return 'ar_SA';
    case 'ur':
      return 'ur_PK';
    case 'hi':
      return 'hi_IN';
    case 'id':
      return 'id_ID';
    case 'tr':
      return 'tr_TR';
    case 'bn':
      return 'bn_BD';
    case 'fr':
      return 'fr_FR';
    default:
      return 'en_US';
  }
}

function updateHreflangTags(cleanPath: string): void {
  // Remove existing dynamic hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  // 1. Add x-default
  const xDefault = document.createElement('link');
  xDefault.setAttribute('rel', 'alternate');
  xDefault.setAttribute('hreflang', 'x-default');
  xDefault.setAttribute('href', cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`);
  document.head.appendChild(xDefault);

  // 2. Add alternates for each supported language (path-based)
  SUPPORTED_LANGUAGES.forEach((l) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', l.code);
    const langUrl =
      l.code === 'en'
        ? (cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`)
        : (cleanPath === '/' ? `${BASE_URL}/${l.code}/` : `${BASE_URL}/${l.code}${cleanPath}`);
    link.setAttribute('href', langUrl);
    document.head.appendChild(link);
  });
}

function updateJsonLd(
  canonicalUrl: string,
  title: string,
  description: string,
  breadcrumbs: Array<{ name: string; path: string }>,
  faqs: Array<{ q: string; a: string }>,
  language: SupportedLanguage = 'en'
): void {
  let scriptEl = document.getElementById('prayerstime-seo-schema') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'prayerstime-seo-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaGraph: any[] = [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'Prayerstime',
      description: 'Check accurate prayer times today, next-prayer countdown, Qibla direction, Islamic calendar and useful daily Islamic tools with Prayerstime.',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Prayerstime',
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}/icon.svg`,
      description:
        'Independent global Islamic platform providing verified prayer times, astronomical calculations, Qibla compass, and daily Islamic tools.',
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#webapp`,
      name: 'Prayerstime',
      url: `${BASE_URL}/`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      isAccessibleForFree: true,
      description:
        'Check accurate prayer times today, next-prayer countdown, Qibla direction, Islamic calendar and useful daily Islamic tools with Prayerstime.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Accurate daily prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)',
        'Live next-prayer countdown timer',
        'Interactive monthly prayer timetable with print and CSV export',
        'Real-time Qibla compass bearing to the Kaaba',
        'Hijri Islamic calendar and key Islamic events',
        'Ramadan timetable with Suhoor and Iftar countdown',
        'Daily Dhikr and Tasbih counter',
        'Zakat calculator for gold, silver, and savings',
        'Offline PWA support with cached calculations',
      ],
    },
  ];

  // Breadcrumbs Schema
  if (breadcrumbs.length > 0) {
    schemaGraph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: bc.name,
        item: bc.path.startsWith('http') ? bc.path : `${BASE_URL}${bc.path.startsWith('/') ? bc.path : `/${bc.path}`}`,
      })),
    });
  }

  // FAQ Schema if questions are present on the page
  if (faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  // Current page item schema
  schemaGraph.push({
    '@type': 'ItemPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: title,
    description: description,
    inLanguage: language,
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
  });

  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  });
}
