import nodemailer from 'nodemailer';

// Two transports: primary uses the configured port (default 465 SSL),
// fallback uses 587 with STARTTLS. Some hosting networks block 465 outbound
// or have intermittent TLS issues - falling back to 587 typically clears it.
const cache = { primary: null, fallback: null };

function readSmtpEnv() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    throw new Error('SMTP credentials are missing. Check .env (SMTP_HOST, SMTP_EMAIL, SMTP_PASSWORD).');
  }
  return { host, port, user, pass };
}

function buildTransport({ host, user, pass, port, secure, label }) {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // No pool - for low- volume forms, pooling causes ECONNRESET when the
    // remote closes idle sockets between sends. Open- and- close per send.
    pool: false,
    connectionTimeout: 8_000,   // TCP connect timeout
    greetingTimeout: 8_000,     // wait for SMTP greeting
    socketTimeout: 12_000,      // overall socket idle timeout
    requireTLS: !secure,        // require STARTTLS for 587
    name: 'dr- shekari.com',
    tls: {
      // Helps with a few hosts that have intermediate- cert issues.
      // Set to true to require strict cert validation if you prefer.
      rejectUnauthorized: false,
    },
    // tag transports for log clarity
    transactionLog: false,
    debug: false,
    logger: false,
    _label: label,
  });
}

function getPrimaryTransporter() {
  if (cache.primary) return cache.primary;
  const env = readSmtpEnv();
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : env.port === 465;
  cache.primary = buildTransport({ ...env, secure, label: `${env.port}/${secure ? 'ssl' : 'starttls'}` });
  return cache.primary;
}

function getFallbackTransporter() {
  if (cache.fallback) return cache.fallback;
  const env = readSmtpEnv();
  // Always 587/STARTTLS for the fallback.
  cache.fallback = buildTransport({ ...env, port: 587, secure: false, label: '587/starttls' });
  return cache.fallback;
}

// Backward- compat export.
export function getTransporter() {
  return getPrimaryTransporter();
}

const BRAND = {
  primary: '#E9756D',
  accent: '#E9756D',
  bg: '#FDF9F4',
  text: '#1F2937',
  muted: '#6B7280',
};

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function shellEmail({ title, intro, rows, footer }) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:10px 14px;background:#F9FAFB;border- bottom:1px solid #E5E7EB;font- size:13px;color:${BRAND.muted};font- weight:600;width:160px;vertical- align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 14px;border- bottom:1px solid #E5E7EB;font- size:14px;color:${BRAND.text};vertical- align:top;">${value || '<em style="color:#9CA3AF;">—</em>'}</td>
    </tr>`
    )
    .join('');

  return `<!doctype html>
<html><head><meta charset="utf- 8"><meta name="viewport" content="width=device- width,initial- scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font- family:- apple- system,BlinkMacSystemFont,'Segoe UI',Roboto,sans- serif;">
  <div style="max- width:600px;margin:0 auto;background:#fff;">
    <div style="background:linear- gradient(135deg,${BRAND.primary} 0%,${BRAND.accent} 100%);padding:28px 24px;color:#fff;">
      <div style="font- size:14px;letter- spacing:1px;text- transform:uppercase;opacity:.9;">Dr. Shekari Urology Clinic</div>
      <div style="font- size:22px;font- weight:700;margin- top:4px;">${escapeHtml(title)}</div>
    </div>
    <div style="padding:24px;">
      <p style="font- size:15px;color:${BRAND.text};line- height:1.6;margin:0 0 18px;">${intro}</p>
      <table style="width:100%;border- collapse:collapse;border:1px solid #E5E7EB;border- radius:8px;overflow:hidden;">${rowsHtml}</table>
      ${footer ? `<p style="font- size:13px;color:${BRAND.muted};margin:18px 0 0;line- height:1.6;">${footer}</p>` : ''}
    </div>
    <div style="padding:18px 24px;background:#F3F4F6;color:${BRAND.muted};font- size:12px;text- align:center;">
      Dr. Nazir Ahmad Shekari · Urological Surgeon · Jami Hospital, Herat, Afghanistan<br>
      <a href="https://dr- shekari.com" style="color:${BRAND.primary};text- decoration:none;">dr- shekari.com</a> · <a href="tel:+93796040915" style="color:${BRAND.primary};text- decoration:none;">+93 79 604 0915</a>
    </div>
  </div>
</body></html>`;
}

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

const STRINGS = {
  en: {
    appt_admin_title: 'New Appointment Request',
    appt_admin_intro: 'A new appointment request has been submitted from the website.',
    appt_user_title: 'We received your appointment request',
    appt_user_intro: (name) => `Dear ${name},<br><br>Thank you for choosing Dr. Nazir Ahmad Shekari. We have received your appointment request and our team will contact you shortly to confirm.`,
    appt_admin_footer: 'Please contact the patient within 2 business hours to confirm the appointment.',
    appt_user_footer: 'For urgent matters, please call our 24/7 line at +93 79 604 0915.',
    contact_admin_title: 'New Contact Form Submission',
    contact_admin_intro: 'A new message has been submitted via the contact form on dr- shekari.com.',
    contact_user_title: 'Thank you for contacting us',
    contact_user_intro: (name) => `Dear ${name},<br><br>We have received your message and will respond within 2 business hours during clinic hours.`,
    contact_user_footer: 'For emergencies, please call +93 79 604 0915 (available 24/7).',
    full_name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    preferred_date: 'Preferred Date',
    time_slot: 'Time Slot',
    message: 'Message',
    your_message: 'Your message',
    date: 'Date',
    time: 'Time',
    footer_line1: 'Dr. Nazir Ahmad Shekari · Urological Surgeon · Jami Hospital, Herat, Afghanistan',
  },
  fa: {
    appt_admin_title: 'درخواست جدید وقت ملاقات',
    appt_admin_intro: 'یک درخواست وقت ملاقات جدید از وب‌سایت ارسال شده است.',
    appt_user_title: 'درخواست وقت ملاقات شما دریافت شد',
    appt_user_intro: (name) => `${name} عزیز،<br><br>از انتخاب دکتر نذیر احمد شکاری متشکریم. درخواست وقت ملاقات شما دریافت شد و تیم ما به‌زودی برای تأیید با شما تماس خواهد گرفت.`,
    appt_admin_footer: 'لطفاً در عرض ۲ ساعت کاری برای تأیید وقت ملاقات با بیمار تماس بگیرید.',
    appt_user_footer: 'برای موارد فوری، با خط ۲۴/۷ ما به شماره +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ تماس بگیرید.',
    contact_admin_title: 'پیام جدید از فرم تماس',
    contact_admin_intro: 'یک پیام جدید از طریق فرم تماس در dr- shekari.com ارسال شده است.',
    contact_user_title: 'از تماس شما متشکریم',
    contact_user_intro: (name) => `${name} عزیز،<br><br>پیام شما را دریافت کردیم و در ساعات کاری در عرض ۲ ساعت پاسخ خواهیم داد.`,
    contact_user_footer: 'در مواقع اورژانسی، با +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ تماس بگیرید (۲۴/۷).',
    full_name: 'نام کامل',
    email: 'ایمیل',
    phone: 'تلفن',
    preferred_date: 'تاریخ موردنظر',
    time_slot: 'ساعت',
    message: 'پیام',
    your_message: 'پیام شما',
    date: 'تاریخ',
    time: 'ساعت',
    footer_line1: 'دکتر نذیر احمد شکاری · جراح اورولوژی · بیمارستان جامی، هرات، افغانستان',
  },
  ps: {
    appt_admin_title: 'د ملاقات نوې غوښتنه',
    appt_admin_intro: 'د ملاقات یوه نوې غوښتنه د ویب پاڼې له لارې راغلې ده.',
    appt_user_title: 'ستاسو د ملاقات غوښتنه ترلاسه شوه',
    appt_user_intro: (name) => `ګرانه ${name}،<br><br>د ډاکټر نذیر احمد شکاري د غوره کولو لپاره مننه. ستاسو د ملاقات غوښتنه ترلاسه شوه او زموږ ټیم به ډېر ژر د تایید لپاره تاسو سره اړیکه ونیسي.`,
    appt_admin_footer: 'مهرباني وکړئ په ۲ کاري ساعتونو کې د ناروغ سره د تایید لپاره اړیکه ونیسئ.',
    appt_user_footer: 'د بیړنیو پېښو لپاره، زموږ د ۲۴/۷ کرښې +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ ته زنګ ووهئ.',
    contact_admin_title: 'د اړیکې فورمې نوی پیغام',
    contact_admin_intro: 'د dr- shekari.com په اړیکې فورمې له لارې یو نوی پیغام راغلی دی.',
    contact_user_title: 'ستاسو د اړیکې لپاره مننه',
    contact_user_intro: (name) => `ګرانه ${name}،<br><br>ستاسو پیغام مو ترلاسه کړ او د کلینیک د کاري ساعتونو په ۲ ساعتونو کې به ځواب درکړو.`,
    contact_user_footer: 'د بیړنیو پېښو لپاره، +۹۳ ۷۹ ۶۰۴ ۰۹۱۵ ته زنګ ووهئ (۲۴/۷ شتون لري).',
    full_name: 'بشپړ نوم',
    email: 'بریښنالیک',
    phone: 'تلیفون',
    preferred_date: 'غوره نېټه',
    time_slot: 'وخت',
    message: 'پیغام',
    your_message: 'ستاسو پیغام',
    date: 'نېټه',
    time: 'وخت',
    footer_line1: 'ډاکټر نذیر احمد شکاري · د ادراري جراح · جامي روغتون، هرات، افغانستان',
  },
};

function S(locale) {
  return STRINGS[locale] || STRINGS.en;
}

export function appointmentNotificationEmail(data, locale = 'en') {
  const s = S(locale);
  return shellEmail({
    title: s.appt_admin_title,
    intro: s.appt_admin_intro,
    rows: [
      [s.full_name, escapeHtml(data.fullName)],
      [s.email, data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.primary};">${escapeHtml(data.email)}</a>` : '—'],
      [s.phone, `<a href="tel:${escapeHtml(data.phone)}" style="color:${BRAND.primary};">${escapeHtml(data.phone)}</a>`],
      [s.preferred_date, escapeHtml(formatDate(data.preferredDate, locale))],
      [s.time_slot, escapeHtml(data.slot || '—')],
      [s.message, escapeHtml(data.message || '').replace(/\n/g, '<br>')],
    ],
    footer: s.appt_admin_footer,
  });
}

export function appointmentConfirmationEmail(data, locale = 'en') {
  const s = S(locale);
  return shellEmail({
    title: s.appt_user_title,
    intro: s.appt_user_intro(escapeHtml(data.fullName)),
    rows: [
      [s.date, escapeHtml(formatDate(data.preferredDate, locale))],
      [s.time, escapeHtml(data.slot || '—')],
      [s.phone, escapeHtml(data.phone)],
      [s.email, escapeHtml(data.email)],
    ],
    footer: s.appt_user_footer,
  });
}

export function contactNotificationEmail(data, locale = 'en') {
  const s = S(locale);
  return shellEmail({
    title: s.contact_admin_title,
    intro: s.contact_admin_intro,
    rows: [
      [s.full_name, escapeHtml(data.fullName)],
      [s.email, data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.primary};">${escapeHtml(data.email)}</a>` : '—'],
      [s.phone, `<a href="tel:${escapeHtml(data.phone)}" style="color:${BRAND.primary};">${escapeHtml(data.phone)}</a>`],
      [s.message, data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : '—'],
    ],
  });
}

export function contactConfirmationEmail(data, locale = 'en') {
  const s = S(locale);
  return shellEmail({
    title: s.contact_user_title,
    intro: s.contact_user_intro(escapeHtml(data.fullName)),
    rows: [[s.your_message, data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : '—']],
    footer: s.contact_user_footer,
  });
}

// Errors that mean "try the fallback transport". Anything else (e.g. auth
// failures, recipient rejected) is surfaced as- is.
const TRANSIENT_CODES = new Set([
  'ECONNRESET',
  'ETIMEDOUT',
  'ESOCKET',
  'ECONNECTION',
  'EDNS',
  'ENOTFOUND',
  'EAI_AGAIN',
]);

function isTransient(err) {
  if (!err) return false;
  return (
    TRANSIENT_CODES.has(err.code) ||
    /timeout|reset|connect/i.test(err.message || '')
  );
}

export async function sendMail({ to, subject, html, replyTo }) {
  const from = `"Dr. Shekari Clinic" <${process.env.SMTP_EMAIL}>`;
  const payload = { from, to, subject, html, ...(replyTo ? { replyTo } : {}) };

  // Try primary, fall back to 587/STARTTLS on transient connection failures.
  try {
    return await getPrimaryTransporter().sendMail(payload);
  } catch (err) {
    if (!isTransient(err)) throw err;
    console.warn(
      `[email] primary transport failed (${err.code || 'unknown'}: ${err.message}); retrying via 587/STARTTLS`
    );
    try {
      return await getFallbackTransporter().sendMail(payload);
    } catch (err2) {
      // Reset cached transporters so the next request rebuilds them - sockets
      // may be in a bad state.
      cache.primary = null;
      cache.fallback = null;
      throw err2;
    }
  }
}
