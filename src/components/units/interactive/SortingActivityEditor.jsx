import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Upload, MoveUp, MoveDown } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { id: 'fruits', name: 'Fruits', color: '#fef3c7' },
  { id: 'vegetables', name: 'Vegetables', color: '#dcfce7' }
];

const DEFAULT_ITEMS = [
  { id: '1', text: 'Apple', correctCategory: 'Fruits' },
  { id: '2', text: 'Carrot', correctCategory: 'Vegetables' },
  { id: '3', text: 'Banana', correctCategory: 'Fruits' },
  { id: '4', text: 'Broccoli', correctCategory: 'Vegetables' }
];

const SortingActivityEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('Category Sorting Activity');
  const [instructions, setInstructions] = useState('Drag items to sort them into the correct categories.');
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [items, setItems] = useState(DEFAULT_ITEMS);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || 'Category Sorting Activity');
      setInstructions(initialData.instructions || 'Drag items to sort them into the correct categories.');
      setCategories(initialData.categories || DEFAULT_CATEGORIES);
      setItems(initialData.items || DEFAULT_ITEMS);
    } else {
      setTitle('Category Sorting Activity');
      setInstructions('Drag items to sort them into the correct categories.');
      setCategories(DEFAULT_CATEGORIES);
      setItems(DEFAULT_ITEMS);
    }
  }, [initialData, isOpen]);

  const addCategory = () => {
    const newCategory = {
      id: `category${Date.now()}`,
      name: `Category ${categories.length + 1}`,
      color: '#f3f4f6'
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (id) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
      setItems(items.map(item => 
        item.correctCategory === categories.find(cat => cat.id === id)?.name
          ? { ...item, correctCategory: categories[0]?.name || 'Category 1' }
          : item
      ));
    }
  };

  const updateCategory = (id, field, value) => {
    const oldName = categories.find(cat => cat.id === id)?.name;
    const newCategories = categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    setCategories(newCategories);
    
    if (field === 'name' && oldName) {
      setItems(items.map(item => 
        item.correctCategory === oldName 
          ? { ...item, correctCategory: value }
          : item
      ));
    }
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      text: '',
      image: '',
      correctCategory: categories[0]?.name || 'Category 1'
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const moveItem = (id, direction) => {
    const currentIndex = items.findIndex(item => item.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === items.length - 1)
    ) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex]];
    setItems(newItems);
  };

  const handleImageUpload = (itemId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        updateItem(itemId, 'image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const sortingData = {
      interactiveType: 'sorting-activity',
      title,
      instructions,
      categories,
      items: items.filter(item => item.text.trim() !== '')
    };
    onSave(sortingData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Create Category Sorting Activity</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-140px)] overflow-y-auto">
          <div className="space-y-6 p-1 pr-4">
            <div>
              <Label>Activity Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter sorting activity title"
              />
            </div>

            <div>
              <Label>Instructions</Label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Explain how learners should complete the sorting activity"
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Categories</Label>
                <Button onClick={addCategory} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Category
                </Button>
              </div>
              
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={category.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        Category {index + 1}
                      </span>
                      {categories.length > 1 && (
                        <Button
                          onClick={() => removeCategory(category.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Category Name</Label>
                        <Input
                          value={category.name}
                          onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                          placeholder="Enter category name"
                        />
                      </div>
                      <div>
                        <Label>Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={category.color || '#f3f4f6'}
                            onChange={(e) => updateCategory(category.id, 'color', e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={category.color || '#f3f4f6'}
                            onChange={(e) => updateCategory(category.id, 'color', e.target.value)}
                            placeholder="#f3f4f6"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Sortable Items</Label>
                <Button onClick={addItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          Item {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => moveItem(item.id, 'up')}
                          size="sm"
                          variant="ghost"
                          disabled={index === 0}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => moveItem(item.id, 'down')}
                          size="sm"
                          variant="ghost"
                          disabled={index === items.length - 1}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                        {items.length > 1 && (
                          <Button
                            onClick={() => removeItem(item.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Item Text</Label>
                        <Textarea
                          value={item.text}
                          onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                          placeholder="Enter text for this item"
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <Label>Correct Category</Label>
                        <select
                          value={item.correctCategory}
                          onChange={(e) => updateItem(item.id, 'correctCategory', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label>Item Image (Optional)</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(item.id, e)}
                              className="hidden"
                              id={`image-upload-${item.id}`}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`image-upload-${item.id}`)?.click()}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                          
                          {item.image && (
                            <div className="relative">
                              <img
                                src={item.image}
                                alt="Item preview"
                                className="w-full h-16 object-cover rounded border"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => updateItem(item.id, 'image', '')}
                                className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <Label className="text-sm text-gray-600">Preview:</Label>
                      <div className="mt-2 w-32 h-24 bg-white rounded border-2 border-gray-200 shadow-sm flex flex-col overflow-hidden">
                        {item.image && (
                          <div className="flex-1 overflow-hidden">
                            <img
                              src={item.image}
                              alt="Preview"
                              className="w-full h-12 object-cover"
                            />
                          </div>
                        )}
                        <div className="p-1 flex-1 flex items-center justify-center">
                          <p className="text-xs text-center text-gray-700 leading-tight">
                            {item.text || 'Enter text...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Sorting Activity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SortingActivityEditor;