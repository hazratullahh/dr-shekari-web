'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PhilosophyValues = () => {
  const values = [
    {
      title: 'Patient-Centered Care',
      description: 'Every decision is made with the patient\'s best interest at heart. We listen, understand, and collaborate with you throughout your treatment journey.',
      icon: '👨‍⚕️'
    },
    {
      title: 'Evidence-Based Medicine',
      description: 'Our treatments are grounded in the latest medical research and clinical evidence, ensuring you receive the most effective care available.',
      icon: '📊'
    },
    {
      title: 'Compassionate Approach',
      description: 'We understand the sensitive nature of urological conditions and provide care with empathy, respect, and confidentiality.',
      icon: '❤️'
    },
    {
      title: 'Continuous Innovation',
      description: 'We continually update our knowledge and techniques to incorporate the latest advancements in urological care.',
      icon: '🚀'
    },
    {
      title: 'Holistic Treatment',
      description: 'We consider all aspects of your health and well-being, not just the specific urological condition being treated.',
      icon: '🌿'
    },
    {
      title: 'Transparent Communication',
      description: 'We believe in clear, honest communication about diagnoses, treatment options, and expected outcomes.',
      icon: '💬'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Philosophy & Values</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The guiding principles that shape our approach to patient care and medical excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
              
              <div className="mt-6 pt-6 border-t border-[#F6CA97]/20">
                <div className="flex items-center text-[#E9756D]">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Core Value</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophyValues;