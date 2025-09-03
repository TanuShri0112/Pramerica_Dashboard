import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQsSection = () => {
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
      title: 'General Questions',
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];

  const faqItems = {
    general: [
      {
        id: 'general-1',
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.'
      },
      {
        id: 'general-2',
        question: 'How do I update my profile information?',
        answer: 'You can update your profile information by clicking on your profile picture in the top right corner and selecting "Edit Profile".'
      },
      {
        id: 'general-3',
        question: 'What are the system requirements?',
        answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. Make sure you have JavaScript enabled.'
      },
      {
        id: 'general-4',
        question: 'How do I contact support?',
        answer: 'You can contact our support team through the Contact Support page or by emailing support@example.com'
      },
      {
        id: 'general-5',
        question: 'Is there a mobile app available?',
        answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.'
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions about our platform
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