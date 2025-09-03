import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const DebateEditModal = ({ isOpen, onClose, debate, onSave }) => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('for');
  const [timeLimit, setTimeLimit] = useState(30);
  const [points, setPoints] = useState(10);

  useEffect(() => {
    if (debate) {
      setTopic(debate.content.topic || '');
      setDescription(debate.content.description || '');
      setPosition(debate.content.position || 'for');
      setTimeLimit(debate.content.timeLimit || 30);
      setPoints(debate.content.points || 10);
    }
  }, [debate]);

  const handleSave = () => {
    const updatedDebate = {
      ...debate,
      content: {
        topic,
        description,
        position,
        timeLimit,
        points
      }
    };
    onSave(updatedDebate);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Debate</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="topic">Debate Topic</Label>
            <Textarea
              id="topic"
              placeholder="Enter your debate topic here"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Debate Description</Label>
            <Textarea
              id="description"
              placeholder="Provide context and background for the debate"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="for">Supporting</SelectItem>
                  <SelectItem value="against">Opposing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeLimit">Preparation Time (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 30)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 10)}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};