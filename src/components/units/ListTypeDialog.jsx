import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List, ListOrdered, CheckSquare, Plus, Trash2 } from 'lucide-react';

const listTypes = [
  {
    id: 'bullet',
    name: 'Bullet List',
    description: 'Unordered list with bullets',
    icon: <List className="h-6 w-6" />,
    preview: (
      <ul className="space-y-1">
        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>List item 1</li>
        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>List item 2</li>
        <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>List item 3</li>
      </ul>
    )
  },
  {
    id: 'numbered',
    name: 'Numbered List',
    description: 'Ordered list with numbers',
    icon: <ListOrdered className="h-6 w-6" />,
    preview: (
      <ol className="space-y-1">
        <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">1</span>First item</li>
        <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">2</span>Second item</li>
        <li className="flex items-center"><span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">3</span>Third item</li>
      </ol>
    )
  },
  {
    id: 'checklist',
    name: 'Checklist',
    description: 'Interactive checklist',
    icon: <CheckSquare className="h-6 w-6" />,
    preview: (
      <div className="space-y-1">
        <div className="flex items-center"><input type="checkbox" className="mr-3 rounded" />Task item 1</div>
        <div className="flex items-center"><input type="checkbox" checked className="mr-3 rounded" readOnly />Task item 2</div>
        <div className="flex items-center"><input type="checkbox" className="mr-3 rounded" />Task item 3</div>
      </div>
    )
  }
];

export const ListTypeDialog = ({ open, onOpenChange, onSelectType, currentContent, onSave }) => {
  const [selectedType, setSelectedType] = useState(currentContent?.listType || 'bullet');
  const [items, setItems] = useState(currentContent?.items || ['List item 1', 'List item 2', 'List item 3']);

  useEffect(() => {
    if (currentContent) {
      setSelectedType(currentContent.listType || 'bullet');
      setItems(currentContent.items || ['List item 1', 'List item 2', 'List item 3']);
    }
  }, [currentContent]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (onSelectType && !currentContent) {
      onSelectType(type);
    }
  };

  const handleAddItem = () => {
    setItems([...items, 'New item']);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        listType: selectedType,
        items
      });
    }
  };

  const renderPreview = () => {
    switch (selectedType) {
      case 'bullet':
        return (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'numbered':
        return (
          <ol className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        );
      case 'checklist':
        return (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" className="mr-3 rounded" />
                {item}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (currentContent && onSave) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit List</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[calc(90vh-140px)] overflow-y-auto">
            <div className="space-y-6 p-1 pr-4">
              <div>
                <Label>List Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {listTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      onClick={() => handleSelectType(type.id)}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600">{type.icon}</div>
                        <div>
                          <div className="font-medium text-xs">{type.name}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>List Items</Label>
                  <Button onClick={handleAddItem} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        placeholder={`Item ${index + 1}`}
                      />
                      <Button
                        onClick={() => handleRemoveItem(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preview</Label>
                <div className="bg-gray-50 p-4 rounded border mt-2">
                  {renderPreview()}
                </div>
              </div>
            </div>
          </ScrollArea>

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
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose List Type</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(90vh-140px)]">
            <div className="grid gap-4 py-4 pr-4">
              {listTypes.map((type) => (
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
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                      <div className="border-t pt-2">
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
