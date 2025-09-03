import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Undo,
  Redo
} from 'lucide-react';

const EditOverviewDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'vljsdfbgs',
    shortDescription: '',
    longDescription: ''
  });
  const [wordCount, setWordCount] = useState(0);

  const handleSave = () => {
    toast({
      title: "Overview updated",
      description: "Course overview has been successfully updated",
      duration: 3000,
    });
    onOpenChange(false);
  };

  const handleLongDescriptionChange = (e) => {
    const text = e.target.value;
    setFormData({ ...formData, longDescription: text });
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Overview</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="course-name" className="text-sm font-medium">Name</Label>
            <Input
              id="course-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="short-desc" className="text-sm font-medium">Short description (optional)</Label>
            <Input
              id="short-desc"
              placeholder="Enter a brief description"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Long Description */}
          <div className="flex-1 flex flex-col">
            <Label className="text-sm font-medium mb-2">Long description</Label>

            {/* Toolbar */}
            <div className="bg-gray-50 p-3 border border-b-0 rounded-t-md">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Table'].map((item) => (
                  <select key={item} className="px-2 py-1 border rounded text-sm bg-white">
                    <option>{item}</option>
                  </select>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[Undo, Redo].map((Icon, idx) => (
                  <Button key={idx} variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
                <Separator orientation="vertical" className="h-6" />

                {['Paragraph', 'Poppins', '12pt'].map((val) => (
                  <select key={val} className="px-2 py-1 border rounded text-sm bg-white">
                    <option>{val}</option>
                  </select>
                ))}

                <Separator orientation="vertical" className="h-6" />

                {[Bold, Italic, Underline].map((Icon, idx) => (
                  <Button key={idx} variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}

                <Separator orientation="vertical" className="h-6" />

                {[AlignLeft, AlignCenter, AlignRight].map((Icon, idx) => (
                  <Button key={idx} variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}

                <Separator orientation="vertical" className="h-6" />

                {[List, ListOrdered, ImageIcon].map((Icon, idx) => (
                  <Button key={idx} variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 border border-t-0 rounded-b-md">
              <Textarea
                className="w-full h-full border-none outline-none resize-none text-base rounded-b-md focus-visible:ring-0"
                placeholder="Start typing your course description..."
                value={formData.longDescription}
                onChange={handleLongDescriptionChange}
              />
            </div>

            {/* Footer */}
            <div className="border-t p-3 flex items-center justify-between bg-gray-50 rounded-b-md">
              <div className="text-sm text-gray-600">P</div>
              <div className="text-sm text-gray-600">{wordCount} WORDS</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOverviewDialog;
