'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer- motion';
import { Download, X, Smartphone, Share, Plus, ArrowDown } from 'lucide- react';
import { useTranslations } from 'next- intl';
import { useIsIOS, useStandalone } from '@/lib/hooks/usePWA';

const DISMISS_KEY = 'pwa- install- dismissed- at';
const DISMISS_TTL_DAYS = 14;

function isDismissed() {
  if (typeof window === 'undefined') return false;
  try {
    const v = localStorage.getItem(DISMISS_KEY);
    if (!v) return false;
    const ts = Number(v);
    if (!Number.isFinite(ts)) return false;
    return Date.now() -  ts < DISMISS_TTL_DAYS * 86400_000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
}

export default function InstallPrompt() {
  const t = useTranslations('pwa');
  const standalone = useStandalone();
  const isIOS = useIsIOS();

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [showIOSSheet, setShowIOSSheet] = useState(false);

  useEffect(() => {
    if (standalone) return;
    if (isDismissed()) return;

    let timeoutId;

    const onBefore = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      timeoutId = setTimeout(() => setShow(true), 4000);
    };

    const onInstalled = () => {
      setShow(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBefore);
    window.addEventListener('appinstalled', onInstalled);

    if (isIOS) {
      timeoutId = setTimeout(() => setShow(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBefore);
      window.removeEventListener('appinstalled', onInstalled);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [standalone, isIOS]);

  if (standalone) return null;

  const onInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch {}
      setDeferredPrompt(null);
      setShow(false);
    } else if (isIOS) {
      setShowIOSSheet(true);
    }
  };

  const onClose = () => {
    setShow(false);
    markDismissed();
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="banner"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed start- 3 end- 3 lg:end- 6 lg:start- auto lg:max- w- sm z- 50"
            style={{ bottom: 'calc(env(safe- area- inset- bottom, 0px) + 76px)' }}
            role="dialog"
            aria- labelledby="pwa- install- title"
          >
            <div className="rounded- 2xl bg- white shadow- [0_20px_60px_- 12px_rgba(0,0,0,0.25)] border border- gray- 100 overflow- hidden">
              <div className="flex items- start gap- 3 p- 4">
                <div className="w- 12 h- 12 rounded- xl bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white flex items- center justify- center shadow- md shrink- 0">
                  <Smartphone size={22} />
                </div>
                <div className="flex- 1 min- w- 0">
                  <h3 id="pwa- install- title" className="text- sm font- bold text- gray- 900">{t('install_title')}</h3>
                  <p className="text- xs text- gray- 600 mt- 0.5 leading- snug">{t('install_body')}</p>
                  <div className="mt- 3 flex items- center gap- 2">
                    <button
                      type="button"
                      onClick={onInstall}
                      className="inline- flex items- center gap- 1.5 px- 3 py- 2 rounded- lg bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white text- xs font- semibold shadow- md shadow- [#E9756D]/25 hover:scale- [1.02] active:scale- [0.98] transition- all"
                    >
                      <Download size={13} />
                      {isIOS ? t('install_btn_ios') : t('install_btn_android')}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px- 3 py- 2 rounded- lg text- xs font- semibold text- gray- 500 hover:text- gray- 800 transition- colors"
                    >
                      {t('not_now')}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria- label={t('close')}
                  onClick={onClose}
                  className="w- 8 h- 8 rounded- full text- gray- 400 hover:text- gray- 700 hover:bg- gray- 100 inline- flex items- center justify- center"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <IOSInstallSheet open={showIOSSheet} onClose={() => setShowIOSSheet(false)} t={t} />
    </>
  );
}

function IOSInstallSheet({ open, onClose, t }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset- 0 z- 50 flex items- end justify- center" role="dialog" aria- modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset- 0 bg- black/50 backdrop- blur- sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative w- full max- w- md bg- white rounded- t- 3xl p- 6 pb- 8"
            style={{ paddingBottom: 'calc(env(safe- area- inset- bottom, 0px) + 24px)' }}
          >
            <div className="mx- auto w- 12 h- 1.5 rounded- full bg- gray- 200 mb- 5" />
            <div className="flex items- start justify- between gap- 3 mb- 5">
              <div>
                <h3 className="text- lg font- bold text- gray- 900">{t('ios_sheet_title')}</h3>
                <p className="text- sm text- gray- 500 mt- 0.5">{t('ios_sheet_subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria- label={t('close')}
                className="w- 9 h- 9 rounded- full text- gray- 500 hover:bg- gray- 100 inline- flex items- center justify- center"
              >
                <X size={18} />
              </button>
            </div>

            <ol className="space- y- 3">
              <Step n={1} icon={Share}>
                {t('ios_step_1_pre')} <strong>{t('ios_share')}</strong> {t('ios_step_1_post')}
              </Step>
              <Step n={2} icon={Plus}>
                {t('ios_step_2_pre')} <strong>{t('ios_add_to_home')}</strong> {t('ios_step_2_post')}
              </Step>
            </ol>

            <div className="mt- 6 p- 3 rounded- xl bg- [#FDF5EE] border border- [#F6CA97]/40 text- xs text- gray- 700 flex gap- 2">
              <ArrowDown size={14} className="text- [#E9756D] shrink- 0 mt- 0.5" />
              <span>{t('ios_hint')}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Step({ n, icon: Icon, children }) {
  return (
    <li className="flex items- start gap- 3 p- 3 rounded- xl bg- [#FDF5EE]/60 border border- gray- 100">
      <span className="w- 7 h- 7 rounded- full bg- linear- to- br from- [#E9756D] to- [#F6CA97] text- white text- xs font- bold flex items- center justify- center shrink- 0">
        {n}
      </span>
      <div className="flex items- center gap- 2 text- sm text- gray- 800">
        <Icon size={16} className="text- [#E9756D]" />
        <span>{children}</span>
      </div>
    </li>
  );
}
