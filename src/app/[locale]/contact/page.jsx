import { Suspense } from 'react';
import { getTranslations } from 'next- intl/server';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import MapSection from '@/components/contact/MapSection';
// import EmergencySection from '@/components/contact/EmergencySection';
import FAQSection from '@/components/contact/FAQSection';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr- shekari.com';
const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/contact`;
  const title = t('contact_title');
  const description = t('contact_description');
  const keywords = t('contact_keywords').split(',').map((s) => s.trim());

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
      images: [
        {
          url: '/images/contact/clinic- contact.jpg',
          width: 1200,
          height: 630,
          alt: 'Dr. Shekari Urology Clinic Contact',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: url,
      languages: {
        'en- US': `${SITE}/en/contact`,
        'fa- AF': `${SITE}/fa/contact`,
        'ps- AF': `${SITE}/ps/contact`,
        'x- default': `${SITE}/en/contact`,
      },
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/contact`;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Dr. Shekari Urology Clinic',
    url,
    logo: `${SITE}/logo.png`,
    description: 'Urology clinic at Jami Hospital in Herat, Afghanistan',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chahar- e- rahi- Badmorghan, Jami Hospital',
      addressLocality: 'Herat',
      addressRegion: 'Herat',
      addressCountry: 'AF',
      postalCode: '3001',
    },
    telephone: '+93796040915',
    email: 'urology@dr- shekari.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+93796040915',
        contactType: 'customer service',
        availableLanguage: ['Dari', 'Pashto', 'English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+93796040915',
        contactType: 'emergency',
        availableLanguage: ['Dari', 'Pashto', 'English'],
        hoursAvailable: { '@type': 'OpeningHoursSpecification', opens: '00:00', closes: '23:59' },
      },
    ],
    employee: { '@id': `${SITE}/#dr- shekari` },
  };

  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ContactHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <div className="max- w- 7xl mx- auto px- 4 sm:px- 6 lg:px- 8 py- 20">
          <div className="grid grid- cols- 1 lg:grid- cols- 1 gap- 1">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
