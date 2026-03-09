// components/contact/ContactHero.js
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Calendar, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ContactHero = () => {
  const t = useTranslations('contact');
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />

      {/* Floating Contact Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[MessageSquare, Phone, Calendar, MapPin].map((Icon, index) => (
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full mb-6"
          >
            <MessageSquare className="text-[#E9756D] mx-2" size={20} />
            <span className="text-[#E9756D] font-semibold">{t('get_in_touch')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            {t('we_are_here_to_help')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('contact_description')}
          </motion.p>

          {/* Quick Contact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                icon: <Phone className="text-[#E9756D]" size={24} />,
                title: t('emergency_line'),
                value: "+93 79 245 3030",
                action: "tel:+93792453030",
                dir: "ltr"
              },
              {
                icon: <Calendar className="text-[#F6CA97]" size={24} />,
                title: t('response_time'),
                value: t('within_2_hours'),
                action: "#form"
              },
              {
                icon: <MapPin className="text-[#E9756D]" size={24} />,
                title: t('clinic_location'),
                value: t('jami_hospital_herat'),
                action: "#map"
              }
            ].map((stat, index) => (
              <motion.a
                key={index}
                href={stat.action}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-2xl text-center group"
              >
                <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-4 group-hover:from-[#E9756D]/20 group-hover:to-[#F6CA97]/20">
                  {stat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
                <p dir={stat.dir} className="text-[#E9756D] font-medium">{stat.value}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;