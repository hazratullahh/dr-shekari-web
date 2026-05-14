import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Appointment from '@/lib/models/Appointment';
import {
  generateSlots,
  isClosedDay,
  isPastDate,
  isPastSlot,
  isValidDateString,
  clinicToday,
} from '@/lib/slots';

export const runtime = 'nodejs';
export const dynamic = 'force- dynamic';

function shape(date, { closed, slots }) {
  return {
    ok: true,
    date,
    closed,
    today: clinicToday(),
    slots,
  };
}

export async function GET(req) {
  const url = new URL(req.url);
  const date = url.searchParams.get('date');

  if (!isValidDateString(date)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid or missing date (expected YYYY- MM- DD)', code: 'BAD_DATE' },
      { status: 400 }
    );
  }

  // Closed days short- circuit before any DB call.
  if (isClosedDay(date)) {
    return NextResponse.json(shape(date, { closed: true, slots: [] }));
  }

  const all = generateSlots(date);

  // Past dates: no DB call needed - every slot is unavailable.
  if (isPastDate(date)) {
    const slots = all.map((slot) => ({ slot, available: false, reserved: false, past: true }));
    return NextResponse.json(shape(date, { closed: false, slots }));
  }

  // Future / today: query Mongo. If the DB is unreachable, degrade gracefully —
  // return slots as all- available so the user can still pick a time, and the
  // POST will catch any duplicate slot via its unique index.
  let reservedSet = new Set();
  let dbError = null;
  try {
    await connectDB();
    const docs = await Appointment.find(
      { preferredDate: date, status: { $in: ['pending', 'confirmed'] } },
      { slot: 1, _id: 0 }
    ).lean();
    reservedSet = new Set(docs.map((d) => d.slot));
  } catch (err) {
    dbError = err;
    console.error('[appointment/slots] Mongo query failed:', {
      message: err?.message,
      code: err?.code,
      name: err?.name,
      date,
    });
  }

  const slots = all.map((slot) => {
    const past = isPastSlot(date, slot);
    const taken = reservedSet.has(slot);
    return {
      slot,
      available: !past && !taken,
      reserved: taken,
      past,
    };
  });

  const body = shape(date, { closed: false, slots });
  if (dbError) {
    body.degraded = true;
    body.warning = 'Live availability is temporarily unavailable. The slot is verified at booking time.';
  }
  return NextResponse.json(body);
}
