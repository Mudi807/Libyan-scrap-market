// src/app/listings/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Weight, User, Calendar, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { mockListings } from '@/lib/mockData';

const MATERIAL_ICON: Record<string, string> = {
  METAL: '⚙️', PLASTIC: '♻️', ELECTRONICS: '💻', PAPER: '📦', OTHER: '🗂️',
};

export default function ListingDetailPage() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const listing = mockListings.find((l) => l.id === id);
  const [offer, setOffer] = useState('');
  const [offerSent, setOfferSent] = useState(false);

  if (!listing) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p className="font-body text-stone">Listing not found.</p>
        <Link href="/listings" className="mt-4 inline-block font-body text-sm text-copper hover:underline">
          {t('listing_detail_back')}
        </Link>
      </div>
    );
  }

  function handleOffer(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    setOfferSent(true);
  }

  function handleBuyNow() {
    if (!user) { router.push('/login'); return; }
    alert(lang === 'ar' ? 'تم تأكيد الشراء! سيتم التواصل معك.' : 'Purchase confirmed! The seller will be in touch.');
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Back */}
      <Link
        href="/listings"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-stone hover:text-copper transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('listing_detail_back')}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: images + details */}
        <div className="lg:col-span-2">
          {/* Photo area */}
          <div className="mb-6 flex h-72 items-center justify-center rounded-2xl border border-stone/15 bg-charcoal/5 text-7xl">
            {MATERIAL_ICON[listing.materialType] || '📦'}
          </div>

          {/* Title & badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-charcoal/8 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-charcoal/60">
              {listing.subtype || listing.materialType}
            </span>
            {listing.pricingType === 'BID' && (
              <span className="rounded-full bg-teal/10 px-2.5 py-1 font-mono text-xs text-teal">
                {lang === 'ar' ? 'مفتوح للعروض' : 'Open to offers'}
              </span>
            )}
            <span className="rounded-full bg-green-50 px-2.5 py-1 font-mono text-xs text-green-700">
              {listing.status}
            </span>
          </div>

          <h1 className="mb-4 font-display text-2xl font-bold text-charcoal">{listing.title}</h1>

          {listing.description && (
            <p className="mb-6 font-body text-sm leading-relaxed text-stone">{listing.description}</p>
          )}

          {/* Meta grid */}
          <div className="grid gap-4 rounded-xl border border-stone/15 bg-white p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Weight className="mt-0.5 h-4 w-4 text-copper" />
              <div>
                <p className="font-body text-xs text-stone">{t('listing_detail_weight')}</p>
                <p className="font-mono text-sm font-bold text-charcoal">
                  {listing.estimatedWeightKg} kg
                </p>
              </div>
            </div>
            {listing.address && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-copper" />
                <div>
                  <p className="font-body text-xs text-stone">{t('listing_detail_location')}</p>
                  <p className="font-mono text-sm font-bold text-charcoal">{listing.address}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-4 w-4 text-copper" />
              <div>
                <p className="font-body text-xs text-stone">{t('listing_detail_seller')}</p>
                <p className="font-mono text-sm font-bold text-charcoal">{listing.seller?.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-copper" />
              <div>
                <p className="font-body text-xs text-stone">Listed</p>
                <p className="font-mono text-sm font-bold text-charcoal">
                  {new Date(listing.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-LY' : 'en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: pricing + action panel */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-stone/20 bg-white p-6 shadow-sm">
            {/* Price */}
            <div className="mb-5 border-b border-stone/10 pb-5">
              <p className="font-body text-xs text-stone">{t('listing_detail_price')}</p>
              {listing.pricePerKg ? (
                <div className="mt-1">
                  <span className="font-mono text-3xl font-bold text-charcoal">
                    {listing.pricePerKg}
                  </span>
                  <span className="ms-1 font-body text-sm text-stone">LYD / kg</span>
                  <p className="mt-1 font-mono text-xs text-stone">
                    ≈ {(listing.pricePerKg * listing.estimatedWeightKg).toLocaleString()} LYD {lang === 'ar' ? 'إجمالي' : 'total'}
                  </p>
                </div>
              ) : (
                <p className="mt-1 font-body text-sm text-stone">{t('listings_or_best_offer')}</p>
              )}
            </div>

            {/* Actions */}
            {offerSent ? (
              <div className="rounded-lg bg-teal/10 p-4 text-center">
                <p className="font-body text-sm font-semibold text-teal">
                  {lang === 'ar' ? '✓ تم إرسال عرضك!' : '✓ Offer sent!'}
                </p>
                <p className="mt-1 font-body text-xs text-stone">
                  {lang === 'ar' ? 'سيتواصل معك البائع.' : 'The seller will be in touch.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {listing.pricingType === 'FIXED' && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full rounded-lg bg-charcoal py-3 font-body text-sm font-semibold text-cream hover:bg-teal transition-colors"
                  >
                    {t('listing_detail_buy_now')}
                  </button>
                )}

                <form onSubmit={handleOffer} className="space-y-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder={t('listing_detail_offer_placeholder')}
                    className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 font-mono text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!offer}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-charcoal/30 py-2.5 font-body text-sm font-semibold text-charcoal hover:border-copper hover:text-copper disabled:opacity-40 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    {t('listing_detail_submit_offer')}
                  </button>
                </form>

                {!user && (
                  <p className="text-center font-body text-xs text-stone">
                    <Link href="/login" className="text-copper hover:underline font-semibold">
                      {t('nav_login')}
                    </Link>{' '}
                    {lang === 'ar' ? 'للمتابعة' : 'to continue'}
                  </p>
                )}
              </div>
            )}

            <button className="mt-4 w-full rounded-lg border border-stone/20 py-2.5 font-body text-sm text-stone hover:border-copper hover:text-copper transition-colors">
              {t('listing_detail_schedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
