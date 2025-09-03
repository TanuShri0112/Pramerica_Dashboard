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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, FileText } from 'lucide-react';

export const AddResourceModal = ({ open, onOpenChange, onAddResource }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState('link');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (activeTab === 'link' && !link.trim()) return;
    if (activeTab === 'file' && !file) return;

    onAddResource({
      title: title.trim(),
      type: activeTab,
      content: activeTab === 'link' ? link : file?.name || '',
      description: description.trim() || undefined
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLink('');
    setFile(null);
    setActiveTab('link');
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Add New Resource
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource-title">Resource Title *</Label>
            <Input
              id="resource-title"
              placeholder="Enter resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Link
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                File Upload
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="link" className="space-y-2">
              <Label htmlFor="resource-link">Resource URL *</Label>
              <Input
                id="resource-link"
                type="url"
                placeholder="https://example.com/resource"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required={activeTab === 'link'}
              />
            </TabsContent>
            
            <TabsContent value="file" className="space-y-2">
              <Label htmlFor="resource-file">Upload File *</Label>
              <Input
                id="resource-file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required={activeTab === 'file'}
              />
            </TabsContent>
          </Tabs>
          
          <div className="space-y-2">
            <Label htmlFor="resource-description">Description (Optional)</Label>
            <Textarea
              id="resource-description"
              placeholder="Brief description of the resource"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!title.trim() || (activeTab === 'link' && !link.trim()) || (activeTab === 'file' && !file)}
            >
              Add Resource
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};