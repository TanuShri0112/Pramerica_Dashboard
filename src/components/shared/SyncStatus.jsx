import React, { useEffect, useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';

export const SyncStatus = () => {
  const { t } = useI18n();
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(() => {
    try { return localStorage.getItem('lastSyncAt') || ''; } catch { return ''; }
  });

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'start') setIsSyncing(true);
      if (e.detail === 'end') {
        setIsSyncing(false);
        const ts = new Date().toISOString();
        setLastSync(ts);
        try { localStorage.setItem('lastSyncAt', ts); } catch {}
      }
    };
    window.addEventListener('sync-status', handler);
    return () => window.removeEventListener('sync-status', handler);
  }, []);

  const statusText = !isOnline ? t('offline') : isSyncing ? t('syncing') : t('online');

  const color = !isOnline ? 'bg-red-500' : isSyncing ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
      <span>{statusText}</span>
      {lastSync && <span className="text-gray-400">· {t('lastSync')}: {new Date(lastSync).toLocaleString()}</span>}
    </div>
  );
};

export default SyncStatus;


