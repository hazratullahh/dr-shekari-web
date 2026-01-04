import './globals.css';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/ui/LoadingFallback';
import InstallAppBanner from '@/components/InstallAppBanner';
import MedicalSchema from '@/components/MedicalSchema';
import InstallButton from '@/components/InstallButton';

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
        url: '/images/og/og-premium.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari and Dr. Mansour Wayar - Afghanistan\'s Top Urologists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afghanistan\'s #1 Urologists - Dr. Shekari & Dr. Wayar',
    description: 'Premier urological care with unmatched expertise in kidney stones, prostate health, and male fertility',
    images: ['/images/twitter/twitter-premium.jpg'],
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
    'application-name': 'Dr. Shekari Urology Clinic',
    'msapplication-TileColor': '#E9756D',
    'theme-color': '#E9756D',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ===== PWA REQUIRED TAGS ===== */}
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#E9756D" />
        <meta name="msapplication-TileColor" content="#E9756D" />
        
        {/* Apple Specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" /> {/* Changed from black-translucent */}
        <meta name="apple-mobile-web-app-title" content="Dr. Shekari Clinic" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Icon Definitions - ALL REQUIRED */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-chrome-512x512.png" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#E9756D" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Viewport - IMPORTANT FOR MOBILE */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Mobile Web App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* ===== PERFORMANCE & SEO ===== */}
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Disable automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* ===== SECURITY HEADERS ===== */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" />
      </head>
      <body className={`${inter.className} bg-[#FDF5EE] antialiased`}>
        {/* Structured Data for SEO */}
        <MedicalSchema />
        
        {/* Main Content with Suspense */}
        <Suspense fallback={<LoadingFallback type="full-page" />}>
          <Header />
          <main className="min-h-screen pt-16"> {/* Added pt-16 for fixed header */}
            {children}
          </main>
          <Footer />
        </Suspense>
        
        {/* Mobile Install App Banner */}
        <InstallAppBanner />
        <InstallButton />
        
        {/* Service Worker Registration - UPDATED */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('✅ Service Worker registered');
                    })
                    .catch(function(error) {
                      console.log('❌ Service Worker failed:', error);
                    });
                });
              }
              
              // Force show install button after 3 seconds
              setTimeout(() => {
                const installBtn = document.querySelector('[data-install-button]');
                if (installBtn) {
                  installBtn.style.display = 'flex';
                }
              }, 3000);
            `
          }}
        />
        
        {/* PWA Detection Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Check if app is already installed
              window.isPWAInstalled = false;
              
              if (window.matchMedia('(display-mode: standalone)').matches || 
                  window.navigator.standalone === true) {
                window.isPWAInstalled = true;
                console.log('📱 App is running in standalone mode');
              }
              
              // Check for iOS standalone mode
              if (window.navigator.standalone) {
                window.isPWAInstalled = true;
              }
            `
          }}
        />
      </body>
    </html>
  );
}