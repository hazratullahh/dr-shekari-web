'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Activity, Pill, Microscope, Stethoscope, HeartPulse, Scissors, ArrowRight } from 'lucide-react';
import Reveal from '@/components/scroll/Reveal';

const services = [
  { key: 'kidney_stones', descKey: 'kidney_what_desc', icon: Activity, color: 'from-[#E9756D] to-[#F6CA97]' },
  { key: 'prostate_diseases', descKey: 'prostate_what_desc', icon: Pill, color: 'from-[#E9756D] to-[#FF9A8B]' },
  { key: 'urinary_infections', descKey: 'urinary_infections_what_desc', icon: Microscope, color: 'from-[#F6CA97] to-[#F6CA97]' },
  { key: 'male_infertility', descKey: 'male_infertility_what_desc', icon: HeartPulse, color: 'from-[#E9756D] to-[#F6CA97]' },
  { key: 'sexual_disorders', descKey: 'sexual_disorders_what_desc', icon: Stethoscope, color: 'from-[#E9756D] to-[#FF9A8B]' },
  { key: 'endourology_surgeries', descKey: 'endourology_surgeries_what_desc', icon: Scissors, color: 'from-[#E9756D] to-[#F6CA97]' },
];

export default function ServicesGrid() {
  const t = useTranslations('services_page');

  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E9756D] mb-3">
            {t('main_services')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] inline-block">
            Comprehensive urology &amp; andrology care
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Advanced minimally-invasive treatment, expert diagnosis, and continuous patient care across the full spectrum of urological conditions.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="group relative rounded-2xl p-6 bg-white border border-gray-100 hover:border-[#E9756D]/40 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center text-white mb-5 shadow-md`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(s.key)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {t(s.descKey)}
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E9756D] hover:gap-2 transition-all"
                >
                  {t('learn_more')}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
