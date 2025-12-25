'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Phone, Mail, MapPin, Calendar, Clock,
  Facebook, Twitter, Instagram, Youtube,
  Award, Shield, ArrowUp, Stethoscope, Heart
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our updates!');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer data
  const clinicInfo = {
    logoSrc: "/logo.png",
    hospitalName: "Dr. Nazir Ahmad Shekari",
    clinicSpecialty: "Urologist, Andrologist and Endourologist",
    clinicTagline: "Accurate diagnosis · Effective treatment",
    address: "Afghanistan, Herat, Chahar-e-rahi- Badmorghan, Jami Hospital",
    phone1: "+93792453030",
    phone2: "+93704453030",
    email: "contact@drshekari.com",
    website: "www.dr-shekari.com",
    hours: "Mon - Sat: 8:00 AM - 8:00 PM | Sun: Emergency Only"
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Urology Treatment', href: '/services/urology' },
    { label: 'Andrology Care', href: '/services/andrology' },
    { label: 'Endourology', href: '/services/endourology' },
    { label: 'Prostate Health', href: '/services/prostate' },
    { label: 'Kidney Stone Treatment', href: '/services/kidney-stones' },
    { label: 'Men\'s Health', href: '/services/mens-health' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' },
  ];

  const certifications = [
    { label: 'Certified Urologist', icon: <Award size={16} /> },
    { label: 'ISO Certified Clinic', icon: <Shield size={16} /> },
    { label: '20+ Years Experience', icon: <Clock size={16} /> },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-360 mx-auto px-4 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">

          {/* Logo and Clinic Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Link href="/" className="flex items-start mb-6">
                <div className="relative w-20 h-2w-20 rounded-xl bg-gradient-to-br from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-xl mr-4 overflow-hidden">
                  {/* Logo Image */}
                  <Image
                    src={clinicInfo.logoSrc}
                    alt="Dr. Shekari Logo"
                    width={100}
                    height={100}
                    className="object-contai"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback if logo doesn't load */}
                  <div className="hidden w-full h-full items-center justify-center">
                    <Stethoscope size={32} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {clinicInfo.hospitalName}
                  </h3>
                  <p className="text-[#E9756D] font-medium mt-1">
                    {clinicInfo.clinicSpecialty}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {clinicInfo.clinicTagline}
                  </p>
                </div>
              </Link>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3 mb-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-lg border border-[#F6CA97]/20"
                  >
                    <span className="text-[#E9756D] mr-2">{cert.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={20} className="text-[#E9756D] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {clinicInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock size={20} className="text-[#E9756D] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Working Hours</h4>
                    <p className="text-gray-600 text-sm">
                      {clinicInfo.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone size={20} className="text-[#E9756D] mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Contact Numbers</h4>
                    <div className="space-y-1">
                      <a
                        href={`tel:${clinicInfo.phone1}`}
                        className="block text-gray-700 hover:text-[#E9756D] text-sm transition-colors"
                      >
                        {clinicInfo.phone1}
                      </a>
                      <a
                        href={`tel:${clinicInfo.phone2}`}
                        className="block text-gray-700 hover:text-[#E9756D] text-sm transition-colors"
                      >
                        {clinicInfo.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail size={20} className="text-[#E9756D] mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email & Website</h4>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${clinicInfo.email}`}
                        className="block text-gray-700 hover:text-[#E9756D] text-sm transition-colors"
                      >
                        {clinicInfo.email}
                      </a>
                      <a
                        href={`https://${clinicInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-700 hover:text-[#E9756D] text-sm transition-colors"
                      >
                        {clinicInfo.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center text-gray-600 hover:text-[#E9756D] transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E9756D] opacity-0 group-hover:opacity-100 mr-3 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-10">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 w-8 h-8 rounded-md bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center"
                >
                  <ArrowUp size={16} className="text-white rotate-45" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                Subscribe for health tips and updates
              </p>
            </div>
          </div>

          {/* Services & Social */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Our Services
            </h4>
            <ul className="space-y-3 mb-10">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="flex items-center text-gray-600 hover:text-[#E9756D] transition-colors group"
                  >
                    <Heart size={14} className="text-[#E9756D] opacity-0 group-hover:opacity-100 mr-3 transition-opacity" />
                    <span className="text-sm">{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 text-gray-600 hover:text-white hover:from-[#E9756D] hover:to-[#F6CA97] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm text-center md:text-left mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} {clinicInfo.hospitalName}. All rights reserved.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <Link href="/privacy-policy" className="hover:text-[#E9756D] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[#E9756D] transition-colors">
                  Terms of Service
                </Link>
                {/* <Link href="/sitemap" className="hover:text-[#E9756D] transition-colors">
                  Sitemap
                </Link> */}
                <Link href="/accessibility" className="hover:text-[#E9756D] transition-colors">
                  Accessibility
                </Link>
                <Link href="/disclaimer" className="hover:text-[#E9756D] transition-colors">
                  Medical Disclaimer
                </Link>
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer text-sm text-gray-600 hover:text-[#E9756D] transition-colors"
            >
              <ArrowUp size={16} className="mr-2" />
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>

      {/* Emergency Floating Button */}
      <motion.a
        href="tel:+93792453030"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] shadow-xl flex items-center justify-center z-40 group"
        aria-label="Emergency Call"
      >
        <Phone size={24} className="text-white" />
        <motion.div
          className="absolute inset-0 border-2 border-[#E9756D] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Emergency: {clinicInfo.phone1}
        </div>
      </motion.a>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": clinicInfo.hospitalName,
            "image": clinicInfo.logoSrc,
            "description": clinicInfo.clinicSpecialty,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chahar-e-rahi- Badmorghan",
              "addressLocality": "Herat",
              "addressCountry": "Afghanistan"
            },
            "telephone": clinicInfo.phone1,
            "email": clinicInfo.email,
            "url": `https://${clinicInfo.website}`,
            "openingHours": "Mo-Sa 08:00-20:00",
            "medicalSpecialty": "Urology",
            "priceRange": "$$"
          })
        }}
      />
    </footer>
  );
};

export default Footer; 