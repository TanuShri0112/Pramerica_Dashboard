import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/contexts/I18nContext';

const HelpSystemStatus = () => {
  const { t } = useI18n();
  const uptime = '99.9%';
  const backups = 'Daily at 02:00 UTC';
  const lastBackup = new Date().toISOString();

  const triggerSync = () => {
    const evt = new CustomEvent('sync-status', { detail: 'start' });
    window.dispatchEvent(evt);
    setTimeout(() => {
      const endEvt = new CustomEvent('sync-status', { detail: 'end' });
      window.dispatchEvent(endEvt);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between"><span>Uptime</span><span className="font-medium">{uptime}</span></div>
          <div className="flex items-center justify-between"><span>Backups</span><span className="font-medium">{backups}</span></div>
          <div className="flex items-center justify-between"><span>Last Backup</span><span className="font-medium">{new Date(lastBackup).toLocaleString()}</span></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offline & Sync</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">Simulate a manual sync to test offline indicators.</p>
          <Button onClick={triggerSync}>{t('syncing')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSystemStatus;


