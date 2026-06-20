// src/components/Footer.tsx
'use client';

import { Recycle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone/20 bg-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 font-display text-sm font-bold text-cream">
          <Recycle className="h-4 w-4 text-copper" />
          Libyan Scrap Market
        </div>
        <p className="font-body text-xs text-cream/60">{t('footer_tagline')}</p>
        <p className="font-mono text-xs text-cream/40">
          © {new Date().getFullYear()} Libyan Scrap Market — {t('footer_rights')}
        </p>
      </div>
    </footer>
  );
}
