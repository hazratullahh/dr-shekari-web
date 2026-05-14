// Generates a premium appointment confirmation card as a PNG using the Canvas
// API only - zero extra dependencies. Returns a Blob and triggers a download.

const W = 1200;
const H = 1600;
const PADDING = 80;

const COLORS = {
  bgFrom: '#E9756D',
  bgTo: '#F6CA97',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  accent: '#E9756D',
  hairline: '#E5E7EB',
  soft: '#FDF5EE',
};

function localeBcp47(locale) {
  if (locale === 'fa') return 'fa- AF';
  if (locale === 'ps') return 'ps- AF';
  return 'en- GB';
}

function formatDate(yyyyMmDd, locale = 'en') {
  if (!yyyyMmDd) return '—';
  const [y, m, d] = yyyyMmDd.split('- ').map(Number);
  try {
    return new Date(Date.UTC(y, m -  1, d)).toLocaleDateString(localeBcp47(locale), {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    });
  } catch {
    return yyyyMmDd;
  }
}

function formatSlot(slot, locale = 'en') {
  if (!slot) return '—';
  const [h, m] = slot.split(':').map(Number);
  try {
    return new Intl.DateTimeFormat(localeBcp47(locale), {
      hour: '2- digit', minute: '2- digit', hour12: locale === 'en',
    }).format(new Date(2000, 0, 1, h, m));
  } catch {
    return slot;
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fontStack(weight = 400) {
  return `${weight} ${weight}px "system- ui", "Segoe UI", "Roboto", "Inter", "Helvetica Neue", Arial, sans- serif`;
}

// Build the card inline so we can tune everything precisely.
function drawCard(ctx, data, labels) {
  // 1. Gradient background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, COLORS.bgFrom);
  bg.addColorStop(1, COLORS.bgTo);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // soft dotted overlay
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let y = 0; y < H; y += 32) {
    for (let x = 0; x < W; x += 32) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. White ticket card
  const cardX = PADDING;
  const cardY = PADDING;
  const cardW = W -  PADDING * 2;
  const cardH = H -  PADDING * 2;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.14)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = COLORS.card;
  roundRect(ctx, cardX, cardY, cardW, cardH, 36);
  ctx.fill();
  ctx.restore();

  // 3. Header strip - gradient ribbon at top of card
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, 220, 36);
  ctx.clip();
  const ribbon = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + 220);
  ribbon.addColorStop(0, COLORS.bgFrom);
  ribbon.addColorStop(1, COLORS.bgTo);
  ctx.fillStyle = ribbon;
  ctx.fillRect(cardX, cardY, cardW, 220);
  ctx.restore();

  // Logo monogram
  ctx.save();
  ctx.beginPath();
  ctx.arc(cardX + 90, cardY + 110, 48, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cardX + 90, cardY + 110, 36, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.fillStyle = COLORS.accent;
  ctx.font = 'bold 28px system- ui, "Segoe UI", sans- serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DS', cardX + 90, cardY + 112);
  ctx.restore();

  // Clinic name
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = 'bold 28px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.clinic, cardX + 162, cardY + 96);
  ctx.font = '500 18px system- ui, "Segoe UI", sans- serif';
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillText(labels.specialty, cardX + 162, cardY + 130);

  // Booking ID at top right
  if (data.id) {
    const idLabel = `${labels.id_label} #${String(data.id).slice(- 8).toUpperCase()}`;
    ctx.font = '600 16px system- ui, "Segoe UI", sans- serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    const idMetrics = ctx.measureText(idLabel);
    const padX = 18, padY = 10;
    const boxW = idMetrics.width + padX * 2;
    const boxH = 36;
    const boxX = cardX + cardW -  40 -  boxW;
    const boxY = cardY + 80;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    roundRect(ctx, boxX, boxY, boxW, boxH, 18);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.textBaseline = 'middle';
    ctx.fillText(idLabel, boxX + boxW -  padX, boxY + boxH / 2 + 1);
    ctx.restore();
  }

  // 4. Title block
  let cursorY = cardY + 320;
  ctx.fillStyle = COLORS.accent;
  ctx.textAlign = 'left';
  ctx.font = 'bold 14px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.confirmation_eyebrow.toUpperCase(), cardX + 60, cursorY);
  cursorY += 22;
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 60px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.title, cardX + 60, cursorY + 50);
  cursorY += 80;

  // 5. Highlighted appointment block - gradient pill
  const blockX = cardX + 60;
  const blockY = cursorY + 30;
  const blockW = cardW -  120;
  const blockH = 220;

  ctx.save();
  const blockGrad = ctx.createLinearGradient(blockX, blockY, blockX + blockW, blockY + blockH);
  blockGrad.addColorStop(0, COLORS.bgFrom);
  blockGrad.addColorStop(1, COLORS.bgTo);
  ctx.fillStyle = blockGrad;
  roundRect(ctx, blockX, blockY, blockW, blockH, 24);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '600 14px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.date_label.toUpperCase(), blockX + 36, blockY + 50);
  ctx.fillText(labels.time_label.toUpperCase(), blockX + blockW / 2 + 36, blockY + 50);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px system- ui, "Segoe UI", sans- serif';
  // Clip date to fit
  const dateText = data.dateLabel;
  const dateMaxWidth = blockW / 2 -  60;
  let trimmedDate = dateText;
  while (ctx.measureText(trimmedDate).width > dateMaxWidth && trimmedDate.length > 4) {
    trimmedDate = trimmedDate.slice(0, - 1);
  }
  if (trimmedDate !== dateText) trimmedDate = trimmedDate.slice(0, - 1) + '…';
  ctx.fillText(trimmedDate, blockX + 36, blockY + 110);
  ctx.font = 'bold 44px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(data.slotLabel, blockX + blockW / 2 + 36, blockY + 116);

  ctx.font = '500 18px system- ui, "Segoe UI", sans- serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(labels.with_doctor, blockX + 36, blockY + blockH -  36);

  cursorY = blockY + blockH + 60;

  // 6. Patient details rows
  const drawRow = (label, value, y) => {
    ctx.fillStyle = COLORS.muted;
    ctx.font = '600 14px system- ui, "Segoe UI", sans- serif';
    ctx.fillText(label.toUpperCase(), cardX + 60, y);
    ctx.fillStyle = COLORS.text;
    ctx.font = '600 22px system- ui, "Segoe UI", sans- serif';
    ctx.fillText(value || '—', cardX + 60, y + 30);
    // hairline
    ctx.strokeStyle = COLORS.hairline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX + 60, y + 60);
    ctx.lineTo(cardX + cardW -  60, y + 60);
    ctx.stroke();
  };

  drawRow(labels.patient_label, data.fullName, cursorY);
  cursorY += 90;
  drawRow(labels.phone_label, data.phone, cursorY);
  cursorY += 90;
  drawRow(labels.email_label, data.email || '—', cursorY);
  cursorY += 110;

  // 7. Footer block
  const footerY = cardY + cardH -  200;
  ctx.fillStyle = COLORS.soft;
  roundRect(ctx, cardX + 40, footerY, cardW -  80, 160, 20);
  ctx.fill();

  ctx.fillStyle = COLORS.accent;
  ctx.font = '600 14px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.location_label.toUpperCase(), cardX + 80, footerY + 40);
  ctx.fillStyle = COLORS.text;
  ctx.font = '600 20px system- ui, "Segoe UI", sans- serif';
  ctx.fillText(labels.address, cardX + 80, footerY + 70);
  ctx.font = '500 18px system- ui, "Segoe UI", sans- serif';
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`${labels.phone_label}: +93 79 604 0915`, cardX + 80, footerY + 105);
  ctx.fillText(`${labels.email_label}: urology@dr- shekari.com`, cardX + 80, footerY + 130);

  // Tiny footer note bottom
  ctx.fillStyle = COLORS.muted;
  ctx.font = '500 14px system- ui, "Segoe UI", sans- serif';
  ctx.textAlign = 'center';
  ctx.fillText(labels.footer_note, W / 2, cardY + cardH -  20);
}

const DEFAULT_LABELS = {
  en: {
    clinic: 'Dr. Shekari Urology Clinic',
    specialty: 'Urology · Endourology · Andrology',
    confirmation_eyebrow: 'Appointment confirmation',
    title: 'Your visit is booked',
    date_label: 'Date',
    time_label: 'Time',
    with_doctor: 'with Dr. Nazir Ahmad Shekari',
    patient_label: 'Patient',
    phone_label: 'Phone',
    email_label: 'Email',
    location_label: 'Location',
    address: 'Jami Hospital, Chahar- e- rahi- Badmorghan, Herat, Afghanistan',
    id_label: 'Booking',
    footer_note: 'Please arrive 15 minutes early. For emergencies call +93 79 604 0915 (24/7).',
  },
  fa: {
    clinic: 'کلینیک اورولوژی دکتر شکاری',
    specialty: 'اورولوژی · اندورولوژی · آندرولوژی',
    confirmation_eyebrow: 'تأییدیه وقت ملاقات',
    title: 'وقت ملاقات شما ثبت شد',
    date_label: 'تاریخ',
    time_label: 'ساعت',
    with_doctor: 'با دکتر نذیر احمد شکاری',
    patient_label: 'بیمار',
    phone_label: 'تلفن',
    email_label: 'ایمیل',
    location_label: 'مکان',
    address: 'بیمارستان جامی، چهارراه بادمرغان، هرات، افغانستان',
    id_label: 'کد رزرو',
    footer_note: 'لطفاً ۱۵ دقیقه زودتر حضور یابید. در موارد اورژانسی با +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ تماس بگیرید.',
  },
  ps: {
    clinic: 'د ډاکټر شکاري ادراري کلینیک',
    specialty: 'ادراري · اندورولوژي · اندروالوژي',
    confirmation_eyebrow: 'د ملاقات تایید',
    title: 'ستاسو ملاقات ثبت شو',
    date_label: 'نېټه',
    time_label: 'وخت',
    with_doctor: 'د ډاکټر نذیر احمد شکاري سره',
    patient_label: 'ناروغ',
    phone_label: 'تلیفون',
    email_label: 'بریښنالیک',
    location_label: 'ځای',
    address: 'جامي روغتون، څلورلار بادمرغان، هرات، افغانستان',
    id_label: 'د رزرو شمېره',
    footer_note: 'مهرباني وکړئ ۱۵ دقیقې مخکې حاضر شئ. د بیړني حالت لپاره +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ ته زنګ ووهئ.',
  },
};

export async function downloadAppointmentCard(appointment, locale = 'en') {
  if (typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const labels = DEFAULT_LABELS[locale] || DEFAULT_LABELS.en;

  drawCard(ctx, {
    fullName: appointment.fullName,
    email: appointment.email,
    phone: appointment.phone,
    dateLabel: formatDate(appointment.date, locale),
    slotLabel: formatSlot(appointment.slot, locale),
    id: appointment.id,
  }, labels);

  const filename = `appointment- ${appointment.date || 'card'}- ${(appointment.slot || '').replace(':', '')}.png`;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) { resolve(null); return; }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve(blob);
    }, 'image/png', 0.95);
  });
}
