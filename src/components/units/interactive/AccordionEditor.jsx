import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Upload } from 'lucide-react';

export const AccordionEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [sections, setSections] = useState(
    initialData?.sections || [
      { title: 'Section 1', content: 'Content for the first accordion section.' },
      { title: 'Section 2', content: 'Content for the second accordion section.' }
    ]
  );

  // Create refs for file inputs - one for each section and media type
  const imageInputRefs = useRef({});
  const videoInputRefs = useRef({});

  const addSection = () => {
    setSections([...sections, { title: `Section ${sections.length + 1}`, content: '' }]);
  };

  const removeSection = (index) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
      // Clean up refs for removed section
      delete imageInputRefs.current[index];
      delete videoInputRefs.current[index];
    }
  };

  const updateSection = (index, field, value) => {
    const updatedSections = sections.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const triggerImageUpload = (sectionIndex) => {
    const fileInput = imageInputRefs.current[sectionIndex];
    if (fileInput) {
      fileInput.click();
    }
  };

  const triggerVideoUpload = (sectionIndex) => {
    const fileInput = videoInputRefs.current[sectionIndex];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (sectionIndex, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        updateSection(sectionIndex, 'image', result);
      };
      reader.readAsDataURL(file);
      // Reset the input value to allow re-uploading the same file
      event.target.value = '';
    }
  };

  const handleVideoUpload = (sectionIndex, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        updateSection(sectionIndex, 'video', result);
      };
      reader.readAsDataURL(file);
      // Reset the input value to allow re-uploading the same file
      event.target.value = '';
    }
  };

  const handleSave = () => {
    onSave({
      interactiveType: 'accordion',
      sections
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Accordion</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Section {index + 1}</h4>
                {sections.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeSection(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="Section title"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`content-${index}`}>Content</Label>
                  <Textarea
                    id={`content-${index}`}
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    placeholder="Section content"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={section.image || ''}
                        onChange={(e) => updateSection(index, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => triggerImageUpload(index)}
                        type="button"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      {/* Hidden file input for this specific section's image */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        ref={(el) => imageInputRefs.current[index] = el}
                        className="hidden"
                      />
                    </div>
                    {section.image && (
                      <img 
                        src={section.image} 
                        alt="Preview" 
                        className="mt-2 w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <Label>Video</Label>
                    <div className="flex gap-2">
                      <Input
                        value={section.video || ''}
                        onChange={(e) => updateSection(index, 'video', e.target.value)}
                        placeholder="Video URL"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => triggerVideoUpload(index)}
                        type="button"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      {/* Hidden file input for this specific section's video */}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(index, e)}
                        ref={(el) => videoInputRefs.current[index] = el}
                        className="hidden"
                      />
                    </div>
                    {section.video && (
                      <video 
                        src={section.video} 
                        className="mt-2 w-20 h-12 object-cover rounded"
                        controls
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addSection} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccordionEditor;