'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Camera,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ImageIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------
 * Cloudinary helper — splice transforms after `/upload/`
 * ---------------------------------------------------------------- */
function cld(url, opts = {}) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('/image/upload/')) return url;
  const { w, h, crop = 'fill', q = 'auto:good', f = 'auto', dpr = 'auto' } = opts;
  const parts = ['f_' + f, 'q_' + q, 'dpr_' + dpr];
  if (w) parts.push('w_' + w);
  if (h) parts.push('h_' + h);
  if (crop) parts.push('c_' + crop);
  return url.replace('/image/upload/', `/image/upload/${parts.join(',')}/`);
}

/* ------------------------------------------------------------------
 * Hook: fetch gallery once
 * ---------------------------------------------------------------- */
function useGallery() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/gallery?limit=60', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        if (j?.ok) setItems(j.items || []);
        else {
          setItems([]);
          setError(j?.error || 'Failed to load');
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setItems([]);
        setError(e?.message || 'Network error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, error };
}

/* ------------------------------------------------------------------
 * Responsive radius — bigger orbit on larger screens
 * ---------------------------------------------------------------- */
function useOrbitRadius() {
  const [radius, setRadius] = useState(180);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(110);
      else if (w < 768) setRadius(150);
      else if (w < 1024) setRadius(190);
      else setRadius(230);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return radius;
}

/* ------------------------------------------------------------------
 * Single orbiting card with IG-style shimmer loader
 * ---------------------------------------------------------------- */
function OrbitCard({
  item,
  index,
  rotation,
  total,
  rotatingAngle,
  radius,
  perspectiveX,
  perspectiveY,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);

  const angleRad = (rotatingAngle || 0) * (Math.PI / 180);
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.title || 'Open gallery image'}
      className="absolute w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-52 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E9756D]/40 rounded-2xl"
      style={{
        transform: `
          translate(${x}px, ${y}px)
          rotateX(${perspectiveY}deg)
          rotateY(${perspectiveX}deg)
          rotateZ(${rotation}deg)
        `,
        transformStyle: 'preserve-3d',
        zIndex: 10,
      }}
    >
      <div
        className="group relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#E9756D]/15 ring-1 ring-white/60 cursor-zoom-in transition-all duration-300 hover:scale-110 hover:shadow-[0_30px_60px_-15px_rgba(233,117,109,0.35)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer placeholder — Instagram-style */}
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, #FDF5EE 0%, rgba(246,202,151,0.25) 30%, #FDF5EE 60%)',
              backgroundSize: '300% 100%',
              animation: 'shekari-shimmer 1.4s ease-in-out infinite',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={22} className="text-[#E9756D]/30" />
            </div>
          </div>
        )}

        <Image
          src={cld(item.url, { w: 600 })}
          alt={item.title || 'Dr. Shekari clinic image'}
          fill
          sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, 200px"
          className={[
            'object-cover transition-all duration-700',
            loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105',
            'group-hover:scale-110',
          ].join(' ')}
          onLoad={() => setLoaded(true)}
          priority={index < 4}
        />

        {/* Brand shine on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Tiny caption strip on hover */}
        {item.title && (
          <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-linear-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-[11px] font-semibold truncate drop-shadow">
              {item.title}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------
 * Lightbox stage (keyed by id so internal state resets on navigate)
 * ---------------------------------------------------------------- */
function LightboxStage({ item, t }) {
  const [zoomed, setZoomed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setZoomed((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-full max-w-7xl flex items-center justify-center"
    >
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={36} className="text-[#F6CA97] animate-spin" />
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((v) => !v);
        }}
        className={[
          'relative w-full h-full flex items-center justify-center transition-all duration-500',
          zoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in',
        ].join(' ')}
        aria-label={t('lightbox_zoom')}
      >
        <Image
          src={cld(item.url, { w: zoomed ? 2400 : 1600 })}
          alt={item.title || 'Gallery image'}
          width={item.width || 1600}
          height={item.height || 1200}
          sizes="100vw"
          className={[
            'object-contain transition-transform duration-500',
            imgLoaded ? 'opacity-100' : 'opacity-0',
            zoomed ? 'scale-150 sm:scale-[1.75]' : 'max-h-[80vh] w-auto h-auto',
          ].join(' ')}
          onLoad={() => setImgLoaded(true)}
          priority
        />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 * Lightbox shell
 * ---------------------------------------------------------------- */
function Lightbox({ items, openIndex, onClose, onNavigate, t }) {
  const isOpen = openIndex !== null;
  const item = isOpen ? items[openIndex] : null;
  const total = items.length;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNavigate(-1);
      else if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, onNavigate]);

  const touchStart = useRef(null);
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    if (Math.abs(dx) > 60) onNavigate(dx > 0 ? -1 : 1);
    touchStart.current = null;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-100">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="relative w-full h-full flex flex-col items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-linear-to-b from-black/70 to-transparent">
                <div className="text-white/90 text-xs font-semibold tracking-wider uppercase">
                  {t('image_counter', { current: openIndex + 1, total })}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E9756D] backdrop-blur text-white flex items-center justify-center transition-colors"
                  aria-label={t('lightbox_close')}
                >
                  <X size={20} />
                </button>
              </div>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate(-1)}
                    className="absolute start-3 sm:start-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
                    aria-label={t('lightbox_prev')}
                  >
                    <ChevronLeft size={22} className="rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(1)}
                    className="absolute end-3 sm:end-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
                    aria-label={t('lightbox_next')}
                  >
                    <ChevronRight size={22} className="rtl:rotate-180" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                {item && <LightboxStage key={item.id} item={item} t={t} />}
              </AnimatePresence>

              {item && (item.title || item.description) && (
                <div className="absolute bottom-0 inset-x-0 z-20 px-4 sm:px-6 py-5 bg-linear-to-t from-black/80 to-transparent">
                  <div className="max-w-4xl mx-auto text-center">
                    {item.title && (
                      <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-white/80 text-sm sm:text-base mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

/* ------------------------------------------------------------------
 * Main section — orbital rotating gallery
 * ---------------------------------------------------------------- */
export default function GallerySection() {
  const t = useTranslations('home_gallery');
  const { items, error } = useGallery();
  const [openIndex, setOpenIndex] = useState(null);

  const isLoading = items === null;
  const isEmpty = !isLoading && items.length === 0;

  // Pick up to 8 images for the orbital carousel (featured first via API order)
  const orbitItems = !isEmpty && items ? items.slice(0, 8) : [];

  // Static rotation per card — gives the photos a stylish hand-pinned look
  const cardRotations = [-15, -8, 5, 12, -12, 8, -6, 10];

  // Continuous orbit rotation — single shared delta keeps the effect cheap
  // and removes the need to seed an array from props (which would trigger
  // the React 19 "set-state-in-effect" lint).
  const [orbitDelta, setOrbitDelta] = useState(0);
  const total = orbitItems.length;
  useEffect(() => {
    if (!total) return;
    const id = setInterval(() => {
      setOrbitDelta((d) => (d + 0.5) % 360);
    }, 50);
    return () => clearInterval(id);
  }, [total]);

  // 3D mouse perspective
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  const onMouseLeave = () => setMouse({ x: 0.5, y: 0.5 });

  const radius = useOrbitRadius();
  const perspectiveX = (mouse.x - 0.5) * 20;
  const perspectiveY = (mouse.y - 0.5) * 20;

  const onNavigate = useCallback(
    (dir) => {
      setOpenIndex((idx) => {
        if (idx === null || !items?.length) return idx;
        return (idx + dir + items.length) % items.length;
      });
    },
    [items]
  );

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-[#FDF5EE]/40 to-white overflow-hidden"
    >
      <style>{`
        @keyframes shekari-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shekari-perspective { perspective: 1200px; }
      `}</style>

      {/* soft brand glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#E9756D]/8 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-[#F6CA97]/12 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Orbital carousel */}
        <div
          className="relative w-full h-104 sm:h-128 lg:h-144 mb-10 sm:mb-12"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div className="absolute inset-0 flex items-center justify-center shekari-perspective">
            {isLoading &&
              Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * (360 / 8)) * (Math.PI / 180);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={'sk-' + i}
                    className="absolute w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-52 rounded-2xl shadow-xl overflow-hidden"
                    style={{
                      transform: `translate(${x}px, ${y}px) rotateZ(${cardRotations[i] || 0}deg)`,
                      background:
                        'linear-gradient(110deg, #FDF5EE 0%, rgba(246,202,151,0.25) 30%, #FDF5EE 60%)',
                      backgroundSize: '300% 100%',
                      animation: 'shekari-shimmer 1.4s ease-in-out infinite',
                    }}
                    aria-hidden="true"
                  />
                );
              })}

            {!isLoading &&
              orbitItems.map((item, i) => (
                <OrbitCard
                  key={item.id}
                  item={item}
                  index={i}
                  total={total}
                  rotation={cardRotations[i % cardRotations.length]}
                  rotatingAngle={(i * (360 / total) + orbitDelta) % 360}
                  radius={radius}
                  perspectiveX={perspectiveX}
                  perspectiveY={perspectiveY}
                  onClick={() => setOpenIndex(i)}
                />
              ))}
          </div>
        </div>

        {/* Content under the carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-20 text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9756D]/20 shadow-sm text-[#E9756D] text-xs font-semibold tracking-wide uppercase mb-4">
            <Camera size={13} />
            {t('badge')}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 text-balance leading-tight tracking-tight">
            {t('title')}
          </h2>

          {t('subtitle') && (
            <p className="text-lg sm:text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              {t('subtitle')}
            </p>
          )}

          {!isEmpty && (
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              aria-label={t('cta_aria')}
              disabled={isLoading || !items?.length}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold shadow-lg shadow-[#E9756D]/30 hover:shadow-xl hover:shadow-[#E9756D]/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E9756D]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {t('view_all')}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </button>
          )}

          {isEmpty && (
            <div className="mt-2 rounded-2xl border border-dashed border-[#F6CA97]/40 bg-white/60 p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#E9756D]/10 to-[#F6CA97]/10 text-[#E9756D] flex items-center justify-center mx-auto mb-3">
                <Camera size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5">{t('empty_title')}</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">{t('empty_subtitle')}</p>
            </div>
          )}

          {error && !isLoading && items?.length === 0 && (
            <p className="mt-4 text-sm text-rose-500">{error}</p>
          )}
        </motion.div>
      </div>

      {!isEmpty && items?.length > 0 && (
        <Lightbox
          items={items}
          openIndex={openIndex}
          onClose={close}
          onNavigate={onNavigate}
          t={t}
        />
      )}
    </section>
  );
}
