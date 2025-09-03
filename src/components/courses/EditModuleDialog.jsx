import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EditModuleDialog = ({ open, onOpenChange, module, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Sync state only when module changes
  useEffect(() => {
    if (module && open) {
      setTitle(module.title || '');
      setDescription(module.description || '');
    }
  }, [module]); // Removed 'open' from dependencies

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: 'Module title is required',
        variant: 'destructive',
      });
      return;
    }

    const updated = { ...module, title: title.trim(), description: description.trim() };
    onUpdate(updated);
    toast({ title: 'Module updated' });
    onOpenChange(false); // Close dialog
  };

  const handleCancel = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="module-title">Module Title</Label>
            <Input
              id="module-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter module title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="module-desc">Description</Label>
            <Textarea
              id="module-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter module description"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModuleDialog;