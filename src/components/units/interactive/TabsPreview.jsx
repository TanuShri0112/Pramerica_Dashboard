import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const TabsPreview = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No tabs configured</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="flex bg-gray-50 border-b">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            variant={activeTab === index ? "default" : "ghost"}
            onClick={() => setActiveTab(index)}
            className="rounded-none border-r last:border-r-0 flex-1"
          >
            {tab.title || `Tab ${index + 1}`}
          </Button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="p-6 bg-white min-h-[200px]">
        {tabs[activeTab]?.image && (
          <img 
            src={tabs[activeTab].image} 
            alt={tabs[activeTab].title}
            className="w-full max-w-md h-48 object-cover rounded mb-4"
          />
        )}
        <p className="text-gray-700 whitespace-pre-wrap">
          {tabs[activeTab]?.description || 'No description set'}
        </p>
      </div>
    </div>
  );
};

export default TabsPreview;