import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Appointment from '@/lib/models/Appointment';
import { appointmentSchema } from '@/lib/schemas';
import {
  generateSlots,
  isClosedDay,
  isPastSlot,
} from '@/lib/slots';
import { sendMail, appointmentNotificationEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force- dynamic';
export const maxDuration = 30;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map();

function getClientIp(req) {
  return (
    req.headers.get('x- forwarded- for')?.split(',')[0]?.trim() ||
    req.headers.get('x- real- ip') ||
    'unknown'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (requestLog.get(ip) || []).filter((t) => now -  t < RATE_LIMIT_WINDOW_MS);
  arr.push(now);
  requestLog.set(ip, arr);
  return arr.length > RATE_LIMIT_MAX;
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

    const parsed = appointmentSchema.safeParse(body);
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
    const localeHeader = (req.headers.get('accept- language') || '').toLowerCase();
    const bodyLocale = (body.locale || '').toLowerCase();
    const locale = ['fa', 'ps', 'en'].includes(bodyLocale)
      ? bodyLocale
      : localeHeader.startsWith('fa')
      ? 'fa'
      : localeHeader.startsWith('ps')
      ? 'ps'
      : 'en';

    if (isClosedDay(data.preferredDate)) {
      return NextResponse.json(
        { ok: false, error: 'The clinic is closed on this day. Please pick another date.' },
        { status: 422 }
      );
    }
    if (!generateSlots(data.preferredDate).includes(data.slot)) {
      return NextResponse.json(
        { ok: false, error: 'Selected time slot is not part of clinic hours.' },
        { status: 422 }
      );
    }
    if (isPastSlot(data.preferredDate, data.slot)) {
      return NextResponse.json(
        { ok: false, error: 'Selected time slot is in the past.' },
        { status: 422 }
      );
    }

    await connectDB();

    let doc;
    try {
      doc = await Appointment.create({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        preferredDate: data.preferredDate,
        slot: data.slot,
        message: data.message || '',
      });
    } catch (err) {
      // E11000 - duplicate key from the unique partial index → slot already booked.
      if (err && err.code === 11000) {
        return NextResponse.json(
          {
            ok: false,
            error: 'Sorry, this time slot was just taken. Please pick another one.',
            code: 'SLOT_TAKEN',
          },
          { status: 409 }
        );
      }
      throw err;
    }

    // Notify clinic staff only - the patient gets an auto- downloaded PNG card
    // on the success screen instead of an email confirmation.
    const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_EMAIL;
    const adminSubjects = {
      en: `New Appointment Request - ${data.fullName} (${data.preferredDate} ${data.slot})`,
      fa: `درخواست جدید وقت ملاقات - ${data.fullName} (${data.preferredDate} ${data.slot})`,
      ps: `د ملاقات نوې غوښتنه - ${data.fullName} (${data.preferredDate} ${data.slot})`,
    };

    // Must await - on serverless the function is suspended as soon as the
    // response flushes, killing any in- flight SMTP handshake. Slot is already
    // persisted, so swallow SMTP errors and still return ok.
    try {
      await sendMail({
        to: recipient,
        subject: adminSubjects[locale] || adminSubjects.en,
        html: appointmentNotificationEmail(data, locale),
        ...(data.email ? { replyTo: data.email } : {}),
      });
    } catch (err) {
      console.error('[appointment] admin notification failed:',
        err?.code || '', err?.message || err);
    }

    return NextResponse.json(
      { ok: true, id: String(doc._id), preferredDate: data.preferredDate, slot: data.slot },
      { status: 201 }
    );
  } catch (err) {
    console.error('[appointment] POST error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
