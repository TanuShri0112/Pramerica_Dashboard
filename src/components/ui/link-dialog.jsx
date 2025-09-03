import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

export const LinkDialog = ({ open, onOpenChange, onSave }) => {
  const [url, setUrl] = useState('https://example.com');
  const [text, setText] = useState('Link text');
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('current');

  const handleSave = () => {
    if (url && text) {
      const targetValue = target === 'new' ? '_blank' : '_self';
      onSave(url, text, title || undefined, targetValue);
      onOpenChange(false);
      // Reset form
      setUrl('https://example.com');
      setText('Link text');
      setTitle('');
      setTarget('current');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setUrl('https://example.com');
    setText('Link text');
    setTitle('');
    setTarget('current');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-lg font-semibold">Insert/Edit Link</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">Text to display</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Link text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Link title (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Open link in...</Label>
            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current window</SelectItem>
                <SelectItem value="new">New window</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
