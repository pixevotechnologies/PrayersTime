import React, { useEffect } from 'react';
import { ShieldCheck, BookOpen, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';

interface EditorialPolicyPageProps {
  onNavigate: (route: string) => void;
}

export const EditorialPolicyPage: React.FC<EditorialPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updateSeoTags({
      title: 'Editorial Standards & Religious Sourcing Policy | Prayerstime',
      description:
        'Our commitment to authentic Hadith citations, recognized Islamic scholarship, transparent astronomical algorithms, and respectful representation of diverse juristic schools.',
      canonicalPath: '/editorial-policy',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Editorial Policy', path: '/editorial-policy' },
      ],
    });
  }, []);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      <header className="space-y-4 border-b border-stone-200 dark:border-emerald-950/60 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Trust, Integrity & Sources</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Editorial & Sourcing Policy
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Islamic faith utilities touch the sacred daily worship of millions. We operate under strict principles of religious integrity, verifiable citations, and mathematical transparency.
        </p>
      </header>

      <section className="space-y-4 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">1. Authentic Hadith Sourcing</h2>
        <p>
          All spiritual virtues, voluntary prayer recommendations (e.g., Ishraq, Duha, Tahajjud), and devotional remembrances are cited directly from canonical Hadith collections—primarily <em>Sahih al-Bukhari</em>, <em>Sahih Muslim</em>, <em>Jami` at-Tirmidhi</em>, and <em>Sunan Abi Dawud</em>. We clearly note the collector and reference numbers so users can verify narrations directly.
        </p>
      </section>

      <section className="space-y-4 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          2. Distinction Between Calculation & Visual Moon Sighting
        </h2>
        <p>
          We provide accurate astronomical calculations for the start of lunar months and daily prayer times. However, in accordance with Islamic jurisprudence, regional authorities or national moon-sighting committees may observe crescent visibility differently. Prayerstime provides an adjustable Hijri day setting (-2 to +2 days) to allow users to align precisely with their local community.
        </p>
      </section>

      <section className="space-y-4 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          3. Juristic Diversity (Fiqh Respect)
        </h2>
        <p>
          We honor classical differences of opinion among Islamic jurists (Hanafi, Shafi'i, Maliki, and Hanbali). Wherever differences exist—such as Asr shadow length or the naming and timing of Duha and Chasht—we explain the scholarly context neutrally and allow user customization.
        </p>
      </section>

      <section className="space-y-4 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          4. Independence & Commercial Integrity
        </h2>
        <p>
          Prayerstime is completely independent and ad-free. We do not alter prayer calculations for commercial advantage or engage in keyword stuffing. Every page and tool exists to serve a genuine worshipper's need.
        </p>
      </section>

      <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold underline cursor-pointer"
        >
          ← Return to Dashboard
        </button>
        <button
          onClick={() => onNavigate('methodology')}
          className="text-xs text-stone-500 hover:text-emerald-600 underline cursor-pointer"
        >
          View Technical Methodology →
        </button>
      </div>
    </article>
  );
};
