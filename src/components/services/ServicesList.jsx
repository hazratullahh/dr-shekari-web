// components/services/ServicesList.jsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Zap,
  Webhook,
  Users,
  Activity,
  Heart,
  Stethoscope,
  MonitorCheck,
  Slice,
} from 'lucide-react';

const ServicesList = () => {
  const t = useTranslations('services_page');

  const servicesData = [
    {
      id: 'kidney-stones',
      icon: <Zap size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'kidney_stones',
      description: t('kidney_stones_desc')
    },
    {
      id: 'prostate-diseases',
      icon: <Activity size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'prostate_diseases',
      description: t('prostate_diseases_desc')
    },
    {
      id: 'urinary-infections',
      icon: <Webhook size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'urinary_infections',
      description: t('urinary_infections_desc')
    },
    {
      id: 'male-infertility',
      icon: <Users size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'male_infertility',
      description: t('male_infertility_desc')
    },
    {
      id: 'sexual-disorders',
      icon: <MonitorCheck size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'sexual_disorders',
      description: t('sexual_disorders_desc')
    },
    {
      id: 'endourology-surgeries',
      icon: <Slice size={24} className="text-[#E9756D] mx-2" />,
      titleKey: 'endourology_surgeries',
      description: t('endourology_surgeries_desc')
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          {t('main_services')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <motion.a
              key={service.id}
              href={`#${service.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="ml-3 font-semibold text-gray-900">
                  {t(service.titleKey)}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <span className="mt-4 inline-block text-[#E9756D] font-medium hover:underline">
                {t('learn_more')}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Detail sections */}
        <div className="mt-20 space-y-16">
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose max-w-none"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t(service.titleKey)}
              </h2>
              <h3 className="font-semibold">{t(`${service.id.replace(/-/g, '_')}_what`)}</h3>
              <p>{t(`${service.id.replace(/-/g, '_')}_what_desc`)}</p>
              <h3 className="font-semibold">{t(`${service.id.replace(/-/g, '_')}_symptoms`)}</h3>
              <p>{t(`${service.id.replace(/-/g, '_')}_symptoms_desc`)}</p>
              <h3 className="font-semibold">{t(`${service.id.replace(/-/g, '_')}_diagnosis`)}</h3>
              <p>{t(`${service.id.replace(/-/g, '_')}_diagnosis_desc`)}</p>
              <h3 className="font-semibold">{t(`${service.id.replace(/-/g, '_')}_treatment`)}</h3>
              <p>{t(`${service.id.replace(/-/g, '_')}_treatment_desc`)}</p>
              <h3 className="font-semibold">{t(`${service.id.replace(/-/g, '_')}_when`)}</h3>
              <p>{t(`${service.id.replace(/-/g, '_')}_when_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
