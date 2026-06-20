// src/app/create-listing/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { MaterialType, PricingType } from '@/types';

const MATERIAL_OPTIONS: { value: MaterialType; en: string; ar: string }[] = [
  { value: 'METAL', en: 'Metal', ar: 'معادن' },
  { value: 'PLASTIC', en: 'Plastic', ar: 'بلاستيك' },
  { value: 'ELECTRONICS', en: 'Electronics', ar: 'إلكترونيات' },
  { value: 'PAPER', en: 'Paper', ar: 'ورق' },
  { value: 'OTHER', en: 'Other', ar: 'أخرى' },
];

const ICON: Record<string, string> = {
  METAL: '⚙️', PLASTIC: '♻️', ELECTRONICS: '💻', PAPER: '📦', OTHER: '🗂️',
};

export default function CreateListingPage() {
  const { t, lang } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    materialType: 'METAL' as MaterialType,
    subtype: '',
    estimatedWeightKg: '',
    pricingType: 'FIXED' as PricingType,
    pricePerKg: '',
    address: '',
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title || !form.estimatedWeightKg) {
      setError(lang === 'ar' ? 'يرجى ملء الحقول المطلوبة.' : 'Please fill in all required fields.');
      return;
    }
    if (form.pricingType === 'FIXED' && !form.pricePerKg) {
      setError(lang === 'ar' ? 'يرجى إدخال السعر.' : 'Please enter a price per kg.');
      return;
    }

    setSubmitting(true);

    // Simulate API call — replace with apiFetch('/api/listings', { method: 'POST', ... })
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push('/listings'), 2000);
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone/20 border-t-copper" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle className="h-12 w-12 text-teal" />
          <h2 className="font-display text-xl font-bold text-charcoal">
            {lang === 'ar' ? 'تم نشر القائمة!' : 'Listing published!'}
          </h2>
          <p className="font-body text-sm text-stone">
            {lang === 'ar' ? 'جاري التحويل إلى صفحة القوائم...' : 'Redirecting to listings...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">{t('create_title')}</h1>
        <p className="mt-1 font-body text-sm text-stone">{t('create_subtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="font-body text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Material type */}
        <div>
          <label className="mb-2 block font-body text-xs font-semibold text-charcoal">
            {t('create_material_type')} *
          </label>
          <div className="grid grid-cols-5 gap-2">
            {MATERIAL_OPTIONS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => set('materialType', m.value)}
                className={`flex flex-col items-center gap-1 rounded-xl border py-3 transition-all ${
                  form.materialType === m.value
                    ? 'border-charcoal bg-charcoal text-cream'
                    : 'border-stone/25 bg-white text-ink hover:border-copper hover:text-copper'
                }`}
              >
                <span className="text-xl">{ICON[m.value]}</span>
                <span className="font-body text-[10px] font-medium">
                  {lang === 'ar' ? m.ar : m.en}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
            {t('create_listing_title')} *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            required
            placeholder={t('create_listing_title_placeholder')}
            className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
            {t('create_description')}
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            placeholder={t('create_description_placeholder')}
            className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none transition-colors"
          />
        </div>

        {/* Subtype + Weight */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
              {t('create_subtype')}
            </label>
            <input
              type="text"
              value={form.subtype}
              onChange={(e) => set('subtype', e.target.value)}
              placeholder={t('create_subtype_placeholder')}
              className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
              {t('create_weight')} *
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={form.estimatedWeightKg}
              onChange={(e) => set('estimatedWeightKg', e.target.value)}
              required
              placeholder="120"
              className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none"
            />
          </div>
        </div>

        {/* Pricing */}
        <div>
          <label className="mb-2 block font-body text-xs font-semibold text-charcoal">
            {t('create_pricing_type')} *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['FIXED', 'BID'] as PricingType[]).map((pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => set('pricingType', pt)}
                className={`rounded-lg border py-2.5 font-body text-sm font-medium transition-colors ${
                  form.pricingType === pt
                    ? 'border-charcoal bg-charcoal text-cream'
                    : 'border-stone/25 bg-white text-ink hover:border-copper hover:text-copper'
                }`}
              >
                {pt === 'FIXED' ? t('create_pricing_fixed') : t('create_pricing_bid')}
              </button>
            ))}
          </div>

          {form.pricingType === 'FIXED' && (
            <div className="mt-3">
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('create_price')} *
              </label>
              <div className="relative">
                <span className="absolute start-3 top-1/2 -translate-y-1/2 font-mono text-xs text-stone">
                  LYD
                </span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.pricePerKg}
                  onChange={(e) => set('pricePerKg', e.target.value)}
                  placeholder="8.50"
                  className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 ps-12 font-mono text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
            {t('create_address')}
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder={lang === 'ar' ? 'طرابلس، حي الأندلس' : 'Tripoli, Hay Andalus'}
            className="w-full rounded-lg border border-stone/30 bg-white px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:outline-none"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
            {t('create_photos')}
          </label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-stone/30 bg-white px-6 py-8 text-center transition-colors hover:border-copper hover:bg-copper/3">
            <Upload className="h-8 w-8 text-stone" />
            <span className="font-body text-sm text-stone">{t('create_photos_hint')}</span>
            {photos.length > 0 && (
              <span className="font-mono text-xs text-teal">
                {photos.length} {lang === 'ar' ? 'ملفات محددة' : 'files selected'}
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotos}
              className="sr-only"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-charcoal py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-teal disabled:opacity-60"
        >
          {submitting
            ? lang === 'ar' ? 'جاري النشر...' : 'Publishing...'
            : t('create_submit')}
        </button>
      </form>
    </div>
  );
}
