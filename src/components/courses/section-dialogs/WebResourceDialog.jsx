import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WebResourceDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [library, setLibrary] = useState('personal');

  const handleSave = () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL for the web resource.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Web Resource Added",
      description: "The web resource has been successfully added to the module.",
    });
    
    // Reset form
    setUrl('');
    setDescription('');
    setLibrary('personal');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Add Web resource</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="font-medium">URL:</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description: *</Label>
            <Textarea
              id="description"
              placeholder="Enter description for the web resource"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-3">
            <Label className="font-medium">Library:</Label>
            <RadioGroup value={library} onValueChange={setLibrary} className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization" id="organization" />
                <Label htmlFor="organization">Organization</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="text-sm text-gray-500">
            * Optional
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebResourceDialog;