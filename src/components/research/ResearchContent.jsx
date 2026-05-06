'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, ClipboardList, Lightbulb, Globe2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Container';

const ICONS = {
  articles: FileText,
  cases: ClipboardList,
  interests: Lightbulb,
  collaborations: Globe2,
};

export default function ResearchContent() {
  const t = useTranslations('research_page');

  const sections = [
    {
      key: 'articles',
      title: t('published_articles'),
      tone: 'coral',
      items: [
        t('published_topic1'),
        t('published_topic2'),
        t('published_topic3'),
        t('published_topic4'),
      ],
    },
    {
      key: 'cases',
      title: t('case_reports'),
      tone: 'peach',
      note: 'Patient identity and personal data are fully anonymized.',
      items: [
        t('case_example1'),
        t('case_example2'),
        t('case_example3'),
      ],
    },
    {
      key: 'interests',
      title: t('research_interests'),
      tone: 'coral',
      items: [
        t('interest1'),
        t('interest2'),
        t('interest3'),
        t('interest4'),
        t('interest5'),
        t('interest6'),
      ],
    },
    {
      key: 'collaborations',
      title: t('collaborations'),
      tone: 'peach',
      items: [
        t('collab1'),
        t('collab2'),
        t('collab3'),
        t('collab4'),
      ],
    },
  ];

  return (
    <Section size="md" background="soft">
      <SectionHeader
        badge="Research highlights"
        title="Continuing scientific contribution"
        subtitle="Selected publications, case studies, and active research directions in urology, endourology, and andrology."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {sections.map((s, i) => {
          const Icon = ICONS[s.key];
          const accent =
            s.tone === 'coral'
              ? 'from-[#E9756D] to-[#FF9A8B]'
              : 'from-[#F6CA97] to-[#FFD8A8]';
          const ring =
            s.tone === 'coral'
              ? 'group-hover:border-[#E9756D]/40'
              : 'group-hover:border-[#F6CA97]/60';
          return (
            <motion.article
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`group relative rounded-2xl p-6 md:p-7 bg-white border border-gray-100 ${ring} hover:shadow-xl hover:shadow-[#E9756D]/10 transition-all duration-300`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${accent} text-white flex items-center justify-center shadow-md shrink-0`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">{s.title}</h3>
                  {s.note && (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#E9756D]">
                      <ShieldCheck size={12} />
                      {s.note}
                    </p>
                  )}
                </div>
              </div>

              <ul className="space-y-2.5">
                {s.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm md:text-[15px] text-gray-700">
                    <ArrowRight size={14} className={`mt-1 shrink-0 ${s.tone === 'coral' ? 'text-[#E9756D]' : 'text-[#E9756D]'}`} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
