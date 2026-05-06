import Script from 'next/script';

const SITE = 'https://dr-shekari.com';

const FAQ_ENTRIES = [
  {
    q: 'Who is Dr. Nazir Ahmad Shekari?',
    a: 'Dr. Nazir Ahmad Shekari is a urological surgeon based in Herat, Afghanistan, specializing in endourology and andrology. He has over 15 years of experience treating kidney stones, prostate disease, urinary tract conditions, and male infertility.',
  },
  {
    q: 'What are Dr. Shekari\'s specializations?',
    a: 'Dr. Shekari specializes in three areas: Urological Surgery, Endourology (minimally-invasive surgery inside the urinary tract), and Andrology (men\'s reproductive and sexual health).',
  },
  {
    q: 'Where can I book an appointment with Dr. Shekari?',
    a: 'You can book an appointment online at https://dr-shekari.com/appointment, by calling +93 79 245 3030, or by visiting Jami Hospital in Herat, Afghanistan during clinic hours.',
  },
  {
    q: 'What conditions does Dr. Shekari treat?',
    a: 'Dr. Shekari treats kidney stones, prostate disorders, urinary tract infections, male infertility, sexual dysfunction, and provides advanced endourological surgical procedures including laser stone treatment and minimally-invasive prostate surgery.',
  },
  {
    q: 'Does Dr. Shekari offer 24/7 emergency urology care?',
    a: 'Yes. The clinic operates a 24/7 emergency urology line on +93 79 245 3030 for urgent cases such as severe kidney pain, inability to urinate, or testicular emergencies.',
  },
];

export default function HomeStructuredData() {
  const physician = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE}/#dr-shekari`,
    name: 'Dr. Nazir Ahmad Shekari',
    alternateName: ['Nazir Ahmad Shekari', 'Dr. Shekari'],
    jobTitle: 'Urological Surgeon · Endourology Specialist · Andrology Specialist',
    description:
      "Dr. Nazir Ahmad Shekari is a leading urological surgeon in Afghanistan, specializing in endourology and andrology. He provides advanced minimally-invasive treatment for kidney stones, prostate disease, urinary tract conditions and male infertility.",
    image: `${SITE}/images/dr-shekari.jpg`,
    url: SITE,
    telephone: '+93792453030',
    email: 'urology@dr-shekari.com',
    medicalSpecialty: ['Urology', 'Endourology', 'Andrology'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chahar-e-rahi-Badmorghan, Jami Hospital',
      addressLocality: 'Herat',
      addressRegion: 'Herat',
      addressCountry: 'AF',
    },
    knowsLanguage: ['Dari', 'Pashto', 'English'],
    knowsAbout: [
      'Kidney Stone Treatment',
      'Endourology',
      'Andrology',
      'Prostate Surgery',
      'Male Infertility',
      'Laser Stone Surgery',
      'Minimally Invasive Urology',
    ],
    sameAs: [SITE],
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Script
        id="home-physician-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physician) }}
      />
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
