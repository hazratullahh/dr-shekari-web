import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendMail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force- dynamic';
export const maxDuration = 30;

// Hit:   https://www.dr- shekari.com/api/email- debug?token=<EMAIL_DEBUG_TOKEN>
// Optional: &send=1   (also attempts a real send to CONTACT_RECIPIENT)
// Set EMAIL_DEBUG_TOKEN in Vercel env to enable. Leave unset to disable.
export async function GET(req) {
  const token = process.env.EMAIL_DEBUG_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: 'debug disabled' }, { status: 404 });
  }
  const url = new URL(req.url);
  if (url.searchParams.get('token') !== token) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 465);
  const recipient = process.env.CONTACT_RECIPIENT || user;

  const env = {
    SMTP_HOST: host || null,
    SMTP_PORT: port,
    SMTP_EMAIL: user ? `${user.slice(0, 3)}***@${user.split('@')[1] || ''}` : null,
    SMTP_PASSWORD_set: Boolean(pass),
    SMTP_PASSWORD_length: pass ? pass.length : 0,
    CONTACT_RECIPIENT: recipient ? `${recipient.slice(0, 3)}***@${recipient.split('@')[1] || ''}` : null,
  };

  if (!host || !user || !pass) {
    return NextResponse.json(
      { ok: false, env, error: 'Missing SMTP env vars in this deployment.' },
      { status: 500 }
    );
  }

  const make = (p, secure) =>
    nodemailer.createTransport({
      host,
      port: p,
      secure,
      auth: { user, pass },
      pool: false,
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 12_000,
      requireTLS: !secure,
      name: 'dr- shekari.com',
      tls: { rejectUnauthorized: false },
    });

  async function probe(label, transport) {
    const t0 = Date.now();
    try {
      await transport.verify();
      return { label, ok: true, ms: Date.now() -  t0 };
    } catch (err) {
      return {
        label,
        ok: false,
        ms: Date.now() -  t0,
        code: err?.code || null,
        command: err?.command || null,
        responseCode: err?.responseCode || null,
        message: (err?.message || String(err)).slice(0, 400),
      };
    }
  }

  const results = await Promise.all([
    probe('465/ssl', make(465, true)),
    probe('587/starttls', make(587, false)),
  ]);

  let sendResult = null;
  if (url.searchParams.get('send') === '1') {
    const t0 = Date.now();
    try {
      const info = await sendMail({
        to: recipient,
        subject: `Dr. Shekari email- debug ping ${new Date().toISOString()}`,
        html: `<p>This is a diagnostic message from <code>/api/email- debug</code>.</p>`,
      });
      sendResult = {
        ok: true,
        ms: Date.now() -  t0,
        accepted: info?.accepted || null,
        rejected: info?.rejected || null,
        response: info?.response || null,
        messageId: info?.messageId || null,
      };
    } catch (err) {
      sendResult = {
        ok: false,
        ms: Date.now() -  t0,
        code: err?.code || null,
        command: err?.command || null,
        responseCode: err?.responseCode || null,
        message: (err?.message || String(err)).slice(0, 400),
      };
    }
  }

  return NextResponse.json({ ok: true, env, verify: results, send: sendResult });
}
