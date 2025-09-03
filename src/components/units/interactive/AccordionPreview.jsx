import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export const AccordionPreview = ({ sections }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No accordion sections configured</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <Collapsible
          key={index}
          open={openSections[index]}
          onOpenChange={() => toggleSection(index)}
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors">
              <span className="font-medium text-left">
                {section.title || `Section ${index + 1}`}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections[index] ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 bg-white border border-t-0 rounded-b-lg space-y-4">
              {section.content && (
                <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
              )}

              {section.image && (
                <div>
                  <img
                    src={section.image}
                    alt="Section content"
                    className="w-full max-w-md h-auto rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {section.video && (
                <div>
                  <video
                    src={section.video}
                    controls
                    className="w-full max-w-md h-auto rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {!section.content && !section.image && !section.video && (
                <p className="text-gray-500 italic">No content set</p>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
 );
};

export default AccordionPreview;
