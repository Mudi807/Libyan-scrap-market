// src/app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Libyan Scrap Market | سوق الخردة الليبي',
  description:
    'Libya\'s marketplace for buying, selling, and recycling scrap metal, plastic, electronics, and paper.',
  keywords: ['scrap', 'recycling', 'Libya', 'metal', 'خردة', 'تدوير', 'ليبيا'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body`}>
        <LanguageProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
