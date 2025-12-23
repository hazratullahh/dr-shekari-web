import { Suspense } from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import MapSection from '@/components/contact/MapSection';
// import EmergencySection from '@/components/contact/EmergencySection';
import FAQSection from '@/components/contact/FAQSection';
import LoadingFallback from '@/components/ui/LoadingFallback';

export const metadata = {
  title: 'Contact Dr. Shekari Urology Clinic - Book Appointment in Herat, Afghanistan',
  description: 'Contact our urology clinic in Herat, Afghanistan. Book appointments online, emergency contact, location map, and get in touch with our medical team.',
  keywords: [
    'contact urologist Herat',
    'book appointment Afghanistan',
    'Dr. Shekari contact',
    'emergency urology clinic',
    'Jami Hospital contact',
    'medical consultation Afghanistan'
  ],
  openGraph: {
    title: 'Contact Us - Dr. Shekari Urology Clinic',
    description: 'Get in touch with our urology specialists. Book appointments, emergency contact, and location information.',
    images: [
      {
        url: '/images/contact/clinic-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Shekari Urology Clinic Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dr. Shekari Urology Clinic',
    description: 'Book appointments and contact our medical team in Herat, Afghanistan',
  },
  alternates: {
    canonical: 'https://drshekari.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
};

export default function ContactPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ContactHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-1">
            <ContactForm />
          </div>
        </div>
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <MapSection />
      </Suspense>
      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <EmergencySection />
      </Suspense> */}
      <Suspense fallback={<LoadingFallback type="section" />}>
        <FAQSection />
      </Suspense>

      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Dr. Shekari Urology Clinic",
            "url": "https://drshekari.com/contact",
            "logo": "https://drshekari.com/logo.png",
            "description": "Urology clinic in Herat, Afghanistan",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chahar-e-rahi- Badmorghan",
              "addressLocality": "Herat",
              "addressRegion": "Herat",
              "addressCountry": "Afghanistan",
              "postalCode": "3001"
            },
            "telephone": "+93792453030",
            "email": "contact@drshekari.com",
            "openingHours": [
              "Mo-Sa 08:00-20:00",
              "Su 09:00-14:00"
            ],
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