// src/app/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Scale, MapPin, BadgeCheck, Zap } from 'lucide-react';
import PriceTicker from '@/components/PriceTicker';
import { useLanguage } from '@/context/LanguageContext';

const MATERIAL_ICONS: Record<string, string> = {
  METAL: '⚙️',
  PLASTIC: '♻️',
  ELECTRONICS: '💻',
  PAPER: '📦',
};

export default function HomePage() {
  const { t } = useLanguage();

  const materials = [
    { key: 'METAL', label: t('material_metal') },
    { key: 'PLASTIC', label: t('material_plastic') },
    { key: 'ELECTRONICS', label: t('material_electronics') },
    { key: 'PAPER', label: t('material_paper') },
  ];

  const features = [
    {
      icon: <Scale className="h-5 w-5 text-copper" />,
      title: lang === 'ar' ? 'تسعير شفاف' : 'Transparent pricing',
      desc: lang === 'ar'
        ? 'سعر ثابت أو منافسة بالعروض — أنت تتحكم.'
        : 'Fixed rate or competitive bidding — you stay in control.',
    },
    {
      icon: <MapPin className="h-5 w-5 text-copper" />,
      title: lang === 'ar' ? 'استلام من موقعك' : 'Pickup from your site',
      desc: lang === 'ar'
        ? 'جدوِل موعد الاستلام مباشرة مع المشتري.'
        : 'Schedule collection directly with the buyer.',
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-copper" />,
      title: lang === 'ar' ? 'مشترون موثوقون' : 'Verified buyers',
      desc: lang === 'ar'
        ? 'معامل تدوير ومصانع معتمدة فقط.'
        : 'Recyclers and foundries only, vetted by us.',
    },
    {
      icon: <Zap className="h-5 w-5 text-copper" />,
      title: lang === 'ar' ? 'سريع وبسيط' : 'Fast & simple',
      desc: lang === 'ar'
        ? 'أنشئ قائمة في أقل من دقيقتين.'
        : 'Create a listing in under two minutes.',
    },
  ];

  const { lang } = useLanguage();

  return (
    <>
      {/* Price ticker */}
      <PriceTicker />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        {/* Decorative mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#0F2A2E 39px,#0F2A2E 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0F2A2E 39px,#0F2A2E 40px)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-36">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-copper/30 bg-copper/5 px-3 py-1 font-mono text-xs text-copper">
              {lang === 'ar' ? 'ليبيا · سوق الخردة' : 'Libya · Scrap Marketplace'}
            </span>
            <h1 className="font-display text-5xl font-bold leading-tight text-charcoal sm:text-6xl">
              {t('hero_title')}
            </h1>
            <p className="mt-5 font-body text-lg leading-relaxed text-stone">
              {t('hero_subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/listings"
                className="flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 font-body text-sm font-semibold text-cream transition-colors hover:bg-teal"
              >
                {t('hero_cta_browse')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/create-listing"
                className="flex items-center gap-2 rounded-full border border-charcoal/30 bg-transparent px-6 py-3 font-body text-sm font-semibold text-charcoal transition-colors hover:border-copper hover:text-copper"
              >
                {t('hero_cta_sell')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Materials strip */}
      <section className="border-y border-stone/15 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="mb-6 font-display text-xs font-bold uppercase tracking-widest text-stone">
            {t('materials_title')}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {materials.map((m) => (
              <Link
                key={m.key}
                href={`/listings?material=${m.key}`}
                className="group flex items-center gap-3 rounded-xl border border-stone/15 bg-cream/60 px-4 py-4 transition-all hover:border-copper/40 hover:bg-copper/5"
              >
                <span className="text-2xl">{MATERIAL_ICONS[m.key]}</span>
                <span className="font-display text-sm font-semibold text-charcoal group-hover:text-copper">
                  {m.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="mb-12 font-display text-3xl font-bold text-charcoal">{t('how_title')}</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Sellers */}
          <div className="rounded-2xl border border-stone/15 bg-white p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full bg-copper/10 px-3 py-1 font-mono text-xs font-bold text-copper">
                01
              </span>
              <h3 className="font-display text-lg font-bold text-charcoal">
                {t('how_seller_title')}
              </h3>
            </div>
            <ol className="space-y-4">
              {[t('how_seller_1'), t('how_seller_2'), t('how_seller_3')].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-charcoal font-mono text-[10px] text-cream">
                    {i + 1}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-stone">{step}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/create-listing"
              className="mt-6 inline-flex items-center gap-1 font-body text-sm font-semibold text-copper hover:underline"
            >
              {t('hero_cta_sell')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Buyers */}
          <div className="rounded-2xl border border-stone/15 bg-white p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full bg-teal/10 px-3 py-1 font-mono text-xs font-bold text-teal">
                02
              </span>
              <h3 className="font-display text-lg font-bold text-charcoal">
                {t('how_buyer_title')}
              </h3>
            </div>
            <ol className="space-y-4">
              {[t('how_buyer_1'), t('how_buyer_2'), t('how_buyer_3')].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal font-mono text-[10px] text-cream">
                    {i + 1}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-stone">{step}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/listings"
              className="mt-6 inline-flex items-center gap-1 font-body text-sm font-semibold text-teal hover:underline"
            >
              {t('hero_cta_browse')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-cream/10 p-6">
                <div className="mb-3">{f.icon}</div>
                <h3 className="mb-2 font-display text-sm font-bold text-cream">{f.title}</h3>
                <p className="font-body text-xs leading-relaxed text-cream/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-2xl bg-copper/10 border border-copper/20 px-8 py-12 text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal">
            {lang === 'ar' ? 'جاهز للبدء؟' : 'Ready to start?'}
          </h2>
          <p className="mt-3 font-body text-sm text-stone">
            {lang === 'ar'
              ? 'أنشئ حسابك مجاناً في ثوانٍ.'
              : 'Create your free account in seconds.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-charcoal px-6 py-3 font-body text-sm font-semibold text-cream hover:bg-teal transition-colors"
            >
              {t('nav_signup')}
            </Link>
            <Link
              href="/listings"
              className="rounded-full border border-charcoal/30 px-6 py-3 font-body text-sm font-semibold text-charcoal hover:border-copper hover:text-copper transition-colors"
            >
              {t('hero_cta_browse')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
