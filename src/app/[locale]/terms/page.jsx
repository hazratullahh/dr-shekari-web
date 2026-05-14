import LegalPage from '@/components/legal/LegalPage';

export const metadata = {
  title: 'Terms of Service · Dr. Shekari Clinic',
  alternates: { canonical: 'https://dr-shekari.com/terms' },
  robots: { index: true, follow: true },
};

export default async function Page({ params }) {
  const { locale } = await params;
  return <LegalPage locale={locale} doc="terms" sections={5} />;
}
