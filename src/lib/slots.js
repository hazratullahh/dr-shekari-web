// Clinic business hours and slot generation.
// Uses Asia/Kabul as the canonical clinic timezone so the booking grid
// matches what patients see on the ground regardless of where the page renders.

export const CLINIC_TIMEZONE = 'Asia/Kabul';

// 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday.
// In Afghanistan the weekend is Friday — clinic closed.
const CLOSED_DAYS = new Set([5]);

const SLOT_INTERVAL_MIN = 30;
const SLOT_DURATION_MIN = 30;

// Default workday window, may be overridden per weekday.
const DEFAULT_WINDOW = { start: '09:00', end: '17:00' };

const DAY_WINDOWS = {
  // Sunday: shorter morning window
  0: { start: '09:00', end: '13:30' },
  6: { start: '09:00', end: '17:00' },
};

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const SLOT_REGEX = /^\d{2}:\d{2}$/;

export function isValidDateString(s) {
  if (typeof s !== 'string' || !DATE_REGEX.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export function isValidSlotString(s) {
  if (typeof s !== 'string' || !SLOT_REGEX.test(s)) return false;
  const [h, m] = s.split(':').map(Number);
  return h >= 0 && h < 24 && m >= 0 && m < 60;
}

function dayOfWeek(dateString) {
  const [y, m, d] = dateString.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function isClosedDay(dateString) {
  return CLOSED_DAYS.has(dayOfWeek(dateString));
}

// Generate every slot the clinic offers on this day, regardless of bookings.
export function generateSlots(dateString) {
  if (!isValidDateString(dateString) || isClosedDay(dateString)) return [];

  const dow = dayOfWeek(dateString);
  const window = DAY_WINDOWS[dow] || DEFAULT_WINDOW;
  const startMin = timeToMinutes(window.start);
  const endMin = timeToMinutes(window.end);

  const out = [];
  for (let m = startMin; m + SLOT_DURATION_MIN <= endMin; m += SLOT_INTERVAL_MIN) {
    out.push(minutesToTime(m));
  }
  return out;
}

// Today as YYYY-MM-DD in clinic timezone.
export function clinicToday() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(new Date());
}

// Current HH:MM in clinic timezone.
export function clinicNowTime() {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: CLINIC_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return fmt.format(new Date()).replace(/‎/g, '');
}

export function isPastDate(dateString) {
  return dateString < clinicToday();
}

// Slot is in the past if the date is today and the slot start is <= now.
export function isPastSlot(dateString, slot) {
  if (dateString < clinicToday()) return true;
  if (dateString > clinicToday()) return false;
  return slot <= clinicNowTime();
}

// Window summary for a date — start/end + count, useful for the calendar tooltip.
export function summarizeDay(dateString) {
  if (isClosedDay(dateString)) return { closed: true, slots: 0 };
  const slots = generateSlots(dateString);
  return { closed: false, slots: slots.length, window: DAY_WINDOWS[dayOfWeek(dateString)] || DEFAULT_WINDOW };
}
