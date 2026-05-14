'use client';

import { useTranslations } from 'next- intl';
import { Stethoscope } from 'lucide- react';
import PageHero from '@/components/ui/PageHero';

export default function ServicesHero() {
  const t = useTranslations('services_page');

  return (
    <PageHero
      badge={
        <>
          <Stethoscope size={13} />
          Our care
        </>
      }
      title={t('hero_title')}
      subtitle={t('hero_subtitle')}
    />
  );
}
