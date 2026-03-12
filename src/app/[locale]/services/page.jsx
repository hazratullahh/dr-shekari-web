import { Suspense } from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Our Services – Dr. Shekari Urology Clinic',
  description:
    'Explore the comprehensive urology services offered by Dr. Shekari, including treatment for kidney stones, prostate diseases, urinary infections, male infertility, sexual disorders, and endourology surgeries.',
  keywords: [
    'urology services',
    'kidney stone treatment',
    'prostate disease care',
    'male infertility specialist',
    'endourology surgery'
  ],
  openGraph: {
    title: 'Our Services – Dr. Shekari Urology Clinic',
    description: 'Comprehensive urology treatment options in Herat, Afghanistan.',
    images: [
      {
        url: '/images/services/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Urology Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services – Dr. Shekari Urology Clinic',
    description: 'Comprehensive urology treatment options in Herat, Afghanistan.',
  },
  alternates: {
    canonical: 'https://dr-shekari.com/services',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
};

export default function ServicesPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ServicesHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ServicesList />
      </Suspense>

      {/* Structured Data for SEO */}
      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Urology Services",
            "description": "Professional urology treatments including kidney stones, prostate diseases, urinary infections, male infertility, sexual disorders, and endourology surgeries.",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Dr. Shekari Urology Clinic",
              "url": "https://dr-shekari.com"
            }
          })
        }}
      />
    </>
  );
}
