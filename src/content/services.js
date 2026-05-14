// Service catalog: slug → i18n key bases + icon + related slugs + structured
// medical metadata. The slug determines the URL (/services/[slug]) and the
// translation key prefix used in services_page (e.g. kidney_what_desc).

export const SERVICE_CATALOG = [
  {
    slug: 'kidney-stones',
    titleKey: 'kidney_stones',
    detailBase: 'kidney',
    iconKey: 'activity',
    related: ['endourology-surgeries', 'urinary-infections', 'prostate-diseases'],
    procedures: ['Laser lithotripsy (RIRS)', 'PCNL', 'Ureteroscopy', 'ESWL'],
    typicalDuration: '30 – 90 min',
    recoveryDays: '1 – 7 days',
  },
  {
    slug: 'prostate-diseases',
    titleKey: 'prostate_diseases',
    detailBase: 'prostate',
    iconKey: 'pill',
    related: ['urinary-infections', 'sexual-disorders', 'male-infertility'],
    procedures: ['TURP', 'HoLEP', 'PSA monitoring', 'Prostate biopsy'],
    typicalDuration: '60 – 120 min',
    recoveryDays: '7 – 21 days',
  },
  {
    slug: 'urinary-infections',
    titleKey: 'urinary_infections',
    detailBase: 'urinary_infections',
    iconKey: 'microscope',
    related: ['kidney-stones', 'prostate-diseases'],
    procedures: ['Urine culture', 'Targeted antibiotics', 'Cystoscopy'],
    typicalDuration: '15 – 30 min',
    recoveryDays: '3 – 10 days',
  },
  {
    slug: 'male-infertility',
    titleKey: 'male_infertility',
    detailBase: 'male_infertility',
    iconKey: 'heartpulse',
    related: ['sexual-disorders', 'prostate-diseases'],
    procedures: ['Semen analysis', 'Hormonal workup', 'Varicocele repair', 'TESE'],
    typicalDuration: '30 – 45 min',
    recoveryDays: '0 – 7 days',
  },
  {
    slug: 'sexual-disorders',
    titleKey: 'sexual_disorders',
    detailBase: 'sexual_disorders',
    iconKey: 'stethoscope',
    related: ['male-infertility', 'prostate-diseases'],
    procedures: ['ED evaluation', 'PE counselling', 'Pharmacotherapy', 'PDE5 inhibitors'],
    typicalDuration: '30 – 45 min',
    recoveryDays: 'N/A',
  },
  {
    slug: 'endourology-surgeries',
    titleKey: 'endourology_surgeries',
    detailBase: 'endourology_surgeries',
    iconKey: 'scissors',
    related: ['kidney-stones', 'prostate-diseases', 'urinary-infections'],
    procedures: ['Ureteroscopy', 'PCNL', 'Laser stone fragmentation', 'Stricture repair'],
    typicalDuration: '45 – 180 min',
    recoveryDays: '3 – 14 days',
  },
];

export function getService(slug) {
  return SERVICE_CATALOG.find((s) => s.slug === slug) || null;
}

export const SERVICE_SLUGS = SERVICE_CATALOG.map((s) => s.slug);
