import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChoose from '@/components/home/WhyChoose';
import ProcessFlow from '@/components/home/ProcessFlow';
import Testimonials from '@/components/home/Testimonials';
import HomeFAQ from '@/components/home/HomeFAQ';
import CTABanner from '@/components/home/CTABanner';
import HomeStructuredData from '@/components/home/HomeStructuredData';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr-shekari.com';

export const metadata = {
  metadataBase: new URL(SITE),
  title:
    'Dr. Nazir Ahmad Shekari — Urological Surgeon · Endourology & Andrology Specialist',
  description:
    'Dr. Nazir Ahmad Shekari is a leading urological surgeon in Afghanistan specializing in endourology and andrology. Advanced minimally-invasive treatment for kidney stones, prostate disease, urinary tract conditions, and male infertility. Book your consultation in Herat.',
  keywords: [
    'Dr. Nazir Ahmad Shekari',
    'Urological Surgeon Afghanistan',
    'Endourology Specialist',
    'Andrology Specialist',
    'Best Urologist Herat',
    'Kidney Stone Surgery Afghanistan',
    'Prostate Treatment Herat',
    'Male Infertility Specialist',
    'Laser Stone Treatment Afghanistan',
    'Urology Clinic Herat',
    'Jami Hospital Urologist',
    'دکتر نذیر احمد شیكری',
  ],
  authors: [{ name: 'Dr. Nazir Ahmad Shekari', url: SITE }],
  creator: 'Dr. Nazir Ahmad Shekari',
  publisher: 'Dr. Shekari Urology Clinic',
  category: 'Healthcare',
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
    url: SITE,
    siteName: 'Dr. Shekari Urology Clinic',
    title:
      'Dr. Nazir Ahmad Shekari — Urological Surgeon, Endourology & Andrology Specialist',
    description:
      'Leading urological surgeon in Afghanistan. Advanced minimally-invasive care for kidney stones, prostate, andrology, and endourology.',
    images: [
      {
        url: '/images/og-premium.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari — Urological Surgeon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Nazir Ahmad Shekari — Urological Surgeon',
    description:
      'Endourology & Andrology specialist in Afghanistan. Book your consultation.',
    images: ['/images/og-premium.jpg'],
  },
  alternates: {
    canonical: SITE,
    languages: {
      'en-US': `${SITE}/en`,
      'fa-AF': `${SITE}/fa`,
      'ps-AF': `${SITE}/ps`,
    },
  },
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="card" />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ServicesGrid />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <WhyChoose />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ProcessFlow />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <HomeFAQ />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <CTABanner />
      </Suspense>
      <HomeStructuredData />
    </>
  );
}
