'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Globe, Award, Star } from 'lucide-react';
import Container from '@/components/ui/Container';

const STATS = [
  { value: '15+', label: 'Specialist Doctors', icon: Users },
  { value: '3',   label: 'Countries',          icon: Globe },
  { value: '150+', label: 'Combined Years',    icon: Award },
  { value: '98%', label: 'Success Rate',       icon: Star },
];

export default function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#FDF5EE] via-white to-[#FDF5EE]">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #E9756D 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#E9756D]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <Container className="relative py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9756D]/20 shadow-sm text-[#E9756D] text-xs font-semibold tracking-wide uppercase mb-5">
              <Globe size={13} />
              International Medical Team
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              World-class medical excellence
            </h1>
            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Our team brings together the best urological expertise from Afghanistan, India,
              and the United States — combining local understanding with global advancements.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                    <div className="w-9 h-9 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center mb-2">
                      <Icon size={16} />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{s.value}</div>
                    <div className="text-[11px] text-gray-500 leading-tight mt-0.5">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#E9756D]/15 border border-white/80 aspect-4/5">
              <Image
                src="/images/team/international-team.jpg"
                alt="International medical team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[#E9756D] text-xs font-semibold mb-2">
                  <Globe size={12} /> 3 Countries
                </div>
                <h3 className="text-lg font-bold text-white">International collaboration</h3>
                <p className="text-[#F6CA97] text-sm">Bringing global expertise to Afghanistan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
