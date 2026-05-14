'use client';

import { useEffect, useLayoutEffect, useRef, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { ChevronDown, Check, Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'ps', label: 'پښتو', native: 'Pashto', dir: 'rtl' },
  { code: 'fa', label: 'فارسی', native: 'Dari',  dir: 'rtl' },
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
];

// Custom portal-anchored dropdown.
// The panel is rendered at document.body via React portal, so no parent
// stacking context, overflow, or transform can clip it.
// Position is computed from the trigger's getBoundingClientRect() and stored
// in state, so the panel is `position: fixed` against the viewport. We update
// the position on scroll and resize so it stays glued to the trigger without
// any scroll-jacking or layout shift.

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const PANEL_W = 192; // matches w-48
const GAP = 8;

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[2];

  useEffect(() => setMounted(true), []);

  // Reposition the panel whenever it's open. Uses requestAnimationFrame to
  // batch layout reads -no jank, no forced reflow loops.
  useIsoLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    let raf;
    const measure = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      // Right-align panel to the trigger by default, but keep it inside the viewport.
      let left = rect.right - PANEL_W;
      if (left < 8) left = 8;
      if (left + PANEL_W > vw - 8) left = vw - 8 - PANEL_W;
      setCoords({
        top: rect.bottom + GAP,
        left,
      });
    };
    measure();
    const onScroll = () => { raf = requestAnimationFrame(measure); };
    const onResize = () => { raf = requestAnimationFrame(measure); };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  // Outside-click / ESC close.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        panelRef.current?.contains(e.target)
      ) return;
      setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close on route change.
  useEffect(() => { setOpen(false); }, [pathname, locale]);

  const switchLocale = (newLocale) => {
    setOpen(false);
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        dir={current.dir}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
        className={`group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:border-[#E9756D]/40 hover:bg-[#FDF5EE] transition-colors ${
          open ? 'border-[#E9756D]/40 bg-[#FDF5EE]' : ''
        } ${isPending ? 'opacity-70' : ''}`}
      >
        <Globe size={14} className="text-[#E9756D]" aria-hidden="true" />
        <span>{current.label}</span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.div
              ref={panelRef}
              role="menu"
              aria-label="Language"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                width: PANEL_W,
                zIndex: 1000,
                transformOrigin: 'top right',
                willChange: 'transform, opacity',
              }}
              className="rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5 border border-gray-100"
            >
              <div className="px-2 py-1.5 mb-0.5 text-[10px] font-semibold tracking-wider uppercase text-gray-400">
                Language · زبان · ژبه
              </div>
              {LANGUAGES.map((lang) => {
                const active = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    dir={lang.dir}
                    onClick={() => switchLocale(lang.code)}
                    className={`cursor-pointer w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? 'bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white font-semibold shadow-sm'
                        : 'text-gray-700 hover:bg-[#FDF5EE]'
                    }`}
                  >
                    <span className={lang.dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <span className="block leading-tight">{lang.label}</span>
                      <span className={`block text-[10px] leading-tight ${active ? 'text-white/85' : 'text-gray-400'}`}>
                        {lang.native}
                      </span>
                    </span>
                    {active && <Check size={14} className="shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
