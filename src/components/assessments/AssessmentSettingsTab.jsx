import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export const AssessmentSettingsTab = ({ settings, onUpdateSettings }) => {
  const handleChange = (field, value) => {
    onUpdateSettings({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Assessment Settings</h3>
        <p className="text-xs text-gray-600">Configure your assessment parameters</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium">Assessment Title</Label>
          <Input
            id="title"
            value={settings.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="description"
            value={settings.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="timeLimit" className="text-sm font-medium">Time Limit (minutes)</Label>
          <Input
            id="timeLimit"
            type="number"
            value={settings.timeLimitMinutes}
            onChange={(e) => handleChange('timeLimitMinutes', parseInt(e.target.value) || 0)}
            className="mt-1"
            min="0"
          />
        </div>

        <div>
          <Label htmlFor="passingScore" className="text-sm font-medium">Passing Score (%)</Label>
          <Input
            id="passingScore"
            type="number"
            value={settings.passingScore}
            onChange={(e) => handleChange('passingScore', parseInt(e.target.value) || 0)}
            className="mt-1"
            min="0"
            max="100"
          />
        </div>

        <div>
          <Label htmlFor="attempts" className="text-sm font-medium">Attempts Allowed</Label>
          <Input
            id="attempts"
            type="number"
            value={settings.attemptsAllowed}
            onChange={(e) => handleChange('attemptsAllowed', parseInt(e.target.value) || 1)}
            className="mt-1"
            min="1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="shuffle"
            checked={settings.shuffleQuestions}
            onCheckedChange={(checked) => handleChange('shuffleQuestions', checked)}
          />
          <Label htmlFor="shuffle" className="text-sm font-medium">Shuffle Questions</Label>
        </div>
      </div>
    </div>
  );
};