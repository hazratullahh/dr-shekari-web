// components/about/Staff.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, GraduationCap, Users, Calendar, Star, MessageSquare } from 'lucide-react';

const Staff = () => {
  const medicalStaff = [
    {
      name: "Dr. Nazir Ahmad Shekari",
      position: "Chief Urologist & Director",
      specialty: "Urology, Andrology & Endourology",
      experience: "22+ Years",
      education: "MD, PhD in Urology, Fellowship in Endourology",
      image: "/images/dr-shekari.jpg",
      achievements: [
        "Pioneer of Endourology in Afghanistan",
        "Published 15+ Research Papers",
        "International Training: USA, Germany, India"
      ],
      availability: "Mon-Sat: 9AM-7PM"
    },
    {
      name: "Dr. Mansour Ahmad Wayar",
      position: "Professor Assistant & Consultant",
      specialty: "Urology & Andrology",
      experience: "15+ Years",
      education: "MD, MSc in Urology",
      image: "/images/dr-wayar.jpg",
      achievements: [
        "Expert in Robotic Surgery",
        "University Professor",
        "Medical Education Specialist"
      ],
      availability: "Mon-Fri: 10AM-6PM"
    },
    {
      name: "Dr. Farid Ahmad",
      position: "Senior Andrologist",
      specialty: "Male Reproductive Health",
      experience: "12+ Years",
      education: "MD, Andrology Fellowship",
      image: "/images/staff/dr-farid.jpg",
      achievements: [
        "Fertility Treatment Expert",
        "Hormonal Disorder Specialist",
        "Patient Education Advocate"
      ],
      availability: "Sun-Thu: 8AM-4PM"
    },
    {
      name: "Nursing Team",
      position: "Certified Medical Staff",
      specialty: "Patient Care & Assistance",
      experience: "Collective 50+ Years",
      education: "BSN, Nursing Diplomas",
      image: "/images/staff/nursing-team.jpg",
      achievements: [
        "24/7 Patient Monitoring",
        "Emergency Response Trained",
        "Compassionate Care Specialists"
      ],
      availability: "24/7 Rotational Shifts"
    }
  ];

  return (
    <section id="staff" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-4">
            <Users className="text-[#E9756D] mr-3" size={24} />
            <span className="text-[#E9756D] font-semibold text-lg">Medical Experts</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Medical Team</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Highly qualified and experienced medical professionals dedicated to your urological health
          </p>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {medicalStaff.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-white/20 h-full">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image */}
                    <div className="lg:w-1/3">
                      <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden mb-4 lg:mb-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-lg">
                            <Award size={20} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="lg:w-2/3">
                      <div className="mb-6">
                        <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full mb-3">
                          <Star size={14} className="text-[#E9756D] mr-2" />
                          <span className="text-sm font-medium text-[#E9756D]">{member.experience} Experience</span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-[#E9756D] font-medium mb-1">{member.position}</p>
                        <p className="text-gray-600 mb-4">{member.specialty}</p>
                      </div>

                      {/* Education */}
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <GraduationCap size={18} className="text-[#F6CA97] mr-2" />
                          <span className="font-medium text-gray-900">Education</span>
                        </div>
                        <p className="text-gray-700">{member.education}</p>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <div className="flex items-center mb-3">
                          <Award size={18} className="text-[#E9756D] mr-2" />
                          <span className="font-medium text-gray-900">Key Achievements</span>
                        </div>
                        <ul className="space-y-2">
                          {member.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#E9756D] mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center p-3 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl">
                        <Calendar size={18} className="text-[#E9756D] mr-3" />
                        <div>
                          <span className="font-medium text-gray-900">Availability: </span>
                          <span className="text-gray-700">{member.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20 bg-gradient-to-r from-[#E9756D]/5 via-white to-[#F6CA97]/5">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Consult with Our Experts?
              </h3>
              <p className="text-gray-700 mb-8">
                Schedule a consultation with our specialist doctors and take the first step
                towards better urological health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+93792453030"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <MessageSquare size={20} className="mr-2" />
                  Book Appointment Now
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 glass-card text-[#E9756D] font-semibold rounded-xl border border-[#F6CA97]/30 hover:border-[#E9756D] transition-all duration-300 flex items-center justify-center"
                >
                  <Users size={20} className="mr-2" />
                  Meet All Team Members
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Staff;