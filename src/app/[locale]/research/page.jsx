import { Suspense } from 'react';
import { getTranslations } from 'next- intl/server';
import ResearchHero from '@/components/research/ResearchHero';
import ResearchContent from '@/components/research/ResearchContent';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr- shekari.com';
const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/research`;
  const title = t('research_title');
  const description = t('research_description');
  const keywords = t('research_keywords').split(',').map((s) => s.trim());

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] || 'en_US',
      url,
      siteName: t('site_name'),
      title,
      description,
      images: [{ url: '/images/research/hero.jpg', width: 1200, height: 630, alt: 'Research & Publications' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: url,
      languages: {
        'en- US': `${SITE}/en/research`,
        'fa- AF': `${SITE}/fa/research`,
        'ps- AF': `${SITE}/ps/research`,
        'x- default': `${SITE}/en/research`,
      },
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  };
}

export default async function ResearchPage({ params }) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/research`;

  const articles = [
    'Advances in kidney stone treatment',
    'Modern prostate disease management',
    'Innovations in endourology',
    'Male infertility research',
  ];

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research & Publications',
    url,
    description:
      'Academic contributions, case reports, and scientific collaborations in urology, endourology, and andrology.',
    author: { '@id': `${SITE}/#dr- shekari` },
    mainEntity: articles.map((headline) => ({
      '@type': 'ScholarlyArticle',
      headline,
      author: { '@type': 'Person', name: 'Dr. Nazir Ahmad Shekari' },
    })),
  };

  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ResearchHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ResearchContent />
      </Suspense>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
    </>
  );
}
