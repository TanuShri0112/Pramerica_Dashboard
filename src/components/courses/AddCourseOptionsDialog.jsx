import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TemplateSelectionDialog } from './TemplateSelectionDialog';

export const AddCourseOptionsDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const options = [
    {
      title: "Blank Course",
      description: "Start from scratch with a completely blank course",
      icon: "📝",
      onClick: () => navigate('/courses/create')
    },
    {
      title: "Choose Template",
      description: "Use a pre-built template to get started quickly",
      icon: "📋",
      onClick: () => setIsTemplateDialogOpen(true)
    }
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" onClick={() => onOpenChange(false)} />
            <span className="sr-only">Close</span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Course</DialogTitle>
            <p className="text-muted-foreground">
              Choose how you'd like to start building your course
            </p>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 mt-4">
            {options.map((option) => (
              <div
                key={option.title}
                className="border rounded-md p-6 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  option.onClick();
                  if (option.title !== "Choose Template") {
                    onOpenChange(false);
                  }
                }}
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <TemplateSelectionDialog 
        open={isTemplateDialogOpen}
        onOpenChange={(open) => {
          setIsTemplateDialogOpen(open);
          if (!open) {
            onOpenChange(false);
          }
        }}
      />
    </>
  );
};

export default AddCourseOptionsDialog;