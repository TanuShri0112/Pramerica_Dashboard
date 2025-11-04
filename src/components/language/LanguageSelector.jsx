import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative h-9 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      aria-label="Toggle Language"
    >
      {/* Sliding indicator */}
      <div 
        className={`absolute top-0.5 h-8 w-8 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out flex items-center justify-center ${
          language === 'en' ? 'left-0.5' : 'left-[calc(100%-2.25rem)]'
        }`}
      >
        <span className="text-base font-bold">
          {language === 'en' ? '🇺🇸' : '🇧🇷'}
        </span>
      </div>
      
      {/* Language labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-semibold text-white pointer-events-none">
        <span className={`transition-opacity duration-200 ${language === 'en' ? 'opacity-0' : 'opacity-100'}`}>
          EN
        </span>
        <span className={`transition-opacity duration-200 ${language === 'pt' ? 'opacity-0' : 'opacity-100'}`}>
          PT
        </span>
      </div>
    </button>
  );
};

