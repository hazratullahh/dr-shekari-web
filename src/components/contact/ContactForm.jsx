'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const phoneRegex = /^\+?[0-9\s()\-]{7,20}$/;

const ContactForm = () => {
  const t = useTranslations('contact');
  const locale = useLocale();

  const schema = yup.object({
    fullName: yup.string().trim().required(t('full_name_required')).min(2, t('name_min_length')).max(120),
    email: yup
      .string()
      .trim()
      .max(200)
      .transform((value) => (value === '' ? undefined : value))
      .email(t('invalid_email'))
      .notRequired(),
    phone: yup.string().trim().required(t('mobile_required')).matches(phoneRegex, t('afghan_mobile_format')),
    message: yup.string().trim().max(2000).default(''),
    website: yup.string().max(0),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors }, setError: setFieldError } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', message: '', website: '' },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
        body: JSON.stringify({ ...data, locale }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json?.fieldErrors) {
          for (const [field, message] of Object.entries(json.fieldErrors)) {
            setFieldError(field, { type: 'server', message });
          }
        }
        throw new Error(json?.error || t('failed_to_submit'));
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || t('failed_to_submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (hasError) =>
    `w-full pl-11 pr-4 py-3 rounded-xl border bg-white/80 ${
      hasError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#E9756D]'
    } focus:outline-none focus:ring-4 focus:ring-[#E9756D]/10 transition-all`;

  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_-15px_rgba(233,117,109,0.18)] border border-white/60">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9756D]/10 text-[#E9756D] text-xs font-semibold tracking-wide uppercase mb-3">
          <MessageSquare size={14} /> {t('get_in_touch')}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('send_us_a_message')}</h2>
        <p className="text-gray-600 text-sm md:text-base">{t('form_description')}</p>
      </div>

      {isSubmitted && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={22} />
          <div>
            <h4 className="font-semibold text-emerald-800">{t('message_sent_successfully')}</h4>
            <p className="text-emerald-700 text-sm mt-0.5">{t('success_message')}</p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={22} />
          <div>
            <h4 className="font-semibold text-rose-800">{t('error_submitting_form')}</h4>
            <p className="text-rose-700 text-sm mt-0.5">{error}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} className="hidden" aria-hidden="true" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">{t('full_name')} <span className="text-[#E9756D]">*</span></label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" {...register('fullName')} className={fieldClass(!!errors.fullName)} placeholder={t('enter_full_name')} />
            </div>
            {errors.fullName && <p className="mt-1.5 text-xs text-rose-600">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">{t('email_address')}</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" dir="ltr" {...register('email')} className={fieldClass(!!errors.email)} placeholder={t('email_placeholder')} />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-rose-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">{t('mobile_number')} <span className="text-[#E9756D]">*</span></label>
            <div className="relative">
              <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" dir="ltr" {...register('phone')} className={fieldClass(!!errors.phone)} placeholder={t('mobile_placeholder')} />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-rose-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">{t('message')}</label>
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
            <textarea rows={5} {...register('message')} className={`${fieldClass(!!errors.message)} pl-11 pt-3 resize-none`} placeholder={t('message_placeholder')} />
          </div>
          {errors.message && <p className="mt-1.5 text-xs text-rose-600">{errors.message.message}</p>}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-4 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg shadow-[#E9756D]/25 hover:shadow-xl hover:shadow-[#E9756D]/35 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (<><Loader2 className="animate-spin" size={20} />{t('sending_message')}</>) : (<><Send size={18} />{t('send_message')}</>)}
        </motion.button>

        <p className="text-center text-xs text-gray-500">{t('emergency_call_text')}</p>
      </form>
    </div>
  );
};

export default ContactForm;
