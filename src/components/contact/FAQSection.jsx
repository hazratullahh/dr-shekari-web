'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, HelpCircle, MessageSquare, Phone,
  Calendar, Clock, Shield, Zap, Filter, X,
  Eye
} from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      id: 'all',
      title: 'All Questions',
      icon: <HelpCircle className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#F6CA97]'
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: <Calendar className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#FF9A8B]'
    },
    {
      id: 'emergency',
      title: 'Emergency',
      icon: <Zap className="text-white" size={20} />,
      color: 'from-[#FF6B6B] to-[#FF9A8B]'
    },
    {
      id: 'services',
      title: 'Services',
      icon: <Shield className="text-white" size={20} />,
      color: 'from-[#E9756D] to-[#F6CA97]'
    },
    {
      id: 'practical',
      title: 'Practical',
      icon: <Clock className="text-white" size={20} />,
      color: 'from-[#F6CA97] to-[#FFB347]'
    }
  ];

  const allFAQs = [
    {
      id: 1,
      category: 'appointments',
      question: 'How do I book an appointment with Dr. Shekari?',
      answer: 'You can book appointments in three ways: 1) Call our appointment line at 070 445 3030, 2) Use the online form on this page, or 3) Visit our clinic at Jami Hospital during working hours. New patients should arrive 15 minutes early for registration.'
    },
    {
      id: 2,
      category: 'appointments',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring: 1) National ID or passport, 2) Previous medical records and test results, 3) Current medications list, 4) Insurance information if applicable, 5) Referral letter from your doctor (if any).'
    },
    {
      id: 3,
      category: 'appointments',
      question: 'How long does a typical consultation last?',
      answer: 'Initial consultations typically last 30-45 minutes to allow thorough evaluation. Follow-up visits are usually 15-20 minutes. Complex cases may require more time.'
    },
    {
      id: 4,
      category: 'appointments',
      question: 'Can I get a same-day emergency appointment?',
      answer: 'Yes, we reserve slots for emergencies daily. Call +93 79 245 3030 for immediate assistance. Urgent cases are prioritized.'
    },
    {
      id: 5,
      category: 'emergency',
      question: 'What constitutes a urological emergency?',
      answer: 'Seek immediate care for: 1) Severe kidney pain with fever, 2) Inability to urinate, 3) Heavy blood in urine with clots, 4) Testicular torsion symptoms (sudden severe pain), 5) Post-operative complications like excessive bleeding.'
    },
    {
      id: 6,
      category: 'emergency',
      question: 'Is your emergency service available 24/7?',
      answer: 'Yes, our emergency urology service operates 24 hours a day, 7 days a week. Call +93 79 245 3030 at any time for emergencies. An on-call urologist is always available.'
    },
    {
      id: 7,
      category: 'emergency',
      question: 'Do I need to call before coming for emergency?',
      answer: 'While not required, calling ahead helps us prepare for your arrival. For critical emergencies, come directly and our staff will assist immediately upon arrival.'
    },
    {
      id: 8,
      category: 'emergency',
      question: 'What emergency equipment do you have available?',
      answer: 'We have complete emergency facilities including: ultrasound machines, emergency surgery theater, dialysis equipment, blood bank access, and critical care monitoring systems.'
    },
    {
      id: 9,
      category: 'services',
      question: 'What urological conditions do you treat?',
      answer: 'We specialize in: kidney stones, prostate disorders, male infertility, urinary tract infections, bladder cancer, pediatric urology, erectile dysfunction, and minimally invasive surgeries including robotic and laser procedures.'
    },
    {
      id: 10,
      category: 'services',
      question: 'Do you perform robotic surgery?',
      answer: 'Yes, we have a state-of-the-art robotic surgery system. Dr. Rajesh Kumar (our Indian specialist) performs robotic prostatectomies, kidney surgeries, and reconstructive procedures with minimal invasiveness.'
    },
    {
      id: 11,
      category: 'services',
      question: 'What diagnostic tests are available at your clinic?',
      answer: 'We offer comprehensive diagnostics: ultrasound, CT scans, urodynamic testing, cystoscopy, PSA testing, semen analysis, 24-hour urine collection, and advanced blood work. Most results are available within 24 hours.'
    },
    {
      id: 12,
      category: 'services',
      question: 'Do you offer second opinions?',
      answer: 'Absolutely. We provide second opinion consultations where our international team reviews your case. Bring all medical records for comprehensive evaluation.'
    },
    {
      id: 13,
      category: 'practical',
      question: 'What are your clinic hours?',
      answer: 'Regular hours: Monday-Saturday 8:00 AM - 8:00 PM, Sunday 9:00 AM - 2:00 PM. Emergency services: 24/7. Administrative office: 8:00 AM - 5:00 PM weekdays.'
    },
    {
      id: 14,
      category: 'practical',
      question: 'What languages are spoken at your clinic?',
      answer: 'Our team is multilingual: Dari, Pashto, English, Hindi, and Urdu. International patients can request an English-speaking doctor or interpreter services.'
    },
    {
      id: 15,
      category: 'practical',
      question: 'Is parking available at your facility?',
      answer: 'Yes, we have ample free parking for patients and visitors. Valet service is available for patients with mobility issues. The parking area is monitored 24/7 for security.'
    },
    {
      id: 16,
      category: 'practical',
      question: 'Do you accept insurance plans?',
      answer: 'We accept most major insurance providers. Please bring your insurance card. For international patients, we provide detailed invoices for insurance claims. Cash and credit cards are also accepted.'
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
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#F6CA97] to-[#E9756D] blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-[#E9756D] to-[#F6CA97] mb-6"
          >
            <HelpCircle className="text-white" size={28} />
          </motion.div>

          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full mb-4">
            <span className="text-[#E9756D] font-semibold text-sm">
              Patient Information Center
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Questions</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quick answers to common questions about appointments, services, and procedures
          </p>
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
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                    ? 'text-white shadow-lg shadow-[#E9756D]/20 bg-gradient-to-r from-[#E9756D] to-[#F6CA97]'
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
                <span className="inline-flex items-center cursor-pointer px-4 py-2 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-lg text-gray-700">
                  <Filter size={16} className="mr-2 text-[#E9756D]" />
                  Showing questions about: <span className="font-semibold ml-1 text-[#E9756D]">
                    {faqCategories.find(c => c.id === activeCategory)?.title}
                  </span>
                  <button
                    type='button'
                    onClick={() => setActiveCategory('all')}
                    className="ml-3 cursor-pointer text-sm text-gray-500 hover:text-[#E9756D]"
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
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 text-left flex items-start justify-between hover:bg-gradient-to-r hover:from-white/50 hover:to-[#F6CA97]/5 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${faq.category === 'emergency'
                                ? 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-600'
                                : 'bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 text-[#E9756D]'
                              }`}>
                              {getCategoryIcon(faq.category)}
                            </div>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                              {faqCategories.find(c => c.id === faq.category)?.title}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8">
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
                                  {faq.category === 'emergency' && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
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
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <motion.div
                          animate={{ rotate: activeIndex === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center flex-shrink-0 ml-4"
                        >
                          <ChevronDown size={20} className="text-[#E9756D]" />
                        </motion.div>
                      </button>

                      {/* Quick action for emergency */}
                      {faq.category === 'emergency' && activeIndex !== faq.id && (
                        <div className="px-6 pb-6 pt-2">
                          <a
                            href="tel:+93792453030"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                          >
                            <Phone size={14} className="mr-1" />
                            Call immediately for emergencies
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/30 bg-gradient-to-r from-white/80 via-white/60 to-[#FDF5EE]/80">
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
                className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-6"
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
                  className="px-8 py-4 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  <Phone size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs opacity-90">Emergency & Appointments</div>
                    <div className="text-lg">+93 79 245 3030</div>
                  </div>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/50 hover:border-[#E9756D] transition-all duration-300 flex items-center"
                >
                  <MessageSquare size={20} className="mr-3" />
                  Ask a Question Online
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;