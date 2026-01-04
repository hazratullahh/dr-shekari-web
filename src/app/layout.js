import './globals.css';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/ui/LoadingFallback';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://dr-shekari.com'),
  title: {
    default: 'Dr. Nazir Ahmad Shekari & Dr. Mansour Wayar | Afghanistan\'s Top Urologists & Andrologists',
    template: '%s | #1 Urology Center in Afghanistan'
  },
  description: 'Recognized as Afghanistan\'s foremost medical experts, Dr. Nazir Ahmad Shekari and Professor Dr. Mansour Ahmad Wayar provide world-class urological, andrological, and endourological care. Premier specialists in kidney stones, prostate surgery, male fertility, and advanced endourology with exceptional success rates.',
  keywords: [
    'Best Urologist in Afghanistan',
    'Top Andrologist Kabul',
    '#1 Doctor Afghanistan',
    'Dr. Nazir Ahmad Shekari',
    'Dr. Mansour Ahmad Wayar',
    'Dr. Shekari Urologist',
    'Dr. Mansoor Ahmad Weyar',
    'Dr. Nazer Ahmad Shekari',
    'Kidney Stone Specialist Afghanistan',
    'Best Prostate Treatment Kabul',
    'Male Fertility Expert Afghanistan',
    'Endourology Surgery Specialist',
    'Best Urology Clinic Kabul',
    'Afghanistan Kidney Hospital',
    'Top Medical Center Kabul',
    'Advanced Laparoscopic Urology',
    'Minimally Invasive Surgery Afghanistan',
    'Pediatric Urology Specialist',
    'Erectile Dysfunction Treatment Kabul',
    'Urinary Tract Surgery Expert'
  ],
  authors: [
    { name: 'Dr. Nazir Ahmad Shekari' },
    { name: 'Professor Dr. Mansour Ahmad Wayar' }
  ],
  creator: 'Afghanistan Premier Urology Center',
  publisher: 'Dr. Shekari & Dr. Wayar Medical Institute',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dr-shekari.com',
    siteName: 'Afghanistan\'s Premier Urology & Andrology Center',
    title: 'Dr. Nazir Shekari & Dr. Mansour Wayar | #1 Urologists in Afghanistan',
    description: 'Experience world-class urological care from Afghanistan\'s most distinguished doctors. Advanced treatments for kidney, prostate, and male reproductive health.',
    images: [
      {
        url: '/og-premium.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari and Dr. Mansour Wayar - Afghanistan\'s Top Urologists',
      },
      {
        url: '/og-premium.jpg',
        width: 1200,
        height: 630,
        alt: 'Advanced Urology Center Kabul - Best Medical Facility in Afghanistan',
      }
    ],
    videos: [
      {
        url: '/videos/clinic-tour.mp4',
        width: 1920,
        height: 1080,
        type: 'video/mp4',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afghanistan\'s #1 Urologists - Dr. Shekari & Dr. Wayar',
    description: 'Premier urological care with unmatched expertise in kidney stones, prostate health, and male fertility',
    images: ['/twitter-premium.jpg'],
    creator: '@AfghanTopDoctors',
    site: '@AfghanTopDoctors',
  },
  verification: {
    google: 'your-google-verification-code',
    bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://dr-shekari.com',
    languages: {
      'en-US': 'https://dr-shekari.com/en',
      'fa-AF': 'https://dr-shekari.com/fa',
      'ps-AF': 'https://dr-shekari.com/ps',
    },
  },
  category: 'healthcare',
  classification: 'medical specialist',
  rating: 'GA',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  other: {
    'dc:creator': 'Dr. Nazir Ahmad Shekari Medical Center',
    'application-name': 'Afghanistan Urology Excellence',
    'msapplication-TileColor': '#0066cc',
    'theme-color': '#0066cc',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E9756D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-[#FDF5EE]`}>
        <Suspense fallback={<LoadingFallback type="full-page" />}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}