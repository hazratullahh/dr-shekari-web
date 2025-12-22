import MedicalAnimationProvider from '@/components/animations/MedicalAnimationProvider';
import HeroSection from '@/components/home/Hero';
import Specialties from '@/components/home/Specialties';
import StatsSection from '@/components/home/StatsSection';
import Testimonials from '@/components/home/Testimonials';
import LoadingFallback from '@/components/ui/LoadingFallback';
import { Suspense } from 'react';

// export const metadata = {
//   title: 'Advanced Urology, Andrology & Endourology Specialist',
//   description: 'Comprehensive urological care with state-of-the-art technology. Expert treatment for kidney stones, prostate conditions, and male reproductive health.',
// };

export const metadata = {
  metadataBase: new URL('https://dr-shekari.com'),
  title: {
    default: 'Dr. Nazir Ahmad Shekari | Urologist, Andrologist and Endouroiogist, Andrology & EndoUrologist, Andrologist and Endouroiogist Specialist',
    template: '%s | Assistant Dr. Mansour Ahmad Wayar'
  },
  description: 'Dr. Nazir Ahmad Shekari and Professor Assistant Dr. Mansour Ahmad Wayar provides advanced urological care, andrology, and endoUrologist, Andrologist and Endouroiogist treatments. Expert in kidney stones, prostate health, and male fertility.',
  keywords: ['Urologist, Andrologist and Endouroiogist specialist', 'andrology', 'endoUrologist, Andrologist and Endouroiogist', 'kidney stones', 'prostate treatment', 'male fertility', 'Dr. Nazir Ahmad Shekari', 'urologist near me'],
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  creator: 'Dr. Nazir Ahmad Shekari Clinic',
  publisher: 'Dr. Nazir Ahmad Shekari Clinic',
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
    siteName: 'Dr. Shekari Urologist, Andrologist and Endouroiogist Clinic',
    title: 'Dr. Nazir Ahmad Shekari | Urologist, Andrologist and Endouroiogist Specialist',
    description: 'Advanced urological care with cutting-edge technology and compassionate approach',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari - Urologist, Andrologist and Endouroiogist Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Nazir Ahmad Shekari | Urologist, Andrologist and Endouroiogist Specialist',
    description: 'Advanced urological care with cutting-edge technology',
    images: ['/twitter-image.jpg'],
    creator: '@DrShekariUro',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://dr-shekari.com',
    languages: {
      'en-US': 'https://dr-shekari.com/en',
    },
  },
  category: 'healthcare',
};

export default function Home() {
  return (
    <>
      <MedicalAnimationProvider type="homes" />
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <HeroSection />
      </Suspense>
      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Specialties />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Testimonials />
      </Suspense> */}
    </>
  );
}