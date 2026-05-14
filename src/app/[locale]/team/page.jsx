import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import TeamHero from '@/components/team/TeamHero';
import InternationalTeam from '@/components/team/InternationalTeam';
import MedicalDirectors from '@/components/team/MedicalDirectors';
import ConsultationCTA from '@/components/team/ConsultationCTA';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr-shekari.com';
const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/team`;
  const title = t('team_title');
  const description = t('team_description');
  const keywords = t('team_keywords').split(',').map((s) => s.trim());

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
          url: '/images/android-chrome-512x512.png',
          width: 1200,
          height: 630,
          alt: 'Medical Team -Dr. Shekari Urology Clinic',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${SITE}/en/team`,
        'fa-AF': `${SITE}/fa/team`,
        'ps-AF': `${SITE}/ps/team`,
        'x-default': `${SITE}/en/team`,
      },
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  };
}

export default async function TeamPage({ params }) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/team`;

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Dr. Shekari Urology Clinic -Urology Department of Jami Hospital',
    url,
    logo: `${SITE}/logo.png`,
    description:
      'Urology leadership at Jami Hospital, Herat -Dr. Nazir Ahmad Shekari (Chief, Urology Department) with Dr. Mansour Ahmad Wayar (Professor Assistant & Patients Arranger).',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chahar-e-rahi-Badmorghan, Jami Hospital',
      addressLocality: 'Herat',
      addressCountry: 'AF',
    },
    employee: [
      {
        '@type': 'Physician',
        '@id': `${SITE}/#dr-shekari`,
        name: 'Dr. Nazir Ahmad Shekari',
        jobTitle: 'Chief, Urology Department of Jami Hospital',
        nationality: 'Afghanistan',
        medicalSpecialty: ['Urology', 'Andrology', 'Endourology'],
        knowsLanguage: ['Dari', 'Pashto', 'English'],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Scientific Center of Urology, Almaty, Kazakhstan',
        },
        memberOf: {
          '@type': 'Organization',
          name: 'European Association of Urology (EAU)',
          url: 'https://uroweb.org/',
        },
        affiliation: {
          '@type': 'Hospital',
          name: 'Jami Hospital, Herat, Afghanistan',
        },
      },
      {
        '@type': 'Physician',
        '@id': `${SITE}/#dr-wayar`,
        name: 'Dr. Mansour Ahmad Wayar',
        jobTitle: 'Surgical Assistant -Urology Department, Jami Hospital',
        nationality: 'Afghanistan',
        medicalSpecialty: ['Urology', 'Surgical Assistance'],
        knowsLanguage: ['Dari', 'Pashto', 'English'],
        affiliation: {
          '@type': 'Hospital',
          name: 'Jami Hospital, Herat, Afghanistan',
        },
        worksFor: {
          '@type': 'MedicalOrganization',
          name: 'Urology Department, Jami Hospital, Herat',
        },
      },
    ],
  };

  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <TeamHero />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <MedicalDirectors />
      </Suspense>

      {/* Global Expertise Local Care section hidden -kept for future re-enable
      <Suspense fallback={<LoadingFallback type="section" />}>
        <InternationalTeam />
      </Suspense>
      */}

      <Suspense fallback={<LoadingFallback type="section" />}>
        <ConsultationCTA />
      </Suspense>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
    </>
  );
}
