import { Suspense } from 'react';
import ResearchHero from '@/components/research/ResearchHero';
import ResearchContent from '@/components/research/ResearchContent';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Research & Publications – Dr. Shekari Urology Clinic',
  description:
    'Explore academic papers, case reports, and research interests of Dr. Shekari in urology and andrology.',
  keywords: [
    'urology research',
    'kidney stone treatment studies',
    'prostate disease publications',
    'male infertility research',
    'endourology innovations'
  ],
  openGraph: {
    title: 'Research & Publications – Dr. Shekari Urology Clinic',
    description: 'Academic contributions, case reports, and scientific collaborations in urology.',
    images: [
      {
        url: '/images/research/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Research & Publications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research & Publications – Dr. Shekari Urology Clinic',
    description: 'Academic contributions, case reports, and scientific collaborations in urology.',
  },
  alternates: {
    canonical: 'https://dr-shekari.com/research',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
};

export default function ResearchPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ResearchHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ResearchContent />
      </Suspense>

      {/* Structured data for articles */}
      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Research & Publications",
            "description": "Academic contributions, case reports, and scientific collaborations in urology.",
            "mainEntity": [
              {
                "@type": "Article",
                "headline": "Advances in kidney stone treatment"
              },
              {
                "@type": "Article",
                "headline": "Modern prostate disease management"
              },
              {
                "@type": "Article",
                "headline": "Innovations in endourology"
              },
              {
                "@type": "Article",
                "headline": "Male infertility research"
              }
            ]
          })
        }}
      />
    </>
  );
}
