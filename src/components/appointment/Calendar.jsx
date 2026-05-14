'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer- motion';
import { ChevronLeft, ChevronRight } from 'lucide- react';
import { useTranslations } from 'next- intl';

const MONTH_NAMES_EN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function pad(n) { return String(n).padStart(2, '0'); }
function toDateString(year, month, day) {
  return `${year}- ${pad(month + 1)}- ${pad(day)}`;
}
function todayString() {
  const fmt = new Intl.DateTimeFormat('en- CA', {
    timeZone: 'Asia/Kabul',
    year: 'numeric', month: '2- digit', day: '2- digit',
  });
  return fmt.format(new Date());
}
function buildMonthGrid(year, month) {
  const first = new Date(Date.UTC(year, month, 1));
  const firstWeekday = (first.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const CLOSED_WEEKDAYS = new Set([4]); // Friday

function getLocalizedMonthName(year, month, locale) {
  try {
    return new Intl.DateTimeFormat(localeToBcp47(locale), { month: 'long' }).format(new Date(Date.UTC(year, month, 1)));
  } catch {
    return MONTH_NAMES_EN[month];
  }
}

function localeToBcp47(locale) {
  if (locale === 'fa') return 'fa- AF';
  if (locale === 'ps') return 'ps- AF';
  return 'en- US';
}

export default function Calendar({ value, onChange, maxMonthsAhead = 3, locale = 'en' }) {
  const t = useTranslations('booking');
  const today = todayString();
  const [tY, tM] = today.split('- ').map(Number);

  const initial = value
    ? value.split('- ').slice(0, 2).map(Number)
    : [tY, tM];

  const [view, setView] = useState({ year: initial[0], month: initial[1] -  1 });

  const todayParts = useMemo(() => today.split('- ').map(Number), [today]);
  const minMonth = { year: todayParts[0], month: todayParts[1] -  1 };
  const maxMonthAbs = minMonth.year * 12 + minMonth.month + maxMonthsAhead;
  const viewAbs = view.year * 12 + view.month;
  const minAbs = minMonth.year * 12 + minMonth.month;

  const cells = useMemo(() => buildMonthGrid(view.year, view.month), [view]);

  const weekdayLabels = useMemo(() => {
    try {
      return t.raw('weekdays');
    } catch {
      return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    }
  }, [t]);

  function shift(delta) {
    setView((v) => {
      const abs = v.year * 12 + v.month + delta;
      if (abs < minAbs || abs > maxMonthAbs) return v;
      return { year: Math.floor(abs / 12), month: abs % 12 };
    });
  }

  const monthLabel = getLocalizedMonthName(view.year, view.month, locale);

  return (
    <div className="rounded- 2xl border border- gray- 100 bg- white p- 4 md:p- 5">
      <div className="flex items- center justify- between mb- 4">
        <button
          type="button"
          onClick={() => shift(- 1)}
          disabled={viewAbs <= minAbs}
          aria- label={t('prev_month')}
          className="cursor- pointer w- 9 h- 9 rounded- lg border border- gray- 200 text- gray- 600 inline- flex items- center justify- center hover:bg- gray- 50 hover:border- [#E9756D]/40 hover:text- [#E9756D] disabled:opacity- 40 disabled:cursor- not- allowed transition- colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text- center">
          <div className="text- sm font- semibold text- gray- 900">
            {monthLabel} {view.year}
          </div>
          <div className="text- [11px] text- gray- 500">{t('select_preferred_date')}</div>
        </div>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={viewAbs >= maxMonthAbs}
          aria- label={t('next_month')}
          className="cursor- pointer w- 9 h- 9 rounded- lg border border- gray- 200 text- gray- 600 inline- flex items- center justify- center hover:bg- gray- 50 hover:border- [#E9756D]/40 hover:text- [#E9756D] disabled:opacity- 40 disabled:cursor- not- allowed transition- colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid- cols- 7 gap- 1 mb- 1">
        {weekdayLabels.map((d, i) => (
          <div
            key={i}
            className={`text- center text- [11px] font- semibold uppercase tracking- wider py- 1.5 ${
              CLOSED_WEEKDAYS.has(i) ? 'text- rose- 400' : 'text- gray- 500'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid- cols- 7 gap- 1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} className="aspect- square" />;
          const ds = toDateString(view.year, view.month, day);
          const isPast = ds < today;
          const weekdayIdx = idx % 7;
          const isClosed = CLOSED_WEEKDAYS.has(weekdayIdx);
          const isToday = ds === today;
          const selected = ds === value;
          const disabled = isPast || isClosed;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(ds)}
              aria- pressed={selected}
              className={`aspect- square relative ${disabled ? 'cursor- not- allowed' : 'cursor- pointer'}`}
            >
              <div
                className={[
                  'w- full h- full rounded- xl flex items- center justify- center text- sm font- medium transition- all relative',
                  selected
                    ? 'bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white shadow- md shadow- [#E9756D]/30 scale- [1.04]'
                    : disabled
                    ? isClosed
                      ? 'bg- rose- 50/40 text- rose- 300 cursor- not- allowed line- through decoration- rose- 200'
                      : 'text- gray- 300 cursor- not- allowed'
                    : 'bg- white text- gray- 700 border border- gray- 100 hover:border- [#E9756D]/40 hover:bg- [#E9756D]/5 hover:text- [#E9756D]',
                  isToday && !selected ? 'ring- 2 ring- [#E9756D]/40 ring- offset- 1' : '',
                ].join(' ')}
              >
                {day}
                {selected && (
                  <motion.div
                    layoutId="cal- selected"
                    className="absolute inset- 0 rounded- xl pointer- events- none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt- 4 pt- 4 border- t border- gray- 100 flex flex- wrap items- center gap- x- 5 gap- y- 2 text- [11px] text- gray- 500">
        <Legend className="bg- linear- to- br from- [#E9756D] to- [#F6CA97]">{t('selected')}</Legend>
        <Legend className="bg- white border border- gray- 200">{t('available')}</Legend>
        <Legend className="bg- rose- 50 border border- rose- 100" textClass="text- rose- 400">{t('closed_friday')}</Legend>
        <Legend ring>{t('today')}</Legend>
      </div>
    </div>
  );
}

function Legend({ children, className = '', textClass = '', ring = false }) {
  return (
    <span className="inline- flex items- center gap- 1.5">
      <span className={`w- 3.5 h- 3.5 rounded ${className} ${ring ? 'ring- 2 ring- [#E9756D]/40 ring- offset- 1' : ''}`} />
      <span className={textClass || 'text- gray- 600'}>{children}</span>
    </span>
  );
}
