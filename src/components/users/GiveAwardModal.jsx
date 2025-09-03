import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Trophy } from 'lucide-react';

export const GiveAwardModal = ({ open, onOpenChange, selectedUsers }) => {
  const [awardType, setAwardType] = useState('');
  const [awardTitle, setAwardTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleGiveAward = () => {
    console.log('Giving award:', { awardType, awardTitle, description, users: selectedUsers });
    onOpenChange(false);
    setAwardType('');
    setAwardTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setAwardType('');
    setAwardTitle('');
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">Give Award</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700">Recipients:</Label>
            <div className="mt-1">
              {selectedUsers.map((user) => (
                <p key={user.id} className="text-sm">
                  • {user.name}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="award-type" className="text-sm font-medium">
                Award Type
              </Label>
              <Select value={awardType} onValueChange={setAwardType}>
                <SelectTrigger>
                  <SelectValue placeholder="🏆 Achievement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="achievement">🏆 Achievement</SelectItem>
                  <SelectItem value="excellence">⭐ Excellence</SelectItem>
                  <SelectItem value="participation">🎖️ Participation</SelectItem>
                  <SelectItem value="leadership">👑 Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="award-title" className="text-sm font-medium">
                Award Title
              </Label>
              <Input
                id="award-title"
                placeholder="e.g., Outstanding Performance"
                value={awardTitle}
                onChange={(e) => setAwardTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add a description for this award..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
            <Trophy className="h-4 w-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-700">
              Preview: "{awardTitle || 'Award Title'}" will be added to the selected users' profiles.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGiveAward}
              className="px-6 bg-blue-600 hover:bg-blue-700"
              disabled={!awardTitle.trim()}
            >
              Give Award
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
