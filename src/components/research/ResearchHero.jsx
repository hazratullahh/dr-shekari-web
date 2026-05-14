'use client';

import { useTranslations } from 'next-intl';
import { BookOpen } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export default function ResearchHero() {
  const t = useTranslations('research_page');

  return (
    <PageHero
      badge={
        <>
          <BookOpen size={13} />
          Academic
        </>
      }
      title={t('hero_title')}
      subtitle={t('hero_subtitle')}
    />
  );
}
