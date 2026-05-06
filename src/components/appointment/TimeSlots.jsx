'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Clock, AlertCircle, Sun, Moon, RotateCw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

function formatLabel(slot, locale) {
  const [h, m] = slot.split(':').map(Number);
  try {
    return new Intl.DateTimeFormat(localeToBcp47(locale), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    }).format(new Date(2000, 0, 1, h, m));
  } catch {
    const period = h < 12 ? 'AM' : 'PM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
  }
}

function localeToBcp47(locale) {
  if (locale === 'fa') return 'fa-AF';
  if (locale === 'ps') return 'ps-AF';
  return 'en-US';
}

function periodOf(slot) {
  const [h] = slot.split(':').map(Number);
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const PERIOD_ICONS = { morning: Sun, afternoon: Sun, evening: Moon };

// In-memory cache per session: date → { ts, payload }. 60-second freshness.
// Avoids re-fetching the same date when the user steps back/forward.
const slotCache = new Map();
const CACHE_TTL_MS = 60_000;

export default function TimeSlots({ date, value, onChange }) {
  const t = useTranslations('booking');
  const locale = useLocale();
  const [state, setState] = useState({ loading: false, closed: false, slots: [], error: '' });
  const [retryNonce, setRetryNonce] = useState(0);
  const abortRef = useRef(null);

  const fetchSlots = useCallback(async () => {
    if (!date) return;

    const cached = slotCache.get(date);
    const fresh = cached && Date.now() - cached.ts < CACHE_TTL_MS;
    if (fresh && retryNonce === 0) {
      setState({ loading: false, ...cached.payload, error: '' });
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: '' }));

    try {
      const res = await fetch(`/api/appointment/slots?date=${encodeURIComponent(date)}`, {
        cache: 'no-store',
        signal: controller.signal,
      });

      let json = {};
      try { json = await res.json(); } catch {}

      if (!res.ok || !json.ok) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }

      const payload = { closed: !!json.closed, slots: json.slots || [] };
      slotCache.set(date, { ts: Date.now(), payload });
      setState({ loading: false, error: '', ...payload });
    } catch (err) {
      if (err.name === 'AbortError') return;
      // Don't trash the cache on transient failures — keep last good payload.
      setState({ loading: false, closed: false, slots: [], error: err.message || 'fetch_failed' });
    }
  }, [date, retryNonce]);

  useEffect(() => {
    fetchSlots();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [fetchSlots]);

  if (!date) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
        <Clock size={28} className="mx-auto text-gray-300 mb-2" />
        <p className="text-sm text-gray-500">{t('pick_date_msg')}</p>
      </div>
    );
  }

  if (state.loading) {
    return (
      <SkeletonGrid label={t('loading_slots')} />
    );
  }

  if (state.error) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5 flex items-start gap-3">
        <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-rose-700">{t('validation_failed')}</div>
          <p className="text-xs text-rose-600/85 mt-0.5 break-words">{state.error}</p>
          <button
            type="button"
            onClick={() => setRetryNonce((n) => n + 1)}
            className="cursor-pointer mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-colors"
          >
            <RotateCw size={13} />
            {t('continue')}
          </button>
        </div>
      </div>
    );
  }

  if (state.closed) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-6 text-center">
        <div className="text-sm font-semibold text-rose-700 mb-1">{t('clinic_closed')}</div>
        <p className="text-xs text-rose-600/80">{t('closed_pick_another')}</p>
      </div>
    );
  }

  if (!state.slots.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">{t('no_slots')}</p>
      </div>
    );
  }

  const grouped = state.slots.reduce((acc, s) => {
    const p = periodOf(s.slot);
    (acc[p] = acc[p] || []).push(s);
    return acc;
  }, {});

  const totalAvailable = state.slots.filter((s) => s.available).length;
  const totalReserved = state.slots.filter((s) => s.reserved).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {t('available_count', { n: totalAvailable })}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          {t('reserved_count', { n: totalReserved })}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {['morning', 'afternoon', 'evening'].map((period) => {
          const items = grouped[period];
          if (!items?.length) return null;
          const Icon = PERIOD_ICONS[period];
          return (
            <motion.div
              key={period}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center">
                  <Icon size={14} />
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{t(period)}</h4>
                <span className="text-xs text-gray-400">
                  {t('free_count', { free: items.filter((i) => i.available).length, total: items.length })}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {items.map((s) => {
                  const selected = value === s.slot;
                  const reserved = s.reserved;
                  const past = s.past;
                  const disabled = !s.available;

                  return (
                    <button
                      key={s.slot}
                      type="button"
                      disabled={disabled}
                      onClick={() => onChange?.(s.slot)}
                      aria-pressed={selected}
                      aria-label={`${formatLabel(s.slot, locale)}${reserved ? ' — ' + t('reserved') : past ? ' — ' + t('past') : ' — ' + t('available')}`}
                      className={[
                        'relative px-2 py-2.5 rounded-xl text-sm font-semibold transition-all border',
                        selected
                          ? 'cursor-pointer bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white border-transparent shadow-md shadow-[#E9756D]/30 scale-[1.03]'
                          : reserved
                          ? 'bg-rose-50/70 text-rose-400 border-rose-100 cursor-not-allowed'
                          : past
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                          : 'cursor-pointer bg-white text-gray-800 border-gray-100 hover:border-[#E9756D]/40 hover:bg-[#E9756D]/5 hover:text-[#E9756D]',
                      ].join(' ')}
                    >
                      <span className={reserved ? 'line-through decoration-rose-300' : ''}>
                        {formatLabel(s.slot, locale)}
                      </span>
                      {reserved && !selected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function SkeletonGrid({ label }) {
  return (
    <div className="space-y-5" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <Loader2 size={16} className="animate-spin text-[#E9756D]" />
        <span>{label}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-10 rounded-xl bg-gray-100/80 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
