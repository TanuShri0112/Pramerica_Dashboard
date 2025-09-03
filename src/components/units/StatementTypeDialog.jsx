import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Italic, Bold, Type, AlertCircle } from 'lucide-react';

const statementTypes = [
  {
    id: 'italic',
    name: 'Statement Style 1',
    description: 'Emphasized italic text',
    icon: <Italic className="h-6 w-6" />,
    preview: <span className="italic text-blue-700">This is an important statement in italic style.</span>
  },
  {
    id: 'bold',
    name: 'Statement Style 2',
    description: 'Strong bold text',
    icon: <Bold className="h-6 w-6" />,
    preview: <span className="font-bold text-gray-900">This is an important statement in bold style.</span>
  },
  {
    id: 'uppercase',
    name: 'Statement Style 3',
    description: 'ALL CAPS TEXT',
    icon: <Type className="h-6 w-6" />,
    preview: <span className="uppercase font-semibold text-gray-800 tracking-wide">THIS IS AN IMPORTANT STATEMENT.</span>
  },
  {
    id: 'highlighted',
    name: 'Statement Style 4',
    description: 'Important highlighted text',
    icon: <AlertCircle className="h-6 w-6" />,
    preview: <span className="bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-500 text-gray-800">This is an important highlighted statement.</span>
  }
];

export const StatementTypeDialog = ({ open, onOpenChange, onSelectType, currentContent, onSave }) => {
  const [selectedType, setSelectedType] = useState(currentContent?.statementType || 'italic');
  const [text, setText] = useState(currentContent?.text || 'This is an important statement.');

  useEffect(() => {
    if (currentContent) {
      setSelectedType(currentContent.statementType || 'italic');
      setText(currentContent.text || 'This is an important statement.');
    }
  }, [currentContent]);

  const handleSelectType = (type) => {
    setSelectedType(type);
    if (onSelectType && !currentContent) {
      onSelectType(type);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        statementType: selectedType,
        text
      });
    }
  };

  const renderPreview = () => {
    const selectedStyle = statementTypes.find(type => type.id === selectedType);
    if (!selectedStyle) return null;

    const content = text || 'This is an important statement.';

    switch (selectedType) {
      case 'italic':
        return <span className="italic text-blue-700">{content}</span>;
      case 'bold':
        return <span className="font-bold text-gray-900">{content}</span>;
      case 'uppercase':
        return <span className="uppercase font-semibold text-gray-800 tracking-wide">{content}</span>;
      case 'highlighted':
        return <span className="bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-500 text-gray-800">{content}</span>;
      default:
        return <span>{content}</span>;
    }
  };

  // If we have currentContent, show the editor interface
  if (currentContent && onSave) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Statement</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[calc(80vh-140px)] overflow-y-auto">
            <div className="space-y-6 p-1 pr-4">
              <div>
                <Label>Statement Style</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {statementTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "default" : "outline"}
                      onClick={() => handleSelectType(type.id)}
                      className="justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600">{type.icon}</div>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Statement Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your statement text..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Preview</Label>
                <div className="p-4 border rounded-lg bg-gray-50">
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

  // Original type selection interface
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose Statement Style</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(80vh-140px)]">
            <div className="grid gap-4 py-4 pr-4">
              {statementTypes.map((type) => (
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

export default StatementTypeDialog;