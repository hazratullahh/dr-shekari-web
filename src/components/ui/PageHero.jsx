'use client';

import { motion } from 'framer-motion';
import Container from './Container';

// Unified hero header for inner pages — keeps spacing, typography, and tone
// identical across /about, /services, /research, /team, /faq, /contact, /appointment.
export default function PageHero({ badge, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#FDF5EE] via-white to-[#FDF5EE]">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #E9756D 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#E9756D]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F6CA97]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative py-14 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9756D]/20 shadow-sm text-[#E9756D] text-xs font-semibold tracking-wide uppercase mb-5">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
