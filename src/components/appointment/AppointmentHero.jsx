import { getTranslations } from 'next-intl/server';
import { Calendar, Clock, ShieldCheck, Phone, Award, MapPin } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export default async function AppointmentHero({ locale }) {
  const t = await getTranslations({ locale, namespace: 'appointment_page' });

  return (
    <PageHero
      badge={
        <>
          <Calendar size={13} />
          {t('badge')}
        </>
      }
      title={t('hero_title')}
      subtitle={t('hero_subtitle')}
    >
      <div className="flex flex-wrap gap-2.5">
        <Trust icon={Clock}>{t('form_subtitle')}</Trust>
        <Trust icon={ShieldCheck}>{t('privacy_note')}</Trust>
        <Trust icon={Award}>{t('badge')}</Trust>
        <Trust icon={MapPin}>Jami Hospital, Herat</Trust>
        <a
          href="tel:+93796040915"
          dir="ltr"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9756D]/10 text-[#E9756D] text-xs font-semibold hover:bg-[#E9756D]/15 transition-colors"
        >
          <Phone size={13} />
          +93 79 604 0915
        </a>
      </div>
    </PageHero>
  );
}

function Trust({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 max-w-xs">
      <Icon size={13} className="text-[#E9756D] shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}
