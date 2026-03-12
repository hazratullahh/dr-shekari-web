'use client';

import { motion } from 'framer-motion';
import { ClipboardCopy, BookOpen, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ResearchHero = () => {
  const t = useTranslations('research_page');

  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[ClipboardCopy, BookOpen, Globe].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-5"
            style={{
              left: `${15 + index * 30}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="text-[#E9756D]" size={48} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
        >
          {t('hero_title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>
      </div>
    </section>
  );
};

export default ResearchHero;
