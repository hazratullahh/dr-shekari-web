import { Suspense } from 'react';
import FAQSection from '@/components/contact/FAQSection';
import LoadingFallback from '@/components/ui/LoadingFallback';
import PageHero from '@/components/ui/PageHero';
import { HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'FAQ – Dr. Shekari Urology Clinic',
  description: 'Frequently asked questions about kidney stones, prostate care, male infertility and more. Get quick answers and contact our clinic.',
  keywords: [
    'urology FAQ',
    'kidney stone questions',
    'prostate surgery care',
    'male infertility info'
  ],
  openGraph: {
    title: 'FAQ – Dr. Shekari Urology Clinic',
    description: 'Frequently asked questions about urology services and patient care.',
    images: [
      {
        url: '/images/faq/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ – Dr. Shekari Urology Clinic',
    description: 'Frequently asked questions about urology services and patient care.'
  },
  alternates: {
    canonical: 'https://dr-shekari.com/faq'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function FAQPage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback type="hero" />}>
        <PageHero
          badge={<><HelpCircle size={13} /> Help center</>}
          title="Frequently asked questions"
          subtitle="Quick answers about appointments, treatments, emergency care, and what to expect at Dr. Shekari's clinic."
        />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <FAQSection />
      </Suspense>

      {/* FAQ structured data */}
      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a kidney stone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A kidney stone is a hard deposit made of minerals and salts that form inside your kidneys."
                }
              },
              {
                "@type": "Question",
                "name": "Care after prostate surgery",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Follow your doctor’s instructions regarding wound care, activity levels, and medications."
                }
              },
              {
                "@type": "Question",
                "name": "Male infertility",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Male infertility refers to a man’s inability to cause pregnancy in a fertile female."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
