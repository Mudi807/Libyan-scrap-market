// src/app/listings/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, MapPin, Weight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockListings } from '@/lib/mockData';
import { MaterialType, Listing } from '@/types';

const MATERIALS: { value: MaterialType | ''; label: string; ar: string }[] = [
  { value: '', label: 'All materials', ar: 'جميع المواد' },
  { value: 'METAL', label: 'Metal', ar: 'معادن' },
  { value: 'PLASTIC', label: 'Plastic', ar: 'بلاستيك' },
  { value: 'ELECTRONICS', label: 'Electronics', ar: 'إلكترونيات' },
  { value: 'PAPER', label: 'Paper', ar: 'ورق' },
  { value: 'OTHER', label: 'Other', ar: 'أخرى' },
];

const MATERIAL_ICON: Record<string, string> = {
  METAL: '⚙️', PLASTIC: '♻️', ELECTRONICS: '💻', PAPER: '📦', OTHER: '🗂️',
};

function ListingCard({ listing, lang, t }: { listing: Listing; lang: string; t: (k: any) => string }) {
  return (
    <Link href={`/listings/${listing.id}`} className="group block rounded-2xl border border-stone/15 bg-white p-5 transition-all hover:border-copper/40 hover:shadow-md">
      {/* Photo placeholder */}
      <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-charcoal/5 text-4xl">
        {MATERIAL_ICON[listing.materialType] || '📦'}
      </div>

      {/* Material badge */}
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-charcoal/8 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-charcoal/60">
          {listing.subtype || listing.materialType}
        </span>
        {listing.pricingType === 'BID' && (
          <span className="rounded-full bg-teal/10 px-2 py-0.5 font-mono text-[10px] text-teal">
            {lang === 'ar' ? 'مفتوح للعروض' : 'Open bid'}
          </span>
        )}
      </div>

      <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-copper line-clamp-2 transition-colors">
        {listing.title}
      </h3>

      <div className="mt-3 flex items-center gap-3 text-stone">
        <span className="flex items-center gap-1 font-body text-xs">
          <Weight className="h-3 w-3" />
          {listing.estimatedWeightKg} kg
        </span>
        {listing.address && (
          <span className="flex items-center gap-1 font-body text-xs">
            <MapPin className="h-3 w-3" />
            {listing.address}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {listing.pricePerKg ? (
          <div>
            <span className="font-mono text-lg font-bold text-charcoal">{listing.pricePerKg}</span>
            <span className="ms-1 font-body text-xs text-stone">LYD/{t('listings_per_kg')}</span>
          </div>
        ) : (
          <span className="font-body text-xs text-stone">{t('listings_or_best_offer')}</span>
        )}
        <span className="font-body text-xs text-stone">
          {new Date(listing.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-LY' : 'en-GB', {
            day: 'numeric', month: 'short',
          })}
        </span>
      </div>
    </Link>
  );
}

export default function ListingsPage() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const initialMaterial = (searchParams.get('material') || '') as MaterialType | '';

  const [search, setSearch] = useState('');
  const [material, setMaterial] = useState<MaterialType | ''>(initialMaterial);
  const [sort, setSort] = useState<'newest' | 'price_high' | 'price_low'>('newest');

  const filtered = useMemo(() => {
    let list = [...mockListings];
    if (material) list = list.filter((l) => l.materialType === material);
    if (search) list = list.filter((l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description?.toLowerCase().includes(search.toLowerCase()) ||
      l.address?.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sort === 'price_high') list.sort((a, b) => (b.pricePerKg ?? 0) - (a.pricePerKg ?? 0));
    if (sort === 'price_low') list.sort((a, b) => (a.pricePerKg ?? 999) - (b.pricePerKg ?? 999));
    return list;
  }, [material, search, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">{t('listings_title')}</h1>
        <p className="mt-1 font-mono text-xs text-stone">{filtered.length} {lang === 'ar' ? 'نتيجة' : 'results'}</p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن خردة...' : 'Search listings...'}
            className="w-full rounded-lg border border-stone/25 bg-white py-2.5 pe-4 ps-10 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none transition-colors"
          />
        </div>

        {/* Material filter */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="h-4 w-4 text-stone" />
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as MaterialType | '')}
            className="rounded-lg border border-stone/25 bg-white px-3 py-2.5 font-body text-sm text-ink focus:border-copper focus:outline-none"
          >
            {MATERIALS.map((m) => (
              <option key={m.value} value={m.value}>
                {lang === 'ar' ? m.ar : m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-lg border border-stone/25 bg-white px-3 py-2.5 font-body text-sm text-ink focus:border-copper focus:outline-none"
        >
          <option value="newest">{t('listings_sort_newest')}</option>
          <option value="price_high">{t('listings_sort_price_high')}</option>
          <option value="price_low">{t('listings_sort_price_low')}</option>
        </select>
      </div>

      {/* Material pill filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {MATERIALS.map((m) => (
          <button
            key={m.value}
            onClick={() => setMaterial(m.value as MaterialType | '')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-medium transition-colors ${
              material === m.value
                ? 'bg-charcoal text-cream'
                : 'border border-stone/25 bg-white text-ink hover:border-copper hover:text-copper'
            }`}
          >
            {m.value && <span>{MATERIAL_ICON[m.value]}</span>}
            {lang === 'ar' ? m.ar : m.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-body text-stone">{t('listings_empty')}</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} lang={lang} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}
