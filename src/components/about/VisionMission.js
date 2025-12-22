// components/about/VisionMission.js
'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Shield } from 'lucide-react';

const VisionMission = () => {
  const visionMission = [
    {
      title: "Our Vision",
      icon: <Eye className="text-[#E9756D]" size={32} />,
      description: "To be Afghanistan's leading center for urological excellence, setting new standards in patient care and medical innovation.",
      color: "from-[#E9756D] to-[#FF9A8B]",
      points: [
        "Center of Excellence in Urology",
        "Regional Medical Innovation Hub",
        "International Standards of Care"
      ]
    },
    {
      title: "Our Mission",
      icon: <Target className="text-[#F6CA97]" size={32} />,
      description: "To provide accessible, world-class urological care through advanced technology, compassionate service, and continuous medical education.",
      color: "from-[#F6CA97] to-[#FFB347]",
      points: [
        "Advanced Medical Technology",
        "Patient-Centered Approach",
        "Continuous Medical Education",
        "Affordable Quality Care"
      ]
    }
  ];

  return (
    <section id="vision-mission" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <Rocket className="text-[#E9756D] mr-3" size={24} />
            <span className="text-[#E9756D] font-semibold text-lg">Vision & Mission</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Guiding Principles for 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our commitment to providing the highest standard of urological care in Afghanistan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visionMission.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 blur-xl rounded-3xl transition-opacity duration-300`} />
              
              <div className="glass-card p-8 rounded-3xl shadow-xl border border-white/20 relative z-10">
                <div className="flex items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} bg-opacity-10 mr-4`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${item.color} rounded-full`} />
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <ul className="space-y-3">
                  {item.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <Shield size={16} className="text-[#E9756D] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Animated Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;