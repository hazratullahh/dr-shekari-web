import { Suspense } from 'react';
import AppointmentHero from '@/components/appointment/AppointmentHero';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Book Appointment - Dr. Shekari Urology Clinic',
  description: 'Schedule your urology consultation with Dr. Shekari in Herat, Afghanistan. Use our online appointment form and choose your preferred date and time.',
  keywords: [
    'book appointment urologist Herat',
    'schedule urology consultation',
    'Dr. Shekari appointment',
    'urology clinic Afghanistan',
    'online appointment form'
  ],
  openGraph: {
    title: 'Book Appointment - Dr. Shekari Clinic',
    description: 'Online form to book your urology appointment with Dr. Shekari in Herat',
    images: [
      {
        url: '/images/appointment/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Book Appointment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Appointment - Dr. Shekari Urology Clinic',
    description: 'Schedule a consultation online with our specialist in Herat, Afghanistan'
  },
  alternates: {
    canonical: 'https://dr-shekari.com/appointment'
  },
  robots: {
    index: true,
    follow: true
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }]
};

export default function AppointmentPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <AppointmentHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-1">
            <AppointmentForm />
          </div>
        </div>
      </Suspense>

      {/* Structured data for SEO */}
      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Dr. Shekari Urology Clinic",
            "url": "https://dr-shekari.com/appointment",
            "logo": "https://dr-shekari.com/logo.png",
            "description": "Appointment booking page for urology consultations in Herat, Afghanistan",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chahar-e-rahi- Badmorghan",
              "addressLocality": "Herat",
              "addressRegion": "Herat",
              "addressCountry": "Afghanistan",
              "postalCode": "3001"
            },
            "telephone": "+93792453030",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+93792453030",
              "contactType": "customer service",
              "availableLanguage": ["Dari", "Pashto", "English", "Hindi"]
            }
          })
        }}
      />
    </>
  );
}