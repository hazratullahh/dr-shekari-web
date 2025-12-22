// components/home/Testimonials.js - Unique testimonials design
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, Star, ChevronLeft, ChevronRight, 
  ThumbsUp, Award, Shield, Heart
} from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Robert Johnson',
      role: 'Kidney Stone Treatment',
      rating: 5,
      content: "After suffering from kidney stones for years, Dr. Shekari's minimally invasive procedure changed my life. The care was exceptional from start to finish.",
      date: '2 months ago',
      avatarColor: 'from-[#E9756D] to-[#FF9A8B]',
      icon: <Award className="text-white" size={20} />,
      tags: ['Pain-Free', 'Quick Recovery']
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Prostate Treatment',
      rating: 5,
      content: "The robotic surgery was a game-changer. I was back to my normal routine in days instead of weeks. Dr. Shekari and his team are truly remarkable.",
      date: '3 months ago',
      avatarColor: 'from-[#F6CA97] to-[#FFB347]',
      icon: <Shield className="text-white" size={20} />,
      tags: ['Robotic Surgery', 'Minimal Scarring']
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Andrology Consultation',
      rating: 5,
      content: "Professional, compassionate, and highly knowledgeable. Dr. Shekari took the time to explain everything and provided the best treatment plan.",
      date: '1 month ago',
      avatarColor: 'from-[#E9756D] to-[#F6CA97]',
      icon: <Heart className="text-white" size={20} />,
      tags: ['Fertility', 'Compassionate Care']
    },
    {
      id: 4,
      name: 'David Miller',
      role: 'Endourology Procedure',
      rating: 5,
      content: "State-of-the-art facility with cutting-edge technology. The entire experience was smooth, and the results exceeded my expectations.",
      date: '2 weeks ago',
      avatarColor: 'from-[#FF9A8B] to-[#E9756D]',
      icon: <ThumbsUp className="text-white" size={20} />,
      tags: ['Advanced Technology', 'Expert Team']
    },
    {
      id: 5,
      name: 'Emma Thompson',
      role: 'Laser Treatment',
      rating: 5,
      content: "The laser treatment was incredibly precise and effective. No pain, quick recovery, and amazing results. Highly recommended!",
      date: '1 week ago',
      avatarColor: 'from-[#F6CA97] to-[#E9756D]',
      icon: <Award className="text-white" size={20} />,
      tags: ['Laser Precision', 'Fast Recovery']
    }
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#E9756D] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F6CA97] to-transparent"></div>
      </div>

      {/* Floating Quotes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`quote-${i}`}
            className="absolute text-6xl md:text-8xl opacity-5"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Quote className="text-[#E9756D]" />
          </motion.div>
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
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center"
                >
                  <Star className="text-white" size={16} fill="white" />
                </motion.div>
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from our patients about their journey to better health and why they trust Dr. Shekari for urological care.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial Carousel */}
          <div className="relative h-[500px] md:h-[400px]" ref={constraintsRef}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 h-full">
                  <div className="flex flex-col lg:flex-row items-center h-full">
                    {/* Left Side - Avatar & Info */}
                    <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-12">
                      <div className="flex flex-col items-center lg:items-start">
                        <motion.div
                          className={`w-32 h-32 rounded-full bg-gradient-to-r ${testimonials[activeIndex].avatarColor} flex items-center justify-center mb-6 shadow-2xl`}
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          <div className="text-4xl font-bold text-white">
                            {testimonials[activeIndex].name.charAt(0)}
                          </div>
                        </motion.div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-[#E9756D] font-medium mb-4">
                          {testimonials[activeIndex].role}
                        </p>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-4">
                          {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="text-yellow-400"
                              size={20}
                              fill="currentColor"
                            />
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                          {testimonials[activeIndex].tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full text-sm font-medium text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Testimonial Content */}
                    <div className="lg:w-2/3 lg:pl-12 lg:border-l border-[#F6CA97]/20">
                      {/* Quote Icon */}
                      <motion.div
                        className="mb-6"
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Quote className="text-[#E9756D] opacity-20" size={64} />
                      </motion.div>

                      {/* Testimonial Text */}
                      <p className="text-2xl md:text-3xl text-gray-800 font-medium mb-8 leading-relaxed">
                        "{testimonials[activeIndex].content}"
                      </p>

                      {/* Date & Verified */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E9756D]/20 to-[#F6CA97]/20 flex items-center justify-center mr-3">
                            {testimonials[activeIndex].icon}
                          </div>
                          <span className="text-gray-600">
                            {testimonials[activeIndex].date}
                          </span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Shield size={18} className="mr-2" />
                          <span className="font-medium">Verified Patient</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-card shadow-xl flex items-center justify-center z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-[#E9756D]" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-card shadow-xl flex items-center justify-center z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-[#E9756D]" />
          </motion.button>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97]'
                      : 'bg-gray-300'
                  }`}
                />
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 -m-2 border-2 border-[#E9756D] rounded-full"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Medical Associations
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'American Urological Association', color: 'from-[#E9756D] to-[#FF9A8B]' },
              { name: 'International Andrology Society', color: 'from-[#F6CA97] to-[#FFB347]' },
              { name: 'Endourology Society', color: 'from-[#E9756D] to-[#F6CA97]' },
              { name: 'Healthcare Excellence Award', color: 'from-[#FF9A8B] to-[#E9756D]' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center mx-auto mb-4`}>
                  <Award className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-900">{badge.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;