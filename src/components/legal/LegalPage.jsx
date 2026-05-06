import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Container';
import { FileText, ShieldCheck, Accessibility, AlertTriangle } from 'lucide-react';

const ICONS = {
  privacy: ShieldCheck,
  terms: FileText,
  accessibility: Accessibility,
  disclaimer: AlertTriangle,
};

// Renders a fully-translated legal page from `legal.<doc>_*` keys.
// `doc` is one of: 'privacy', 'terms', 'accessibility', 'disclaimer'.
// `sections` is the count of section blocks for that doc.
export default async function LegalPage({ locale, doc, sections }) {
  const t = await getTranslations({ locale, namespace: 'legal' });
  const Icon = ICONS[doc] || FileText;

  return (
    <>
      <PageHero
        badge={
          <>
            <Icon size={13} />
            {t(`${doc}_title`)}
          </>
        }
        title={t(`${doc}_title`)}
        subtitle={t(`${doc}_subtitle`)}
      />

      <Section size="md" background="white">
        {/* Optional last-updated line for privacy / terms */}
        {(doc === 'privacy' || doc === 'terms') && (
          <p className="text-xs text-gray-500 mb-6">{t(`${doc}_last_updated`)}</p>
        )}

        <article className="max-w-3xl">
          {/* Optional intro */}
          {(doc === 'privacy' || doc === 'terms' || doc === 'accessibility') && (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
              {t(`${doc}_intro`)}
            </p>
          )}

          <div className="space-y-10">
            {Array.from({ length: sections }, (_, i) => i + 1).map((n) => (
              <section key={n}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {t(`${doc}_section${n}_title`)}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t(`${doc}_section${n}_body`)}
                </p>
              </section>
            ))}
          </div>
        </article>
      </Section>
    </>
  );
}
