// components/contact/MapSection.js
'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Car } from 'lucide-react';
import { useTranslations } from 'next-intl';

const MapSection = () => {
  const t = useTranslations('contact');
  const directions = [
    { icon: <Car size={20} />, text: t('airport_distance') },
    { icon: <Navigation size={20} />, text: t('near_medical_campus') },
    { icon: <MapPin size={20} />, text: t('parking_available') }
  ];

  return (
    <section id="map" className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('find_our_location')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('location_description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              {/* Google Maps Embed */}
              <div className="relative h-[400px] bg-gradient-to-br from-[#E9756D]/10 to-[#F6CA97]/10 overflow-hidden">
                {/* actual map iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d857.1234567890123!2d62.123456!3d34.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA3JzA1LjEiTiA2MsKwMDInMDEuNyJF!5e0!3m2!1sen!2saf!4v0000000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">{t('exact_location')}</h4>
                <p className="text-gray-700 mb-4">
                  {t('full_address')}
                </p>
                <motion.a
                  href="https://maps.google.com/?q=Jami+Hospital+Herat+Afghanistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Navigation className="mr-2" size={20} />
                  {t('open_in_google_maps')}
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="font-bold text-gray-900 mb-6">{t('getting_here')}</h3>
              <div className="space-y-4">
                {directions.map((dir, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="text-[#E9756D]">{dir.icon}</div>
                    </div>
                    <p className="text-gray-700">{dir.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="font-bold text-gray-900 mb-4">Public Transport</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5">
                  <span className="font-medium text-gray-900">Bus Routes</span>
                  <span className="font-bold text-[#E9756D]">4, 7, 12</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5">
                  <span className="font-medium text-gray-900">Taxi Stand</span>
                  <span className="font-bold text-[#E9756D]">50m Away</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5">
                  <span className="font-medium text-gray-900">Parking</span>
                  <span className="font-bold text-[#E9756D]">Free</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;