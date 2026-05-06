import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ServiceDetail from '@/components/services/ServiceDetail';
import { SERVICE_SLUGS, getService } from '@/content/services';
import { routing } from '@/i18n/routing';

const SITE = 'https://dr-shekari.com';

// Pre-render every (locale, slug) pair at build time.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: 'services_page' });
  const title = t(service.titleKey);
  const description = t(`${service.detailBase}_what_desc`);
  const url = `${SITE}/${locale}/services/${slug}`;

  return {
    title: `${title} · Dr. Shekari Clinic`,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE}/${l}/services/${slug}`])
      ),
    },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [{ url: '/images/og-premium.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: 'services_page' });
  const title = t(service.titleKey);
  const description = t(`${service.detailBase}_what_desc`);
  const url = `${SITE}/${locale}/services/${slug}`;

  // Schema.org — MedicalCondition embedded inside the page so AI search engines
  // can recognise it as a structured medical resource.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        about: { '@id': `${url}#condition` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/${locale}` },
            { '@type': 'ListItem', position: 2, name: t('hero_title'), item: `${SITE}/${locale}/services` },
            { '@type': 'ListItem', position: 3, name: title, item: url },
          ],
        },
      },
      {
        '@type': 'MedicalCondition',
        '@id': `${url}#condition`,
        name: title,
        description,
        signOrSymptom: t(`${service.detailBase}_symptoms_desc`),
        possibleTreatment: service.procedures.map((p) => ({
          '@type': 'MedicalProcedure',
          name: p,
        })),
        relevantSpecialty: ['Urology', 'Andrology', 'Endourology'],
      },
    ],
  };

  return (
    <>
      <ServiceDetail locale={locale} slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
