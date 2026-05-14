'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer- motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, MapPin, ChevronRight, ChevronLeft } from 'lucide- react';
import LocaleSwitcher from './LocaleSwitcher';
import { useLocale, useTranslations } from 'next- intl';
import { useStandalone } from '@/lib/hooks/usePWA';

const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ps';
  const standalone = useStandalone();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: t('header.home'), href: '/', exact: true },
    { label: t('header.about'), href: '/about' },
    { label: t('header.services'), href: '/services' },
    { label: t('header.research'), href: '/research' },
    { label: t('header.team'), href: '/team' },
    { label: t('header.contact'), href: '/contact' },
  ];

  const stripLocale = (path) => path.replace(/^\/(en|fa|ps)(?=\/|$)/, '') || '/';
  const isActive = (href, exact = false) => {
    const current = stripLocale(pathname);
    if (exact) return current === href;
    return current.startsWith(href);
  };

  // In standalone PWA mode, BottomTabBar handles all primary nav, so we
  // collapse the desktop- style links and CTA on mobile and skip the utility strip.
  const compactMobile = standalone;

  return (
    <>
      {/* Top utility bar - desktop only; hidden in standalone for an app- shell feel */}
      <div className={`${standalone ? 'hidden' : 'hidden md:block'} bg- [#E9756D] text- white text- xs`}>
        <div className="max- w- 7xl mx- auto px- 6 h- 9 flex items- center justify- between">
          <div className="flex items- center gap- 5">
            <span className="inline- flex items- center gap- 1.5">
              <MapPin size={13} className="opacity- 80" />
              <span className="opacity- 90">{t('header.hospital_name')}</span>
            </span>
            <span className="opacity- 60">·</span>
            <span className="opacity- 90">{t('contact.regular_hours')}</span>
          </div>
          <a href="tel:+93796040915" dir="ltr" className="inline- flex items- center gap- 1.5 font- semibold hover:text- [#F6CA97] transition- colors">
            <Phone size={13} />
            {t('header.emergency')}: +93 79 604 0915
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top- 0 z- 40 w- full transition- all duration- 300 ${
          isScrolled
            ? 'bg- white/95 backdrop- blur- lg shadow- [0_4px_24px_- 12px_rgba(233,117,109,0.18)] border- b border- gray- 100'
            : 'bg- white/85 backdrop- blur- md border- b border- transparent'
        }`}
        style={{ paddingTop: standalone ? 'env(safe- area- inset- top, 0px)' : undefined }}
      >
        <div className="max- w- 7xl mx- auto px- 4 md:px- 6">
          <div className={`flex items- center justify- between gap- 4 transition- all duration- 300 ${isScrolled ? 'h- 16' : 'h- 20'}`}>
            {/* Logo + identity */}
            <Link href="/" className="flex items- center gap- 3 shrink- 0 group" aria- label="Dr. Shekari home">
              <div className="relative w- 11 h- 11 md:w- 12 md:h- 12 rounded- xl bg- linear- to- br from- [#E9756D] to- [#F6CA97] flex items- center justify- center shadow- md shadow- [#E9756D]/20 overflow- hidden">
                <Image
                  src="/logo.png"
                  alt="Dr. Shekari logo"
                  width={48}
                  height={48}
                  className="object- contain p- 1.5"
                  priority
                />
              </div>
              <div className="leading- tight">
                <div className="text- [15px] md:text- [16px] font- bold text- gray- 900 tracking- tight">
                  {t('home.dr_name')}
                </div>
                <div className="text- [11px] md:text- [12px] font- medium text- [#E9756D] hidden sm:block">
                  {t('home.slogan')}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items- center gap- 1" aria- label="Primary">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px- 3.5 py- 2 text- sm font- medium rounded- lg transition- colors ${
                      active
                        ? 'text- [#E9756D]'
                        : 'text- gray- 700 hover:text- [#E9756D]'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav- active"
                        className="absolute inset- x- 2 - bottom- 0.5 h- 0.5 rounded- full bg- linear- to- r from- [#E9756D] to- [#F6CA97]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items- center gap- 2 md:gap- 3 shrink- 0">
              <div className="hidden md:block">
                <LocaleSwitcher />
              </div>

              <Link
                href="/appointment"
                className={`${
                  compactMobile
                    ? 'hidden lg:inline- flex'
                    : 'hidden sm:inline- flex'
                } items- center gap- 2 px- 4 md:px- 5 py- 2.5 rounded- xl bg- linear- to- r from- [#E9756D] to- [#F6CA97] text- white text- sm font- semibold shadow- md shadow- [#E9756D]/25 hover:shadow- lg hover:shadow- [#E9756D]/35 hover:scale- [1.02] active:scale- [0.98] transition- all`}
              >
                <Calendar size={16} />
                <span>{t('home.book_appointment')}</span>
              </Link>

              {!compactMobile && (
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  aria- label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria- expanded={isMobileMenuOpen}
                  className="lg:hidden inline- flex w- 10 h- 10 items- center justify- center rounded- xl bg- [#E9756D]/10 text- [#E9756D] hover:bg- [#E9756D]/15 transition- colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: - 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: - 8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden absolute inset- x- 0 top- full bg- white border- b border- gray- 100 shadow- lg"
            >
              <div className="max- w- 7xl mx- auto px- 4 py- 4">
                <nav className="flex flex- col" aria- label="Mobile primary">
                  {navItems.map((item) => {
                    const active = isActive(item.href, item.exact);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items- center justify- between px- 3 py- 3 rounded- xl text- [15px] font- medium transition- colors ${
                          active
                            ? 'bg- [#E9756D]/10 text- [#E9756D]'
                            : 'text- gray- 800 hover:bg- gray- 50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={16} className={`opacity- 40 ${isRTL ? 'rotate- 180' : ''}`} />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt- 4 pt- 4 border- t border- gray- 100 flex flex- col gap- 3">
                  <div className="flex items- center justify- between gap- 3">
                    <LocaleSwitcher />
                    <a
                      href="tel:+93796040915"
                      dir="ltr"
                      className="inline- flex items- center gap- 2 px- 3 py- 2 rounded- lg bg- [#E9756D]/10 text- [#E9756D] text- sm font- semibold"
                    >
                      <Phone size={14} /> +93 79 604 0915
                    </a>
                  </div>

                  <Link
                    href="/appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline- flex items- center justify- center gap- 2 w- full py- 3 rounded- xl bg- linear- to- r from- [#E9756D] to- [#F6CA97] text- white text- sm font- semibold shadow- md shadow- [#E9756D]/25"
                  >
                    <Calendar size={16} />
                    {t('home.book_appointment')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
