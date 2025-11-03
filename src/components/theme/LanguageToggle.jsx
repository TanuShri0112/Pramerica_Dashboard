import React from 'react';
import { useI18n, supportedLocales } from '@/contexts/I18nContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const labels = {
  en: 'EN',
  ru: 'RU',
  uz: 'UZ',
};

export const LanguageToggle = () => {
  const { locale, setLocale, t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('language')}>
          <span className="text-xs font-semibold">{labels[locale] || 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {supportedLocales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => setLocale(loc)} className={loc === locale ? 'font-semibold' : ''}>
            {loc === 'en' ? t('english') : loc === 'ru' ? t('russian') : t('uzbek')}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;


