'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building, Shield, Users, Clock, Wifi, ParkingCircle } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      title: "Modern Operation Theaters",
      description: "State-of-the-art surgical suites with laminar airflow systems and advanced monitoring equipment.",
      image: "/images/facilities/operation-theater.jpg",
      icon: <Building size={24} />,
      features: ["Sterile Environment", "Advanced Monitoring", "Recovery Area"]
    },
    {
      title: "Advanced Diagnostics Center",
      description: "Complete diagnostic facilities including ultrasound, CT scan, and laboratory services.",
      image: "/images/facilities/diagnostics.jpg",
      icon: <Shield size={24} />,
      features: ["Digital Imaging", "Quick Results", "Expert Analysis"]
    },
    {
      title: "Patient Rooms & Wards",
      description: "Comfortable private and semi-private rooms with modern amenities and nursing care.",
      image: "/images/facilities/patient-rooms.jpg",
      icon: <Users size={24} />,
      features: ["Private Rooms", "24/7 Nursing", "Visitor Facilities"]
    },
    {
      title: "Emergency Department",
      description: "24/7 emergency urology services with rapid response teams and critical care facilities.",
      image: "/images/facilities/emergency.jpg",
      icon: <Clock size={24} />,
      features: ["24/7 Service", "Rapid Response", "Critical Care"]
    }
  ];

  const amenities = [
    { icon: <Wifi size={20} />, text: "Free Wi-Fi" },
    { icon: <ParkingCircle size={20} />, text: "Ample Parking" },
    { icon: "🍽️", text: "Cafeteria" },
    { icon: "📚", text: "Patient Library" },
    { icon: "🪑", text: "Comfortable Waiting" },
    { icon: "♿", text: "Accessibility" }
  ];

  return (
    <section id="facilities" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Facilities</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Modern, hygienic, and well-equipped facilities designed for optimal patient care and comfort
          </p>
        </motion.div>

        {/* Main Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-white/20">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center mr-3">
                        <div className="text-white">{facility.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    {facility.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {facility.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 border border-[#F6CA97]/20 rounded-full text-sm text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl shadow-lg border border-white/20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Amenities</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-[#F6CA97]/30 transition-all"
              >
                <div className="text-2xl mb-2">{amenity.icon}</div>
                <span className="text-sm font-medium text-gray-700 text-center">{amenity.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;