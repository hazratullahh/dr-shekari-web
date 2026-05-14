'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare,
  Check, ArrowRight, ArrowLeft, Loader2, AlertCircle, CheckCircle2, Sparkles,
  Download, Home, Loader,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Calendar from './Calendar';
import TimeSlots from './TimeSlots';
import { downloadAppointmentCard } from '@/lib/appointmentCard';

const phoneRegex = /^\+?[0-9\s()\-]{7,20}$/;

function formatSlotLabel(slot, locale) {
  if (!slot) return '';
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

function formatDateLabel(ds, locale) {
  if (!ds) return '';
  const [y, m, d] = ds.split('-').map(Number);
  try {
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(localeToBcp47(locale), {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    });
  } catch {
    return ds;
  }
}

function localeToBcp47(locale) {
  if (locale === 'fa') return 'fa-AF';
  if (locale === 'ps') return 'ps-AF';
  return 'en-GB';
}

export default function BookingFlow() {
  const t = useTranslations('booking');
  const locale = useLocale();

  const STEPS = [
    { id: 'date', label: t('step_date'), icon: CalendarIcon },
    { id: 'time', label: t('step_time'), icon: Clock },
    { id: 'details', label: t('step_details'), icon: User },
    { id: 'confirm', label: t('step_confirm'), icon: Check },
  ];

  const detailsSchema = yup.object({
    fullName: yup.string().trim().required(t('validation_name_required')).min(2, t('validation_name_short')).max(120),
    email: yup
      .string()
      .trim()
      .max(200)
      .transform((value) => (value === '' ? undefined : value))
      .email(t('validation_email_invalid'))
      .notRequired(),
    phone: yup.string().trim().required(t('validation_phone_required')).matches(phoneRegex, t('validation_phone_invalid')),
    message: yup.string().trim().max(2000).default(''),
    website: yup.string().max(0),
  });

  const [stepIdx, setStepIdx] = useState(0);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const [slotConflict, setSlotConflict] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors }, setError: setFieldError } = useForm({
    resolver: yupResolver(detailsSchema),
    defaultValues: { fullName: '', email: '', phone: '', message: '', website: '' },
  });

  const stepId = STEPS[stepIdx].id;
  const canContinue = useMemo(() => {
    if (stepId === 'date') return !!date;
    if (stepId === 'time') return !!slot;
    return true;
  }, [stepId, date, slot]);

  function next() {
    if (!canContinue) return;
    setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function prev() { setStepIdx((i) => Math.max(i - 1, 0)); }

  function onPickDate(d) {
    setDate(d);
    if (slot) setSlot('');
    setSlotConflict(false);
    setTimeout(() => setStepIdx(1), 200);
  }

  function onPickSlot(s) {
    setSlot(s);
    setSlotConflict(false);
    setTimeout(() => setStepIdx(2), 200);
  }

  async function submit() {
    const valid = await new Promise((resolve) => {
      handleSubmit(() => resolve(true), () => resolve(false))();
    });
    if (!valid) return;

    const values = getValues();
    setSubmitting(true);
    setServerError('');
    setSlotConflict(false);

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          preferredDate: date,
          slot,
          message: values.message,
          website: values.website,
          locale,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setSlotConflict(true);
        setServerError(json.error || t('slot_just_taken'));
        setSlot('');
        setStepIdx(1);
        return;
      }

      if (!res.ok) {
        if (json?.fieldErrors) {
          for (const [k, msg] of Object.entries(json.fieldErrors)) {
            if (['fullName', 'email', 'phone', 'message'].includes(k)) {
              setFieldError(k, { type: 'server', message: msg });
            }
          }
          setStepIdx(2);
        }
        throw new Error(json?.error || t('validation_failed'));
      }

      setSubmitted({
        date, slot,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        id: json.id,
      });
    } catch (err) {
      setServerError(err.message || t('validation_failed'));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessCard data={submitted} t={t} locale={locale} />;
  }

  return (
    <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(233,117,109,0.18)] p-6 md:p-8">
      <Stepper steps={STEPS} active={stepIdx} onJump={(i) => i < stepIdx && setStepIdx(i)} stepLabel={t('step_label')} />

      {(date || slot) && stepIdx > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 mb-5 flex flex-wrap items-center gap-2"
        >
          {date && <Pill icon={CalendarIcon} onClick={() => setStepIdx(0)}>{formatDateLabel(date, locale)}</Pill>}
          {slot && <Pill icon={Clock} onClick={() => setStepIdx(1)}>{formatSlotLabel(slot, locale)}</Pill>}
        </motion.div>
      )}

      {slotConflict && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 mb-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3"
        >
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-amber-900">{t('slot_just_taken')}</div>
            <p className="text-amber-700/90 text-xs mt-0.5">{t('slot_just_taken_body')}</p>
          </div>
        </motion.div>
      )}

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            {stepId === 'date' && (
              <div>
                <StepHeader icon={CalendarIcon} title={t('date_title')} subtitle={t('date_subtitle')} />
                <Calendar value={date} onChange={onPickDate} locale={locale} />
              </div>
            )}

            {stepId === 'time' && (
              <div>
                <StepHeader
                  icon={Clock}
                  title={t('time_title')}
                  subtitle={date ? `${t('time_subtitle')}: ${formatDateLabel(date, locale)}` : t('time_pick_date')}
                />
                <TimeSlots date={date} value={slot} onChange={onPickSlot} />
              </div>
            )}

            {stepId === 'details' && (
              <div>
                <StepHeader icon={User} title={t('details_title')} subtitle={t('details_subtitle')} />
                <DetailsForm register={register} errors={errors} t={t} />
              </div>
            )}

            {stepId === 'confirm' && (
              <div>
                <StepHeader icon={Sparkles} title={t('confirm_title')} subtitle={t('confirm_subtitle')} />
                <ReviewBlock date={date} slot={slot} values={getValues()} t={t} locale={locale} />
                {serverError && (
                  <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                    <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-rose-700">{serverError}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-7 pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={stepIdx === 0}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-[#E9756D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          {t('back')}
        </button>

        {stepId !== 'confirm' ? (
          <button
            type="button"
            onClick={next}
            disabled={!canContinue}
            className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white text-sm font-semibold shadow-md shadow-[#E9756D]/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md transition-all"
          >
            {t('continue')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white text-sm font-semibold shadow-md shadow-[#E9756D]/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? (<><Loader2 size={16} className="animate-spin" />{t('booking_in_progress')}</>) : (<><Check size={16} />{t('confirm_booking')}</>)}
          </button>
        )}
      </div>
    </div>
  );
}

function Stepper({ steps, active, onJump, stepLabel }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const done = i < active;
        const current = i === active;
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onJump?.(i)}
              disabled={i >= active}
              className="cursor-pointer w-full text-start group disabled:cursor-default"
            >
              <div className="flex items-center gap-2">
                <div
                  className={[
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                    done
                      ? 'bg-[#E9756D] text-white'
                      : current
                      ? 'bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white shadow-md shadow-[#E9756D]/30'
                      : 'bg-gray-100 text-gray-400',
                  ].join(' ')}
                >
                  {done ? <Check size={15} /> : <Icon size={15} />}
                </div>
                <div className="hidden sm:block">
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${current ? 'text-[#E9756D]' : done ? 'text-gray-700' : 'text-gray-400'}`}>
                    {stepLabel} {i + 1}
                  </div>
                  <div className={`text-xs ${current ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </div>
                </div>
              </div>
              <div className={`mt-2 h-1 rounded-full ${done ? 'bg-[#E9756D]' : current ? 'bg-linear-to-r from-[#E9756D] to-[#F6CA97]' : 'bg-gray-100'}`} />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function StepHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="w-8 h-8 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center">
          <Icon size={16} />
        </span>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function Pill({ icon: Icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9756D]/10 text-[#E9756D] text-xs font-semibold hover:bg-[#E9756D]/15 transition-colors"
    >
      <Icon size={13} />
      {children}
    </button>
  );
}

function DetailsForm({ register, errors, t }) {
  const fieldClass = (hasError) =>
    `w-full ps-11 pe-4 py-3 rounded-xl border bg-white ${
      hasError ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-[#E9756D]'
    } focus:outline-none focus:ring-4 focus:ring-[#E9756D]/10 transition-all`;

  return (
    <div className="space-y-5">
      <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={t('full_name')} required>
          <User size={18} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" {...register('fullName')} className={fieldClass(!!errors.fullName)} placeholder={t('full_name_ph')} />
          <FieldError msg={errors.fullName?.message} />
        </Field>
        <Field label={t('email')}>
          <Mail size={18} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="email" dir="ltr" {...register('email')} className={fieldClass(!!errors.email)} placeholder={t('email_ph')} />
          <FieldError msg={errors.email?.message} />
        </Field>
        <Field label={t('phone')} required>
          <Phone size={18} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="tel" dir="ltr" {...register('phone')} className={fieldClass(!!errors.phone)} placeholder={t('phone_ph')} />
          <FieldError msg={errors.phone?.message} />
        </Field>
      </div>
      <Field label={t('message_optional')}>
        <MessageSquare size={18} className="absolute start-3.5 top-3.5 text-gray-400" />
        <textarea rows={4} {...register('message')} className={`${fieldClass(!!errors.message)} ps-11 pt-3 resize-none`} placeholder={t('message_ph')} />
        <FieldError msg={errors.message?.message} />
      </Field>
      <p className="text-[11px] text-gray-500">{t('privacy_note')}</p>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
        {required && <span className="text-[#E9756D] ms-0.5">*</span>}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-rose-600">{msg}</p>;
}

function ReviewBlock({ date, slot, values, t, locale }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-linear-to-b from-[#FDF5EE] to-white p-5 md:p-6">
      <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-md shadow-[#E9756D]/30 shrink-0">
          <CalendarIcon size={20} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#E9756D]">{t('your_appointment')}</div>
          <div className="text-base font-bold text-gray-900 mt-0.5">{formatDateLabel(date, locale)}</div>
          <div className="text-sm text-gray-600 mt-0.5">
            <span className="font-semibold text-gray-900">{formatSlotLabel(slot, locale)}</span>
          </div>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <ReviewRow label={t('full_name')} value={values.fullName} />
        <ReviewRow label={t('phone')} value={values.phone} />
        <ReviewRow label={t('email')} value={values.email} />
      </dl>
      {values.message && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{t('message_optional')}</div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{values.message}</p>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</dt>
      <dd className="text-gray-900 font-medium mt-0.5 wrap-break-word">{value || '—'}</dd>
    </div>
  );
}

function SuccessCard({ data, t, locale }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'downloading' | 'downloaded' | 'error'

  const triggerDownload = async () => {
    if (status === 'downloading') return;
    setStatus('downloading');
    try {
      await downloadAppointmentCard(
        {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          date: data.date,
          slot: data.slot,
          id: data.id,
        },
        locale
      );
      setStatus('downloaded');
      // Reset back to idle after a moment so the user can re-download.
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('[booking] card download failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const downloading = status === 'downloading';
  const downloaded = status === 'downloaded';
  const errored = status === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-white border border-emerald-100 p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.18)] text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 16 }}
        className="relative mx-auto w-16 h-16 mb-5"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
        <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <CheckCircle2 size={32} />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        className="text-2xl font-bold text-gray-900 mb-2"
      >
        {t('appointment_received_title')}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.4 }}
        className="text-gray-600 max-w-md mx-auto mb-6"
      >
        {t('appointment_received_body', { name: data.fullName })}
      </motion.p>

      {/* Premium 2026-style ticket card -full-width, ticket aesthetic with
          gradient hero header, perforated divider, and the booking ID. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-md text-start rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_-20px_rgba(233,117,109,0.4)] ring-1 ring-[#F6CA97]/30"
      >
        {/* Gradient ribbon */}
        <div className="relative bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white px-6 py-5 overflow-hidden">
          {/* dotted bg overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '14px 14px',
            }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase opacity-90">
              <CalendarIcon size={12} />
              {t('your_appointment')}
            </div>
            {data.id && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/18 backdrop-blur-sm text-[10px] font-bold tracking-wider">
                #{String(data.id).slice(-6).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Perforated divider */}
        <div className="relative h-3 bg-white">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FDF5EE]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FDF5EE]" />
          <div
            aria-hidden="true"
            className="absolute inset-x-3 top-1/2 -translate-y-1/2 border-t border-dashed border-gray-200"
          />
        </div>

        {/* Body */}
        <div className="px-6 pt-2 pb-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400 mb-1.5">
                {t('step_date')}
              </div>
              <div className="text-base font-bold text-gray-900 leading-snug">
                {formatDateLabel(data.date, locale)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400 mb-1.5">
                {t('step_time')}
              </div>
              <div className="text-base font-bold bg-clip-text text-transparent bg-linear-to-br from-[#E9756D] to-[#F6CA97] leading-snug">
                {formatSlotLabel(data.slot, locale)}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Dr. Nazir Ahmad Shekari · Jami Hospital, Herat</span>
          </div>
        </div>
      </motion.div>

      {/* Primary action -download */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.4 }}
        type="button"
        onClick={triggerDownload}
        disabled={downloading}
        aria-live="polite"
        className={`cursor-pointer mt-6 mx-auto group relative inline-flex w-full max-w-md items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold shadow-lg transition-all duration-300 overflow-hidden ${
          downloading
            ? 'bg-linear-to-br from-[#E9756D]/85 to-[#F6CA97]/85 text-white shadow-[#E9756D]/30 cursor-wait'
            : downloaded
            ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30'
            : errored
            ? 'bg-linear-to-br from-rose-500 to-rose-400 text-white shadow-rose-500/30 hover:shadow-rose-500/40'
            : 'bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white shadow-[#E9756D]/30 hover:shadow-xl hover:shadow-[#E9756D]/40 hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {/* shimmer sweep on idle */}
        {!downloading && !downloaded && !errored && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent"
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {downloading ? (
            <motion.span
              key="downloading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Loader2 size={18} className="animate-spin" />
              {t('downloading')}
            </motion.span>
          ) : downloaded ? (
            <motion.span
              key="downloaded"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Check size={18} />
              {t('downloaded')}
            </motion.span>
          ) : errored ? (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <AlertCircle size={18} />
              {t('validation_failed')}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Download size={18} />
              {t('download_card')}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-4 text-xs text-gray-500 max-w-sm mx-auto"
      >
        {t('save_card_hint')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
      >
        <Link
          href="/"
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E9756D] transition-colors"
        >
          <Home size={14} />
          {t('done')}
        </Link>
        <span aria-hidden="true" className="hidden sm:inline-block w-px h-4 bg-gray-200" />
        <a
          href="tel:+93796040915"
          dir="ltr"
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E9756D] transition-colors"
        >
          <Phone size={14} />
          +93 79 604 0915
        </a>
      </motion.div>
    </motion.div>
  );
}
