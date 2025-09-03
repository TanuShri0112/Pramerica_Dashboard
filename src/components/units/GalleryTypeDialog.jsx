import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Images, RotateCcw, Grid2X2, Grid3X3, TableProperties, Plus, Trash2, Upload } from 'lucide-react';

const galleryTypes = [
  {
    id: 'carousel',
    name: 'Carousel Gallery',
    description: 'Sliding image carousel with navigation',
    icon: <RotateCcw className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white rounded shadow-sm p-3 relative">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop" 
            alt="Carousel preview"
            className="w-full h-24 object-cover rounded"
          />
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">‹</div>
            <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">›</div>
          </div>
          <p className="text-xs text-gray-600 mt-1">Add a caption</p>
        </div>
      </div>
    )
  },
  {
    id: 'grid-2',
    name: '2 Column Grid',
    description: 'Two column image grid layout',
    icon: <Grid2X2 className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded shadow-sm p-2">
              <img 
                src={`https://images.unsplash.com/photo-150690592534${i}?w=150&h=100&fit=crop`}
                alt={`Grid ${i}`}
                className="w-full h-16 object-cover rounded"
              />
              <p className="text-xs text-gray-600 mt-1">Add a caption</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'grid-3',
    name: '3 Column Grid',
    description: 'Three column image grid layout',
    icon: <Grid3X3 className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded shadow-sm p-2">
              <img 
                src={`https://images.unsplash.com/photo-150690592534${i}?w=100&h=80&fit=crop`}
                alt={`Grid ${i}`}
                className="w-full h-12 object-cover rounded"
              />
              <p className="text-xs text-gray-600 mt-1">Caption</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'grid-4',
    name: '4 Column Grid',
    description: 'Four column image grid layout',
    icon: <TableProperties className="h-6 w-6" />,
    preview: (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded shadow-sm p-1">
              <img 
                src={`https://images.unsplash.com/photo-150690592534${i}?w=80&h=60&fit=crop`}
                alt={`Grid ${i}`}
                className="w-full h-8 object-cover rounded"
              />
              <p className="text-xs text-gray-600 mt-1">Caption</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

const defaultImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    caption: 'Beautiful landscape',
    description: 'A stunning mountain landscape with clear blue skies'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df5?w=400&h=300&fit=crop',
    caption: 'City skyline',
    description: 'Modern city architecture against the sunset'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df6?w=400&h=300&fit=crop',
    caption: 'Nature close-up',
    description: 'Macro photography of natural elements'
  }
];

export const GalleryTypeDialog = ({ open, onOpenChange, onSelectType, currentContent, onSave }) => {
  const [selectedType, setSelectedType] = useState(currentContent?.galleryType || 'carousel');
  const [images, setImages] = useState(currentContent?.images || defaultImages);
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (currentContent) {
      setSelectedType(currentContent.galleryType || 'carousel');
      setImages(currentContent.images || defaultImages);
    }
  }, [currentContent]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (onSelectType && !currentContent) {
      onSelectType(type);
    }
  };

  const handleAddImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      caption: 'New image',
      description: 'Add a description for this image'
    };
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleImageChange = (id, field, value) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const handleFileUpload = (imageId, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        handleImageChange(imageId, 'url', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (imageId) => {
    const fileInput = fileInputRefs.current[imageId];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        galleryType: selectedType,
        images
      });
    }
  };

  const renderPreview = () => {
    const gridClass = {
      'carousel': 'flex space-x-2 overflow-x-auto',
      'grid-2': 'grid grid-cols-2 gap-2',
      'grid-3': 'grid grid-cols-3 gap-2',
      'grid-4': 'grid grid-cols-4 gap-1'
    }[selectedType];

    return (
      <div className="bg-gray-50 p-4 rounded border">
        <div className={gridClass}>
          {images.slice(0, selectedType === 'carousel' ? 3 : parseInt(selectedType.split('-')[1]) || 3).map((image) => (
            <div key={image.id} className="bg-white rounded shadow-sm p-2 flex-shrink-0">
              <img 
                src={image.url}
                alt={image.caption}
                className="w-full h-16 object-cover rounded"
              />
              <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
              {image.description && (
                <p className="text-xs text-gray-500 mt-1 truncate">{image.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (currentContent && onSave) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Gallery</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(90vh-120px)]">
              <div className="space-y-6 p-1 pr-4">
                <div>
                  <Label>Gallery Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {galleryTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? "default" : "outline"}
                        onClick={() => handleSelectType(type.id)}
                        className="justify-start text-left h-auto p-3"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-600">{type.icon}</div>
                          <div>
                            <div className="font-medium text-sm">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Gallery Images</Label>
                    <Button onClick={handleAddImage} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Image
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {images.map((image, index) => (
                      <div key={image.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Image {index + 1}</h4>
                          <Button
                            onClick={() => handleRemoveImage(image.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Image URL</Label>
                            <div className="flex space-x-2">
                              <Input
                                value={image.url}
                                onChange={(e) => handleImageChange(image.id, 'url', e.target.value)}
                                placeholder="Enter image URL"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(image.id, e)}
                                ref={(el) => fileInputRefs.current[image.id] = el}
                                className="hidden"
                              />
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => triggerFileUpload(image.id)}
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Caption</Label>
                            <Input
                              value={image.caption}
                              onChange={(e) => handleImageChange(image.id, 'caption', e.target.value)}
                              placeholder="Enter image caption"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={image.description}
                            onChange={(e) => handleImageChange(image.id, 'description', e.target.value)}
                            placeholder="Enter detailed description for this image"
                            rows={2}
                          />
                        </div>
                        
                        <div className="flex justify-center">
                          <img 
                            src={image.url}
                            alt={image.caption}
                            className="w-32 h-24 object-cover rounded border"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Preview</Label>
                  {renderPreview()}
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose Gallery Type</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(85vh-80px)]">
            <div className="grid gap-4 py-4 pr-4">
              {galleryTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className="h-auto p-4 justify-start text-left hover:bg-blue-50"
                  onClick={() => handleSelectType(type.id)}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="text-blue-600 mt-1 flex-shrink-0">
                      {type.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                      <div className="border-t pt-3">
                        {type.preview}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};