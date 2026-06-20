// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe, Recycle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone/20 bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-charcoal">
          <Recycle className="h-6 w-6 text-copper" strokeWidth={2.5} />
          <span>Libyan Scrap Market</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/listings" className="font-body text-sm text-ink hover:text-copper transition-colors">
            {t('nav_browse')}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="font-body text-sm text-ink hover:text-copper transition-colors">
                {t('nav_dashboard')}
              </Link>
              <Link
                href="/create-listing"
                className="rounded-full bg-charcoal px-4 py-2 font-body text-sm font-medium text-cream hover:bg-teal transition-colors"
              >
                {t('nav_sell')}
              </Link>
              <button onClick={logout} className="font-body text-sm text-stone hover:text-copper transition-colors">
                {t('nav_logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-body text-sm text-ink hover:text-copper transition-colors">
                {t('nav_login')}
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-charcoal px-4 py-2 font-body text-sm font-medium text-cream hover:bg-teal transition-colors"
              >
                {t('nav_signup')}
              </Link>
            </>
          )}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-full border border-stone/30 px-3 py-1.5 font-mono text-xs text-ink hover:border-copper hover:text-copper transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-stone/20 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/listings" onClick={() => setOpen(false)} className="font-body text-sm text-ink">
              {t('nav_browse')}
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="font-body text-sm text-ink">
                  {t('nav_dashboard')}
                </Link>
                <Link href="/create-listing" onClick={() => setOpen(false)} className="font-body text-sm text-ink">
                  {t('nav_sell')}
                </Link>
                <button onClick={() => { logout(); setOpen(false); }} className="text-left font-body text-sm text-stone">
                  {t('nav_logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="font-body text-sm text-ink">
                  {t('nav_login')}
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="font-body text-sm text-ink">
                  {t('nav_signup')}
                </Link>
              </>
            )}
            <button
              onClick={toggleLang}
              className="flex w-fit items-center gap-1 rounded-full border border-stone/30 px-3 py-1.5 font-mono text-xs text-ink"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
