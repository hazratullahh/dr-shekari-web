import { Suspense } from 'react';
import TeamHero from '@/components/team/TeamHero';
import InternationalTeam from '@/components/team/InternationalTeam';
import MedicalDirectors from '@/components/team/MedicalDirectors';
import ConsultationCTA from '@/components/team/ConsultationCTA';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Meet Our Medical Team – Assistant Professor Urologists | Dr. Shekari Clinic',
  description:
    'Meet the medical team of Dr. Shekari Clinic, led by Professor Dr. Nazir Ahmad Shekari and Assistant Professor Dr. Mansour Ahmad Wayar, along with international urology specialists from Afghanistan, India, and the USA.',
  keywords: [
    'urologist team Afghanistan',
    'assistant professor urologist Afghanistan',
    'Dr. Nazir Ahmad Shekari',
    'Dr. Mansour Ahmad Wayar',
    'international urology specialists',
    'medical team Herat',
    'Dr. Shekari team',
    'urology doctors Afghanistan',
    'andrology specialist Afghanistan',
    'endourology specialist Herat'
  ],
  openGraph: {
    title: 'International Urology Team – Dr. Shekari Clinic',
    description:
      'Assistant Professor urologists and international specialists providing world-class urology, andrology, and endourology care in Afghanistan.',
    images: [
      {
        url: '/images/android-chrome-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Medical Team – Dr. Shekari Urology Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Medical Team – Dr. Shekari Clinic',
    description:
      'Assistant Professor urologists and international specialists delivering advanced urological care.',
  },
  alternates: {
    canonical: 'https://dr-shekari.com/team',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
};

export default function TeamPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <TeamHero />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <MedicalDirectors />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <InternationalTeam />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <ConsultationCTA />
      </Suspense>

      {/* ================= STRUCTURED DATA (SEO + AI) ================= */}
      <script
      defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Dr. Shekari Urology Clinic",
            "url": "https://dr-shekari.com/team",
            "logo": "https://dr-shekari.com/logo.png",
            "description":
              "Assistant Professor-led international urology team specializing in urology, andrology, and endourology.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Afghanistan"
            },
            "employee": [
              {
                "@type": "Physician",
                "name": "Dr. Nazir Ahmad Shekari",
                "jobTitle": "Assistant Professor of Urology, Andrology & Endourology",
                "nationality": "Afghanistan",
                "medicalSpecialty": [
                  "Urology",
                  "Andrology",
                  "Endourology"
                ],
                "affiliation": {
                  "@type": "MedicalOrganization",
                  "name": "Dr. Shekari Urology Clinic"
                }
              },
              {
                "@type": "Physician",
                "name": "Dr. Mansour Ahmad Wayar",
                "jobTitle": "Assistant Professor of Urology & Andrology",
                "nationality": "Afghanistan",
                "medicalSpecialty": [
                  "Urology",
                  "Andrology"
                ],
                "affiliation": {
                  "@type": "MedicalOrganization",
                  "name": "Dr. Shekari Urology Clinic"
                }
              },
              {
                "@type": "Physician",
                "name": "Dr. Rajesh Kumar",
                "jobTitle": "Senior Urologist & Robotic Surgery Specialist",
                "nationality": "India",
                "medicalSpecialty": "Urology"
              },
              {
                "@type": "Physician",
                "name": "Dr. Michael Johnson",
                "jobTitle": "Endourology & Advanced Laparoscopy Specialist",
                "nationality": "USA",
                "medicalSpecialty": "Urology"
              }
            ]
          })
        }}
      />
    </>
  );
}
