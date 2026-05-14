import './globals.css';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomTabBar from '@/components/layout/BottomTabBar';
import LoadingFallback from '@/components/ui/LoadingFallback';
import MedicalSchema from '@/components/MedicalSchema';

import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import OfflineBanner from '@/components/pwa/OfflineBanner';
import PageTransition from '@/components/pwa/PageTransition';
import SmoothScroll from '@/components/scroll/SmoothScroll';
import ScrollProgress from '@/components/scroll/ScrollProgress';

import { NextIntlClientProvider, hasLocale } from 'next- intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '- - font- inter',
});

const SITE = 'https://dr- shekari.com';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      'Dr. Nazir Ahmad Shekari - Urological Surgeon · Endourology & Andrology Specialist',
    template: '%s | Dr. Shekari Urology Clinic',
  },
  description:
    'Dr. Nazir Ahmad Shekari is a leading urological surgeon in Afghanistan specializing in endourology and andrology. Advanced minimally- invasive treatment for kidney stones, prostate disease, urinary tract conditions, and male infertility.',
  applicationName: 'Dr. Shekari Clinic',
  appleWebApp: {
    capable: true,
    title: 'Dr. Shekari',
    statusBarStyle: 'default',
  },
  keywords: [
    'Dr. Nazir Ahmad Shekari',
    'Urological Surgeon Afghanistan',
    'Endourology Specialist',
    'Andrology Specialist',
    'Best Urologist Herat',
    'Kidney Stone Surgery',
    'Prostate Treatment Afghanistan',
    'Male Infertility Specialist',
    'Laser Stone Treatment',
    'Urology Clinic Herat',
    'Jami Hospital Urologist',
    'Dr Shekari',
    'دکتر نذیر احمد شیكری',
    'بهترین داکتر یورولوژی در افغانستان',
  ],
  authors: [{ name: 'Dr. Nazir Ahmad Shekari', url: SITE }],
  creator: 'Dr. Nazir Ahmad Shekari',
  publisher: 'Dr. Shekari Urology Clinic',
  category: 'Healthcare',
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max- video- preview': - 1,
      'max- image- preview': 'large',
      'max- snippet': - 1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Dr. Shekari Urology Clinic',
    title:
      'Dr. Nazir Ahmad Shekari - Urological Surgeon · Endourology & Andrology Specialist',
    description:
      'Leading urological surgeon in Afghanistan. Advanced minimally- invasive care for kidney stones, prostate, andrology, and endourology.',
    images: [
      {
        url: '/images/og- premium.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari - Urological Surgeon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Nazir Ahmad Shekari - Urological Surgeon',
    description:
      'Endourology & Andrology specialist in Afghanistan. Book your consultation.',
    images: ['/images/og- premium.jpg'],
  },
  alternates: {
    canonical: SITE,
    languages: {
      'en- US': `${SITE}/en`,
      'fa- AF': `${SITE}/fa`,
      'ps- AF': `${SITE}/ps`,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon- 192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon- 512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple- touch- icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon- 152x152.png', sizes: '152x152', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'mobile- web- app- capable': 'yes',
    'apple- mobile- web- app- capable': 'yes',
    'apple- mobile- web- app- status- bar- style': 'default',
    'apple- mobile- web- app- title': 'Dr. Shekari',
    'msapplication- TileColor': '#E9756D',
    'msapplication- tap- highlight': 'no',
  },
};

export const viewport = {
  width: 'device- width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers- color- scheme: light)', color: '#E9756D' },
    { media: '(prefers- color- scheme: dark)', color: '#D55A52' },
  ],
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isRTL = locale === 'fa' || locale === 'ps';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dr. Shekari Urology Clinic',
    url: SITE,
    inLanguage: ['en', 'fa', 'ps'],
    publisher: { '@type': 'Person', name: 'Dr. Nazir Ahmad Shekari' },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE}/search?q={search_term_string}`,
      'query- input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={`scroll- smooth ${inter.variable}`}>
      <body className={`${inter.className} bg- white text- gray- 900 antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <a
            href="#main"
            className="sr- only focus:not- sr- only focus:fixed focus:top- 2 focus:left- 2 focus:z- 100 focus:px- 3 focus:py- 2 focus:rounded- md focus:bg- [#E9756D] focus:text- white"
          >
            Skip to main content
          </a>

          <MedicalSchema />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />

          <ServiceWorkerRegister />
          <SmoothScroll />
          <ScrollProgress />
          <OfflineBanner />

          <Header />
          <main id="main" className="min- h- screen pb- 20 lg:pb- 0">
            <Suspense fallback={<LoadingFallback type="full- page" />}>
              <PageTransition>{children}</PageTransition>
            </Suspense>
          </main>
          <Footer />
          <BottomTabBar />

          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
