'use client';

import { AnimatePresence, motion } from 'framer- motion';
import { WifiOff } from 'lucide- react';
import { useTranslations } from 'next- intl';
import { useOnlineStatus } from '@/lib/hooks/usePWA';

export default function OfflineBanner() {
  const t = useTranslations('pwa');
  const online = useOnlineStatus();

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ y: - 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: - 40, opacity: 0 }}
          className="fixed top- 0 inset- x- 0 z- 100 bg- gray- 900 text- white text- xs"
          role="status"
          style={{ paddingTop: 'env(safe- area- inset- top, 0px)' }}
        >
          <div className="px- 4 py- 2 flex items- center justify- center gap- 2">
            <WifiOff size={14} />
            <span>{t('offline_banner')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
