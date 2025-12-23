'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Star, Heart, Users } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />
      
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
            style={{
              left: `${(i * 10)}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {i % 4 === 0 ? '🫀' : i % 4 === 1 ? '⚕️' : i % 4 === 2 ? '🔬' : '🏥'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full mb-6">
              <Star size={16} className="text-[#E9756D] mr-2" />
              <span className="text-[#E9756D] font-semibold">About Our Clinic</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Excellence in 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
                Urological Care
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              For over 20 years, Dr. Nazir Ahmad Shekari has been at the forefront of 
              urological medicine in Afghanistan. Our clinic combines cutting-edge 
              technology with compassionate care to provide world-class treatment.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { value: '20+', label: 'Years Experience', icon: <Award className="text-[#E9756D]" /> },
                { value: '8500+', label: 'Patients Treated', icon: <Users className="text-[#E9756D]" /> },
                { value: '98%', label: 'Success Rate', icon: <Star className="text-[#E9756D]" /> },
                { value: '24/7', label: 'Emergency Care', icon: <Heart className="text-[#E9756D]" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="inline-flex p-2 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule Consultation
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/about/clinic-exterior.jpg"
              alt="Dr. Shekari Urology Clinic at Jami Hospital, Herat"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">JS</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Jami Hospital</h3>
                  <p className="text-[#F6CA97]">Herat, Afghanistan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;