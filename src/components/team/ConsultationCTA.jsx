// components/team/ConsultationCTA.js
'use client';

import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Phone, Users } from 'lucide-react';

const ConsultationCTA = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 bg-gradient-to-r from-[#E9756D]/5 via-white to-[#F6CA97]/5"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 mb-6"
            >
              <Users size={32} className="text-[#E9756D]" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Consult with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">International Team</span>?
            </h2>
            
            <p className="text-xl text-gray-700 mb-8">
              Our team of international urology specialists is ready to provide you 
              with world-class medical care. Schedule your consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+93792453030"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                Call Now: +93 79 245 3030
              </motion.a>
              
              <motion.a
                href="/contact#appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/30 hover:border-[#E9756D] transition-all duration-300 flex items-center justify-center"
              >
                <Calendar size={20} className="mr-2" />
                Book Online Appointment
              </motion.a>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-gray-600 mt-2">
                <MessageSquare size={16} className="text-[#E9756D] mr-2" />
                <span className="text-sm">Multilingual Support Available</span>
              </div>
              <div className="flex items-center text-gray-600 mt-2">
                <span className="text-sm">🇦🇫 Dari & Pashto</span>
                <span className="mx-2">•</span>
                <span className="text-sm">🇮🇳 Hindi & English</span>
                <span className="mx-2">•</span>
                <span className="text-sm">🇺🇸 English</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;