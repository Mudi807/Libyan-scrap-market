// src/components/PriceTicker.tsx
//
// Signature element: a scrolling commodities-style ticker showing
// indicative prices per kg for common scrap materials, in LYD.

'use client';

import { useLanguage } from '@/context/LanguageContext';
import { priceTickerData } from '@/lib/mockData';

export default function PriceTicker() {
  const { t, lang } = useLanguage();

  // Duplicate the list so the scroll loops seamlessly.
  const items = [...priceTickerData, ...priceTickerData];

  return (
    <div className="overflow-hidden border-y border-stone/20 bg-charcoal py-2.5">
      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap px-6">
            <span className="font-display text-xs font-bold tracking-wider text-cream/90">
              {lang === 'ar' ? item.ar : item.label}
            </span>
            <span className="font-mono text-xs text-copper">{item.range}</span>
            <span className="font-mono text-[10px] text-cream/40">{t('ticker_label').split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
