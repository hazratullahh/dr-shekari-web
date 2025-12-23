'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Menu, X, Phone, MapPin, Calendar,
  Stethoscope, ChevronRight, Sparkles,
  Zap, Heart, ArrowRight, User
} from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);
  const pathname = usePathname();

  // Use scroll progress for animations
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], [120, 80]);
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 10]);
  const headerElevation = useTransform(scrollY, [0, 100], [0, 20]);

  // Spring animations for smoothness
  const springHeaderHeight = useSpring(headerHeight, {
    stiffness: 100,
    damping: 30
  });
  const springLogoScale = useSpring(logoScale, {
    stiffness: 100,
    damping: 30
  });

  // Navigation items
  const navItems = [
    {
      label: 'Home',
      href: '/',
      exact: true,
      icon: '🏠'
    },
    {
      label: 'About',
      href: '/about',
      icon: '👨‍⚕️'
    },
    // {
    //   label: 'Services',
    //   href: '/services',
    //   icon: '🩺'
    // },
    {
      label: 'Team',
      href: '/team',
      icon: '👥'
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: '📞'
    }
  ];

  // Mouse move effect for sexy parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Calculate parallax transform based on mouse position
  const parallaxX = mousePosition.x * 10 - 5;
  const parallaxY = mousePosition.y * 5 - 2.5;

  return (
    <>
      {/* Floating Emergency Alert */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#E9756D] via-[#FF9A8B] to-[#F6CA97] text-white py-2 shadow-lg"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0% 50%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-2 sm:mb-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-3"
              >
                <Zap size={16} className="text-white" />
              </motion.div>
              <span className="font-bold">24/7 Emergency:</span>
              <a href="tel:+93792453030" className="ml-2 font-black hover:underline">
                +93 79 245 3030
              </a>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={14} className="mr-2" />
              <span>Jami Hospital, Herat, Afghanistan</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header with sexy animations */}
      <motion.header
        ref={headerRef}
        style={{
          height: springHeaderHeight,
          opacity: headerOpacity,
          backdropFilter: `blur(${useTransform(scrollY, [0, 50], [0, 8])}px)`,
          boxShadow: `0 4px ${headerElevation}px rgba(0, 0, 0, 0.1)`
        }}
        className="fixed top-16 md:top-8 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-white/20"
        animate={{
          y: isScrolled ? 0 : 0,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="max-w-360 mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo with sexy animations */}
            <motion.div
              style={{ scale: springLogoScale }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center relative group"
            >
              <Link href="/" className="flex items-center">
                {/* Logo Container with sexy effects */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-2 bg-linear-to-r from-[#E9756D] to-[#F6CA97] rounded-2xl blur opacity-20 group-hover:opacity-40"
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Logo Image */}
                  <div className="relative w-16 h-16 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-2xl overflow-hidden border-2 border-white">
                    <Image
                      src="/logo.png"
                      alt="Dr. Shekari Logo"
                      width={500}
                      height={500}
                      className="object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback icon */}
                    <div className="hidden w-full h-full items-center justify-center">
                      <Stethoscope size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Floating particles around logo */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97]"
                      animate={{
                        x: [0, Math.sin(i) * 20, 0],
                        y: [0, Math.cos(i) * 20, 0],
                        scale: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: i === 0 ? '-5px' : i === 1 ? '60px' : '30px',
                        top: i === 0 ? '30px' : i === 1 ? '-5px' : '60px'
                      }}
                    />
                  ))}
                </motion.div>

                {/* Clinic Name with sexy typography */}
                <motion.div
                  className="ml-4"
                  style={{
                    transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`
                  }}
                >
                  <motion.h1
                    className="text-xs md:text-sm font-black text-gray-900 leading-tight"
                    animate={isScrolled ? { fontSize: "1.5rem" } : { fontSize: "1.7rem" }}
                  >
                    Dr. Nazir Ahmad Shekari
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="hidden md:inline ml-2"
                    >
                      <Sparkles size={16} className="inline text-[#E9756D]" />
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-xs md:text-sm font-medium text-transparent bg-clip-text bg-linear-to-r from-[#E9756D] to-[#F6CA97]"
                    animate={isScrolled ? { opacity: 0.8 } : { opacity: 1 }}
                  >
                    Urology · Andrology · Endourology Specialist
                  </motion.p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Sexy hover effects */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveHover(item.label)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-5 py-3 rounded-xl transition-all duration-300 ${isActive(item.href, item.exact)
                      ? 'text-white'
                      : 'text-gray-700 hover:text-white'
                      }`}
                  >
                    {/* Icon */}
                    {/* <motion.span
                      className="text-xl mr-2"
                      animate={isActive(item.href, item.exact) ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.span> */}

                    {/* Text */}
                    <span className="font-semibold relative z-10">
                      {item.label}
                    </span>

                    {/* Active/Hover Indicator */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={false}
                      animate={{
                        scale: isActive(item.href, item.exact) || activeHover === item.label ? 1 : 0,
                        opacity: isActive(item.href, item.exact) || activeHover === item.label ? 1 : 0
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-[#E9756D] to-[#F6CA97] rounded-xl shadow-lg" />
                    </motion.div>

                    {/* Active Arrow */}
                    {/* {isActive(item.href, item.exact) && (
                      <motion.div
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="ml-2"
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    )} */}
                  </Link>

                  {/* Glow effect on hover */}
                  {activeHover === item.label && !isActive(item.href, item.exact) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.3 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 bg-linear-to-r from-[#E9756D] to-[#F6CA97] blur-xl rounded-xl"
                    />
                  )}
                </motion.div>
              ))}

              {/* Sexy Appointment Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'tel:+93792453030'}
                className="ml-4 relative group"
              >
                {/* Button background with sexy effects */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-[#E9756D] to-[#F6CA97] rounded-xl shadow-xl"
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(233, 117, 109, 0.3)',
                      '0 15px 40px rgba(233, 117, 109, 0.5)',
                      '0 10px 30px rgba(233, 117, 109, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Button content */}
                <div className="relative px-6 py-3 rounded-xl bg-linear-to-r from-[#E9756D] to-[#F6CA97] flex items-center">
                  <Calendar size={18} className="mr-2 text-white" />
                  <span className="font-bold text-white">Book Now</span>

                  {/* Animated arrow */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <ArrowRight size={18} className="text-white" />
                  </motion.div>

                  {/* Floating hearts on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -top-3 -right-3"
                  >
                    <Heart size={16} className="text-[#FF9A8B] animate-pulse" />
                  </motion.div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-linear-to-r from-[#E9756D] to-[#F6CA97] blur opacity-30 rounded-xl"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </nav>

            {/* Mobile Menu Button - Sexy animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <motion.div
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                  >
                    <X size={24} className="text-[#E9756D]" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Menu size={24} className="text-[#E9756D]" />
                  </motion.div>
                )}
              </div>

              {/* Pulsing dot */}
              {!isMobileMenuOpen && (
                <motion.div
                  className="hidden md:absolute -top-1 -right-1 w-3 h-3 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Sexy Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-white/20"
            style={{
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  className="mb-2"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center p-4 rounded-xl ${isActive(item.href)
                      ? 'bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white shadow-lg'
                      : 'hover:bg-linear-to-r hover:from-[#E9756D]/10 hover:to-[#F6CA97]/10'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* <span className="text-2xl mr-4">{item.icon}</span> */}
                    <span className="font-semibold text-lg">{item.label}</span>
                    {/* {isActive(item.href) && (
                      <motion.div
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                        className="ml-auto"
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    )} */}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Appointment Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = 'tel:+93792453030';
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-6 p-4 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-bold rounded-xl shadow-xl flex items-center justify-center"
              >
                <Calendar size={20} className="mr-3" />
                Book Appointment Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>

              {/* Emergency Contact in Mobile Menu */}
              <div className="mt-6 p-4 bg-linear-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-xl">
                <div className="flex items-center text-sm text-gray-700">
                  <Phone size={16} className="text-[#E9756D] mr-2" />
                  <span>Emergency: </span>
                  <a href="tel:+93792453030" className="ml-2 font-bold text-[#E9756D]">
                    +93 79 245 3030
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Space for fixed header */}
      <motion.div
        style={{ height: springHeaderHeight }}
        className="pointer-events-none"
      />
    </>
  );
};

export default Header;