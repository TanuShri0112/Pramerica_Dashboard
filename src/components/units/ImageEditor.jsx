import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, Save } from 'lucide-react';

export const ImageEditor = ({ open, onOpenChange, content, onSave }) => {
  const [url, setUrl] = useState(content?.url || '');
  const [alt, setAlt] = useState(content?.alt || '');
  const [caption, setCaption] = useState(content?.caption || '');
  const [text, setText] = useState(content?.text || '');
  const [overlayText, setOverlayText] = useState(content?.overlayText || '');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedContent = {
      ...content,
      url,
      alt,
      caption,
      text,
      overlayText
    };
    onSave(updatedContent);
    onOpenChange(false);
  };

  const getTitle = () => {
    switch (content?.imageType) {
      case 'centered': return 'Edit Image Centered';
      case 'image-text': return 'Edit Image and Text';
      case 'text-on-image': return 'Edit Text on Image';
      default: return 'Edit Image';
    }
  };

  const renderPreview = () => {
    if (!url) return null;

    switch (content?.imageType) {
      case 'centered':
        return (
          <div className="text-center">
            <img 
              src={url} 
              alt={alt || 'Preview'} 
              className="max-w-full h-32 object-cover rounded mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {caption && (
              <p className="text-sm text-gray-600 mt-2">{caption}</p>
            )}
          </div>
        );

      case 'image-text':
        return (
          <div className="flex gap-4 items-start">
            <div className="w-1/2">
              <img 
                src={url} 
                alt={alt || 'Preview'} 
                className="w-full h-24 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-700">{text || 'Text will appear here'}</p>
            </div>
          </div>
        );

      case 'text-on-image':
        return (
          <div className="relative">
            <img 
              src={url} 
              alt={alt || 'Preview'} 
              className="w-full h-32 object-cover rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center">
              <p className="text-white text-center font-semibold">
                {overlayText || 'Overlay text will appear here'}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <img 
            src={url} 
            alt={alt || 'Preview'} 
            className="max-w-full h-32 object-cover rounded"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 mt-4 pr-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <Label>Upload from Computer</Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="file-upload"
                />
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="alt-text">Alt Text</Label>
              <Input
                id="alt-text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>

            {content?.imageType === 'centered' && (
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>
            )}

            {content?.imageType === 'image-text' && (
              <div>
                <Label htmlFor="text-content">Text Content</Label>
                <Textarea
                  id="text-content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text content here..."
                  rows={4}
                />
              </div>
            )}

            {content?.imageType === 'text-on-image' && (
              <div>
                <Label htmlFor="overlay-text">Overlay Text</Label>
                <Textarea
                  id="overlay-text"
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  placeholder="Enter overlay text here..."
                  rows={4}
                />
              </div>
            )}

            {url && (
              <div>
                <Label>Preview</Label>
                <div className="bg-gray-50 p-3 rounded border">
                  {renderPreview()}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 pt-4 border-t">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;