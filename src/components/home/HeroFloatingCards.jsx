'use client';

import { motion } from 'framer-motion';
import {
  Activity, Stethoscope, Calendar, ShieldCheck, Heart, Star, Clock, CheckCircle2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Continuous gentle floating animation. Each card uses a slightly different
// duration / delay so motion never lines up -feels alive instead of mechanical.
const float = (offsetY = 14, duration = 6, delay = 0) => ({
  y: [0, -offsetY, 0, offsetY * 0.6, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut',
  },
});

export default function HeroFloatingCards() {
  const t = useTranslations('home');
  const tWc = useTranslations('why_choose');

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Glow halo */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-linear-to-br from-[#E9756D] to-[#F6CA97] blur-3xl opacity-30"
        animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Concentric pulse rings */}
      <Pulse delay={0} />
      <Pulse delay={2} />

      {/* Center medallion with doctor monogram + gradient */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-1/4 rounded-full bg-linear-to-br from-[#E9756D] to-[#F6CA97] shadow-2xl shadow-[#E9756D]/35 flex items-center justify-center"
      >
        <div className="absolute inset-2 rounded-full bg-white/15 backdrop-blur-sm" />
        <div className="relative text-center text-white">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-90">
            Dr. Shekari
          </div>
          <div className="text-3xl md:text-4xl font-extrabold leading-none mt-1">DS</div>
          <div className="mt-1 text-[10px] font-medium opacity-90">{t('urology')}</div>
        </div>
      </motion.div>

      {/* Floating UI cards positioned around the medallion */}

      {/* Top -Specialty badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="absolute top-2 start-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={float(8, 5.5, 0)} className="select-none">
          <Card className="px-3.5 py-2 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center">
              <Stethoscope size={14} />
            </span>
            <div className="text-start leading-tight">
              <div className="text-[10px] text-gray-500 font-medium">{t('leading')}</div>
              <div className="text-[12px] font-semibold text-gray-900">{t('urology')}</div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Right top -Available now */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute top-[18%] end-0 z-10"
      >
        <motion.div animate={float(10, 6, 0.6)}>
          <Card className="px-3 py-2 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="text-start leading-tight">
              <div className="text-[10px] text-gray-500 font-medium">Online</div>
              <div className="text-[11px] font-semibold text-gray-900">Available now</div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Right bottom -Years experience */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute bottom-[18%] end-1 z-10"
      >
        <motion.div animate={float(12, 6.4, 1.1)}>
          <Card className="p-3 min-w-[124px]">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-1">
              <Clock size={11} className="text-[#E9756D]" />
              {tWc('wc_t1').split(' ').slice(-2).join(' ')}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97]">5+</span>
              <span className="text-[11px] font-semibold text-gray-700">{t('year_expr')}</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Left top -Patient satisfaction */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-[26%] start-0 z-10"
      >
        <motion.div animate={float(10, 5.8, 0.3)}>
          <Card className="p-3 min-w-[136px]">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              {[...Array(5)].map((_, k) => (
                <Star key={k} size={10} fill="currentColor" />
              ))}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97]">98%</span>
            </div>
            <div className="text-[10px] font-medium text-gray-500 mt-0.5 leading-tight">
              {t('patient_satisfaction')}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Left bottom -Verified specialist */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="absolute bottom-[20%] start-0 z-10"
      >
        <motion.div animate={float(9, 6.2, 0.9)}>
          <Card className="px-3 py-2 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={14} />
            </span>
            <div className="text-start leading-tight">
              <div className="text-[10px] text-gray-500 font-medium">Verified</div>
              <div className="text-[11px] font-semibold text-gray-900">Specialist</div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Bottom -Appointment confirmed */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-2 start-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={float(11, 6, 0.5)}>
          <Card className="px-3 py-2 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-md">
              <Calendar size={14} />
            </span>
            <div className="text-start leading-tight">
              <div className="text-[10px] text-gray-500 font-medium">{t('book_appointment')}</div>
              <div className="text-[11px] font-semibold text-gray-900 inline-flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-500" />
                Confirmed
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Tiny decorative chips */}
      <motion.div
        animate={float(6, 7, 1.4)}
        className="absolute top-[8%] end-[18%] z-0"
        aria-hidden="true"
      >
        <span className="px-2 py-1 rounded-full bg-white/90 border border-gray-100 text-[9px] font-semibold text-[#E9756D] shadow-sm">
          {t('andrology')}
        </span>
      </motion.div>
      <motion.div
        animate={float(8, 7.5, 2)}
        className="absolute bottom-[10%] end-[20%] z-0"
        aria-hidden="true"
      >
        <span className="px-2 py-1 rounded-full bg-white/90 border border-gray-100 text-[9px] font-semibold text-[#E9756D] shadow-sm">
          {t('endourology')}
        </span>
      </motion.div>

      {/* Floating heart particle */}
      <motion.div
        className="absolute top-[42%] start-[8%] z-0 text-[#E9756D]"
        aria-hidden="true"
        animate={{ y: [0, -22, 0], opacity: [0.4, 0.9, 0.4], scale: [0.85, 1, 0.85] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={16} fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute top-[55%] end-[10%] z-0 text-[#F6CA97]"
        aria-hidden="true"
        animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Activity size={18} />
      </motion.div>
    </div>
  );
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-xl border border-white shadow-[0_12px_32px_-12px_rgba(233,117,109,0.25)] ring-1 ring-black/[0.02] ${className}`}
    >
      {children}
    </div>
  );
}

function Pulse({ delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-[12%] rounded-full border border-[#E9756D]/20"
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay }}
    />
  );
}
