import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProcessEditor } from './interactive/ProcessEditor';
import { AccordionEditor } from './interactive/AccordionEditor';
import { TabsEditor } from './interactive/TabsEditor';
import { FlashcardEditor } from './interactive/FlashcardEditor';
import { TimelineEditor } from './interactive/TimelineEditor';
import { LabeledGraphicEditor } from './interactive/LabeledGraphicEditor';
import { ScenarioEditor } from './interactive/ScenarioEditor';
import  SortingActivityEditor  from './interactive/SortingActivityEditor';

export const InteractiveEditor = ({ 
  isOpen, 
  open, 
  onClose, 
  onOpenChange, 
  onSave, 
  initialData, 
  content 
}) => {
  const isDialogOpen = isOpen || open;
  const handleClose = () => {
    onClose();
    onOpenChange?.(false);
  };
  
  const interactiveType = initialData?.interactiveType || content?.interactiveType;

  // Handle cases where we don't have existing editors
  if (!interactiveType) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interactive Editor</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-500">No interactive type specified</p>
            <Button onClick={handleClose} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // For scenario type, don't wrap in Dialog since it's now fullscreen
  if (interactiveType === 'scenario') {
    return (
      <ScenarioEditor
        isOpen={isDialogOpen}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />
    );
  }

  return (
    <>
      {/* Flashcard Editor */}
      <FlashcardEditor
        isOpen={isDialogOpen && interactiveType === 'flashcard'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Sorting Activity Editor */}
      <SortingActivityEditor
        isOpen={isDialogOpen && interactiveType === 'sorting-activity'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Tabs Editor */}
      <TabsEditor
        isOpen={isDialogOpen && interactiveType === 'tabs'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Accordion Editor */}
      <AccordionEditor
        isOpen={isDialogOpen && interactiveType === 'accordion'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Labeled Graphic Editor */}
      <LabeledGraphicEditor
        isOpen={isDialogOpen && interactiveType === 'labeled-graphic'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Process Editor */}
      <ProcessEditor
        isOpen={isDialogOpen && interactiveType === 'process'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />

      {/* Timeline Editor */}
      <TimelineEditor
        isOpen={isDialogOpen && interactiveType === 'timeline'}
        onClose={handleClose}
        onSave={onSave}
        initialData={initialData || content}
      />
    </>
  );
};

export default InteractiveEditor;