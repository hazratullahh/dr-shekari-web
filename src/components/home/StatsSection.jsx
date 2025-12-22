// components/home/StatsSection.js - Unique stats design with animations
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
    experience: 22,
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
      delay: 0.1
    },
    {
      id: 3,
      title: 'Years of Excellence',
      value: counters.experience,
      suffix: '+',
      description: 'Medical expertise',
      icon: <Clock className="text-[#E9756D]" size={24} />,
      color: 'from-[#E9756D] to-[#F6CA97]',
      delay: 0.2
    },
    {
      id: 4,
      title: 'Patient Satisfaction',
      value: counters.satisfaction,
      suffix: '%',
      description: 'Rated excellent by patients',
      icon: <Heart className="text-[#FF9A8B]" size={24} />,
      color: 'from-[#FF9A8B] to-[#E9756D]',
      delay: 0.3
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        patients: prev.patients < targetValues.patients ? 
          Math.min(prev.patients + Math.ceil(targetValues.patients / 100), targetValues.patients) : targetValues.patients,
        surgeries: prev.surgeries < targetValues.surgeries ? 
          Math.min(prev.surgeries + Math.ceil(targetValues.surgeries / 100), targetValues.surgeries) : targetValues.surgeries,
        experience: prev.experience < targetValues.experience ? 
          Math.min(prev.experience + 1, targetValues.experience) : targetValues.experience,
        satisfaction: prev.satisfaction < targetValues.satisfaction ? 
          Math.min(prev.satisfaction + 2, targetValues.satisfaction) : targetValues.satisfaction
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-[#E9756D]' : 
              i % 3 === 1 ? 'bg-[#F6CA97]' : 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97]'
            }`}
            style={{
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full mr-3"
              animate={{ width: ['48px', '60px', '48px'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[#E9756D] font-semibold tracking-wider">OUR ACHIEVEMENTS</span>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-[#F6CA97] to-[#E9756D] rounded-full ml-3"
              animate={{ width: ['48px', '60px', '48px'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Thousands</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Years of expertise reflected in numbers that speak for our commitment to excellence in urological care.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-300"
                style={{ background: stat.color }}
              />
              
              {/* Main Card */}
              <div className="glass-card p-8 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-r opacity-5" 
                     style={{ background: stat.color.replace('from-', '').replace('to-', '').split(' ') }} />
                
                <div className="relative z-10">
                  {/* Icon Container */}
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 shadow-lg`}
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Counter */}
                  <div className="flex items-baseline mb-2">
                    <motion.span 
                      className="text-5xl md:text-6xl font-bold text-gray-900"
                      key={stat.value}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97] ml-2">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-gray-600">{stat.description}</p>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: stat.delay + 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <motion.div 
                      className="flex justify-between items-center mt-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm text-gray-600">Achievement</span>
                      <TrendingUp size={16} className="text-green-500" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <motion.div 
                className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E9756D] rounded-tr-3xl"
                animate={{ 
                  borderColor: ['#E9756D', '#F6CA97', '#E9756D']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#F6CA97] rounded-bl-3xl"
                animate={{ 
                  borderColor: ['#F6CA97', '#E9756D', '#F6CA97']
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 px-6 py-3 rounded-full">
            <Star className="text-[#E9756D] mr-2" size={18} />
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