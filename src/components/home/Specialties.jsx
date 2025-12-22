// components/Specialties.js (Updated with new colors)
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const specialties = [
  {
    title: "Urology",
    description: "Comprehensive diagnosis and treatment of urinary tract conditions in both men and women, including kidneys, bladder, and prostate.",
    icon: "🫀",
    color: "from-[#E9756D] to-[#F6CA97]"
  },
  {
    title: "Andrology",
    description: "Specialized care for male reproductive health, including fertility issues, sexual dysfunction, and hormonal disorders.",
    icon: "⚕️",
    color: "from-[#F6CA97] to-[#E9756D]"
  },
  {
    title: "Endourology",
    description: "Minimally invasive surgical techniques using endoscopes for kidney stones, tumors, and urinary tract obstructions.",
    icon: "🔬",
    color: "from-[#E9756D] to-[#FF9A8B]"
  },
  {
    title: "Robotic Surgery",
    description: "Advanced robotic-assisted procedures for precision surgery with faster recovery times and minimal scarring.",
    icon: "🤖",
    color: "from-[#F6CA97] to-[#FFB347]"
  },
  {
    title: "Laser Treatment",
    description: "State-of-the-art laser therapies for prostate conditions, kidney stones, and urinary tract issues.",
    icon: "💎",
    color: "from-[#E9756D] to-[#FF7B7B]"
  },
  {
    title: "Men's Health",
    description: "Holistic approach to men's wellness including preventive care, screenings, and lifestyle management.",
    icon: "🛡️",
    color: "from-[#F6CA97] to-[#E9756D]"
  }
];

export default function Specialties() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#E9756D] blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#F6CA97] blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full mr-3"></div>
            <span className="text-[#E9756D] font-semibold">Our Expertise</span>
            <div className="w-12 h-1 bg-gradient-to-r from-[#F6CA97] to-[#E9756D] rounded-full ml-3"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Specialties</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive urological care using the latest medical advancements and technology
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              {/* Glow effect on hover */}
              {hoveredIndex === index && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#E9756D]/20 to-[#F6CA97]/20 rounded-2xl blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <div className={`glass-card p-8 rounded-2xl shadow-xl h-full transition-all duration-300 border border-white/30 ${hoveredIndex === index ? 'shadow-2xl border-[#F6CA97]/30' : ''} relative z-10`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${specialty.color} mb-6 shadow-lg`}>
                  <span className="text-3xl">{specialty.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {specialty.title}
                </h3>
                
                <p className="text-gray-700 mb-6">
                  {specialty.description}
                </p>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full"
                />
                
                {/* Hover arrow */}
                <motion.div
                  className="absolute right-6 bottom-6 text-[#E9756D]"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ 
                    x: hoveredIndex === index ? 0 : -10,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}