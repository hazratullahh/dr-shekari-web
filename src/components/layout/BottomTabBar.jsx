'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer- motion';
import { Home, Stethoscope, CalendarPlus, BookOpen, Phone } from 'lucide- react';
import { useTranslations } from 'next- intl';

function stripLocale(path) {
  return path.replace(/^\/(en|fa|ps)(?=\/|$)/, '') || '/';
}

export default function BottomTabBar() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const current = stripLocale(pathname);

  useEffect(() => {
    document.documentElement.classList.add('has- bottom- tabs');
    return () => document.documentElement.classList.remove('has- bottom- tabs');
  }, []);

  const tabs = [
    { id: 'home', label: t('home'), href: '/', icon: Home, exact: true },
    { id: 'services', label: t('services'), href: '/services', icon: Stethoscope },
    { id: 'book', label: t('appointment'), href: '/appointment', icon: CalendarPlus, primary: true },
    { id: 'research', label: t('research'), href: '/research', icon: BookOpen },
    { id: 'contact', label: t('contact'), href: '/contact', icon: Phone },
  ];

  const isActive = (tab) => {
    if (tab.exact) return current === tab.href;
    return current.startsWith(tab.href);
  };

  return (
    <nav
      className="lg:hidden fixed inset- x- 0 bottom- 0 z- 40 border- t border- gray- 200 bg- white/95 backdrop- blur- xl"
      style={{ paddingBottom: 'max(env(safe- area- inset- bottom, 0px), 0px)' }}
      aria- label="Primary mobile navigation"
    >
      <ul className="grid grid- cols- 5 max- w- 2xl mx- auto">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const Icon = tab.icon;

          if (tab.primary) {
            return (
              <li key={tab.id} className="relative">
                <Link
                  href={tab.href}
                  aria- label={tab.label}
                  aria- current={active ? 'page' : undefined}
                  className="w- full h- full flex flex- col items- center justify- center pt- 2 pb- 2 select- none"
                >
                  <span className="relative - mt- 7 flex items- center justify- center w- 14 h- 14 rounded- full bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white shadow- lg shadow- [#E9756D]/35 ring- 4 ring- white">
                    <Icon size={22} />
                  </span>
                  <span className="text- [10px] font- semibold mt- 1 text- [#E9756D]">
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={tab.id} className="relative">
              <Link
                href={tab.href}
                aria- current={active ? 'page' : undefined}
                className={`flex flex- col items- center justify- center gap- 0.5 pt- 2.5 pb- 2 select- none transition- colors ${
                  active ? 'text- [#E9756D]' : 'text- gray- 500 active:text- [#E9756D]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bottom- tab- pill"
                    className="absolute top- 0 inset- x- 6 h- 0.5 rounded- full bg- linear- to- r from- [#E9756D] to- [#F6CA97]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={20} className={active ? '' : ''} />
                <span className="text- [10px] font- semibold leading- tight">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
