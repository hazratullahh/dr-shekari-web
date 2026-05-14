import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  Activity, Pill, Microscope, Stethoscope, HeartPulse, Scissors,
  ArrowRight, Calendar, Phone, Clock, Sparkles, ShieldCheck, Check,
  AlertCircle, BookOpen,
} from 'lucide-react';

import Container, { Section, SectionHeader } from '@/components/ui/Container';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Reveal from '@/components/scroll/Reveal';
import { SERVICE_CATALOG, getService } from '@/content/services';

const ICONS = {
  activity: Activity,
  pill: Pill,
  microscope: Microscope,
  stethoscope: Stethoscope,
  heartpulse: HeartPulse,
  scissors: Scissors,
};

const SECTION_ICONS = {
  what: BookOpen,
  symptoms: AlertCircle,
  diagnosis: Microscope,
  treatment: HeartPulse,
  when: Phone,
};

export default async function ServiceDetail({ locale, slug }) {
  const service = getService(slug);
  if (!service) return null;

  const t = await getTranslations({ locale, namespace: 'services_page' });

  const Icon = ICONS[service.iconKey] || Activity;
  const detailBase = service.detailBase;

  const sections = [
    { key: 'what',      icon: SECTION_ICONS.what,      title: t('service_what_section'),      body: t(`${detailBase}_what_desc`) },
    { key: 'symptoms',  icon: SECTION_ICONS.symptoms,  title: t('service_symptoms_section'),  body: t(`${detailBase}_symptoms_desc`) },
    { key: 'diagnosis', icon: SECTION_ICONS.diagnosis, title: t('service_diagnosis_section'), body: t(`${detailBase}_diagnosis_desc`) },
    { key: 'treatment', icon: SECTION_ICONS.treatment, title: t('service_treatment_section'), body: t(`${detailBase}_treatment_desc`) },
    { key: 'when',      icon: SECTION_ICONS.when,      title: t('service_when_section'),      body: t(`${detailBase}_when_desc`) },
  ];

  const related = service.related
    .map((s) => SERVICE_CATALOG.find((c) => c.slug === s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        badge={
          <>
            <Icon size={13} />
            {t('service_section_badge')}
          </>
        }
        title={t(service.titleKey)}
        subtitle={t(`${detailBase}_what_desc`)}
      >
        <div className="mt-2">
          <Breadcrumbs
            items={[
              { label: t('hero_title'), href: '/services' },
              { label: t(service.titleKey) },
            ]}
          />
        </div>
      </PageHero>

      <Section size="md" background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* MAIN COLUMN — structured medical content */}
          <article className="lg:col-span-8 space-y-10">
            {sections.map((s, i) => {
              const SIcon = s.icon;
              return (
                <Reveal as="section" key={s.key} delay={i * 0.04} id={s.key} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-md shadow-[#E9756D]/30 shrink-0">
                      <SIcon size={18} />
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {s.title}
                    </h2>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {s.body}
                  </p>
                </Reveal>
              );
            })}

            {/* Procedures we offer */}
            <Reveal as="section" delay={0.05}>
              <div className="rounded-2xl bg-linear-to-b from-[#FDF5EE] to-white border border-[#F6CA97]/30 p-6 md:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white flex items-center justify-center shadow-md">
                    <Sparkles size={18} />
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {t('service_procedures_we_offer')}
                  </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.procedures.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 rounded-xl bg-white border border-gray-100 p-3.5"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[#E9756D]" />
                      <span className="text-sm font-medium text-gray-800">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Book CTA — gradient banner */}
            <Reveal as="div" delay={0.05}>
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#E9756D] to-[#F6CA97] text-white p-6 md:p-8">
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {t('service_book_cta_title')}
                    </h3>
                    <p className="mt-1.5 text-white/90 text-sm md:text-base">
                      {t('service_book_cta_body')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                    <Link
                      href="/appointment"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#E9756D] font-semibold shadow-md hover:bg-[#FDF5EE] transition-colors"
                    >
                      <Calendar size={16} />
                      {t('hero_title')}
                    </Link>
                    <a
                      href="tel:+93796040915"
                      dir="ltr"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/25 transition-colors"
                    >
                      <Phone size={16} />
                      +93 79 604 0915
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start space-y-5">
            <Reveal as="div">
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#E9756D] mb-3">
                  {t('service_at_a_glance')}
                </div>
                <dl className="space-y-3 text-sm">
                  <SidebarRow
                    icon={Stethoscope}
                    label={t('service_specialty')}
                    value={t(service.titleKey)}
                  />
                  <SidebarRow
                    icon={Clock}
                    label={t('service_typical_duration')}
                    value={service.typicalDuration}
                  />
                  <SidebarRow
                    icon={ShieldCheck}
                    label={t('service_recovery')}
                    value={service.recoveryDays}
                  />
                </dl>
              </div>
            </Reveal>

            <Reveal as="div" delay={0.05}>
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#E9756D] mb-3">
                  {t('service_related_title')}
                </div>
                <ul className="space-y-1">
                  {related.map((r) => {
                    const RIcon = ICONS[r.iconKey] || Activity;
                    return (
                      <li key={r.slug}>
                        <Link
                          href={`/services/${r.slug}`}
                          className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FDF5EE] transition-colors"
                        >
                          <span className="flex items-center gap-2.5 text-sm font-medium text-gray-800 group-hover:text-[#E9756D] transition-colors">
                            <span className="w-7 h-7 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center">
                              <RIcon size={14} />
                            </span>
                            {t(r.titleKey)}
                          </span>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-[#E9756D] rtl:rotate-180 transition-colors" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal as="div" delay={0.1}>
              <Link
                href="/services"
                className="flex items-center justify-between gap-3 rounded-2xl bg-white border border-gray-100 p-4 hover:border-[#E9756D]/40 transition-colors group"
              >
                <span className="text-sm font-semibold text-gray-800 group-hover:text-[#E9756D] transition-colors">
                  {t('all_services')}
                </span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#E9756D] rtl:rotate-180 transition-colors" />
              </Link>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}

function SidebarRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-[#E9756D]/10 text-[#E9756D] flex items-center justify-center shrink-0">
        <Icon size={14} />
      </span>
      <div className="flex-1 min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label}</dt>
        <dd className="text-sm font-semibold text-gray-900 mt-0.5">{value}</dd>
      </div>
    </div>
  );
}
