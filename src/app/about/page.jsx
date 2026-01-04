import { Suspense } from 'react';
import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import History from '@/components/about/History';
import Philosophy from '@/components/about/Philosophy';
import Equipment from '@/components/about/Equipment';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'About Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar | Assistant Professor & Urology Specialist in Afghanistan',
  description:
    'Learn about Assistant Professor Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar and Assistant Dr. Mansour Ahmad Wayar, a leading urologist, andrologist, and endourologist with 20+ years of experience providing advanced urological care in Herat, Afghanistan.',
  keywords: [
    'Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar',
    'Dr. Mansour Ahmad Wayar',
    'Assistant Professor Urologist Afghanistan',
    'Best Urologist in Herat',
    'Andrology Specialist Afghanistan',
    'Endourology Expert',
    'Kidney Stone Specialist Afghanistan',
    'Prostate Treatment Herat',
    'Male Fertility Doctor Afghanistan',
    'Jami Hospital Urology Department'
  ],
  openGraph: {
    title: 'About Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar – Assistant Dr. Mansour Ahmad Wayar Professor Urologist',
    description:
      '20+ years of excellence in urology, andrology, and endourology care in Afghanistan.',
    images: [
      {
        url: '/images/about/clinic-exterior.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar - Assistant Professor & Urologist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar',
    description: 'Assistant Professor & Urology Specialist in Afghanistan',
  },
  alternates: {
    canonical: 'https://dr-shekari.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar' }],
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

      {/* ================= STRUCTURED DATA (BEST PRACTICE) ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Dr. Shekari Urology Clinic",
              "url": "https://dr-shekari.com",
              "logo": "https://dr-shekari.com/logo.png",
              "description":
                "Advanced urology, andrology, and endourology clinic led by Assistant Professor Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chahar-e-rahi-Badmorghan",
                "addressLocality": "Herat",
                "addressRegion": "Herat",
                "addressCountry": "Afghanistan"
              },
              "telephone": "+93792453030",
              "openingHours": "Mo-Sa 08:00-20:00",
              "medicalSpecialty": [
                "Urology",
                "Andrology",
                "Endourology"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar",
              "jobTitle": "Assistant Professor of Urology, Andrology & Endourology",
              "description":
                "Assistant Professor Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar is a leading urologist with over 20 years of experience in urology, andrology, and endourology.",
              "medicalSpecialty": [
                "Urology",
                "Andrology",
                "Endourology"
              ],
              "worksFor": {
                "@type": "MedicalOrganization",
                "name": "Dr. Shekari Urology Clinic"
              },
              "sameAs": [
                "https://dr-shekari.com",
                "https://www.google.com/search?q=Dr+Nazir+Ahmad+Shekari"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "About Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar",
              "url": "https://dr-shekari.com/about",
              "medicalAudience": "Patient",
              "about": {
                "@type": "Physician",
                "name": "Dr. Nazir Ahmad Shekari and Dr. Mansour Ahmad Wayar"
              }
            }
          ])
        }}
      />
    </>
  );
}
