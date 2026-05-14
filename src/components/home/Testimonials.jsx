'use client';

import { motion } from 'framer- motion';
import { useTranslations } from 'next- intl';
import { Star, Quote } from 'lucide- react';
import Reveal from '@/components/scroll/Reveal';

const TESTIMONIALS = [
  { id: 't1', initials: 'AK', city: 'Herat' },
  { id: 't2', initials: 'MR', city: 'Kabul' },
  { id: 't3', initials: 'NS', city: 'Mazar' },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="relative py- 16 md:py- 24 bg- linear- to- b from- white to- [#FDF5EE]">
      <div className="max- w- 7xl mx- auto px- 4 sm:px- 6 lg:px- 8">
        <Reveal as="div" className="max- w- 2xl mx- auto text- center mb- 12 md:mb- 16">
          <span className="inline- block text- [11px] font- semibold tracking- [0.18em] uppercase text- [#E9756D] mb- 3">
            {t('badge')}
          </span>
          <h2 className="text- 3xl md:text- 4xl lg:text- 5xl font- bold leading- tight bg- clip- text text- transparent bg- linear- to- br from- [#E9756D] to- [#F6CA97] inline- block">
            {t('title')}
          </h2>
          <p className="mt- 4 text- gray- 600 text- base md:text- lg leading- relaxed">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="grid grid- cols- 1 md:grid- cols- 3 gap- 6">
          {TESTIMONIALS.map((tm, i) => (
            <motion.figure
              key={tm.id}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="relative rounded- 2xl bg- white border border- gray- 100 p- 7 shadow- sm card- hover"
            >
              <Quote size={28} className="absolute top- 5 right- 5 text- [#E9756D]/15" />
              <div className="flex items- center gap- 1 mb- 4 text- amber- 400">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text- gray- 700 text- [15px] leading- relaxed">
                {t(`${tm.id}_text`)}
              </blockquote>
              <figcaption className="mt- 6 flex items- center gap- 3 pt- 5 border- t border- gray- 100">
                <div className="w- 10 h- 10 rounded- full bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white flex items- center justify- center font- semibold text- sm">
                  {tm.initials}
                </div>
                <div>
                  <div className="text- sm font- semibold text- gray- 900">{t(`${tm.id}_name`)}</div>
                  <div className="text- xs text- gray- 500">{tm.city} · {t('verified_patient')}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
