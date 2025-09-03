import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddModuleDialog = ({ open, onOpenChange, onModuleAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a module title",
        variant: "destructive",
      });
      return;
    }

    const newModule = {
      id: Date.now(), // Simple ID generation
      title,
      description,
      expanded: false,
      published: false,
      sections: []
    };

    onModuleAdd(newModule);
    setTitle('');
    setDescription('');
    onOpenChange(false);
    
    toast({
      title: "Module created",
      description: `"${title}" has been added successfully`,
    });
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Add module</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCancel}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title:</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter module title"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">
              Description: <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter module description"
              className="w-full min-h-[100px] resize-none"
            />
            <p className="text-xs text-gray-500">* Optional</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleDialog;