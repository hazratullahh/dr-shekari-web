'use client';

import { motion } from 'framer- motion';
import { useTranslations } from 'next- intl';
import { Award, ShieldCheck, Clock, HeartHandshake, GraduationCap, Microscope } from 'lucide- react';
import Reveal from '@/components/scroll/Reveal';

const items = [
  { icon: Award, titleKey: 'wc_t1', bodyKey: 'wc_b1' },
  { icon: GraduationCap, titleKey: 'wc_t2', bodyKey: 'wc_b2' },
  { icon: Microscope, titleKey: 'wc_t3', bodyKey: 'wc_b3' },
  { icon: ShieldCheck, titleKey: 'wc_t4', bodyKey: 'wc_b4' },
  { icon: Clock, titleKey: 'wc_t5', bodyKey: 'wc_b5' },
  { icon: HeartHandshake, titleKey: 'wc_t6', bodyKey: 'wc_b6' },
];

export default function WhyChoose() {
  const t = useTranslations('why_choose');

  return (
    <section className="relative py- 16 md:py- 24 bg- linear- to- b from- [#F8FBFC] to- white">
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

        <div className="grid grid- cols- 1 sm:grid- cols- 2 lg:grid- cols- 3 gap- 5 md:gap- 6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.titleKey}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '- 50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="rounded- 2xl p- 6 bg- white border border- gray- 100 hover:border- [#E9756D]/30 card- hover"
              >
                <div className="w- 11 h- 11 rounded- xl bg- [#E9756D]/10 text- [#E9756D] flex items- center justify- center mb- 4">
                  <Icon size={20} />
                </div>
                <h3 className="text- base font- semibold text- gray- 900 mb- 1.5">{t(it.titleKey)}</h3>
                <p className="text- sm text- gray- 600 leading- relaxed">{t(it.bodyKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
