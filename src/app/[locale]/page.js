import { Suspense } from 'react';
import { getTranslations } from 'next- intl/server';
import Hero from '@/components/home/Hero';
import GallerySection from '@/components/home/GallerySection';
import StatsSection from '@/components/home/StatsSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChoose from '@/components/home/WhyChoose';
import ProcessFlow from '@/components/home/ProcessFlow';
import Testimonials from '@/components/home/Testimonials';
import HomeFAQ from '@/components/home/HomeFAQ';
import CTABanner from '@/components/home/CTABanner';
import HomeStructuredData from '@/components/home/HomeStructuredData';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr- shekari.com';

const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}`;
  const title = t('home_title');
  const description = t('home_description');
  const keywords = t('home_keywords').split(',').map((s) => s.trim());

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords,
    authors: [{ name: 'Dr. Nazir Ahmad Shekari', url: SITE }],
    creator: 'Dr. Nazir Ahmad Shekari',
    publisher: t('site_name'),
    category: 'Healthcare',
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
      locale: OG_LOCALE[locale] || 'en_US',
      alternateLocale: Object.values(OG_LOCALE).filter((v) => v !== (OG_LOCALE[locale] || 'en_US')),
      url,
      siteName: t('site_name'),
      title,
      description,
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
      title,
      description,
      images: ['/images/og- premium.jpg'],
    },
    alternates: {
      canonical: url,
      languages: {
        'en- US': `${SITE}/en`,
        'fa- AF': `${SITE}/fa`,
        'ps- AF': `${SITE}/ps`,
        'x- default': `${SITE}/en`,
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <GallerySection />
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
