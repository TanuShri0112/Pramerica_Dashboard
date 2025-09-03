import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Clock, FileText, Target, Trophy, Trash2, Plus, Minus } from 'lucide-react';

export const EssayOverviewTab = ({ essay, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ...essay,
    instructions: essay.instructions || [
      'Read the essay topic carefully and understand what is being asked.',
      'Plan your essay structure with an introduction, body paragraphs, and conclusion.',
      'Use relevant examples and evidence to support your arguments.',
      'Ensure your writing is clear, coherent, and well-organized.',
      'Review your work for grammar, spelling, and punctuation errors.',
      'Stay within the specified word limit.',
      'Submit your essay before the deadline.'
    ]
  });

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      ...essay,
      instructions: essay.instructions || [
        'Read the essay topic carefully and understand what is being asked.',
        'Plan your essay structure with an introduction, body paragraphs, and conclusion.',
        'Use relevant examples and evidence to support your arguments.',
        'Ensure your writing is clear, coherent, and well-organized.',
        'Review your work for grammar, spelling, and punctuation errors.',
        'Stay within the specified word limit.',
        'Submit your essay before the deadline.'
      ]
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this essay? This action cannot be undone.')) {
      // In a real app, this would call an API to delete the essay
      alert('Essay deleted successfully');
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentInstructions = editData.instructions || [
    'Read the essay topic carefully and understand what is being asked.',
    'Plan your essay structure with an introduction, body paragraphs, and conclusion.',
    'Use relevant examples and evidence to support your arguments.',
    'Ensure your writing is clear, coherent, and well-organized.',
    'Review your work for grammar, spelling, and punctuation errors.',
    'Stay within the specified word limit.',
    'Submit your essay before the deadline.'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Essay Overview</h3>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Essay Details
              </Button>
              <Button onClick={handleDelete} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Essay
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Essay Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Essay Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Essay Title</label>
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Enter essay title"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Enter essay description"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Essay Topic</label>
                <Textarea
                  value={editData.topic}
                  onChange={(e) => setEditData({ ...editData, topic: e.target.value })}
                  placeholder="Enter detailed essay topic"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Limit (minutes)</label>
                  <Input
                    type="number"
                    value={editData.timeLimit}
                    onChange={(e) => setEditData({ ...editData, timeLimit: parseInt(e.target.value) })}
                    placeholder="120"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Word Limit</label>
                  <Input
                    type="number"
                    value={editData.wordLimit}
                    onChange={(e) => setEditData({ ...editData, wordLimit: parseInt(e.target.value) })}
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Score</label>
                  <Input
                    type="number"
                    value={editData.maxScore}
                    onChange={(e) => setEditData({ ...editData, maxScore: parseInt(e.target.value) })}
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <select
                    value={editData.difficulty}
                    onChange={(e) => setEditData({ ...editData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
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
                <h4 className="font-medium text-gray-900">{essay.title}</h4>
                <p className="text-gray-600 mt-1">{essay.description}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Essay Topic:</h5>
                <p className="text-gray-700 italic">{essay.topic}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Time Limit</p>
                    <p className="text-sm text-gray-600">{essay.timeLimit} minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Word Limit</p>
                    <p className="text-sm text-gray-600">{essay.wordLimit} words</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Max Score</p>
                    <p className="text-sm text-gray-600">{essay.maxScore} points</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Difficulty</p>
                    <Badge className={getDifficultyColor(essay.difficulty)}>{essay.difficulty}</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Essay Instructions</CardTitle>
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
                  <span className="text-sm font-medium text-gray-500 mt-2 min-w-[20px]">{index + 1}.</span>
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
                  <span className="text-sm font-medium text-blue-600 min-w-[20px]">{index + 1}.</span>
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