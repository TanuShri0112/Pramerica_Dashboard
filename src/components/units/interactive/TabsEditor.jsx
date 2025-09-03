import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Upload } from 'lucide-react';

export const TabsEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [tabs, setTabs] = useState(
    initialData?.tabs || [
      { title: 'Tab 1', description: 'Description for the first tab.' },
      { title: 'Tab 2', description: 'Description for the second tab.' }
    ]
  );

  // Create refs for file inputs - one for each tab
  const imageInputRefs = useRef({});

  const addTab = () => {
    setTabs([...tabs, { title: `Tab ${tabs.length + 1}`, description: '' }]);
  };

  const removeTab = (index) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter((_, i) => i !== index));
      // Clean up refs for removed tab
      delete imageInputRefs.current[index];
    }
  };

  const updateTab = (index, field, value) => {
    const updatedTabs = tabs.map((tab, i) => 
      i === index ? { ...tab, [field]: value } : tab
    );
    setTabs(updatedTabs);
  };

  const triggerImageUpload = (tabIndex) => {
    const fileInput = imageInputRefs.current[tabIndex];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (tabIndex, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        updateTab(tabIndex, 'image', result);
      };
      reader.readAsDataURL(file);
      // Reset the input value to allow re-uploading the same file
      event.target.value = '';
    }
  };

  const handleSave = () => {
    onSave({
      interactiveType: 'tabs',
      tabs
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tabs</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {tabs.map((tab, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Tab {index + 1}</h4>
                {tabs.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeTab(index)}
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
                    value={tab.title}
                    onChange={(e) => updateTab(index, 'title', e.target.value)}
                    placeholder="Tab title"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={tab.description}
                    onChange={(e) => updateTab(index, 'description', e.target.value)}
                    placeholder="Tab description"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Image</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tab.image || ''}
                      onChange={(e) => updateTab(index, 'image', e.target.value)}
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
                    {/* Hidden file input for this specific tab's image */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      ref={(el) => imageInputRefs.current[index] = el}
                      className="hidden"
                    />
                  </div>
                  {tab.image && (
                    <img 
                      src={tab.image} 
                      alt="Preview" 
                      className="mt-2 w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addTab} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Tab
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

export default TabsEditor;