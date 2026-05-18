import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import AboutHero from '@/components/about/AboutHero';
import VisionMission from '@/components/about/VisionMission';
import History from '@/components/about/History';
import Philosophy from '@/components/about/Philosophy';
import Equipment from '@/components/about/Equipment';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr-shekari.com';
const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/about`;
  const title = t('about_title');
  const description = t('about_description');
  const keywords = t('about_keywords').split(',').map((s) => s.trim());

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords,
    openGraph: {
      type: 'profile',
      locale: OG_LOCALE[locale] || 'en_US',
      url,
      siteName: t('site_name'),
      title,
      description,
      images: [
        {
          url: '/images/about/clinic-exterior.jpg',
          width: 1200,
          height: 630,
          alt: 'Dr. Nazir Ahmad Shekari -Chief of Urology Department, Jami Hospital',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${SITE}/en/about`,
        'fa-AF': `${SITE}/fa/about`,
        'ps-AF': `${SITE}/ps/about`,
        'x-default': `${SITE}/en/about`,
      },
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/about`;

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE}/#dr-shekari`,
    name: 'Dr. Nazir Ahmad Shekari',
    alternateName: ['Nazir Ahmad Shekari', 'Dr. Shekari', 'دکتر نذیر احمد شکاری', 'ډاکټر نذیر احمد شکاري'],
    jobTitle: 'Chief, Urology Department of Jami Hospital',
    description:
      'Dr. Nazir Ahmad Shekari is the Chief of the Urology Department at Jami Hospital, Herat. MD Urologist with a Fellowship in Endourology from Kazakhstan, former Chief of Stone Diseases, Endourology and Lithotripsy at the Scientific Center of Urology (Almaty). Member of the European Association of Urology (EAU).',
    image: `${SITE}/images/dr-shekari.jpg`,
    url,
    telephone: '+93796040915',
    email: 'urology@dr-shekari.com',
    medicalSpecialty: ['Urology', 'Endourology', 'Andrology'],
    nationality: 'Afghanistan',
    knowsLanguage: ['Dari', 'Pashto', 'English'],
    knowsAbout: [
      'Kidney Stone Treatment',
      'Endourology',
      'Andrology',
      'Prostate Surgery',
      'Male Infertility',
      'Laser Stone Surgery',
      'Lithotripsy',
      'PCNL',
      'RIRS',
      'Minimally Invasive Urology',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Scientific Center of Urology, Almaty, Kazakhstan',
      address: { '@type': 'PostalAddress', addressLocality: 'Almaty', addressCountry: 'KZ' },
    },
    memberOf: {
      '@type': 'Organization',
      name: 'European Association of Urology (EAU)',
      url: 'https://uroweb.org/',
    },
    worksFor: {
      '@type': 'Hospital',
      name: 'Jami Hospital, Herat',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chahar-e-rahi-Badmorghan',
        addressLocality: 'Herat',
        addressCountry: 'AF',
      },
    },
    sameAs: [
      SITE,
      `${SITE}/en/about`,
      `${SITE}/fa/about`,
      `${SITE}/ps/about`,
    ],
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Dr. Shekari Urology Clinic',
    url: SITE,
    logo: `${SITE}/logo.png`,
    description:
      'Advanced urology, andrology, and endourology clinic at Jami Hospital, Herat, led by Dr. Nazir Ahmad Shekari.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chahar-e-rahi-Badmorghan',
      addressLocality: 'Herat',
      addressRegion: 'Herat',
      addressCountry: 'AF',
    },
    telephone: '+93796040915',
    openingHours: 'Mo-Sa 08:00-20:00',
    medicalSpecialty: ['Urology', 'Andrology', 'Endourology'],
    employee: { '@id': `${SITE}/#dr-shekari` },
  };

  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <AboutHero />
      </Suspense>

      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <VisionMission />
      </Suspense> */}

      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <History />
      </Suspense> */}

      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <Philosophy />
      </Suspense> */}

      {/* <Suspense fallback={<LoadingFallback type="section" />}>
        <Equipment />
      </Suspense> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, physicianSchema]) }}
      />
    </>
  );
}
