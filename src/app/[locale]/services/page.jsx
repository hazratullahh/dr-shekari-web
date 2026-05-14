import { Suspense } from 'react';
import { getTranslations } from 'next- intl/server';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import LoadingFallback from '@/components/ui/LoadingFallback';

const SITE = 'https://dr- shekari.com';
const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/services`;
  const title = t('services_title');
  const description = t('services_description');
  const keywords = t('services_keywords').split(',').map((s) => s.trim());

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
      images: [{ url: '/images/services/hero.jpg', width: 1200, height: 630, alt: 'Urology Services' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        'en- US': `${SITE}/en/services`,
        'fa- AF': `${SITE}/fa/services`,
        'ps- AF': `${SITE}/ps/services`,
        'x- default': `${SITE}/en/services`,
      },
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Dr. Nazir Ahmad Shekari' }],
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const url = `${SITE}/${locale}/services`;

  const services = [
    {
      name: 'Kidney & Ureteric Stone Treatment',
      description:
        'Modern, minimally- invasive treatment for kidney and ureteric stones including PCNL, RIRS, and laser lithotripsy.',
      slug: 'kidney- stones',
    },
    {
      name: 'Prostate Disease Care',
      description: 'BPH evaluation, TURP, laser prostate procedures, and prostate cancer screening.',
      slug: 'prostate- diseases',
    },
    {
      name: 'Urinary Tract Infections',
      description: 'Diagnosis and antibiotic management of acute and recurrent urinary tract infections.',
      slug: 'urinary- infections',
    },
    {
      name: 'Male Infertility',
      description: 'Comprehensive evaluation and treatment of male factor infertility.',
      slug: 'male- infertility',
    },
    {
      name: 'Sexual Disorders',
      description: 'Andrology consultations for erectile dysfunction and other sexual health concerns.',
      slug: 'sexual- disorders',
    },
    {
      name: 'Endourology Surgeries',
      description: 'Advanced minimally invasive procedures inside the urinary tract.',
      slug: 'endourology- surgeries',
    },
  ];

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Urology Services',
    url,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/${locale}/services/${s.slug}`,
      name: s.name,
    })),
  };

  const medicalServices = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: s.name,
    description: s.description,
    procedureType: 'NoninvasiveProcedure',
    bodyLocation: 'Urinary system',
    performer: { '@id': `${SITE}/#dr- shekari` },
    url: `${SITE}/${locale}/services/${s.slug}`,
  }));

  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <ServicesHero />
      </Suspense>
      <Suspense fallback={<LoadingFallback type="section" />}>
        <ServicesList />
      </Suspense>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemList, ...medicalServices]) }}
      />
    </>
  );
}
