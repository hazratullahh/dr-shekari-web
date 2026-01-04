import { Suspense } from 'react';
import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import History from '@/components/about/History';
import Philosophy from '@/components/about/Philosophy';
import Equipment from '@/components/about/Equipment';
// import Staff from '@/components/about/Staff';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'About Dr. Nazir Ahmad Shekari - Urology Specialist in Herat, Afghanistan',
  description: 'Learn about Dr. Nazir Ahmad Shekari - 20+ years experience in Urology, Andrology & Endourology. Our mission, history, philosophy, facilities, and medical staff at Jami Hospital.',
  keywords: [
    'Dr. Nazir Ahmad Shekari about',
    'Urologist in Herat Afghanistan',
    'Andrology specialist',
    'Endourology expert',
    'Jami Hospital urology department',
    'medical staff Afghanistan',
    'urology facilities Afghanistan'
  ],
  openGraph: {
    title: 'About Dr. Nazir Ahmad Shekari - Urology Specialist',
    description: '20+ years of excellence in urological care. Learn about our mission, facilities, and expert medical team.',
    images: [
      {
        url: '/images/about/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari - Urology Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Nazir Ahmad Shekari - Urology Specialist',
    description: 'Advanced urological care in Herat, Afghanistan',
  },
  alternates: {
    canonical: 'https://dr-shekari.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
};

export default function AboutPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <AboutHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <VisionMission />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <History />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Philosophy />
      </Suspense> 
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Equipment />
      </Suspense>
      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <Staff />
      </Suspense> */}
      
      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Dr. Nazir Ahmad Shekari Urology Clinic",
            "url": "https://dr-shekari.com",
            "logo": "https://dr-shekari.com/logo.png",
            "description": "Specialized urology, andrology, and endourology services in Herat, Afghanistan",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chahar-e-rahi- Badmorghan",
              "addressLocality": "Herat",
              "addressRegion": "Herat",
              "addressCountry": "Afghanistan",
              "postalCode": "3001"
            },
            "telephone": "+93792453030",
            "openingHours": "Mo-Sa 08:00-20:00",
            "medicalSpecialty": "Urology",
            "founder": {
              "@type": "Person",
              "name": "Dr. Nazir Ahmad Shekari"
            },
            "foundingDate": "2003",
            "numberOfEmployees": "15"
          })
        }}
      />
    </>
  );
}