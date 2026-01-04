import './globals.css';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/ui/LoadingFallback';
import InstallAppBanner from '@/components/InstallAppBanner';
import MedicalSchema from '@/components/MedicalSchema';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://dr-shekari.com'),
  title: {
    default: 'Dr. Nazir Ahmad Shekari & Dr. Mansour Wayar | Afghanistan\'s Top Urologists & Andrologists',
    template: '%s | #1 Urology Center in Afghanistan'
  },
  description:
    'Recognized as Afghanistan\'s foremost medical experts, Dr. Nazir Ahmad Shekari and Professor Dr. Mansour Ahmad Wayar provide world-class urological, andrological, and endourological care.',
  keywords: [
    // ===== EXISTING KEYWORDS (KEEP AS IS) =====
    'Best Urologist in Afghanistan',
    'Top Andrologist Herat',
    '#1 Doctor Afghanistan',
    'Dr. Nazir Ahmad Shekari',
    'Dr. Mansour Ahmad Wayar',
    'Dr. Shekari Urologist',
    'Dr. Mansoor Ahmad Weyar',
    'Dr. Nazer Ahmad Shekari',
    'Kidney Stone Specialist Afghanistan',
    'Best Prostate Treatment Herat',
    'Male Fertility Expert Afghanistan',
    'Endourology Surgery Specialist',
    'Best Urology Clinic Herat',
    'Afghanistan Kidney Hospital',
    'Top Medical Center Herat',
    'Advanced Laparoscopic Urology',
    'Minimally Invasive Surgery Afghanistan',
    'Pediatric Urology Specialist',
    'Erectile Dysfunction Treatment Herat',
    'Urinary Tract Surgery Expert',

    // ===== BRAND & NAME VARIATIONS (VERY IMPORTANT) =====
    'Dr Shekari',
    'Dr Nazir Shekari',
    'Dr Nazir Ahmad Shekari Kabul',
    'Dr Mansour Wayar',
    'Dr Mansoor Ahmad Wayar Kabul',
    'Shekari Urology Center',
    'Shekari Medical Center',
    'Wayar Urology Specialist',

    // ===== GOOGLE SITELINK INTENT =====
    'Dr Shekari about',
    'Dr Shekari team',
    'Dr Shekari doctors',
    'Dr Shekari contact',
    'Dr Shekari clinic contact',
    'Dr Mansour Ahmad Wayar clinic contact',
    'Dr Mansour Wayar clinic contact',
    'Dr Shekari blog',
    'Dr Shekari medical articles',

    // ===== LOCATION-BASED SEO =====
    'Best urologist Kabul',
    'Best andrologist Kabul',
    'Urology clinic Kabul Afghanistan',
    'Private urology clinic Kabul',
    'Top doctor in Herat Afghanistan',
    'Best hospital for kidney stones Herat',

    // ===== SERVICE-BASED SEARCH =====
    'Kidney stone surgery Afghanistan',
    'Laser kidney stone treatment Herat',
    'Prostate surgery Afghanistan',
    'Male infertility treatment Herat',
    'Erectile dysfunction doctor Afghanistan',
    'Urinary infection specialist Herat',
    'Bladder stone treatment Afghanistan',

    // ===== TRUST & AUTHORITY SIGNALS =====
    'Experienced urologist Afghanistan',
    'Certified urologist Herat',
    'Best rated urology clinic Afghanistan',
    'Modern urology center Herat',
    'Advanced medical clinic Afghanistan',

    // ===== MULTILINGUAL SEARCH (HIGH VALUE) =====
    'دکتر شیكری',
    'دکتر نذیر احمد شیكری',
    'دکتر منصور ویار',
    'بهترین داکتر یورولوژی در افغانستان',
    'بهترین داکتر کابل',
    'کلینیک یورولوژی کابل',

    // ===== USER INTENT =====
    'Book appointment Dr Shekari',
    'Contact Dr Shekari clinic',
    'Dr Shekari phone number',
    'Dr Shekari address Kabul',
    'Dr Shekari address herat'
  ],
  authors: [
    { name: 'Dr. Nazir Ahmad Shekari' },
    { name: 'Professor Dr. Mansour Ahmad Wayar' }
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    url: 'https://dr-shekari.com',
    siteName: 'Dr Shekari',
    title: 'Dr Shekari | Urology Clinic in Afghanistan',
    images: ['/images/og/og-premium.jpg']
  },
  alternates: {
    canonical: 'https://dr-shekari.com'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ===== PWA REQUIRED TAGS ===== */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E9756D" />

        {/* ===== ICONS ===== */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        {/* ===== VIEWPORT ===== */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* ===== FIX 1: BRAND + SITELINKS SCHEMA IN HEAD ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dr Shekari",
              url: "https://dr-shekari.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://dr-shekari.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* ===== FIX 2: MEDICAL ORGANIZATION ENTITY ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: "Dr Shekari Urology Clinic",
              url: "https://dr-shekari.com",
              logo: "https://dr-shekari.com/images/logo.png",
              medicalSpecialty: "Urology",
              founder: [
                {
                  "@type": "Physician",
                  name: "Dr. Nazir Ahmad Shekari"
                },
                {
                  "@type": "Physician",
                  name: "Dr. Mansour Ahmad Wayar"
                }
              ]
            })
          }}
        />

        {/* ===== FIX 3: CSP SAFE FOR SEO + AI ===== */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https:;
          "
        />
      </head>

      <body className={`${inter.className} bg-[#FDF5EE] antialiased`}>
        {/* Existing structured data (kept) */}
        <MedicalSchema />

        <Suspense fallback={<LoadingFallback type="full-page" />}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Suspense>

        <InstallAppBanner />

        {/* EXISTING SCRIPTS (UNCHANGED) */}
        {/* Service Worker */}
        <script dangerouslySetInnerHTML={{
          __html: `
          if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            navigator.serviceWorker.register('/sw.js');
          }
        `}} />
      </body>
    </html>
  );
}
