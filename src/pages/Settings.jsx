import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const Settings = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={t.settings} 
        description="Manage your application settings"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-ca-primary" />
              {t.generalSettings}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">{t.platformName}</Label>
              <Input id="siteName" defaultValue="Municipio De Conselheiro Mairinck" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Platform URL</Label>
              <Input id="siteUrl" defaultValue="https://creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">{t.supportEmail}</Label>
              <Input id="supportEmail" type="email" defaultValue="support@creditoracademy.com" />
            </div>
            <Button>{t.save}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.emailSettings}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">{t.fromEmail}</Label>
              <Input id="fromEmail" type="email" defaultValue="no-reply@creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailFooter">{t.emailFooter}</Label>
              <Input id="emailFooter" defaultValue="© 2025 Municipio De Conselheiro Mairinck. All rights reserved." />
            </div>
            <Button>{t.updateEmailSettings}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;