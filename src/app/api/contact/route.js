import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactMessage from '@/lib/models/ContactMessage';
import { contactSchema } from '@/lib/schemas';
import { sendMail, contactNotificationEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map();

function getClientIp(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  arr.push(now);
  requestLog.set(ip, arr);
  return arr.length > RATE_LIMIT_MAX;
}

function pickLocale(req, body) {
  const localeHeader = (req.headers.get('accept-language') || '').toLowerCase();
  const bodyLocale = (body.locale || '').toLowerCase();
  if (['fa', 'ps', 'en'].includes(bodyLocale)) return bodyLocale;
  if (localeHeader.startsWith('fa')) return 'fa';
  if (localeHeader.startsWith('ps')) return 'ps';
  return 'en';
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] || '_';
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        { ok: false, error: 'Validation failed', fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const locale = pickLocale(req, body);

    // Persist first — message is never lost even if SMTP is down.
    await connectDB();
    const doc = await ContactMessage.create({
      fullName: data.fullName,
      email: data.email || null,
      phone: data.phone,
      message: data.message,
      locale,
      ip,
    });

    // Must await — on serverless (Vercel/Netlify), the function is suspended
    // as soon as the response flushes, killing any in-flight SMTP handshake.
    // Catch internally so a delivery failure still returns ok:true: the
    // message is already persisted in MongoDB and visible to staff.
    await sendContactEmailAsync(doc, data, locale);

    return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 200 });
  } catch (err) {
    console.error('[contact] POST error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

async function sendContactEmailAsync(doc, data, locale) {
  const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_EMAIL;
  const subjects = {
    en: `New Contact Form Message — ${data.fullName}`,
    fa: `پیام جدید از فرم تماس — ${data.fullName}`,
    ps: `د اړیکې فورمې نوی پیغام — ${data.fullName}`,
  };

  try {
    await sendMail({
      to: recipient,
      subject: subjects[locale] || subjects.en,
      html: contactNotificationEmail(data, locale),
      replyTo: data.email || undefined,
    });
    await ContactMessage.findByIdAndUpdate(doc._id, {
      emailDelivery: 'sent',
      emailError: null,
    }).catch(() => {});
  } catch (err) {
    console.error('[contact] email send failed:', err?.code || '', err?.message || err);
    await ContactMessage.findByIdAndUpdate(doc._id, {
      emailDelivery: 'failed',
      emailError: `${err?.code || ''} ${err?.message || ''}`.trim().slice(0, 500),
    }).catch(() => {});
  }
}
