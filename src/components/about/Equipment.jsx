// components/about/Equipment.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Cpu, Zap, Brain, Settings, Shield, Target } from 'lucide-react';

const Equipment = () => {
  const equipment = [
    {
      name: "Robotic Surgery System",
      description: "Advanced robotic-assisted surgical system for precision minimally invasive procedures.",
      image: "/images/about/robotic-surgery.jpg",
      icon: <Cpu className="text-[#E9756D]" size={28} />,
      benefits: ["Precision Surgery", "Minimal Scarring", "Quick Recovery"],
      specs: ["3D HD Vision", "7-DOF Arms", "Tremor Filtering"]
    },
    {
      name: "Laser Treatment Unit",
      description: "State-of-the-art laser systems for kidney stones and prostate treatments.",
      image: "/images/about/laser-unit.jpg",
      icon: <Zap className="text-[#F6CA97]" size={28} />,
      benefits: ["Pain-Free", "No Incisions", "Outpatient Procedure"],
      specs: ["Holmium Laser", "Dual Wavelength", "Real-time Monitoring"]
    },
    {
      name: "Digital Endoscopy Suite",
      description: "High-definition endoscopic systems for diagnostic and therapeutic procedures.",
      image: "/images/about/endoscopy.jpg",
      icon: <Brain className="text-[#E9756D]" size={28} />,
      benefits: ["High Resolution", "Minimal Discomfort", "Accurate Diagnosis"],
      specs: ["4K Resolution", "Narrow Band Imaging", "Digital Recording"]
    },
    {
      name: "Ultrasound Systems",
      description: "Advanced ultrasound with Doppler for comprehensive urological imaging.",
      image: "/images/about/ultrasound.jpg",
      icon: <Settings className="text-[#F6CA97]" size={28} />,
      benefits: ["Real-time Imaging", "No Radiation", "Immediate Results"],
      specs: ["3D/4D Imaging", "Doppler Function", "Portable Units"]
    }
  ];

  return (
    <section id="equipment" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Medical Equipment</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Cutting-edge technology and modern equipment for accurate diagnosis and effective treatment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {equipment.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-white/20 h-full">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.name}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {item.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield size={18} className="text-[#E9756D] mr-2" />
                      Patient Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full text-sm font-medium text-gray-700"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Target size={18} className="text-[#F6CA97] mr-2" />
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 bg-white border border-gray-100 rounded-lg text-sm text-gray-600"
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-3xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Technology Commitment</span>
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto mb-6">
              We continuously invest in the latest medical technology to ensure our patients receive 
              the most advanced and effective treatments available globally.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full">
                <span className="font-medium text-gray-700">Annual Technology Upgrade</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full">
                <span className="font-medium text-gray-700">International Standards</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full">
                <span className="font-medium text-gray-700">Regular Maintenance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Equipment;