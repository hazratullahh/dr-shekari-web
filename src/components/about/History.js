// components/about/History.js
'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, Users, Building, Star } from 'lucide-react';

const History = () => {
  const timeline = [
    {
      year: "2003",
      title: "Establishment",
      description: "Dr. Nazir Ahmad Shekari established his urology practice at Jami Hospital, becoming one of Herat's first specialized urologists.",
      icon: <Building size={24} />,
      color: "bg-[#E9756D]"
    },
    {
      year: "2008",
      title: "First Endourology Unit",
      description: "Introduced Afghanistan's first dedicated endourology unit with minimally invasive surgery capabilities.",
      icon: <Award size={24} />,
      color: "bg-[#F6CA97]"
    },
    {
      year: "2015",
      title: "Andrology Center",
      description: "Expanded services to include comprehensive andrology care for male reproductive health.",
      icon: <Users size={24} />,
      color: "bg-[#E9756D]"
    },
    {
      year: "2020",
      title: "Modernization",
      description: "Complete clinic renovation with state-of-the-art equipment and digital patient management systems.",
      icon: <Star size={24} />,
      color: "bg-[#F6CA97]"
    },
    {
      year: "2024",
      title: "Present Day",
      description: "Recognized as Afghanistan's leading urology center with 20+ years of excellence and 8500+ successful treatments.",
      icon: <Calendar size={24} />,
      color: "bg-gradient-to-r from-[#E9756D] to-[#F6CA97]"
    }
  ];

  return (
    <section id="history" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <Calendar className="text-[#E9756D] mr-3" size={24} />
            <span className="text-[#E9756D] font-semibold text-lg">Our Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            20 Years of 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
              Medical Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From humble beginnings to becoming Afghanistan's premier urology center
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#E9756D] via-[#F6CA97] to-[#E9756D] hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-0">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative lg:w-1/2 ${index % 2 === 0 ? 'lg:ml-0 lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-6 ${index % 2 === 0 ? 'lg:-right-6' : 'lg:-left-6'} w-12 h-12 rounded-full ${item.color} flex items-center justify-center shadow-xl z-10`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                
                {/* Content Card */}
                <div className={`glass-card p-6 rounded-2xl shadow-lg border border-white/20 ${index % 2 === 0 ? 'lg:text-rights' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-4 py-1 ${item.color} text-white font-bold rounded-full text-sm`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;