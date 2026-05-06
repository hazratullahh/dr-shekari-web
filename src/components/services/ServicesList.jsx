'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Activity, Pill, Microscope, HeartPulse, Stethoscope, Scissors, ArrowRight,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Container';

const SERVICES = [
  { slug: 'kidney-stones',         keyBase: 'kidney_stones',         detailBase: 'kidney',                   icon: Activity },
  { slug: 'prostate-diseases',     keyBase: 'prostate_diseases',     detailBase: 'prostate',                 icon: Pill },
  { slug: 'urinary-infections',    keyBase: 'urinary_infections',    detailBase: 'urinary_infections',       icon: Microscope },
  { slug: 'male-infertility',      keyBase: 'male_infertility',      detailBase: 'male_infertility',         icon: HeartPulse },
  { slug: 'sexual-disorders',      keyBase: 'sexual_disorders',      detailBase: 'sexual_disorders',         icon: Stethoscope },
  { slug: 'endourology-surgeries', keyBase: 'endourology_surgeries', detailBase: 'endourology_surgeries',    icon: Scissors },
];

export default function ServicesList() {
  const t = useTranslations('services_page');

  return (
    <>
      {/* Cards grid — each card links to its detail page */}
      <Section size="md" background="soft">
        <SectionHeader
          badge={t('main_services')}
          title={t('hero_title')}
          subtitle={t('hero_subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group block h-full rounded-2xl bg-white p-6 border border-gray-100 hover:border-[#E9756D]/40 card-hover"
                  aria-label={t(s.keyBase)}
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-md mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#E9756D] transition-colors">
                    {t(s.keyBase)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {t(`${s.detailBase}_what_desc`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E9756D] group-hover:gap-2 transition-all">
                    {t('learn_more')}
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
