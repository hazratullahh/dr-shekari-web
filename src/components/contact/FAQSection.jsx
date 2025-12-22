// components/contact/FAQSection.js
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, Phone, Calendar, Clock, Shield } from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      id: 'appointments',
      title: 'Appointments & Consultations',
      icon: <Calendar className="text-[#E9756D]" size={20} />,
      questions: [
        {
          question: 'How do I book an appointment with Dr. Shekari?',
          answer: 'You can book appointments in three ways: 1) Call our appointment line at 070 445 3030, 2) Use the online form on this page, or 3) Visit our clinic at Jami Hospital during working hours. New patients should arrive 15 minutes early for registration.'
        },
        {
          question: 'What should I bring to my first appointment?',
          answer: 'Please bring: 1) National ID or passport, 2) Previous medical records and test results, 3) Current medications list, 4) Insurance information if applicable, 5) Referral letter from your doctor (if any).'
        },
        {
          question: 'How long does a typical consultation last?',
          answer: 'Initial consultations typically last 30-45 minutes to allow thorough evaluation. Follow-up visits are usually 15-20 minutes. Complex cases may require more time.'
        },
        {
          question: 'Can I get a same-day emergency appointment?',
          answer: 'Yes, we reserve slots for emergencies daily. Call +93 79 245 3030 for immediate assistance. Urgent cases are prioritized.'
        }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency & Urgent Care',
      icon: <Phone className="text-[#F6CA97]" size={20} />,
      questions: [
        {
          question: 'What constitutes a urological emergency?',
          answer: 'Seek immediate care for: 1) Severe kidney pain with fever, 2) Inability to urinate, 3) Heavy blood in urine with clots, 4) Testicular torsion symptoms (sudden severe pain), 5) Post-operative complications like excessive bleeding.'
        },
        {
          question: 'Is your emergency service available 24/7?',
          answer: 'Yes, our emergency urology service operates 24 hours a day, 7 days a week. Call +93 79 245 3030 at any time for emergencies. An on-call urologist is always available.'
        },
        {
          question: 'Do I need to call before coming for emergency?',
          answer: 'While not required, calling ahead helps us prepare for your arrival. For critical emergencies, come directly and our staff will assist immediately upon arrival.'
        },
        {
          question: 'What emergency equipment do you have available?',
          answer: 'We have complete emergency facilities including: ultrasound machines, emergency surgery theater, dialysis equipment, blood bank access, and critical care monitoring systems.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Treatments',
      icon: <Shield className="text-[#E9756D]" size={20} />,
      questions: [
        {
          question: 'What urological conditions do you treat?',
          answer: 'We specialize in: kidney stones, prostate disorders, male infertility, urinary tract infections, bladder cancer, pediatric urology, erectile dysfunction, and minimally invasive surgeries including robotic and laser procedures.'
        },
        {
          question: 'Do you perform robotic surgery?',
          answer: 'Yes, we have a state-of-the-art robotic surgery system. Dr. Rajesh Kumar (our Indian specialist) performs robotic prostatectomies, kidney surgeries, and reconstructive procedures with minimal invasiveness.'
        },
        {
          question: 'What diagnostic tests are available at your clinic?',
          answer: 'We offer comprehensive diagnostics: ultrasound, CT scans, urodynamic testing, cystoscopy, PSA testing, semen analysis, 24-hour urine collection, and advanced blood work. Most results are available within 24 hours.'
        },
        {
          question: 'Do you offer second opinions?',
          answer: 'Absolutely. We provide second opinion consultations where our international team reviews your case. Bring all medical records for comprehensive evaluation.'
        }
      ]
    },
    {
      id: 'practical',
      title: 'Practical Information',
      icon: <Clock className="text-[#F6CA97]" size={20} />,
      questions: [
        {
          question: 'What are your clinic hours?',
          answer: 'Regular hours: Monday-Saturday 8:00 AM - 8:00 PM, Sunday 9:00 AM - 2:00 PM. Emergency services: 24/7. Administrative office: 8:00 AM - 5:00 PM weekdays.'
        },
        {
          question: 'What languages are spoken at your clinic?',
          answer: 'Our team is multilingual: Dari, Pashto, English, Hindi, and Urdu. International patients can request an English-speaking doctor or interpreter services.'
        },
        {
          question: 'Is parking available at your facility?',
          answer: 'Yes, we have ample free parking for patients and visitors. Valet service is available for patients with mobility issues. The parking area is monitored 24/7 for security.'
        },
        {
          question: 'Do you accept insurance plans?',
          answer: 'We accept most major insurance providers. Please bring your insurance card. For international patients, we provide detailed invoices for insurance claims. Cash and credit cards are also accepted.'
        }
      ]
    }
  ];

  // Quick questions for sidebar
  const quickQuestions = [
    'How much does a consultation cost?',
    'Can I get my test results online?',
    'Do you provide telemedicine consultations?',
    'What is your cancellation policy?',
    'Are there female doctors available?',
    'How do I prepare for surgery?'
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <HelpCircle className="text-[#E9756D] mr-3" size={24} />
            <span className="text-[#E9756D] font-semibold text-lg">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Answers to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Common Questions</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find quick answers to common questions about our services, appointments, and procedures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Questions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-6 shadow-lg border border-white/20 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="text-[#E9756D] mr-2" size={20} />
                Quick Questions
              </h3>
              
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const categoryIndex = Math.floor(index / 2);
                      const questionIndex = index % 2;
                      const targetIndex = categoryIndex * 4 + questionIndex;
                      setActiveIndex(targetIndex);
                      
                      // Scroll to the FAQ
                      document.getElementById(`faq-${targetIndex}`)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#E9756D]/5 hover:to-[#F6CA97]/5 transition-all border border-transparent hover:border-[#F6CA97]/20"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#E9756D] mr-3" />
                      <span className="text-sm font-medium text-gray-700">{question}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl">
                <p className="text-sm text-gray-700 mb-3">Still have questions?</p>
                <motion.a
                  href="tel:+93792453030"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white text-sm font-semibold rounded-lg"
                >
                  <Phone size={16} className="mr-2" />
                  Call for Answers
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Main FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-4">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>

                  {/* Questions in this category */}
                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * 4 + questionIndex;
                      
                      return (
                        <motion.div
                          key={globalIndex}
                          id={`faq-${globalIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: questionIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <div className="glass-card rounded-xl overflow-hidden border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                            {/* Question */}
                            <button
                              onClick={() => toggleFAQ(globalIndex)}
                              className="w-full p-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-[#E9756D]/5 hover:to-[#F6CA97]/5 transition-all"
                            >
                              <div className="flex items-start">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-4 mt-1">
                                  <span className="text-sm font-bold text-[#E9756D]">
                                    {globalIndex + 1}
                                  </span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 pr-8">
                                  {item.question}
                                </h4>
                              </div>
                              
                              <motion.div
                                animate={{ rotate: activeIndex === globalIndex ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center flex-shrink-0"
                              >
                                <ChevronDown size={20} className="text-[#E9756D]" />
                              </motion.div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                              {activeIndex === globalIndex && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                    <div className="pl-12">
                                      <p className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                      </p>
                                      
                                      {/* Additional Info if Emergency */}
                                      {category.id === 'emergency' && (
                                        <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-100">
                                          <div className="flex items-center">
                                            <Phone size={16} className="text-red-600 mr-2" />
                                            <span className="text-sm font-medium text-red-800">
                                              Emergency Line: <a href="tel:+93792453030" className="underline">+93 79 245 3030</a>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Additional Info if Appointment */}
                                      {category.id === 'appointments' && questionIndex === 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                          <span className="px-3 py-1 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full text-sm font-medium text-gray-700">
                                            Phone Booking
                                          </span>
                                          <span className="px-3 py-1 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full text-sm font-medium text-gray-700">
                                            Online Form
                                          </span>
                                          <span className="px-3 py-1 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full text-sm font-medium text-gray-700">
                                            Walk-in Welcome
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="glass-card rounded-3xl p-8 shadow-xl border border-white/20 bg-gradient-to-r from-[#E9756D]/5 via-white to-[#F6CA97]/5">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-6">
                    <HelpCircle className="text-[#E9756D]" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Still Have Questions?
                  </h3>
                  
                  <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                    Our medical team is ready to answer any questions you have about 
                    urological health, treatments, or appointments. Don't hesitate to reach out.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="tel:+93792453030"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <Phone size={20} className="mr-2" />
                      Call for Immediate Help
                    </motion.a>
                    
                    <motion.a
                      href="#form"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 glass-card text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/30 hover:border-[#E9756D] transition-all duration-300 flex items-center justify-center"
                    >
                      <MessageSquare size={20} className="mr-2" />
                      Send Your Question
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;