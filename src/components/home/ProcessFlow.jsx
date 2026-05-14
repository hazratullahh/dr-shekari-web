'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CalendarCheck, Stethoscope, ClipboardList, HeartPulse } from 'lucide-react';
import Reveal from '@/components/scroll/Reveal';

const steps = [
  { icon: CalendarCheck, key: 'p1' },
  { icon: Stethoscope, key: 'p2' },
  { icon: ClipboardList, key: 'p3' },
  { icon: HeartPulse, key: 'p4' },
];

export default function ProcessFlow() {
  const t = useTranslations('process');

  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E9756D] mb-3">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] inline-block">
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="relative rounded-2xl p-6 bg-linear-to-b from-white to-[#FDF5EE]/40 border border-gray-100 card-hover"
              >
                <div className="absolute -top-3 left-6 inline-flex items-center justify-center min-w-[32px] h-8 px-2.5 rounded-full bg-[#E9756D] text-white text-xs font-bold shadow-md shadow-[#E9756D]/30">
                  Step {i + 1}
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center mb-4 mt-2">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t(`${step.key}_title`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`${step.key}_body`)}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
