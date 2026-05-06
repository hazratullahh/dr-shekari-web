import { WifiOff, Phone, Calendar, Home } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Offline · Dr. Shekari Clinic',
  description: 'You appear to be offline. Cached pages remain available.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-static';

export default async function OfflinePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pwa' });

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-5 bg-linear-to-br from-[#FDF5EE] via-white to-[#FDF5EE]">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-xl shadow-[#E9756D]/25 mb-6">
          <WifiOff size={32} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('offline_title')}</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">{t('offline_body')}</p>

        <div className="mt-7 grid grid-cols-1 gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white font-semibold shadow-md shadow-[#E9756D]/25"
          >
            <Home size={16} />
            {t('offline_home')}
          </Link>
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:border-[#E9756D]/40 hover:text-[#E9756D] transition-colors"
          >
            <Calendar size={16} />
            {t('offline_book')}
          </Link>
          <a
            href="tel:+93792453030"
            dir="ltr"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E9756D]/10 text-[#E9756D] font-semibold hover:bg-[#E9756D]/15 transition-colors"
          >
            <Phone size={16} />
            {t('offline_call')}: +93 79 245 3030
          </a>
        </div>
      </div>
    </main>
  );
}
