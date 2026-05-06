'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/scroll/Reveal';

const FAQ_KEYS = ['faq_q1', 'faq_q9', 'faq_q11', 'faq_q13', 'faq_q14', 'faq_q16'];

export default function HomeFAQ() {
  const t = useTranslations('contact');
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="text-center mb-12">
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E9756D] mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] inline-block">
            {t('frequently_asked_questions')}
          </h2>
          <p className="mt-4 text-gray-600">
            Quick answers to the most common questions about consultations, treatments, and clinic operations.
          </p>
        </Reveal>

        <Reveal as="div" delay={0.05} className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
          {FAQ_KEYS.map((key, i) => {
            const isOpen = openIdx === i;
            const answerKey = key.replace('_q', '_a');
            return (
              <div key={key}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full px-5 md:px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] md:text-base font-semibold text-gray-900">
                    {t(key)}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#E9756D] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 text-sm md:text-[15px] text-gray-600 leading-relaxed">
                        {t(answerKey)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
