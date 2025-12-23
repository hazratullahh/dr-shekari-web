'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Target, Zap, Microscope } from 'lucide-react';

const SpecialtiesGrid = () => {
  const specialties = [
    {
      title: "Robotic Surgery",
      description: "Minimally invasive procedures with robotic precision",
      icon: <Brain className="text-[#E9756D]" size={28} />,
      doctors: ["Dr. Rajesh Kumar", "Dr. Michael Johnson"],
      successRate: "99%",
      recovery: "3-5 Days"
    },
    {
      title: "Andrology & Fertility",
      description: "Comprehensive male reproductive health care",
      icon: <Heart className="text-[#F6CA97]" size={28} />,
      doctors: ["Dr. Fatima Zahra", "Dr. Nazir Shekari"],
      successRate: "85%",
      recovery: "Personalized"
    },
    {
      title: "Endourology",
      description: "Minimally invasive kidney and bladder treatments",
      icon: <Microscope className="text-[#E9756D]" size={28} />,
      doctors: ["Dr. Michael Johnson", "Dr. Nazir Shekari"],
      successRate: "96%",
      recovery: "1-2 Days"
    },
    {
      title: "Pediatric Urology",
      description: "Specialized care for children's urological needs",
      icon: <Shield className="text-[#F6CA97]" size={28} />,
      doctors: ["Dr. Ahmed Raza"],
      successRate: "98%",
      recovery: "Child-Friendly"
    },
    {
      title: "Laser Treatment",
      description: "Advanced laser therapies for stones and prostate",
      icon: <Zap className="text-[#E9756D]" size={28} />,
      doctors: ["Dr. Rajesh Kumar", "Dr. Michael Johnson"],
      successRate: "97%",
      recovery: "Outpatient"
    },
    {
      title: "Oncology Surgery",
      description: "Cancer treatment with organ preservation",
      icon: <Target className="text-[#F6CA97]" size={28} />,
      doctors: ["Dr. Nazir Shekari", "Dr. Rajesh Kumar"],
      successRate: "92%",
      recovery: "Individualized"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Specialties</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive urological care across all specialties with expert doctors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card p-8 rounded-3xl shadow-lg border border-white/20 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mb-6 group-hover:from-[#E9756D]/20 group-hover:to-[#F6CA97]/20">
                  {specialty.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {specialty.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {specialty.description}
                </p>

                {/* Doctors */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Specialist Doctors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {specialty.doctors.map((doctor, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-full text-xs font-medium text-gray-700"
                      >
                        {doctor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#E9756D]">{specialty.successRate}</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#F6CA97]">{specialty.recovery}</div>
                    <div className="text-xs text-gray-600">Recovery Time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesGrid;