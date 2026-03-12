'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, HelpCircle, MessageSquare, Phone,
  Calendar, Clock, Shield, Zap, Filter, X,
  Eye
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAQSection = () => {
  const t = useTranslations('contact');
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      id: 'all',
      title: t('all_questions'),
      icon: <HelpCircle className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#F6CA97]'
    },
    {
      id: 'appointments',
      title: t('faq_appointments'),
      icon: <Calendar className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#FF9A8B]'
    },
    {
      id: 'emergency',
      title: t('faq_emergency'),
      icon: <Zap className="text-white" size={20} />,
      color: 'from-[#FF6B6B] to-[#FF9A8B]'
    },
    {
      id: 'services',
      title: t('faq_services'),
      icon: <Shield className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#F6CA97]'
    },
    {
      id: 'practical',
      title: t('faq_practical'),
      icon: <Clock className="text-white" size={20} />,
      color: 'from-[#F6CA97] to-[#FFB347]'
    }
  ];

  const allFAQs = [
    {
      id: 1,
      category: 'appointments',
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      id: 2,
      category: 'appointments',
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      id: 3,
      category: 'appointments',
      question: t('faq_q3'),
      answer: t('faq_a3')
    },
    {
      id: 4,
      category: 'appointments',
      question: t('faq_q4'),
      answer: t('faq_a4')
    },
    {
      id: 5,
      category: 'emergency',
      question: t('faq_q5'),
      answer: t('faq_a5')
    },
    {
      id: 6,
      category: 'emergency',
      question: t('faq_q6'),
      answer: t('faq_a6')
    },
    {
      id: 7,
      category: 'emergency',
      question: t('faq_q7'),
      answer: t('faq_a7')
    },
    {
      id: 8,
      category: 'emergency',
      question: t('faq_q8'),
      answer: t('faq_a8')
    },
    {
      id: 9,
      category: 'services',
      question: t('faq_q9'),
      answer: t('faq_a9')
    },
    {
      id: 10,
      category: 'services',
      question: t('faq_q10'),
      answer: t('faq_a10')
    },
    {
      id: 11,
      category: 'services',
      question: t('faq_q11'),
      answer: t('faq_a11')
    },
    {
      id: 12,
      category: 'services',
      question: t('faq_q12'),
      answer: t('faq_a12')
    },
    {
      id: 13,
      category: 'practical',
      question: t('faq_q13'),
      answer: t('faq_a13')
    },
    {
      id: 14,
      category: 'practical',
      question: t('faq_q14'),
      answer: t('faq_a14')
    },
    {
      id: 15,
      category: 'practical',
      question: t('faq_q15'),
      answer: t('faq_a15')
    },
    {
      id: 16,
      category: 'practical',
      question: t('faq_q16'),
      answer: t('faq_a16')
    },
    // additional site-wide FAQs
    {
      id: 17,
      category: 'services',
      question: t('faq_page.q_kidney_stone'),
      answer: t('faq_page.a_kidney_stone')
    },
    {
      id: 18,
      category: 'services',
      question: t('faq_page.q_prostate_care'),
      answer: t('faq_page.a_prostate_care')
    },
    {
      id: 19,
      category: 'services',
      question: t('faq_page.q_male_infertility'),
      answer: t('faq_page.a_male_infertility')
    }
  ];

  const filteredFAQs = activeCategory === 'all'
    ? allFAQs
    : allFAQs.filter(faq => faq.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'appointments': return <Calendar size={16} />;
      case 'emergency': return <Zap size={16} />;
      case 'services': return <Shield size={16} />;
      case 'practical': return <Clock size={16} />;
      default: return <HelpCircle size={16} />;
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-linear-to-r from-[#F6CA97] to-[#E9756D] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r from-[#E9756D] to-[#F6CA97] mb-6"
          >
            <HelpCircle className="text-white" size={28} />
          </motion.div>

          <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full mb-4">
            <span className="text-[#E9756D] font-semibold text-sm">
              {t('patient_information_center')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('frequently_asked_questions')}
          </h1>

          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quick answers to common questions about appointments, services, and procedures
          </p> */}
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {faqCategories.map((category) => (
              <motion.button
                type='button'
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                  ? 'text-white shadow-lg shadow-[#E9756D]/20 bg-linear-to-r from-[#E9756D] to-[#F6CA97]'
                  : 'text-gray-700 bg-white/80 border border-gray-200 hover:border-[#E9756D]/30'
                  }`}
                style={{
                  background: activeCategory === category.id
                    ? `linear-gradient(135deg, ${category.color.includes('from-') ? '' : '#E9756D'} ${category.color})`
                    : ''
                }}
              >
                {category.icon}
                <span>{category.title}</span>
                {activeCategory === category.id && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1"
                  >
                    <Eye size={16} />
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Active Category Indicator */}
          <AnimatePresence mode="wait">
            {activeCategory !== 'all' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 text-center"
              >
                <span className="inline-flex items-center cursor-pointer px-4 py-2 bg-linear-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-lg text-gray-700">
                  <Filter size={16} className="mr-2 text-[#E9756D]" />
                  Showing questions about: <span className="font-semibold mx-1 text-[#E9756D]">
                    {faqCategories.find(c => c.id === activeCategory)?.title}
                  </span>
                  <button
                    type='button'
                    onClick={() => setActiveCategory('all')}
                    className="mx-3 cursor-pointer text-sm text-gray-500 hover:text-[#E9756D]"
                  >
                    Clear filter
                  </button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layoutId={`faq-${faq.id}`}
                  >
                    <div className="glass-card rounded-2xl border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                      <button
                        type='button'
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 cursor-pointer text-left flex items-start justify-between hover:bg-linear-to-r hover:from-white/50 hover:to-[#F6CA97]/5 transition-all duration-300"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${faq.category === 'emergency'
                              ? 'bg-linear-to-r from-red-500/10 to-rose-500/10 text-red-600'
                              : 'bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 text-[#E9756D]'
                              }`}>
                              {getCategoryIcon(faq.category)}
                            </div>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                              {faqCategories.find(c => c.id === faq.category)?.title}
                            </span>
                          </div>

                          <h3 dir='rtls' className="text-lg font-semibold text-gray-900 mb-3pr-8">
                            {faq.question}
                          </h3>

                          <AnimatePresence>
                            {activeIndex === faq.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 border-t border-gray-100">
                                  <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </p>

                                  {/* Emergency specific CTA */}
                                  {/* {faq.category === 'emergency' && (
                                    <div className="mt-4 p-4 bg-linear-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <Phone size={18} className="text-red-600 mr-2" />
                                          <span className="text-sm font-semibold text-red-800">
                                            Emergency Hotline
                                          </span>
                                        </div>
                                        <a
                                          href="tel:+93792453030"
                                          className="text-red-600 font-bold hover:text-red-700"
                                        >
                                          +93 79 245 3030
                                        </a>
                                      </div>
                                    </div>
                                  )} */}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <motion.div
                          animate={{ rotate: activeIndex === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-10 h-10 rounded-xl bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center flex-shrink-0 ml-4"
                        >
                          <ChevronDown size={20} className="text-[#E9756D]" />
                        </motion.div>
                      </button>

                      {/* Quick action for emergency */}
                      {/* {faq.category === 'emergency' && activeIndex !== faq.id && (
                        <div className="px-6 pb-6 pt-2">
                          <a
                            href="tel:+93792453030"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                          >
                            <Phone size={14} className="mr-1" />
                            Call immediately for emergencies
                          </a>
                        </div>
                      )} */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still Have Questions CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/30 bg-linear-to-r from-white/80 via-white/60 to-[#FDF5EE]/80">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="inline-flex p-4 rounded-2xl bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-6"
              >
                <MessageSquare className="text-[#E9756D]" size={36} />
              </motion.div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>

              <p className="text-gray-600 mb-8 text-lg">
                Our medical team is available to answer any questions about urological health,
                treatments, or appointments. We're here to help you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="tel:+93792453030"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  <Phone size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs opacity-90">Emergency & Appointments</div>
                    <div className="text-lg">+93 79 245 3030</div>
                  </div>
                </motion.a>

                <motion.button
                type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card cursor-pointer text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/50 hover:border-[#E9756D] transition-all duration-300 flex items-center"
                >
                  <MessageSquare size={20} className="mr-3" />
                  Ask a Question Online
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default FAQSection;