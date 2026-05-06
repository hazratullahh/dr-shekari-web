'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, Phone } from 'lucide-react';

export default function CTABanner() {
  const t = useTranslations('home');
  const tc = useTranslations('cta');

  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#E9756D] to-[#D55A52] text-white p-8 md:p-14"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0px, transparent 35%), radial-gradient(circle at 80% 80%, rgba(233,117,109,0.3) 0px, transparent 40%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80 mb-3">
                {tc('badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {tc('title')}
              </h2>
              <p className="mt-4 text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
                {tc('subtitle')}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#E9756D] font-semibold shadow-lg hover:bg-[#FDF5EE] transition-colors"
              >
                <Calendar size={18} />
                {t('book_appointment')}
              </Link>
              <a
                href="tel:+93792453030"
                dir="ltr"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                <Phone size={18} />
                +93 79 245 3030
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
