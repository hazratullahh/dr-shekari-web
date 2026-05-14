import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Stethoscope, Clock, ShieldCheck, MessageCircle, Phone, Mail, Calendar } from 'lucide-react';
import AppointmentHero from '@/components/appointment/AppointmentHero';

// BookingFlow drags in Calendar, TimeSlots, RHF, Yup, and motion. Defer it so
// the hero + sidebar paint instantly; the form streams in just after.
const BookingFlow = dynamic(() => import('@/components/appointment/BookingFlow'), {
  loading: () => <BookingFlowSkeleton />,
});

const SITE = 'https://dr-shekari.com';

const OG_LOCALE = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE}/${locale}/appointment`;
  const title = tSeo('appointment_title');
  const description = tSeo('appointment_description');
  const keywords = tSeo('appointment_keywords').split(',').map((s) => s.trim());

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${SITE}/en/appointment`,
        'fa-AF': `${SITE}/fa/appointment`,
        'ps-AF': `${SITE}/ps/appointment`,
        'x-default': `${SITE}/en/appointment`,
      },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] || 'en_US',
      url,
      siteName: tSeo('site_name'),
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

export default async function AppointmentPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <AppointmentHero locale={locale} />

      <section className="relative pb-16 md:pb-24 bg-linear-to-b from-[#FDF5EE] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <BookingFlow />
            </div>

            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 self-start">
              <SpecialistCard locale={locale} />
              <HoursCard locale={locale} />
              <NextStepsCard locale={locale} />
              <ContactCard locale={locale} />
            </aside>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'Dr. Shekari Urology Clinic',
            url: `${SITE}/${locale}/appointment`,
            logo: `${SITE}/logo.png`,
            description: 'Online appointment booking for urology, andrology, and endourology consultations.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Chahar-e-rahi-Badmorghan, Jami Hospital',
              addressLocality: 'Herat',
              addressRegion: 'Herat',
              addressCountry: 'AF',
            },
            telephone: '+93796040915',
            email: 'urology@dr-shekari.com',
            potentialAction: {
              '@type': 'ReserveAction',
              target: `${SITE}/${locale}/appointment`,
              result: { '@type': 'Reservation', name: 'Urology Consultation Appointment' },
            },
          }),
        }}
      />
    </>
  );
}

async function SpecialistCard({ locale }) {
  const tH = await getTranslations({ locale, namespace: 'home' });
  return (
    <InfoCard icon={Stethoscope} title={tH('dr_name')}>
      <p className="text-sm text-gray-700">{tH('slogan')}</p>
      <p className="mt-2 text-xs text-gray-500 leading-relaxed">{tH('intro')}</p>
    </InfoCard>
  );
}

async function HoursCard({ locale }) {
  const tC = await getTranslations({ locale, namespace: 'contact' });
  return (
    <InfoCard icon={Clock} title={tC('working_hours')}>
      <ul className="text-sm text-gray-700 space-y-1.5">
        <li><span className="text-gray-500">{tC('monday_saturday')}:</span> {tC('regular_hours')}</li>
        <li><span className="text-gray-500">{tC('sunday')}:</span> {tC('sunday_hours')}</li>
        <li><span className="text-gray-500">{tC('emergency')}:</span> {tC('emergency_24_7')}</li>
      </ul>
    </InfoCard>
  );
}

async function NextStepsCard({ locale }) {
  const t = await getTranslations({ locale, namespace: 'process' });
  return (
    <InfoCard icon={ShieldCheck} title={t('badge')}>
      <ol className="text-sm text-gray-700 space-y-2.5">
        <Step n={1}>{t('p1_title')}</Step>
        <Step n={2}>{t('p2_title')}</Step>
        <Step n={3}>{t('p3_title')}</Step>
      </ol>
    </InfoCard>
  );
}

async function ContactCard({ locale }) {
  const tC = await getTranslations({ locale, namespace: 'contact' });
  return (
    <div className="rounded-2xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white p-5">
      <div className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-3">
        {tC('quick_contact')}
      </div>
      <div className="space-y-2.5">
        <ContactLine icon={Phone} href="tel:+93796040915" dir="ltr">+93 79 604 0915</ContactLine>
        <ContactLine icon={Mail} href="mailto:urology@dr-shekari.com">urology@dr-shekari.com</ContactLine>
        <ContactLine icon={MessageCircle} href="https://wa.me/93796040915">WhatsApp</ContactLine>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-9 h-9 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center">
          <Icon size={16} />
        </span>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Step({ n, children }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="w-5 h-5 rounded-full bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function ContactLine({ icon: Icon, href, children, dir }) {
  return (
    <a
      href={href}
      dir={dir}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
    >
      <Icon size={15} />
      {children}
    </a>
  );
}

function BookingFlowSkeleton() {
  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(233,117,109,0.18)] p-6 md:p-8">
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-gray-100 animate-pulse" />
            <div className="h-1 rounded-full bg-gray-100 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-6 w-48 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-72 rounded bg-gray-100/70 animate-pulse" />
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gray-100/70 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
