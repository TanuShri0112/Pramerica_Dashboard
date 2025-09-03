import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Clock, FileText, Users, Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export const SurveyOverviewTab = ({ survey, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    topic: survey.topic,
    description: survey.description,
    timeLimit: survey.timeLimit,
    instructions: survey.instructions || [
      'Read all questions carefully before answering.',
      'Answer all questions honestly and to the best of your ability.',
      'Take your time to think about each question before responding.',
      'Ensure you complete the survey within the given time limit.',
      'Submit your responses only when you are satisfied with your answers.'
    ]
  });

  const handleSave = () => {
    const updatedSurvey = {
      ...survey,
      topic: editData.topic,
      description: editData.description,
      timeLimit: editData.timeLimit,
      instructions: editData.instructions
    };
    onUpdate(updatedSurvey);
    setIsEditing(false);
    toast.success('Survey details updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      topic: survey.topic,
      description: survey.description,
      timeLimit: survey.timeLimit,
      instructions: survey.instructions || [
        'Read all questions carefully before answering.',
        'Answer all questions honestly and to the best of your ability.',
        'Take your time to think about each question before responding.',
        'Ensure you complete the survey within the given time limit.',
        'Submit your responses only when you are satisfied with your answers.'
      ]
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this survey? This action cannot be undone.')) {
      toast.success('Survey deleted successfully!');
      // You can add your deletion logic or navigation here
    }
  };

  const addInstruction = () => {
    setEditData({
      ...editData,
      instructions: [...editData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    setEditData({
      ...editData,
      instructions: editData.instructions.filter((_, i) => i !== index)
    });
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...editData.instructions];
    newInstructions[index] = value;
    setEditData({
      ...editData,
      instructions: newInstructions
    });
  };

  const currentInstructions = editData.instructions || [
    'Read all questions carefully before answering.',
    'Answer all questions honestly and to the best of your ability.',
    'Take your time to think about each question before responding.',
    'Ensure you complete the survey within the given time limit.',
    'Submit your responses only when you are satisfied with your answers.'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Survey Overview</h3>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Survey Details
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Survey
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Survey Details */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Topic Name</label>
                <Input
                  value={editData.topic}
                  onChange={(e) => setEditData({ ...editData, topic: e.target.value })}
                  placeholder="Enter survey topic"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Enter survey description"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Time Limit (minutes)</label>
                <Input
                  type="number"
                  value={editData.timeLimit}
                  onChange={(e) =>
                    setEditData({ ...editData, timeLimit: parseInt(e.target.value) || 0 })
                  }
                  placeholder="15"
                  min="1"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Topic: {survey.topic}</h4>
                <p className="text-gray-600 mt-1">{survey.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Time Limit</p>
                    <p className="text-sm text-gray-600">{survey.timeLimit} minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Questions</p>
                    <p className="text-sm text-gray-600">{survey.questions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Responses</p>
                    <p className="text-sm text-gray-600">
                      {survey.totalResponses}/{survey.totalStudents}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium">Instructions</h5>
                <Button onClick={addInstruction} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instruction
                </Button>
              </div>
              {editData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-500 mt-2 min-w-[20px]">
                    {index + 1}.
                  </span>
                  <Textarea
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    placeholder="Enter instruction"
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeInstruction(index)}
                    variant="outline"
                    size="sm"
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <ol className="space-y-3">
              {currentInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-sm font-medium text-orange-600 min-w-[20px]">
                    {index + 1}.
                  </span>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyOverviewTab;
