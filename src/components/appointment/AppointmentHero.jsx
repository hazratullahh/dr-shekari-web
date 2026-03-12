'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Heart, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppointmentModal } from './AppointmentModal';

const AppointmentHero = () => {
  const t = useTranslations('appointment_page');
  const { setIsOpen } = useAppointmentModal();

  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[Calendar, User, Heart, MapPin].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-5"
            style={{
              left: `${15 + index * 25}%`,
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            {t('hero_title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -3, scale: 1.03 }}
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('submit')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AppointmentHero;
