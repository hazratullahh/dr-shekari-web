import LegalPage from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Medical Disclaimer · Dr. Shekari Clinic',
  alternates: { canonical: 'https://dr-shekari.com/disclaimer' },
  robots: { index: true, follow: true },
};

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage locale={locale} doc="disclaimer" sections={3} />;
}
