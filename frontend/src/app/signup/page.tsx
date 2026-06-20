// src/app/signup/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Recycle, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'SELLER' as 'SELLER' | 'BUYER',
    phone: '',
    address: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    const result = await signup(form);
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message || 'Sign up failed. Please try again.');
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-stone/20 bg-white px-8 py-10 shadow-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal">
              <Recycle className="h-6 w-6 text-copper" />
            </div>
            <h1 className="font-display text-2xl font-bold text-charcoal">{t('auth_signup_title')}</h1>
            <p className="mt-1 font-body text-sm text-stone">{t('auth_signup_subtitle')}</p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <p className="font-body text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_role')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['SELLER', 'BUYER'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set('role', r)}
                    className={`rounded-lg border py-2.5 font-body text-sm font-medium transition-colors ${
                      form.role === r
                        ? 'border-charcoal bg-charcoal text-cream'
                        : 'border-stone/30 bg-cream/60 text-ink hover:border-copper hover:text-copper'
                    }`}
                  >
                    {r === 'SELLER' ? t('auth_role_seller') : t('auth_role_buyer')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_name')}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
                className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none transition-colors"
                placeholder="Mohamed Al-Asibai"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_email')}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_password')}
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 pe-10 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none transition-colors"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-stone hover:text-copper"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_phone')} <span className="text-stone">(optional)</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none transition-colors"
                placeholder="+218 91 234 5678"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-semibold text-charcoal">
                {t('auth_address')} <span className="text-stone">(optional)</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className="w-full rounded-lg border border-stone/30 bg-cream/60 px-4 py-2.5 font-body text-sm text-ink placeholder:text-stone/50 focus:border-copper focus:bg-white focus:outline-none transition-colors"
                placeholder="Tripoli, Hay Andalus"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-charcoal py-3 font-body text-sm font-semibold text-cream transition-colors hover:bg-teal disabled:opacity-60 mt-2"
            >
              {loading ? '...' : t('auth_submit_signup')}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-stone">
            {t('auth_have_account')}{' '}
            <Link href="/login" className="font-semibold text-copper hover:underline">
              {t('auth_login_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
