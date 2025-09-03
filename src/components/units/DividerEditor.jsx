import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Play, Hash, Space } from 'lucide-react';

export const DividerEditor = ({ open, onOpenChange, content, onSave }) => {
  const [dividerType, setDividerType] = useState(content?.dividerType || 'divider');
  const [buttonText, setButtonText] = useState(content?.buttonText || 'Continue');
  const [numberLabel, setNumberLabel] = useState(content?.numberLabel || '1');
  const [spacing, setSpacing] = useState(content?.spacing || 'medium');

  useEffect(() => {
    if (content) {
      setDividerType(content.dividerType || 'divider');
      setButtonText(content.buttonText || 'Continue');
      setNumberLabel(content.numberLabel || '1');
      setSpacing(content.spacing || 'medium');
    }
  }, [content]);

  const handleSave = () => {
    const dividerContent = {
      dividerType,
      buttonText,
      numberLabel,
      spacing
    };
    onSave(dividerContent);
    onOpenChange(false);
  };

  const getDividerIcon = () => {
    switch (dividerType) {
      case 'continue': return <Play className="h-5 w-5" />;
      case 'divider': return <Minus className="h-5 w-5" />;
      case 'number-divider': return <Hash className="h-5 w-5" />;
      case 'space': return <Space className="h-5 w-5" />;
      default: return <Minus className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getDividerIcon()}
            <span>Edit Divider</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <Label htmlFor="dividerType" className="text-sm font-medium">Divider Type</Label>
            <Select value={dividerType} onValueChange={setDividerType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="continue">
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Continue</span>
                  </div>
                </SelectItem>
                <SelectItem value="divider">
                  <div className="flex items-center space-x-2">
                    <Minus className="h-4 w-4" />
                    <span>Divider</span>
                  </div>
                </SelectItem>
                <SelectItem value="number-divider">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4" />
                    <span>Number Divider</span>
                  </div>
                </SelectItem>
                <SelectItem value="space">
                  <div className="flex items-center space-x-2">
                    <Space className="h-4 w-4" />
                    <span>Space</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dividerType === 'continue' && (
            <div>
              <Label htmlFor="buttonText" className="text-sm font-medium">Button Text</Label>
              <Input
                id="buttonText"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Continue"
                className="mt-1"
              />
            </div>
          )}

          {dividerType === 'number-divider' && (
            <div>
              <Label htmlFor="numberLabel" className="text-sm font-medium">Number/Label</Label>
              <Input
                id="numberLabel"
                value={numberLabel}
                onChange={(e) => setNumberLabel(e.target.value)}
                placeholder="1"
                className="mt-1"
              />
            </div>
          )}

          {dividerType === 'space' && (
            <div>
              <Label htmlFor="spacing" className="text-sm font-medium">Spacing Size</Label>
              <Select value={spacing} onValueChange={setSpacing}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Divider
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DividerEditor;