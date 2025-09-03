import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ArrowRight, Play, RefreshCw } from 'lucide-react';

export const ProcessEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [steps, setSteps] = useState(initialData?.steps || [
    {
      title: 'Introduction',
      content: 'Welcome to this process.',
      stepNumber: 0,
      contentType: 'text',
      buttonText: 'START',
      buttonIcon: 'play'
    }
  ]);

  const addStep = () => {
    const newStep = {
      title: `Step ${steps.length}`,
      content: 'Enter step content here.',
      stepNumber: steps.length,
      contentType: 'text'
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter((_, i) => i !== index);
      // Reorder step numbers
      updatedSteps.forEach((step, i) => {
        step.stepNumber = i;
      });
      setSteps(updatedSteps);
    }
  };

  const handleSave = () => {
    // Add summary step if not exists
    const hasEndStep = steps.some(step => step.buttonText === 'START AGAIN');
    if (!hasEndStep) {
      const summaryStep = {
        title: 'Summary',
        content: 'Process completed successfully.',
        stepNumber: steps.length,
        contentType: 'text',
        buttonText: 'START AGAIN',
        buttonIcon: 'refresh'
      };
      steps.push(summaryStep);
    }

    onSave({
      interactiveType: 'process',
      currentStep: 0,
      steps
    });
    onClose();
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'play': return <Play className="w-4 h-4" />;
      case 'refresh': return <RefreshCw className="w-4 h-4" />;
      default: return <ArrowRight className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Process Steps</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">
                  {index === 0 ? 'Introduction' : index === steps.length - 1 ? 'Summary' : `Step ${index}`}
                </h4>
                {steps.length > 1 && index !== 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeStep(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Content Type</Label>
                  <Select
                    value={step.contentType}
                    onValueChange={(value) => 
                      updateStep(index, 'contentType', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label>Content</Label>
                <Textarea
                  value={step.content}
                  onChange={(e) => updateStep(index, 'content', e.target.value)}
                  rows={3}
                />
              </div>

              {(step.contentType === 'video' || step.contentType === 'audio') && (
                <div className="mt-4">
                  <Label>Media URL</Label>
                  <Input
                    value={step.mediaUrl || ''}
                    onChange={(e) => updateStep(index, 'mediaUrl', e.target.value)}
                    placeholder={`Enter ${step.contentType} URL`}
                  />
                </div>
              )}

              {(index === 0 || index === steps.length - 1) && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={step.buttonText || ''}
                      onChange={(e) => updateStep(index, 'buttonText', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Button Icon</Label>
                    <Select
                      value={step.buttonIcon || 'play'}
                      onValueChange={(value) => updateStep(index, 'buttonIcon', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="play">Play</SelectItem>
                        <SelectItem value="refresh">Refresh</SelectItem>
                        <SelectItem value="arrow">Arrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button onClick={addStep} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Process</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessEditor;