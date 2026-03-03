'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, Award, Clock, Heart, TrendingUp, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const StatsSection = () => {
  const t = useTranslations("stats");

  const [counters, setCounters] = useState({
    patients: 0,
    surgeries: 0,
    experience: 0,
    satisfaction: 0
  });

  const targetValues = {
    patients: 2000,
    surgeries: 1000,
    experience: 15,
    satisfaction: 98
  };

  const stats = [
    {
      id: 1,
      title: t("patients_treated_title"),
      value: counters.patients,
      suffix: '+',
      description: t("patients_treated_desc"),
      icon: <Users className="text-[#E9756D]" size={24} />,
      color: 'from-[#E9756D] to-[#FF9A8B]',
      delay: 0
    },
    {
      id: 2,
      title: t("surgeries_performed_title"),
      value: counters.surgeries,
      suffix: '+',
      description: t("surgeries_performed_desc"),
      icon: <Award className="text-[#F6CA97]" size={24} />,
      color: 'from-[#F6CA97] to-[#FFB347]',
      delay: 0.15
    },
    {
      id: 3,
      title: t("years_excellence_title"),
      value: counters.experience,
      suffix: '+',
      description: t("years_excellence_desc"),
      icon: <Clock className="text-[#E9756D]" size={24} />,
      color: 'from-[#E9756D] to-[#F6CA97]',
      delay: 0.3
    },
    {
      id: 4,
      title: t("patient_satisfaction_title"),
      value: counters.satisfaction,
      suffix: '%',
      description: t("patient_satisfaction_desc"),
      icon: <Heart className="text-[#FF9A8B]" size={24} />,
      color: 'from-[#FF9A8B] to-[#E9756D]',
      delay: 0.45
    }
  ];

  // Counter animation
  useEffect(() => {
    const duration = 4000;
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        patients: Math.floor(progress * targetValues.patients),
        surgeries: Math.floor(progress * targetValues.surgeries),
        experience: Math.floor(progress * targetValues.experience),
        satisfaction: Math.floor(progress * targetValues.satisfaction)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden">

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E9756D] font-semibold tracking-wider">
            {t("header")}
          </span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: stat.delay }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="glass-card p-8 rounded-3xl shadow-xl border border-white/20 relative">

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${stat.color} flex items-center justify-center mb-6`}>
                  {stat.icon}
                </div>

                {/* Counter */}
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#E9756D] to-[#F6CA97] ml-2">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.description}</p>

                <div className="mt-6 flex justify-between text-sm text-gray-600">
                  <span>{t("achievement_label")}</span>
                  <TrendingUp size={16} className="text-green-500" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm">
            <Star className="text-[#E9756D] mr-2" size={18} />
            <span className="text-gray-700 font-medium">
              {t("accreditation_badge")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;