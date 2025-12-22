// components/contact/EmergencySection.js
'use client';

import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Ambulance, Clock } from 'lucide-react';

const EmergencySection = () => {
  const emergencySteps = [
    {
      step: "1",
      title: "Call Emergency",
      description: "Dial our 24/7 emergency line immediately",
      icon: <Phone size={24} />,
      color: "from-red-500 to-red-600"
    },
    {
      step: "2",
      title: "Describe Symptoms",
      description: "Clearly explain your symptoms to our staff",
      icon: <AlertTriangle size={24} />,
      color: "from-orange-500 to-amber-500"
    },
    {
      step: "3",
      title: "Ambulance Dispatch",
      description: "We dispatch ambulance if needed",
      icon: <Ambulance size={24} />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "4",
      title: "Immediate Care",
      description: "Receive emergency medical attention",
      icon: <Clock size={24} />,
      color: "from-green-500 to-emerald-500"
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            24/7 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Emergency Care</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Immediate medical attention for urological emergencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Emergency Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
              {/* Pulsing Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10"
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center mr-4 shadow-xl">
                    <Phone className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Emergency Contact</h3>
                    <p className="text-gray-600">Available 24 hours, 7 days a week</p>
                  </div>
                </div>

                <motion.a
                  href="tel:+93792453030"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full py-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-2xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center mb-6"
                >
                  +93 79 245 3030
                </motion.a>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-2">When to Call</h4>
                    <ul className="space-y-2 text-sm text-red-700">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                        Severe kidney pain or colic
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                        Inability to urinate
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                        Blood in urine with clots
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                        Post-operative complications
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Emergency Response Steps</h3>
              
              <div className="space-y-6">
                {emergencySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center mr-3">
                          <div className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            {step.icon}
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                      </div>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;