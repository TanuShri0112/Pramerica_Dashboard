import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';

export const FAQsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: 'general',
      title: t.generalQuestions,
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];

  const faqItems = {
    general: [
      {
        id: 'general-1',
        question: t.howResetPassword,
        answer: t.howResetPasswordAnswer
      },
      {
        id: 'general-2',
        question: t.howUpdateProfile,
        answer: t.howUpdateProfileAnswer
      },
      {
        id: 'general-3',
        question: t.systemRequirements,
        answer: t.systemRequirementsAnswer
      },
      {
        id: 'general-4',
        question: t.howContactSupport,
        answer: t.howContactSupportAnswer
      },
      {
        id: 'general-5',
        question: t.mobileAppAvailable,
        answer: t.mobileAppAnswer
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t.frequentlyAskedQuestions}</h2>
        <p className="text-muted-foreground mt-2">
          {t.faqsDescription}
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {faqCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader 
              className={`bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors ${
                activeCategory === category.id ? 'border-b' : ''
              }`}
              onClick={() => setActiveCategory(activeCategory === category.id ? '' : category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <CardTitle>{category.title}</CardTitle>
                </div>
                {activeCategory === category.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            
            {activeCategory === category.id && (
              <CardContent className="p-0">
                <div className="divide-y">
                  {faqItems[category.id]?.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-muted/30 transition-colors">
                      <button
                        className="flex items-center justify-between w-full text-left"
                        onClick={() => toggleItem(item.id)}
                      >
                        <h3 className="font-medium">{item.question}</h3>
                        {expandedItems[item.id] ? (
                          <ChevronUp className="h-5 w-5 ml-4 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 ml-4 flex-shrink-0" />
                        )}
                      </button>
                      {expandedItems[item.id] && (
                        <div className="mt-2 text-muted-foreground">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;