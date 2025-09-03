import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Play, Hash, Space } from 'lucide-react';

export const DividerTypeDialog = ({ open, onOpenChange, onSelectType }) => {
  const dividerTypes = [
    {
      id: 'continue',
      title: 'Continue',
      description: 'Add a continue button for user interaction',
      icon: <Play className="h-5 w-5" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-3 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-xs font-medium text-gray-700 mb-2 text-center">Continue Button</div>
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium">
              Continue
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'divider',
      title: 'Divider',
      description: 'Add a horizontal line to separate content',
      icon: <Minus className="h-5 w-5" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-3 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-xs font-medium text-gray-700 mb-2 text-center">Horizontal Divider</div>
          <div className="flex justify-center items-center">
            <div className="w-12 h-px bg-gray-400"></div>
          </div>
        </div>
      )
    },
    {
      id: 'number-divider',
      title: 'Number Divider',
      description: 'Add a numbered step divider',
      icon: <Hash className="h-5 w-5" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-3 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-xs font-medium text-gray-700 mb-2 text-center">Number Divider</div>
          <div className="flex justify-center items-center space-x-1">
            <div className="w-4 h-px bg-gray-400"></div>
            <div className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div className="w-4 h-px bg-gray-400"></div>
          </div>
        </div>
      )
    },
    {
      id: 'space',
      title: 'Space',
      description: 'Add vertical spacing between content',
      icon: <Space className="h-5 w-5" />,
      preview: (
        <div className="bg-gray-50 rounded-lg p-3 border-2 border-transparent hover:border-blue-300 transition-colors">
          <div className="text-xs font-medium text-gray-700 mb-2 text-center">Vertical Space</div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-1 h-3 border-l-2 border-dashed border-gray-300"></div>
              <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSelectType = (type) => {
    onSelectType(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Select Divider Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {dividerTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className="h-auto p-0 flex flex-col hover:shadow-md transition-all duration-200"
              onClick={() => handleSelectType(type.id)}
            >
              <div className="p-4 w-full">
                <div className="flex items-center justify-center mb-3 text-blue-600">
                  {type.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{type.title}</h3>
                <p className="text-xs text-gray-600 mb-3">{type.description}</p>
                {type.preview}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DividerTypeDialog;