'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Globe, Award, Star } from 'lucide-react';

const TeamHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />
      
      {/* International Flags Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {['🇦🇫', '🇮🇳', '🇺🇸'].map((flag, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl"
            style={{
              left: `${20 + index * 30}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {flag}
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
              <Globe className="text-[#E9756D] mr-2" size={20} />
              <span className="text-[#E9756D] font-semibold">International Medical Team</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              World-Class
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
                Medical Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our international team brings together the best urological expertise 
              from Afghanistan, India, and the United States. Combining local 
              understanding with global medical advancements.
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: '15+', label: 'Specialist Doctors', icon: <Users className="text-[#E9756D]" /> },
                { value: '3', label: 'Countries', icon: <Globe className="text-[#E9756D]" /> },
                { value: '150+', label: 'Combined Years', icon: <Award className="text-[#E9756D]" /> },
                { value: '98%', label: 'Success Rate', icon: <Star className="text-[#E9756D]" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <div className="text-2xl font-bold text-gray-900 ml-2">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/team/international-team.jpg"
              alt="International Medical Team Collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* International Badges */}
            <div className="absolute top-6 left-6 flex space-x-2">
              {['🇦🇫', '🇮🇳', '🇺🇸'].map((flag, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">{flag}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2">International Collaboration</h3>
              <p className="text-[#F6CA97]">Bringing Global Expertise to Afghanistan</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;