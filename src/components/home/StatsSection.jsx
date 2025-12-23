'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, Award, Clock, Heart, TrendingUp, Star } from 'lucide-react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    patients: 0,
    surgeries: 0,
    experience: 0,
    satisfaction: 0
  });

  const targetValues = {
    patients: 8500,
    surgeries: 5200,
    experience: 20,
    satisfaction: 98
  };

  const stats = [
    {
      id: 1,
      title: 'Patients Treated',
      value: counters.patients,
      suffix: '+',
      description: 'Successful patient recoveries',
      icon: <Users className="text-[#E9756D]" size={24} />,
      color: 'from-[#E9756D] to-[#FF9A8B]',
      delay: 0
    },
    {
      id: 2,
      title: 'Surgeries Performed',
      value: counters.surgeries,
      suffix: '+',
      description: 'Minimally invasive procedures',
      icon: <Award className="text-[#F6CA97]" size={24} />,
      color: 'from-[#F6CA97] to-[#FFB347]',
      delay: 0.15
    },
    {
      id: 3,
      title: 'Years of Excellence',
      value: counters.experience,
      suffix: '+',
      description: 'Medical expertise',
      icon: <Clock className="text-[#E9756D]" size={24} />,
      color: 'from-[#E9756D] to-[#F6CA97]',
      delay: 0.3
    },
    {
      id: 4,
      title: 'Patient Satisfaction',
      value: counters.satisfaction,
      suffix: '%',
      description: 'Rated excellent by patients',
      icon: <Heart className="text-[#FF9A8B]" size={24} />,
      color: 'from-[#FF9A8B] to-[#E9756D]',
      delay: 0.45
    }
  ];

  // Slower counter animation
  useEffect(() => {
    const duration = 4000; // 4 seconds total duration
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        patients: Math.floor(progress * targetValues.patients),
        surgeries: Math.floor(progress * targetValues.surgeries),
        experience: Math.floor(progress * targetValues.experience),
        satisfaction: Math.floor(progress * targetValues.satisfaction)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* 🌊 Much Slower Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => {
          const duration = 25 + i * 5; // Much longer duration
          const delay = i * 3;

          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 3 === 0
                  ? 'bg-[#E9756D]'
                  : i % 3 === 1
                    ? 'bg-[#F6CA97]'
                    : 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97]'
                }`}
              style={{
                width: `${30 + Math.random() * 70}px`,
                height: `${30 + Math.random() * 70}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.15 + Math.random() * 0.2
              }}
              initial={{
                y: 0,
                x: 0,
                rotate: 0
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.sin(i) * 50, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          );
        })}
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <motion.div
              className="w-12 h-1 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full mr-3"
              animate={{ width: ['48px', '80px', '48px'] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-[#E9756D] font-semibold tracking-wider">
              OUR ACHIEVEMENTS
            </span>
            <motion.div
              className="w-12 h-1 bg-gradient-to-r from-[#F6CA97] to-[#E9756D] rounded-full ml-3"
              animate={{ width: ['48px', '80px', '48px'] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: 2,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: stat.delay,
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.4 }
              }}
              className="relative group"
            >
              <div className="glass-card p-8 rounded-3xl shadow-xl border border-white/20 relative">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6`}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.75, 1]
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Counter */}
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97] ml-2">
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.description}</p>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{
                        duration: 3.5,
                        delay: stat.delay + 0.4,
                        ease: "easeInOut"
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Achievement</span>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <TrendingUp size={16} className="text-green-500" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="text-[#E9756D] mr-2" size={18} />
            </motion.div>
            <span className="text-gray-700 font-medium">
              Accredited by International Urology Associations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;