import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PillTabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Plus, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Surveys = () => {
  const [activeTab, setActiveTab] = useState("catalog");

  // Sample data for surveys
  const surveys = [
    {
      id: '1',
      title: 'sample survey',
      createdAt: new Date('2025-04-07'),
      description: 'just to test',
      thumbnail: '/lovable-uploads/926858f6-3201-44d2-80fa-8bbc21bd5a72.png',
    },
    {
      id: '2',
      title: 'sample survey',
      createdAt: new Date('2025-04-22'),
      description: 'sample',
      thumbnail: '/lovable-uploads/926858f6-3201-44d2-80fa-8bbc21bd5a72.png',
    },
  ];

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <PageHeader title="Surveys" description="Manage surveys and questionnaires" />
        <Button onClick={() => console.log('Add survey clicked')} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="catalog" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-md">
              <PillTabsTrigger value="catalog">Catalog</PillTabsTrigger>
              <PillTabsTrigger value="history">History</PillTabsTrigger>
              <PillTabsTrigger value="scheduled">Scheduled</PillTabsTrigger>
            </TabsList>
            
            <TabsContent value="catalog" className="mt-6">
              <div className="space-y-4">
                {surveys.map((survey) => (
                  <Card key={survey.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
                    <div className="flex-shrink-0">
                      <img 
                        src={survey.thumbnail || '/placeholder.svg'} 
                        alt={survey.title} 
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg">{survey.title}</h3>
                      <p className="text-sm text-muted-foreground">Created: {formatDate(survey.createdAt)}</p>
                      <p className="text-sm mt-1">{survey.description}</p>
                    </div>
                    <div className="flex-shrink-0 self-end sm:self-center mt-2 sm:mt-0">
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Give
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <div className="p-8 text-center text-muted-foreground">
                <p>No survey history available</p>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="mt-6">
              <div className="p-8 text-center text-muted-foreground">
                <p>No scheduled surveys available</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/4 p-4 bg-white rounded-md border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Search</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <div className="relative">
                <Input placeholder="Search surveys..." className="pr-8" />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;