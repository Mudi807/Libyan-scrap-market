// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Package, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { mockListings } from '@/lib/mockData';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone/20 border-t-copper" />
      </div>
    );
  }

  // Mock stats — replace with real API calls once listings/transactions endpoints exist
  const myListings = mockListings.slice(0, 3);
  const stats = [
    {
      label: t('dash_active_listings'),
      value: '3',
      icon: <Package className="h-5 w-5 text-copper" />,
      bg: 'bg-copper/8',
    },
    {
      label: t('dash_total_earnings'),
      value: '4,230 LYD',
      icon: <TrendingUp className="h-5 w-5 text-teal" />,
      bg: 'bg-teal/8',
    },
    {
      label: t('dash_pending_orders'),
      value: '2',
      icon: <Clock className="h-5 w-5 text-stone" />,
      bg: 'bg-stone/10',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">{t('dash_title')}</h1>
          <p className="mt-1 font-body text-sm text-stone">
            {t('dash_welcome')}, <span className="font-semibold text-charcoal">{user.name}</span>
          </p>
        </div>
        <Link
          href="/create-listing"
          className="flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 font-body text-sm font-semibold text-cream hover:bg-teal transition-colors"
        >
          <Plus className="h-4 w-4" />
          {t('dash_new_listing')}
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-stone/15 bg-white p-6">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${s.bg}`}>{s.icon}</div>
            <p className="font-mono text-2xl font-bold text-charcoal">{s.value}</p>
            <p className="mt-1 font-body text-xs text-stone">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Role badge */}
      <div className="mb-8 flex items-center gap-2">
        <span className="rounded-full border border-stone/20 bg-cream px-3 py-1 font-mono text-xs text-stone">
          {user.role}
        </span>
        <span className="font-body text-xs text-stone">{user.email}</span>
      </div>

      {/* Recent listings */}
      <div className="rounded-2xl border border-stone/15 bg-white">
        <div className="flex items-center justify-between border-b border-stone/10 px-6 py-4">
          <h2 className="font-display text-sm font-bold text-charcoal">{t('dash_recent_activity')}</h2>
          <Link
            href="/listings"
            className="flex items-center gap-1 font-body text-xs text-copper hover:underline"
          >
            {t('dash_view_listings')} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {myListings.length === 0 ? (
          <p className="px-6 py-10 text-center font-body text-sm text-stone">{t('dash_no_activity')}</p>
        ) : (
          <ul className="divide-y divide-stone/10">
            {myListings.map((listing) => (
              <li key={listing.id}>
                <Link
                  href={`/listings/${listing.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-cream/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal/5 font-mono text-lg">
                      {listing.materialType === 'METAL' ? '⚙️'
                        : listing.materialType === 'PLASTIC' ? '♻️'
                        : listing.materialType === 'ELECTRONICS' ? '💻'
                        : '📦'}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-charcoal">{listing.title}</p>
                      <p className="font-body text-xs text-stone">
                        {listing.estimatedWeightKg} kg · {listing.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    {listing.pricePerKg ? (
                      <p className="font-mono text-sm font-bold text-charcoal">
                        {listing.pricePerKg} LYD/kg
                      </p>
                    ) : (
                      <p className="font-mono text-sm text-stone">{t('listings_or_best_offer')}</p>
                    )}
                    <span className="inline-block rounded-full bg-teal/10 px-2 py-0.5 font-mono text-[10px] text-teal">
                      {listing.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
