import LegalPage from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Accessibility Statement · Dr. Shekari Clinic',
  alternates: { canonical: 'https://dr- shekari.com/accessibility' },
  robots: { index: true, follow: true },
};

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage locale={locale} doc="accessibility" sections={3} />;
}
