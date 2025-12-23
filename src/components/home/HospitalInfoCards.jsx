'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Heart, Clipboard, Award, Star } from 'lucide-react';

const HospitalInfoCards = () => {
  const [isLunchMode, setIsLunchMode] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('day');

  // Simulate time of day for dynamic theming
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTimeOfDay('night');
    } else if (hour >= 12 && hour < 14) {
      setTimeOfDay('lunch');
    } else {
      setTimeOfDay('day');
    }
  }, []);

  const languages = [
    "Dari", "Pashto", "English", "Hindi",
    "Urdu", "Persian", "Arabic", "Turkish"
  ];

  const getThemeColors = () => {
    switch (timeOfDay) {
      case 'night':
        return {
          primary: 'from-[#667eea] to-[#764ba2]',
          secondary: 'from-[#764ba2] to-[#667eea]',
          bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
          text: 'text-white',
          glass: 'glass-dark'
        };
      case 'lunch':
        return {
          primary: 'from-[#f093fb] to-[#f5576c]',
          secondary: 'from-[#f5576c] to-[#f093fb]',
          bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
          text: 'text-gray-900',
          glass: 'glass-warm'
        };
      default:
        return {
          primary: 'from-[#E9756D] to-[#F6CA97]',
          secondary: 'from-[#F6CA97] to-[#E9756D]',
          bg: 'bg-gradient-to-br from-blue-50 via-white to-rose-50',
          text: 'text-gray-900',
          glass: 'glass-card'
        };
    }
  };

  const theme = getThemeColors();

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Animated Background based on mode */}
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-white transition-all duration-1000`}>
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full`}
            //   i % 3 === 1 ? 'bg-[#F6CA97]/20' :
            //     'bg-gradient-to-r from-[#E9756D]/20 to-[#F6CA97]/20'
            //   }`}
            style={{
              width: `${10 + Math.random() * 40}px`,
              height: `${10 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full mb-6 border-2border-gradient-to-r from-[#E9756D] to-[#F6CA97]">
            <Star className="mr-2" size={20} />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
              Comprehensive Hospital Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
              Expert Care
            </span> in Your Language
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            World-class medical services delivered by a multilingual team of specialists
          </p>
        </motion.div>

        {/* Two Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* Card 1: Staff Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            onClick={() => setActiveCard(activeCard === 'staff' ? null : 'staff')}
            className="relative cursor-pointer"
          >
            <div className="p-8 rounded-3xl shadow-2xl relative overflow-hidden group h-full bg-white"
              style={{
                borderImage: 'linear-gradient(to right, #E9756D, #F6CA97) 1',
                borderImageSlice: 1
              }}
            >
              {/* Card Header */}
              <div className="relative flex items-start mb-8">
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  animate={activeCard === 'staff' ? { rotate: -360 } : {}}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E9756D] to-[#F6CA97] flex items-center justify-center mr-5 shadow-xl"
                >
                  <Users className="text-white" size={30} />
                </motion.div>
                <div className="flex-1 ml-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
                      Medical Team
                    </h3>
                    <motion.div
                      animate={activeCard === 'staff' ? { rotate: 360 } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Award className="text-[#E9756D]" size={20} />
                    </motion.div>
                  </div>
                  <p className="text-gray-600">Expert specialists at your service</p>

                  <motion.div
                    className="h-1 w-52 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full mt-3"
                    initial={{ width: 0 }}
                    animate={{ width: 250 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Staff Statistics */}
              <div className="space-y-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      role: "Urology Specialists",
                      count: isLunchMode ? "On Break" : "8 Doctors",
                      icon: <UserCheck className="text-white" size={18} />,
                      availability: isLunchMode ? 3 : 8
                    },
                    {
                      role: "Nursing Staff",
                      count: isLunchMode ? "Shift B Active" : "12 Nurses",
                      icon: <Heart className="text-white" size={18} />,
                      availability: isLunchMode ? 6 : 12
                    },
                    {
                      role: "Support Staff",
                      count: isLunchMode ? "Available" : "6 Assistants",
                      icon: <Users className="text-white" size={18} />,
                      availability: isLunchMode ? 2 : 6
                    },
                    {
                      role: "Administration",
                      count: isLunchMode ? "Limited" : "4 Personnel",
                      icon: <Clipboard className="text-white" size={18} />,
                      availability: isLunchMode ? 1 : 4
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      whileHover={{
                        x: 8,
                        boxShadow: "0 10px 30px rgba(233, 117, 109, 0.2)"
                      }}
                      className="relative"
                    >
                      <div className="flex flex-col h-full p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-[#E9756D]/50 transition-all duration-300">
                        {/* Top section - Role with icon */}
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center mr-4 shadow-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.role}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {isLunchMode ? 'Lunch schedule' : 'Full availability'}
                            </p>
                          </div>
                        </div>

                        {/* Bottom section - Count with availability bar */}
                        <div className="mt-auto">
                          <span className="font-bold text-lg text-gray-900 block mb-2">{item.count}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex-1">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.availability / 30) * 100}%` }}
                                transition={{ delay: index * 0.1 + 0.6 }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {item.availability}/30
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Total Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 pt-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Team Members</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
                        {isLunchMode ? '15' : '30'}
                      </span>
                      <span className="text-gray-700 font-medium ml-2">
                        {isLunchMode ? 'Currently Available' : 'Dedicated Professionals'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HospitalInfoCards;