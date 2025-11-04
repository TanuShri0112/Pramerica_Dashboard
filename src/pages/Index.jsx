import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-ca-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">{t.loading}</p>
      </div>
    </div>
  );
};

export default Index;