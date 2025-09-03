import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, FileText, PenTool, Shuffle, BarChart3 } from 'lucide-react';

export const AssessmentSidebar = ({ activeTab, onQuestionTypeSelect }) => {
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState('60');

  const questionTypes = [
    {
      icon: HelpCircle,
      title: "Multiple Choice",
      description: "Choose from several options",
      color: "text-blue-500",
      type: "multiple-choice"
    },
    {
      icon: HelpCircle,
      title: "Multiple Response",
      description: "Select multiple correct answers",
      color: "text-green-500",
      type: "multiple-response"
    },
    {
      icon: BarChart3,
      title: "Fill in the Blank",
      description: "Complete missing words",
      color: "text-teal-500",
      type: "fill-blank"
    },
    {
      icon: Shuffle,
      title: "Matching",
      description: "Match items to their pairs",
      color: "text-purple-500",
      type: "matching"
    },
    {
      icon: FileText,
      title: "True/False",
      description: "Binary choice question",
      color: "text-orange-500",
      type: "true-false"
    }
  ];

  if (activeTab === 'questions') {
    return (
      <div className="p-4 space-y-4 overflow-y-auto">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Question Types</h3>
          <div className="space-y-2">
            {questionTypes.map((type) => (
              <Card 
                key={type.title}
                className="cursor-pointer hover:shadow-md transition-shadow border hover:border-blue-300"
                onClick={() => onQuestionTypeSelect?.(type.type)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <type.icon className={`h-5 w-5 ${type.color} mt-0.5 flex-shrink-0`} />
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm text-gray-900">{type.title}</h4>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Basic Settings</h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Passing Score
                  </label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="80" className="w-16" />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">
                    Require Passing Score To Continue
                  </label>
                  <Switch />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Quiz Retries
                  </label>
                  <Select defaultValue="unlimited">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                      <SelectItem value="1">1 Attempt</SelectItem>
                      <SelectItem value="2">2 Attempts</SelectItem>
                      <SelectItem value="3">3 Attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">
                    Include In Lesson Count
                  </label>
                  <Switch />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Continue Button Style
                  </label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Next Lesson</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-700">
                      Timer
                    </label>
                    <Switch 
                      checked={timerEnabled} 
                      onCheckedChange={setTimerEnabled}
                    />
                  </div>
                  
                  {timerEnabled && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Time Limit (minutes)
                      </label>
                      <Input
                        type="number"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(e.target.value)}
                        placeholder="60"
                        min="1"
                        max="300"
                        className="w-20"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Question Options</h3>
                
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">
                    Randomize Question Order
                  </label>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">
                    Shuffle Answer Choices
                  </label>
                  <Switch />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Reveal Answers
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Choose what learners see after submitting each question.</p>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Reveal All Answers</SelectItem>
                      <SelectItem value="correct">Correct Only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Format Options</h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Correct Answer Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      defaultValue="#ff631e"
                      className="w-8 h-8 rounded border"
                    />
                    <Input defaultValue="#ff631e" className="text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Incorrect Answer Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      defaultValue="#000000"
                      className="w-8 h-8 rounded border"
                    />
                    <Input defaultValue="#000" className="text-xs" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};