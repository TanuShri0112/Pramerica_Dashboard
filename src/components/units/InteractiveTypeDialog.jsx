import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronDown, 
  Folder, 
  ArrowRight, 
  CreditCard, 
  Clock,
  MapPin,
  Users,
  ArrowUpDown
} from 'lucide-react';

const interactiveTypes = [
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Collapsible content sections',
    icon: <ChevronDown className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="space-y-2">
          {['Section 1', 'Section 2', 'Section 3'].map((section, i) => (
            <div key={i} className="bg-white rounded border p-3 flex items-center justify-between">
              <span className="text-sm font-medium">{section}</span>
              <div className="w-4 h-4 border rounded flex items-center justify-center text-xs">+</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed content interface',
    icon: <Folder className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white rounded">
          <div className="flex border-b">
            {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, i) => (
              <div key={i} className={`px-3 py-2 text-xs ${i === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}>
                {tab}
              </div>
            ))}
          </div>
          <div className="p-3 text-xs text-gray-600">Content area</div>
        </div>
      </div>
    )
  },
  {
    id: 'labeled-graphic',
    name: 'Labeled Graphic',
    description: 'Interactive image with hotspots',
    icon: <MapPin className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-blue-200 rounded h-24 relative">
          <div className="absolute top-2 left-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div>
          <div className="absolute bottom-2 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-600">Image with hotspots</div>
        </div>
      </div>
    )
  },
  {
    id: 'process',
    name: 'Process',
    description: 'Step-by-step process flow',
    icon: <ArrowRight className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white rounded p-3 text-center">
          <div className="text-xs font-medium mb-2">Introduction</div>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'flashcard',
    name: 'Flashcard',
    description: 'Interactive flashcards with front/back content',
    icon: <CreditCard className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="relative w-full h-16">
          <div className="absolute bg-white rounded border p-3 text-xs text-center w-full transform rotate-1">Back</div>
          <div className="absolute bg-white rounded border p-3 text-xs text-center w-full">Front</div>
        </div>
      </div>
    )
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Interactive timeline component',
    icon: <Clock className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="relative">
          <div className="border-l-2 border-blue-500 ml-2 pl-4 space-y-2">
            {['Event 1', 'Event 2'].map((event, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="text-xs font-medium">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'scenario',
    name: 'Scenario',
    description: 'Interactive scenario-based learning',
    icon: <Users className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white rounded p-3">
          <div className="text-xs font-medium mb-2">Scenario: Customer Service</div>
          <div className="space-y-1">
            <div className="text-xs bg-blue-50 p-2 rounded">Choice A</div>
            <div className="text-xs bg-blue-50 p-2 rounded">Choice B</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'sorting-activity',
    name: 'Sorting Activity',
    description: 'Drag and drop sorting exercise',
    icon: <ArrowUpDown className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white rounded p-3">
          <div className="text-xs font-medium mb-2">Sort items into categories</div>
          <div className="flex space-x-2">
            <div className="bg-blue-50 p-2 rounded text-xs flex-1">Category 1</div>
            <div className="bg-green-50 p-2 rounded text-xs flex-1">Category 2</div>
          </div>
          <div className="flex space-x-1 mt-2">
            <div className="bg-gray-200 p-1 rounded text-xs">Item A</div>
            <div className="bg-gray-200 p-1 rounded text-xs">Item B</div>
          </div>
        </div>
      </div>
    )
  }
];

export const InteractiveTypeDialog = ({ open, onOpenChange, onSelectType }) => {
  const handleSelectType = (type) => {
    onSelectType(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose Interactive Component</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid grid-cols-2 gap-4 py-4">
            {interactiveTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className="h-auto p-4 justify-start text-left hover:bg-blue-50"
                onClick={() => handleSelectType(type.id)}
              >
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="text-blue-600">
                    {type.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 mb-1">{type.name}</div>
                    <div className="text-sm text-gray-500 mb-3">{type.description}</div>
                    <div className="w-full">
                      {type.preview}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};