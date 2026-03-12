'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ResearchContent = () => {
  const t = useTranslations('research_page');

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Published Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('published_articles')}
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>{t('published_topic1')}</li>
            <li>{t('published_topic2')}</li>
            <li>{t('published_topic3')}</li>
            <li>{t('published_topic4')}</li>
          </ul>
        </motion.div>

        {/* Case Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('case_reports')}
          </h2>
          <p className="text-gray-700 mb-4">
            {"Patient identity and personal data are fully anonymized."}
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>{t('case_example1')}</li>
            <li>{t('case_example2')}</li>
            <li>{t('case_example3')}</li>
          </ul>
        </motion.div>

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('research_interests')}
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>{t('interest1')}</li>
            <li>{t('interest2')}</li>
            <li>{t('interest3')}</li>
            <li>{t('interest4')}</li>
            <li>{t('interest5')}</li>
            <li>{t('interest6')}</li>
          </ul>
        </motion.div>

        {/* Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('collaborations')}
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>{t('collab1')}</li>
            <li>{t('collab2')}</li>
            <li>{t('collab3')}</li>
            <li>{t('collab4')}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchContent;
