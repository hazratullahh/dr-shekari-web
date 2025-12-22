// components/about/Philosophy.js
'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Users, Target, Brain, HandHeart } from 'lucide-react';

const Philosophy = () => {
  const principles = [
    {
      title: "Patient-Centered Care",
      description: "Every patient is unique. We tailor treatments to individual needs, ensuring personalized and effective care.",
      icon: <Heart className="text-[#E9756D]" size={28} />,
      color: "from-[#E9756D] to-[#FF9A8B]"
    },
    {
      title: "Medical Ethics",
      description: "We uphold the highest ethical standards in all medical practices, ensuring trust and transparency.",
      icon: <Shield className="text-[#F6CA97]" size={28} />,
      color: "from-[#F6CA97] to-[#FFB347]"
    },
    {
      title: "Continuous Learning",
      description: "Medicine evolves rapidly. We continuously update our knowledge with the latest global medical advancements.",
      icon: <Brain className="text-[#E9756D]" size={28} />,
      color: "from-[#E9756D] to-[#F6CA97]"
    },
    {
      title: "Team Collaboration",
      description: "We believe in collaborative care where our entire medical team works together for optimal patient outcomes.",
      icon: <Users className="text-[#F6CA97]" size={28} />,
      color: "from-[#F6CA97] to-[#E9756D]"
    },
    {
      title: "Evidence-Based Medicine",
      description: "All treatments are based on proven scientific evidence and the latest medical research.",
      icon: <Target className="text-[#E9756D]" size={28} />,
      color: "from-[#E9756D] to-[#FF9A8B]"
    },
    {
      title: "Compassionate Service",
      description: "We provide care with empathy, understanding, and respect for every patient's journey.",
      icon: <HandHeart className="text-[#F6CA97]" size={28} />,
      color: "from-[#F6CA97] to-[#FFB347]"
    }
  ];

  return (
    <section id="philosophy" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Philosophy</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The core values and principles that guide our approach to medical care and patient relationships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass-card p-8 rounded-3xl shadow-lg border border-white/20 h-full">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${principle.color} bg-opacity-10 flex items-center justify-center mb-6`}>
                  {principle.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {principle.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${principle.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${85 + (index * 2)}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Commitment Level</span>
                    <span className="text-sm font-bold text-[#E9756D]">100%</span>
                  </div>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 bg-gradient-to-r ${principle.color} rounded-tr-3xl opacity-20`} />
              <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 bg-gradient-to-r ${principle.color} rounded-bl-3xl opacity-20`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;