'use client';

import { motion } from 'framer- motion';
import Image from 'next/image';
import { Award, Star, Heart, Users } from 'lucide- react';
import { useTranslations } from 'next- intl';
import Container from '@/components/ui/Container';

export default function AboutHero() {
  const t = useTranslations();

  const stats = [
    { value: '20+', label: t('home.endourology'), icon: Award },
    { value: '580+', label: t('home.andrology'), icon: Users },
    { value: '98%', label: t('about.stone_disease'), icon: Star },
    { value: '24/7', label: t('about.prostate_disorder'), icon: Heart },
  ];

  return (
    <section className="relative overflow- hidden bg- linear- to- br from- [#FDF5EE] via- white to- [#FDF5EE]">
      <div
        className="absolute inset- 0 opacity- [0.05] pointer- events- none"
        style={{
          backgroundImage: 'radial- gradient(circle at 1px 1px, #E9756D 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria- hidden="true"
      />
      <div className="absolute - top- 32 - right- 24 w- 96 h- 96 rounded- full bg- [#E9756D]/10 blur- 3xl pointer- events- none" aria- hidden="true" />

      <Container className="relative py- 12 md:py- 20 lg:py- 24">
        <div className="grid grid- cols- 1 lg:grid- cols- 12 gap- 10 lg:gap- 12 items- center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col- span- 7"
          >
            <span className="inline- flex items- center gap- 2 px- 4 py- 1.5 rounded- full bg- white border border- [#E9756D]/20 shadow- sm text- [#E9756D] text- xs font- semibold tracking- wide uppercase mb- 5">
              <Star size={13} />
              {t('about.about_doctor')}
            </span>
            <h1 className="text- 3xl sm:text- 4xl lg:text- 5xl font- extrabold tracking- tight text- gray- 900 leading- [1.1]">
              {t('home.dr_name')}
            </h1>
            <h2 className="mt- 3 text- lg md:text- xl font- semibold text- [#E9756D]">
              {t('home.slogan')}
            </h2>
            <p className="mt- 5 text- base md:text- lg text- gray- 600 leading- relaxed max- w- 2xl">
              {t('about.bio')}
            </p>

            <div className="mt- 8 grid grid- cols- 2 sm:grid- cols- 4 gap- 3">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded- 2xl bg- white border border- gray- 100 p- 4 text- center">
                    <div className="mx- auto w- 9 h- 9 rounded- lg bg- [#E9756D]/10 text- [#E9756D] flex items- center justify- center mb- 2">
                      <Icon size={16} />
                    </div>
                    <div className="text- base font- bold text- gray- 900">{s.value}</div>
                    <div className="text- [11px] text- gray- 500 leading- tight mt- 0.5">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col- span- 5"
          >
            <div className="relative rounded- 3xl overflow- hidden shadow- xl shadow- [#E9756D]/15 border border- white/80 aspect- [4/5]">
              <Image
                src="/images/about/clinic- exterior.jpg"
                alt="Dr. Shekari Urology Clinic at Jami Hospital, Herat"
                fill
                className="object- cover"
                sizes="(max- width: 1024px) 90vw, 40vw"
                priority
              />
              <div className="absolute inset- x- 0 bottom- 0 bg- linear- to- t from- black/70 via- black/20 to- transparent p- 5">
                <div className="flex items- center gap- 3">
                  <div className="w- 11 h- 11 rounded- xl bg- linear- to- r from- [#E9756D] to- [#F6CA97] flex items- center justify- center shadow- md">
                    <span className="text- white font- bold text- sm">JH</span>
                  </div>
                  <div>
                    <div className="text- white font- bold text- base">Jami Hospital</div>
                    <div className="text- [#F6CA97] text- xs">Herat, Afghanistan</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
