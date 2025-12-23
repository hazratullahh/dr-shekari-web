import { Suspense } from 'react';
import TeamHero from '@/components/team/TeamHero';
import InternationalTeam from '@/components/team/InternationalTeam';
import MedicalDirectors from '@/components/team/MedicalDirectors';
import ConsultationCTA from '@/components/team/ConsultationCTA';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Meet Our Medical Team - International Urology Specialists | Dr. Shekari Clinic',
  description: 'Our team includes top urologists from Afghanistan, India, and the USA. Expert doctors providing advanced urological care in Herat, Afghanistan.',
  keywords: [
    'urologist team Afghanistan',
    'international urology specialists',
    'American urologist in Afghanistan',
    'Indian urology expert',
    'medical team Herat',
    'Dr. Shekari team',
    'urology doctors Afghanistan'
  ],
  openGraph: {
    title: 'International Urology Team - Dr. Shekari Clinic',
    description: 'Meet our expert team of urologists from Afghanistan, India, and the USA providing world-class care.',
    images: [
      {
        url: '/images/team/team-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'International Medical Team - Dr. Shekari Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our International Urology Team',
    description: 'Expert urologists from Afghanistan, India, and USA',
  },
  alternates: {
    canonical: 'https://drshekari.com/team',
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

      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Dr. Shekari International Urology Team",
            "url": "https://drshekari.com/team",
            "logo": "https://drshekari.com/logo.png",
            "description": "International team of urologists from Afghanistan, India, and USA",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Afghanistan"
            },
            "employee": [
              {
                "@type": "Person",
                "name": "Dr. Nazir Ahmad Shekari",
                "jobTitle": "Chief Urologist & Director",
                "nationality": "Afghanistan",
                "medicalSpecialty": "Urology"
              },
              {
                "@type": "Person",
                "name": "Dr. Rajesh Kumar",
                "jobTitle": "Senior Urologist & Robotic Surgery Specialist",
                "nationality": "India",
                "medicalSpecialty": "Urology"
              },
              {
                "@type": "Person",
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