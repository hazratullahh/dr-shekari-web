'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Users, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ContactInfo = () => {
  const t = useTranslations('contact');
  const contactDetails = [
    {
      icon: <Phone className="text-[#E9756D]" size={24} />,
      title: t('phone_numbers'),
      items: [
        { label: t('emergency'), value: "+93 79 245 3030", type: "tel" },
        { label: t('appointments'), value: "070 445 3030", type: "tel" },
        { label: t('administration'), value: "070 445 3031", type: "tel" },
        { label: "WhatsApp", value: "+93 79 245 3030", type: "wa" }
      ]
    },

    {
      icon: <Mail className="text-[#F6CA97]" size={24} />,
      title: t('email_addresses'),
      items: [
        { label: t('medical_inquiries'), value: "urology@dr-shekari.com", type: "mailto" },
        { label: t('appointments'), value: "urology@dr-shekari.com", type: "mailto" },
        { label: t('general_info'), value: "urology@dr-shekari.com", type: "mailto" }
      ]
    },
    {
      icon: <MapPin className="text-[#E9756D]" size={24} />,
      title: t('clinic_address'),
      items: [
        { label: t('main_address'), value: t('full_address'), type: "text" },
        { label: t('landmark'), value: t('near_university'), type: "text" }
      ]
    },
    {
      icon: <Clock className="text-[#F6CA97]" size={24} />,
      title: t('working_hours'),
      items: [
        { label: t('monday_saturday'), value: t('regular_hours'), type: "text" },
        { label: t('sunday'), value: t('sunday_hours'), type: "text" },
        { label: t('emergency'), value: t('emergency_24_7'), type: "text" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-2xl shadow-lg border border-white/20"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('quick_contact')}</h3>
        
        <div className="space-y-6">
          {contactDetails.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3">
                  {section.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  <div className="mt-2 space-y-2">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-sm text-gray-600 w-24">{item.label}:</span>
                        {item.type === 'tel' || item.type === 'mailto' || item.type === 'wa' ? (
                          <a
                            href={
                              item.type === 'wa'
                                ? `https://wa.me/${item.value.replace(/[^0-9]/g, '')}`
                                : `${item.type}:${item.value.replace(/\s/g, '')}`
                            }
                            className="text-sm font-medium text-[#E9756D] hover:underline"
                            target={item.type === 'wa' ? '_blank' : undefined}
                            rel={item.type === 'wa' ? 'noopener noreferrer' : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-700">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;