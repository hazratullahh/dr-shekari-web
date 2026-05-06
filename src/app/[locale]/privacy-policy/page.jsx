import LegalPage from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Privacy Policy · Dr. Shekari Clinic',
  alternates: { canonical: 'https://dr-shekari.com/privacy-policy' },
  robots: { index: true, follow: true },
};

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage locale={locale} doc="privacy" sections={6} />;
}
