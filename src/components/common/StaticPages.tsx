import React, { useEffect } from 'react';
import { ShieldCheck, BookOpen, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';

interface StaticPageProps {
  pageType: 'about' | 'privacy' | 'terms' | 'contact';
  onNavigate: (route: string) => void;
}

export const StaticPages: React.FC<StaticPageProps> = ({ pageType, onNavigate }) => {
  useEffect(() => {
    switch (pageType) {
      case 'about':
        updateSeoTags({
          title: 'About Prayerstime — Accurate, Ad-Free Islamic Companion',
          description:
            'Learn about Prayerstime: our mission for distraction-free, privacy-first, and astronomically accurate Islamic prayer times and tools.',
          canonicalPath: '/about',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ],
        });
        break;
      case 'privacy':
        updateSeoTags({
          title: 'Privacy Policy — Prayerstime',
          description:
            'Prayerstime prioritizes your privacy. We do not track, profile, or sell your location or personal data.',
          canonicalPath: '/privacy',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy' },
          ],
        });
        break;
      case 'terms':
        updateSeoTags({
          title: 'Terms of Service — Prayerstime',
          description:
            'Read the terms and conditions for using Prayerstime prayer calculations, Qibla compass, and daily Islamic tools.',
          canonicalPath: '/terms',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Terms of Service', path: '/terms' },
          ],
        });
        break;
      case 'contact':
        updateSeoTags({
          title: 'Contact Us — Prayerstime',
          description:
            'Get in touch with the Prayerstime team for feedback, calculation inquiries, or partnership questions.',
          canonicalPath: '/contact',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ],
        });
        break;
    }
  }, [pageType]);
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
        <span>/</span>
        <span className="capitalize text-emerald-700 dark:text-emerald-400 font-semibold">{pageType}</span>
      </div>

      {pageType === 'about' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-10 border border-stone-200 dark:border-emerald-950 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            About Prayerstime.online
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Prayerstime was conceived with a clear vision: to create a modern, elegant, and distraction-free digital companion for the global Muslim community. Existing prayer websites are frequently overburdened with loud ads, slow loading times, confusing layouts, and inaccurate calculations.
          </p>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Our Core Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f5f2ea] dark:bg-[#142320] border border-stone-200 dark:border-emerald-950 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Astronomical Accuracy</span>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Powered by scientifically verified solar position algorithms and accredited conventions (MWL, Umm al-Qura, ISNA, Egypt, Karachi).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f2ea] dark:bg-[#142320] border border-stone-200 dark:border-emerald-950 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Privacy First</span>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  No tracking pixels, no intrusive analytics, and no location harvesting. Your coordinates remain on your device.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f2ea] dark:bg-[#142320] border border-stone-200 dark:border-emerald-950 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Offline Capability</span>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  Installable as a Progressive Web App (PWA) with full offline calculation support even when traveling without signal.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f2ea] dark:bg-[#142320] border border-stone-200 dark:border-emerald-950 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase">Distraction-Free</span>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  A serene, dignified aesthetic crafted with emerald, ivory, and soft gold inspired by classic Islamic calligraphy and architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {pageType === 'privacy' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-10 border border-stone-200 dark:border-emerald-950 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Privacy Policy
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            <p>
              At <strong>Prayerstime.online</strong>, we believe user privacy is an essential trust. We do not sell your personal data or track your browsing activity across websites.
            </p>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">1. Location Information</h3>
            <p>
              When you opt to use your device GPS, your coordinates are evaluated locally in your browser to compute prayer times and compass bearing to Makkah. Your GPS coordinates are not stored on external servers or sold to third-party data brokers.
            </p>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">2. Local Storage</h3>
            <p>
              We save your selected city, calculation method, audio preferences, and theme settings in your browser's standard local storage (`localStorage`) so your preferences persist between visits.
            </p>
          </div>
        </div>
      )}

      {pageType === 'terms' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-10 border border-stone-200 dark:border-emerald-950 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Terms of Service & Scholarly Guidance
          </h1>
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            <p>
              The prayer times, Qibla directions, and Islamic calendars provided by Prayerstime.online are calculated using reputable astronomical algorithms and formulas.
            </p>
            <p>
              Users are encouraged to verify prayer schedules with their local mosque or religious authority, particularly during periods of atmospheric twilight variation or daylight saving transitions.
            </p>
          </div>
        </div>
      )}

      {pageType === 'contact' && (
        <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] p-6 sm:p-10 border border-stone-200 dark:border-emerald-950 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            Contact & Community Feedback
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            We welcome suggestions, feedback on calculation alignments, and inquiries from mosque committees worldwide.
          </p>
          <div className="p-4 rounded-2xl bg-[#f5f2ea] dark:bg-[#142320] border border-stone-200 dark:border-emerald-950 space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase block">Direct Email</span>
            <p className="text-base font-mono font-bold text-emerald-800 dark:text-emerald-300">
              salam@prayerstime.online
            </p>
            <p className="text-xs text-stone-500">
              For general inquiries, partnership, or city coordinate additions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
