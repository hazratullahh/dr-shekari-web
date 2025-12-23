'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 mx-auto overflow-hidden">
            {/* Background Image with semantic markup */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'url(/images/hero-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                aria-hidden="true" 
            />

            {/* Dark overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent" aria-hidden="true" /> */}

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[85vh]">
                {/* Left Card - Main Content */}
                <motion.article
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:max-w-7/12 flex flex-col justify-center"
                >
                    <header className="
                        relative
                        bg-linear-to-br from-[#FDF5EE]/70 via-white/60 to-[#F9F0E8]/70
                        backdrop-blur-xl
                        p-8 pt-32 md:p-10
                        rounded-3xl
                        shadow-2xl
                        mx-auto md:mx-0
                    ">
                        {/* Specialist Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#E9756D] to-[#F6CA97] rounded-full mb-6">
                            <div className="w-2 h-2 bg-white rounded-full mr-2" aria-hidden="true"></div>
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                Leading Urology

                                <span
                                    className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                                    aria-hidden="true"
                                />

                                Andrology

                                <span
                                    className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                                    aria-hidden="true"
                                />

                                Endourology 
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Dr. Nazir Ahmad
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#E9756D] to-[#F6CA97]">
                                Shekari
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
                            Professor Assistant & Specialist in Urology, Andrology, and Endourology.
                            Providing advanced medical care with cutting-edge technology and
                            compassionate patient-centered approach.
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                aria-label="Book an appointment with Dr. Nazir Ahmad Shekari"
                            >
                                <span className="flex items-center">
                                    Book Appointment
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                aria-label="View medical services offered by Dr. Nazir Ahmad Shekari"
                            >
                                View Services
                            </motion.button>
                        </div>

                        {/* Statistics */}
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
                            <div className="text-center sm:text-left">
                                <div className="text-3xl font-bold text-[#E9756D]">20+</div>
                                <p className="text-white font-medium">Years Experience</p>
                            </div>
                            <div className="h-12 w-px bg-linear-to-b from-transparent via-[#F6CA97] to-transparent hidden sm:block" aria-hidden="true"></div>
                            <div className="text-center sm:text-left">
                                <div className="text-3xl font-bold text-[#E9756D]">5000+</div>
                                <p className="text-white font-medium">Successful Surgeries</p>
                            </div>
                            <div className="h-12 w-px bg-linear-to-b from-transparent via-[#F6CA97] to-transparent hidden sm:block" aria-hidden="true"></div>
                            <div className="text-center sm:text-left">
                                <div className="text-3xl font-bold text-[#E9756D]">98%</div>
                                <p className="text-white font-medium">Patient Satisfaction</p>
                            </div>
                        </div>
                    </header>
                </motion.article>

                {/* Right Image - Connected to bottom */}
                <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full md:w-5/12 lg:w-2/5 flex items-end justify-center md:justify-end mt-8 md:mt-0 h-[300px] md:h-auto"
                >
                    <div className="hidden md:flex absolute w-80 max-w-full h-auto" style={{ top: "-9rem" }}>
                        <Image
                            src="/images/hero-doctorss.png"
                            alt="Dr. Nazir Ahmad Shekari - Urology and Andrology Specialist"
                            width={400}
                            height={500}
                            className="w-full h-auto max-h-full object-contain object-bottom"
                            priority
                            quality={90}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* SEO-friendly decorative elements */}
                        {/* <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#E9756D]/30 rounded-tr-3xl sr-only" aria-hidden="true"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#F6CA97]/30 rounded-bl-3xl sr-only" aria-hidden="true"></div> */}
                    </div>

                    <div className="w-52 max-w-full h-52 flex items-end md:hidden pt-6 md:pt-0">
                        <Image
                            src="/images/hero-doctorss.png"
                            alt="Dr. Nazir Ahmad Shekari - Urology and Andrology Specialist"
                            width={400}
                            height={500}
                            className="w-full h-auto max-h-full object-contain object-bottom"
                            priority
                            quality={90}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* SEO-friendly decorative elements */}
                        {/* <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#E9756D]/30 rounded-tr-3xl sr-only" aria-hidden="true"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#F6CA97]/30 rounded-bl-3xl sr-only" aria-hidden="true"></div> */}
                    </div>
                </motion.figure>
            </div>

            {/* Bottom Decorative linear */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/40 to-transparent pointer-events-none" aria-hidden="true"></div>
        </section>
    );
}