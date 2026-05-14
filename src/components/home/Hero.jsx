'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, Phone, ShieldCheck, Award, Stethoscope } from 'lucide-react';
import Container from '@/components/ui/Container';

// Floating cards module is heavy (lots of motion components). Defer it so the
// hero text + CTA paint instantly; cards stream in after.
const HeroFloatingCards = dynamic(() => import('./HeroFloatingCards'), {
  ssr: false,
  loading: () => <div className="w-full aspect-square max-w-md mx-auto" aria-hidden="true" />,
});

const easeOut = [0.22, 1, 0.36, 1];

export default function Hero() {
  const t = useTranslations('home');
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax on copy + background. transform/opacity only.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.3]);
  const orbAY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const cardsScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-br from-[#FDF5EE] via-white to-[#FDF5EE]"
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #E9756D 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <motion.div
        style={{ y: orbAY, willChange: 'transform' }}
        className="absolute -top-40 -end-40 w-120 h-120 rounded-full bg-[#E9756D]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: orbBY, willChange: 'transform' }}
        className="absolute -bottom-32 -start-20 w-105 h-105 rounded-full bg-[#F6CA97]/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            style={{ y: copyY, opacity: copyOpacity, willChange: 'transform, opacity' }}
            className="lg:col-span-7"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9756D]/20 shadow-sm text-[#E9756D] text-xs font-semibold tracking-wide uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-linear-to-br from-[#E9756D] to-[#F6CA97] animate-pulse" />
              {t('leading')} {t('urology')} · {t('andrology')} · {t('endourology')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-gray-900"
            >
              {t('dr_name')}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
              className="mt-4 text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] inline-block"
            >
              {t('slogan')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: easeOut }}
              className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl"
            >
              {t('intro')}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.32 } },
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.div variants={ctaItem} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white font-semibold shadow-lg shadow-[#E9756D]/30 hover:shadow-xl hover:shadow-[#E9756D]/40 transition-shadow"
                  aria-label={t('book_appointment')}
                >
                  <Calendar size={18} />
                  {t('book_appointment')}
                </Link>
              </motion.div>
              <motion.a
                href="tel:+93796040915"
                dir="ltr"
                variants={ctaItem}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold hover:border-[#E9756D]/40 hover:text-[#E9756D] transition-colors"
              >
                <Phone size={18} />
                {t('call')}
              </motion.a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
              }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
            >
              <Stat value="5+" label={t('year_expr')} />
              <Stat value="1000+" label={t('successful_surgeries')} />
              <Stat value="98%" label={t('patient_satisfaction')} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.7, ease: easeOut }}
              className="mt-8 flex flex-wrap items-center gap-4 text-xs text-gray-500"
            >
              <Trust icon={ShieldCheck}>{t('urology')}</Trust>
              <Trust icon={Award}>{t('endourology')}</Trust>
              <Trust icon={Stethoscope}>{t('andrology')}</Trust>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            style={{ y: cardsY, scale: cardsScale, willChange: 'transform' }}
            className="lg:col-span-5"
          >
            <HeroFloatingCards />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

const ctaItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

function Stat({ value, label }) {
  return (
    <motion.div variants={ctaItem}>
      <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97]">
        {value}
      </div>
      <div className="text-[11px] md:text-xs text-gray-500 leading-snug mt-1">{label}</div>
    </motion.div>
  );
}

function Trust({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon size={14} className="text-[#E9756D]" />
      {children}
    </span>
  );
}
