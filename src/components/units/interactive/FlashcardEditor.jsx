import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, X, Upload, Grid3X3, CreditCard } from 'lucide-react';

export const FlashcardEditor = ({ isOpen, onClose, onSave, initialData }) => {
  const [displayMode, setDisplayMode] = useState(initialData?.displayMode || 'stack');
  const [flashcards, setFlashcards] = useState(
    initialData?.flashcards || [
      { 
        front: 'Front of card 1', 
        back: 'Back of card 1', 
        frontType: 'text', 
        backType: 'text',
        frontImage: '', 
        backImage: ''
      }
    ]
  );

  // Create refs for file inputs - one for each card front/back
  const imageInputRefs = useRef({});

  const addCard = () => {
    setFlashcards([...flashcards, { 
      front: `Front of card ${flashcards.length + 1}`, 
      back: `Back of card ${flashcards.length + 1}`, 
      frontType: 'text', 
      backType: 'text',
      frontImage: '', 
      backImage: ''
    }]);
  };

  const removeCard = (index) => {
    if (flashcards.length > 1) {
      setFlashcards(flashcards.filter((_, i) => i !== index));
      // Clean up refs for removed card
      delete imageInputRefs.current[`${index}-front`];
      delete imageInputRefs.current[`${index}-back`];
    }
  };

  const updateCard = (index, field, value) => {
    const updatedCards = flashcards.map((card, i) => 
      i === index ? { ...card, [field]: value } : card
    );
    setFlashcards(updatedCards);
  };

  const triggerImageUpload = (cardIndex, side) => {
    const fileInput = imageInputRefs.current[`${cardIndex}-${side}`];
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (cardIndex, side, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        const imageField = side === 'front' ? 'frontImage' : 'backImage';
        updateCard(cardIndex, imageField, result);
      };
      reader.readAsDataURL(file);
      // Reset the input value to allow re-uploading the same file
      event.target.value = '';
    }
  };

  const handleSave = () => {
    onSave({
      interactiveType: 'flashcard',
      displayMode,
      flashcards
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Flashcards</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Display Mode Selection */}
          <div className="border-b pb-4">
            <Label className="text-base font-medium mb-3 block">Display Mode</Label>
            <RadioGroup value={displayMode} onValueChange={(value) => setDisplayMode(value)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="stack" id="stack" />
                <Label htmlFor="stack" className="flex items-center space-x-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Stack View</div>
                    <div className="text-sm text-gray-500">Cards appear one behind the other (traditional flashcard stack)</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="grid" id="grid" />
                <Label htmlFor="grid" className="flex items-center space-x-2 cursor-pointer">
                  <Grid3X3 className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Grid View</div>
                    <div className="text-sm text-gray-500">Display 2-3 flashcards side-by-side in a grid layout</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Flashcards */}
          {flashcards.map((card, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Card {index + 1}</h4>
                {flashcards.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeCard(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Front */}
                <div className="space-y-4">
                  <h5 className="font-medium text-green-700">Card Front</h5>
                  
                  <div>
                    <Label htmlFor={`front-type-${index}`}>Content Type</Label>
                    <Select
                      value={card.frontType}
                      onValueChange={(value) => updateCard(index, 'frontType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {card.frontType === 'text' ? (
                    <div>
                      <Label htmlFor={`front-text-${index}`}>Front Text</Label>
                      <Textarea
                        id={`front-text-${index}`}
                        value={card.front}
                        onChange={(e) => updateCard(index, 'front', e.target.value)}
                        placeholder="Enter front side text"
                        rows={4}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>Front Image</Label>
                      <div className="flex gap-2">
                        <Input
                          value={card.frontImage || ''}
                          onChange={(e) => updateCard(index, 'frontImage', e.target.value)}
                          placeholder="Image URL"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => triggerImageUpload(index, 'front')}
                          type="button"
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, 'front', e)}
                          ref={(el) => imageInputRefs.current[`${index}-front`] = el}
                          className="hidden"
                        />
                      </div>
                      {card.frontImage && (
                        <img 
                          src={card.frontImage} 
                          alt="Front preview" 
                          className="mt-2 w-20 h-20 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Card Back */}
                <div className="space-y-4">
                  <h5 className="font-medium text-blue-700">Card Back</h5>
                  
                  <div>
                    <Label htmlFor={`back-type-${index}`}>Content Type</Label>
                    <Select
                      value={card.backType}
                      onValueChange={(value) => updateCard(index, 'backType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {card.backType === 'text' ? (
                    <div>
                      <Label htmlFor={`back-text-${index}`}>Back Text</Label>
                      <Textarea
                        id={`back-text-${index}`}
                        value={card.back}
                        onChange={(e) => updateCard(index, 'back', e.target.value)}
                        placeholder="Enter back side text"
                        rows={4}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>Back Image</Label>
                      <div className="flex gap-2">
                        <Input
                          value={card.backImage || ''}
                          onChange={(e) => updateCard(index, 'backImage', e.target.value)}
                          placeholder="Image URL"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => triggerImageUpload(index, 'back')}
                          type="button"
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, 'back', e)}
                          ref={(el) => imageInputRefs.current[`${index}-back`] = el}
                          className="hidden"
                        />
                      </div>
                      {card.backImage && (
                        <img 
                          src={card.backImage} 
                          alt="Back preview" 
                          className="mt-2 w-20 h-20 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addCard} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Card
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

export default FlashcardEditor;