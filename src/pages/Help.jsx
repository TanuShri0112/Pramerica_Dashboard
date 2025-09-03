import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FAQsSection } from '@/components/help/FAQsSection';
import { ContactSupportSection } from '@/components/help/ContactSupportSection';
import { UserGuidesSection } from '@/components/help/UserGuidesSection';
import { SupportTicketSection } from '@/components/help/SupportTicketSection';

const Help = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('faqs');

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'faqs':
        return <FAQsSection />;
      case 'contact':
        return <ContactSupportSection />;
      case 'guides':
        return <UserGuidesSection />;
      case 'ticket':
        return <SupportTicketSection />;
      default:
        return <FAQsSection />;
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Help;